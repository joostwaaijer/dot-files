import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import readline from 'node:readline';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { recordRule } from '../lib/rules.mjs';

/**
 * Send one JSON-RPC request and return the next server response.
 *
 * @param {import('node:child_process').ChildProcessWithoutNullStreams} server MCP server process.
 * @param {readline.Interface} lines Line reader for server output.
 * @param {number} id JSON-RPC request identifier.
 * @param {string} method JSON-RPC method name.
 * @param {object} [params] JSON-RPC method parameters.
 * @returns {Promise<object>} Parsed JSON-RPC response.
 */
async function request(server, lines, id, method, params) {
  const response = once(lines, 'line');
  server.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
  const [line] = await response;
  return JSON.parse(line);
}

test('exposes instructions, strengthened tools, and structured rule results over stdio', async () => {
  const root = await mkdtemp(join(tmpdir(), 'craft-twig-rules-mcp-'));
  await recordRule(root, { glob: '**', title: 'Fixture safety', note: 'Do not load fixtures into a populated database.' });

  const server = spawn(process.execPath, [fileURLToPath(new URL('../bin/mcp.mjs', import.meta.url))]);
  const lines = readline.createInterface({ input: server.stdout });

  try {
    const initialized = await request(server, lines, 1, 'initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'craft-twig-rules-test', version: '1.0.0' },
    });

    assert.equal(initialized.result.protocolVersion, '2024-11-05');
    assert.deepEqual(initialized.result.capabilities, { tools: {} });
    assert.deepEqual(initialized.result.serverInfo, { name: 'craft-twig-rules', version: '0.4.0' });
    assert.equal(initialized.result.instructions, 'Use these tools for project-local Craft/Twig rules; never read .ai/rules directly. Before inspecting, changing, executing, or advising about a known path, call find-rules with projectRoot and path, then follow every result. Scripts such as bin/seed are paths. For repository-wide work or unknown targets, call list-rules first and apply all ** rules. Re-check new paths. Call record-rule, update-rule, or remove-rule only after explicit user approval.');
    assert.ok(initialized.result.instructions.length <= 512);

    const listed = await request(server, lines, 2, 'tools/list');
    const descriptions = Object.fromEntries(listed.result.tools.map(({ name, description }) => [name, description]));
    const annotations = Object.fromEntries(listed.result.tools.map(({ name, annotations: toolAnnotations }) => [name, toolAnnotations]));
    assert.equal(descriptions['find-rules'], 'Always call before inspecting, changing, executing, or advising about a known Craft/Twig project path. Returns repository-wide ** rules and path-specific matches.');
    assert.equal(descriptions['list-rules'], 'List all project rules for repository-wide actions or when target paths are not yet known.');
    assert.equal(descriptions['record-rule'], 'Record one path-scoped project rule only after explicit user approval. Rejects duplicate glob/title or glob/note pairs.');
    assert.equal(descriptions['update-rule'], 'Update one rule identified by its current glob and title, only after explicit user approval.');
    assert.equal(descriptions['remove-rule'], 'Remove one rule identified by its glob and title, only after explicit user approval.');
    assert.deepEqual(annotations['find-rules'], { readOnlyHint: true, openWorldHint: false });
    assert.deepEqual(annotations['list-rules'], { readOnlyHint: true, openWorldHint: false });
    assert.deepEqual(annotations['record-rule'], { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false });
    assert.deepEqual(annotations['update-rule'], { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false });
    assert.deepEqual(annotations['remove-rule'], { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false });

    const called = await request(server, lines, 3, 'tools/call', { name: 'find-rules', arguments: { projectRoot: root, path: 'bin/seed' } });
    assert.deepEqual(called.result.structuredContent, [{ glob: '**', title: 'Fixture safety', file: './general.md', note: 'Do not load fixtures into a populated database.' }]);
    assert.deepEqual(JSON.parse(called.result.content[0].text), called.result.structuredContent);

    const updated = await request(server, lines, 4, 'tools/call', { name: 'update-rule', arguments: { projectRoot: root, glob: '**', title: 'Fixture safety', newNote: 'Never load fixtures into a populated database.' } });
    assert.equal(updated.result.structuredContent.updated, true);
    assert.equal(updated.result.structuredContent.rule.note, 'Never load fixtures into a populated database.');

    const removed = await request(server, lines, 5, 'tools/call', { name: 'remove-rule', arguments: { projectRoot: root, glob: '**', title: 'Fixture safety' } });
    assert.equal(removed.result.structuredContent.removed, true);
  } finally {
    const exited = once(server, 'exit');
    lines.close();
    server.stdin.end();
    await exited;
  }
});
