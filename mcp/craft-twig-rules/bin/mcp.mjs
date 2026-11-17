#!/usr/bin/env node
import readline from 'node:readline';
import { searchCraftDocs } from '../lib/craft-docs.mjs';
import { findRules, listRules, recordRule, removeRule, updateRule } from '../lib/rules.mjs';
import { searchTailwindDocs } from '../lib/tailwind-docs.mjs';

/** @type {string} Server-wide guidance for applying project-local rules. */
const instructions = 'Use these tools for project-local Craft/Twig rules; never read .ai/rules directly. Before inspecting, changing, executing, or advising about a known path, call find-rules with projectRoot and path, then follow every result. Scripts such as bin/seed are paths. For repository-wide work or unknown targets, call list-rules first and apply all ** rules. Re-check new paths. Call record-rule, update-rule, or remove-rule only after explicit user approval.';

const tools = [
  { name: 'find-rules', description: 'Always call before inspecting, changing, executing, or advising about a known Craft/Twig project path. Returns repository-wide ** rules and path-specific matches.', inputSchema: { type: 'object', required: ['projectRoot', 'path'], properties: { projectRoot: { type: 'string' }, path: { type: 'string' } } }, annotations: { readOnlyHint: true, openWorldHint: false } },
  { name: 'list-rules', description: 'List all project rules for repository-wide actions or when target paths are not yet known.', inputSchema: { type: 'object', required: ['projectRoot'], properties: { projectRoot: { type: 'string' } } }, annotations: { readOnlyHint: true, openWorldHint: false } },
  { name: 'record-rule', description: 'Record one path-scoped project rule only after explicit user approval. Rejects duplicate glob/title or glob/note pairs.', inputSchema: { type: 'object', required: ['projectRoot', 'glob', 'title', 'note'], properties: { projectRoot: { type: 'string' }, glob: { type: 'string' }, title: { type: 'string' }, note: { type: 'string' } } }, annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: 'update-rule', description: 'Update one rule identified by its current glob and title, only after explicit user approval.', inputSchema: { type: 'object', required: ['projectRoot', 'glob', 'title'], anyOf: [{ required: ['newGlob'] }, { required: ['newTitle'] }, { required: ['newNote'] }], properties: { projectRoot: { type: 'string' }, glob: { type: 'string' }, title: { type: 'string' }, newGlob: { type: 'string' }, newTitle: { type: 'string' }, newNote: { type: 'string' } } }, annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false } },
  { name: 'remove-rule', description: 'Remove one rule identified by its glob and title, only after explicit user approval.', inputSchema: { type: 'object', required: ['projectRoot', 'glob', 'title'], properties: { projectRoot: { type: 'string' }, glob: { type: 'string' }, title: { type: 'string' } } }, annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false } },
  { name: 'search-craft-docs', description: 'Search current Craft CMS 5 documentation for a project and return targeted excerpts.', inputSchema: { type: 'object', required: ['projectRoot', 'query'], properties: { projectRoot: { type: 'string' }, query: { type: 'string' }, maxResults: { type: 'integer', minimum: 1, maximum: 10, default: 5 } } } },
  { name: 'search-tailwind-docs', description: 'Search current official Tailwind CSS v4 documentation for a project and return commit-pinned source excerpts.', inputSchema: { type: 'object', required: ['projectRoot', 'query'], properties: { projectRoot: { type: 'string' }, query: { type: 'string' }, maxResults: { type: 'integer', minimum: 1, maximum: 10, default: 5 } } } },
];

function response(id, result) {
  process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, result })}\n`);
}

function failure(id, error) {
  process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, error: { code: -32000, message: error.message } })}\n`);
}

const handler = {
  'find-rules': ({ projectRoot, path }) => findRules(projectRoot, path),
  'list-rules': ({ projectRoot }) => listRules(projectRoot),
  'record-rule': ({ projectRoot, glob, title, note }) => recordRule(projectRoot, { glob, title, note }),
  'update-rule': ({ projectRoot, glob, title, newGlob, newTitle, newNote }) => updateRule(projectRoot, { glob, title, newGlob, newTitle, newNote }),
  'remove-rule': ({ projectRoot, glob, title }) => removeRule(projectRoot, { glob, title }),
  'search-craft-docs': ({ projectRoot, query, maxResults }) => searchCraftDocs(projectRoot, query, { maxResults }),
  'search-tailwind-docs': ({ projectRoot, query, maxResults }) => searchTailwindDocs(projectRoot, query, { maxResults }),
};

readline.createInterface({ input: process.stdin }).on('line', async (line) => {
  let request;
  try {
    request = JSON.parse(line);
    if (request.method === 'initialize') return response(request.id, { protocolVersion: '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'craft-twig-rules', version: '0.4.0' }, instructions });
    if (request.method === 'tools/list') return response(request.id, { tools });
    if (request.method === 'tools/call') {
      const result = await handler[request.params.name]?.(request.params.arguments ?? {});
      if (result === undefined) throw new Error(`Unknown tool: ${request.params.name}`);
      return response(request.id, { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result });
    }
    response(request.id, {});
  } catch (error) {
    failure(request?.id ?? null, error);
  }
});
