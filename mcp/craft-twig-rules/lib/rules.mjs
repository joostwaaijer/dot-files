import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const rulesDirectory = (projectRoot) => join(projectRoot, '.ai', 'rules');
const indexPath = (projectRoot) => join(rulesDirectory(projectRoot), 'index.md');
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'general';

async function readText(path) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

function parseIndex(index) {
  return [...index.matchAll(/^\| `([^`]+)` \| \[([^\]]+)\]\(([^)]+)\) \| (.+) \|$/gm)]
    .map(([, glob, title, file, note]) => ({ glob, title, file, note }));
}

function matchesGlob(path, glob) {
  const expression = `^${glob.split('**').map((part) => part.split('*').map((piece) => piece.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')).join('[^/]*')).join('.*')}$`;
  return new RegExp(expression).test(path);
}

function sortRules(rules) {
  return [...rules].sort((left, right) => left.glob.localeCompare(right.glob) || left.title.localeCompare(right.title));
}

function formatRuleFile(rules) {
  return rules.map((rule) => `## ${rule.title}\n\n${rule.note}\n`).join('\n');
}

async function writeRules(projectRoot, rules, affectedFiles) {
  const directory = rulesDirectory(projectRoot);
  const sorted = sortRules(rules);
  await mkdir(directory, { recursive: true });

  for (const relativeFile of affectedFiles) {
    const fileRules = sorted.filter((rule) => rule.file === relativeFile);
    const filePath = join(directory, relativeFile.replace(/^\.\//, ''));
    if (fileRules.length === 0) {
      await rm(filePath, { force: true });
    } else {
      await writeFile(filePath, formatRuleFile(fileRules), 'utf8');
    }
  }

  const rows = sorted.map((rule) => `| \`${rule.glob}\` | [${rule.title}](${rule.file}) | ${rule.note} |`).join('\n');
  await writeFile(indexPath(projectRoot), `# Project rules\n\nPath-scoped project conventions. Local rules override shared skills.\n\n| Glob | Rule | Note |\n| --- | --- | --- |\n${rows}${rows ? '\n' : ''}`, 'utf8');
}

export async function listRules(projectRoot) {
  return parseIndex(await readText(indexPath(projectRoot)));
}

export async function findRules(projectRoot, path) {
  return (await listRules(projectRoot)).filter((rule) => matchesGlob(path, rule.glob));
}

export async function recordRule(projectRoot, { glob, title, note }) {
  if (!glob || !title || !note) throw new Error('glob, title, and note are required.');
  const directory = rulesDirectory(projectRoot);
  const rules = await listRules(projectRoot);
  const existing = rules.find((rule) => rule.glob === glob && (rule.title === title || rule.note === note));
  if (existing) return { created: false, rule: existing };

  const file = `${slug(glob)}.md`;
  const relativeFile = `./${file}`;
  const filePath = join(directory, file);
  await mkdir(directory, { recursive: true });
  const current = await readText(filePath);
  const content = current.trimEnd();
  const separator = content ? '\n\n' : '';
  const section = `## ${title}\n\n${note.trim()}\n`;
  await writeFile(filePath, `${content}${separator}${section}`, 'utf8');

  const entry = { glob, title, file: relativeFile, note: note.trim() };
  const updated = sortRules([...rules, entry]);
  const rows = updated.map((rule) => `| \`${rule.glob}\` | [${rule.title}](${rule.file}) | ${rule.note} |`).join('\n');
  await writeFile(indexPath(projectRoot), `# Project rules\n\nPath-scoped project conventions. Local rules override shared skills.\n\n| Glob | Rule | Note |\n| --- | --- | --- |\n${rows}\n`, 'utf8');
  return { created: true, rule: entry };
}

export async function updateRule(projectRoot, { glob, title, newGlob, newTitle, newNote }) {
  if (!glob || !title) throw new Error('glob and title are required.');
  if (newGlob === undefined && newTitle === undefined && newNote === undefined) {
    throw new Error('At least one of newGlob, newTitle, or newNote is required.');
  }

  const rules = await listRules(projectRoot);
  const index = rules.findIndex((rule) => rule.glob === glob && rule.title === title);
  if (index === -1) return { updated: false, reason: 'not_found' };

  const current = rules[index];
  const nextGlob = newGlob === undefined ? current.glob : newGlob.trim();
  const nextTitle = newTitle === undefined ? current.title : newTitle.trim();
  const nextNote = newNote === undefined ? current.note : newNote.trim();
  if (!nextGlob || !nextTitle || !nextNote) throw new Error('Updated glob, title, and note must not be empty.');

  const next = { glob: nextGlob, title: nextTitle, file: `./${slug(nextGlob)}.md`, note: nextNote };
  const duplicate = rules.find((rule, ruleIndex) => ruleIndex !== index && rule.glob === next.glob && (rule.title === next.title || rule.note === next.note));
  if (duplicate) return { updated: false, reason: 'duplicate', rule: duplicate };
  if (current.glob === next.glob && current.title === next.title && current.note === next.note) {
    return { updated: false, reason: 'unchanged', rule: current };
  }

  const updated = [...rules];
  updated[index] = next;
  await writeRules(projectRoot, updated, new Set([current.file, next.file]));
  return { updated: true, previousRule: current, rule: next };
}

export async function removeRule(projectRoot, { glob, title }) {
  if (!glob || !title) throw new Error('glob and title are required.');

  const rules = await listRules(projectRoot);
  const index = rules.findIndex((rule) => rule.glob === glob && rule.title === title);
  if (index === -1) return { removed: false, reason: 'not_found' };

  const [removed] = rules.splice(index, 1);
  await writeRules(projectRoot, rules, new Set([removed.file]));
  return { removed: true, rule: removed };
}
