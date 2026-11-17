import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { searchTailwindDocs } from '../lib/tailwind-docs.mjs';

const commit = '0123456789abcdef0123456789abcdef01234567';
const docs = {
  'src/docs/functions-and-directives.mdx': `export const title = "Functions and directives";

## Directives

### @utility

Use the \`@utility\` directive to add custom utilities to your project that work with variants.
`,
  'src/docs/upgrade-guide.mdx': `export const title = "Upgrade guide";

Tailwind CSS v4 uses CSS-first configuration.
`,
};

function fetchStub(url) {
  if (url.endsWith('/commits/main')) return Promise.resolve(Response.json({ sha: commit }));
  if (url.includes('/git/trees/')) {
    return Promise.resolve(Response.json({ tree: Object.keys(docs).map((path) => ({ path, type: 'blob' })) }));
  }

  const path = Object.keys(docs).find((candidate) => url.endsWith(candidate));
  return Promise.resolve(path
    ? new Response(docs[path])
    : new Response('Not found', { status: 404 }));
}

async function createProject(version) {
  const root = await mkdtemp(join(tmpdir(), 'tailwind-docs-'));
  await writeFile(join(root, 'package.json'), JSON.stringify({ devDependencies: { tailwindcss: version } }));
  return root;
}

test('searches official Tailwind v4 sources and returns commit-pinned evidence', async () => {
  const root = await createProject('^4.3.3');
  const result = await searchTailwindDocs(root, '@utility', { fetchImpl: fetchStub });

  assert.equal(result.tailwind.declaredVersion, '^4.3.3');
  assert.equal(result.source.commit, commit);
  assert.equal(result.results[0].title, 'Functions and directives');
  assert.match(result.results[0].documentationUrl, /tailwindcss\.com\/docs\/functions-and-directives$/);
  assert.match(result.results[0].sourceUrl, new RegExp(`${commit}.+#L1$`));
  assert.match(result.results[0].excerpt, /@utility/);
});

test('rejects projects that are not on Tailwind v4 before requesting documentation', async () => {
  const root = await createProject('^3.4.17');
  let requested = false;

  await assert.rejects(
    searchTailwindDocs(root, '@utility', { fetchImpl: () => { requested = true; } }),
    /only supports Tailwind CSS v4/,
  );
  assert.equal(requested, false);
});

test('prefers the installed Tailwind version when it is available', async () => {
  const root = await createProject('^4.3.3');
  const packageDirectory = join(root, 'node_modules', 'tailwindcss');
  await mkdir(packageDirectory, { recursive: true });
  await writeFile(join(packageDirectory, 'package.json'), JSON.stringify({ version: '3.4.17' }));

  await assert.rejects(
    searchTailwindDocs(root, 'theme', { fetchImpl: fetchStub }),
    /this project uses 3\.4\.17/,
  );
});
