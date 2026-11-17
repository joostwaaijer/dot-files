import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { findRules, listRules, recordRule, removeRule, updateRule } from '../lib/rules.mjs';

test('records, scopes, lists, and deduplicates rules', async () => {
  const root = await mkdtemp(join(tmpdir(), 'craft-twig-rules-'));
  const first = await recordRule(root, { glob: 'templates/**/*.twig', title: 'Template composition', note: 'Keep reusable template contracts explicit.' });
  const duplicate = await recordRule(root, { glob: 'templates/**/*.twig', title: 'Template composition', note: 'Keep reusable template contracts explicit.' });
  assert.equal(first.created, true);
  assert.equal(duplicate.created, false);
  assert.equal((await findRules(root, 'templates/_partials/card.twig')).length, 1);
  assert.equal((await findRules(root, 'modules/forms/Module.php')).length, 0);
  assert.equal((await listRules(root)).length, 1);
});

test('formats multiple rules in one file as separate Markdown sections', async () => {
  const root = await mkdtemp(join(tmpdir(), 'craft-twig-rules-'));
  await recordRule(root, { glob: 'templates/**', title: 'Template composition', note: 'Keep reusable template contracts explicit.' });
  await recordRule(root, { glob: 'templates/**', title: 'Template queries', note: 'Keep element query execution intentional.' });

  const rules = await readFile(join(root, '.ai', 'rules', 'templates.md'), 'utf8');
  assert.equal(rules, `## Template composition

Keep reusable template contracts explicit.

## Template queries

Keep element query execution intentional.
`);
});

test('applies repository-wide rules to every path alongside scoped rules', async () => {
  const root = await mkdtemp(join(tmpdir(), 'craft-twig-rules-'));
  await recordRule(root, { glob: '**', title: 'Fixture safety', note: 'Do not load fixtures into a populated database.' });
  await recordRule(root, { glob: 'templates/**', title: 'Template composition', note: 'Keep reusable template contracts explicit.' });

  assert.deepEqual((await findRules(root, 'bin/seed')).map(({ title }) => title), ['Fixture safety']);
  assert.deepEqual((await findRules(root, 'templates/_partials/card.twig')).map(({ title }) => title), ['Fixture safety', 'Template composition']);
  assert.deepEqual((await findRules(root, 'modules/forms/Module.php')).map(({ title }) => title), ['Fixture safety']);
});

test('updates rule content and moves rules between scoped files', async () => {
  const root = await mkdtemp(join(tmpdir(), 'craft-twig-rules-'));
  await recordRule(root, { glob: 'templates/**', title: 'Template composition', note: 'Keep reusable template contracts explicit.' });
  await recordRule(root, { glob: 'templates/**', title: 'Template queries', note: 'Keep element query execution intentional.' });

  const updated = await updateRule(root, {
    glob: 'templates/**',
    title: 'Template composition',
    newGlob: 'modules/**',
    newTitle: 'Module composition',
    newNote: 'Keep feature code in its owning module.',
  });

  assert.equal(updated.updated, true);
  assert.deepEqual(updated.previousRule, {
    glob: 'templates/**',
    title: 'Template composition',
    file: './templates.md',
    note: 'Keep reusable template contracts explicit.',
  });
  assert.deepEqual(updated.rule, {
    glob: 'modules/**',
    title: 'Module composition',
    file: './modules.md',
    note: 'Keep feature code in its owning module.',
  });
  assert.equal(await readFile(join(root, '.ai', 'rules', 'templates.md'), 'utf8'), `## Template queries

Keep element query execution intentional.
`);
  assert.equal(await readFile(join(root, '.ai', 'rules', 'modules.md'), 'utf8'), `## Module composition

Keep feature code in its owning module.
`);
  assert.deepEqual((await findRules(root, 'modules/forms/Module.php')).map(({ title }) => title), ['Module composition']);
});

test('rejects duplicate updates and reports unchanged or missing rules', async () => {
  const root = await mkdtemp(join(tmpdir(), 'craft-twig-rules-'));
  await recordRule(root, { glob: 'templates/**', title: 'Template composition', note: 'Keep reusable template contracts explicit.' });
  await recordRule(root, { glob: 'templates/**', title: 'Template queries', note: 'Keep element query execution intentional.' });

  assert.deepEqual(await updateRule(root, {
    glob: 'templates/**',
    title: 'Template queries',
    newTitle: 'Template composition',
  }), {
    updated: false,
    reason: 'duplicate',
    rule: {
      glob: 'templates/**',
      title: 'Template composition',
      file: './templates.md',
      note: 'Keep reusable template contracts explicit.',
    },
  });
  assert.equal((await updateRule(root, {
    glob: 'templates/**',
    title: 'Template composition',
    newNote: 'Keep reusable template contracts explicit.',
  })).reason, 'unchanged');
  assert.deepEqual(await updateRule(root, {
    glob: 'modules/**',
    title: 'Missing module rule',
    newNote: 'This rule does not exist.',
  }), { updated: false, reason: 'not_found' });
});

test('removes rule sections and deletes empty scoped files', async () => {
  const root = await mkdtemp(join(tmpdir(), 'craft-twig-rules-'));
  await recordRule(root, { glob: 'templates/**', title: 'Template composition', note: 'Keep reusable template contracts explicit.' });
  await recordRule(root, { glob: 'templates/**', title: 'Template queries', note: 'Keep element query execution intentional.' });

  const first = await removeRule(root, { glob: 'templates/**', title: 'Template composition' });
  assert.equal(first.removed, true);
  assert.equal(await readFile(join(root, '.ai', 'rules', 'templates.md'), 'utf8'), `## Template queries

Keep element query execution intentional.
`);

  const second = await removeRule(root, { glob: 'templates/**', title: 'Template queries' });
  assert.equal(second.removed, true);
  await assert.rejects(readFile(join(root, '.ai', 'rules', 'templates.md'), 'utf8'), { code: 'ENOENT' });
  assert.deepEqual(await listRules(root), []);
  assert.deepEqual(await removeRule(root, { glob: 'templates/**', title: 'Template queries' }), { removed: false, reason: 'not_found' });
});
