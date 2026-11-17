import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { searchCraftDocs } from '../lib/craft-docs.mjs';

const index = `# Craft CMS Documentation Index
Last updated: 2026-08-14T10:58:35-07:00 (commit 67c73580)

- [Element Queries](https://craftcms.com/docs/5.x/development/element-queries.html) — Fetch elements from Craft.
- [Templates](https://craftcms.com/docs/5.x/development/templates.html) — Render Twig templates.
`;
const fullDocumentation = `# Craft CMS Documentation
Craft CMS 5.x documentation.
Last updated: 2026-08-14T10:58:35-07:00 (commit 67c73580)

---
# Element Queries

Element queries let you fetch entries and other Craft elements.

This section explains how query criteria are configured.

Queries can be prepared before they are executed.

Execution methods determine the returned value.

Element types expose their own query classes.

## Executing Element Queries

Call \`.collect()\` when collection methods are needed.

---
# Templates

Craft uses Twig to render templates.
`;

function fetchStub(url) {
  if (url.endsWith('/llms.txt')) return Promise.resolve(new Response(index));
  if (url.endsWith('/llms-full.txt')) return Promise.resolve(new Response(fullDocumentation));
  return Promise.resolve(new Response('Not found', { status: 404 }));
}

async function createProject(version, lockedVersion) {
  const root = await mkdtemp(join(tmpdir(), 'craft-docs-'));
  await writeFile(join(root, 'composer.json'), JSON.stringify({ require: { 'craftcms/cms': version } }));
  if (lockedVersion) {
    await writeFile(join(root, 'composer.lock'), JSON.stringify({ packages: [{ name: 'craftcms/cms', version: lockedVersion }] }));
  }
  return root;
}

test('searches targeted Craft 5 documentation and returns versioned excerpts', async () => {
  const root = await createProject('^5.0', '5.10.13.2');
  const result = await searchCraftDocs(root, 'element queries collect', { fetchImpl: fetchStub });

  assert.equal(result.craft.declaredVersion, '^5.0');
  assert.equal(result.craft.lockedVersion, '5.10.13.2');
  assert.equal(result.source.commit, '67c73580');
  assert.equal(result.results[0].title, 'Element Queries');
  assert.equal(result.results[0].documentationUrl, 'https://craftcms.com/docs/5.x/development/element-queries.html');
  assert.match(result.results[0].excerpt, /collect\(\)/);
});

test('rejects projects that are not on Craft 5 before requesting documentation', async () => {
  const root = await createProject('^4.0');
  let requested = false;

  await assert.rejects(
    searchCraftDocs(root, 'element queries', { fetchImpl: () => { requested = true; } }),
    /only supports Craft CMS 5/,
  );
  assert.equal(requested, false);
});

test('prefers the locked Craft version when it is available', async () => {
  const root = await createProject('^5.0', '4.13.10');

  await assert.rejects(
    searchCraftDocs(root, 'templates', { fetchImpl: fetchStub }),
    /this project uses 4\.13\.10/,
  );
});
