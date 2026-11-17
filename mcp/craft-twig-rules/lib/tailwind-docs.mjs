import { readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const repository = 'tailwindlabs/tailwindcss.com';
const repositoryUrl = `https://github.com/${repository}`;
const coreDocs = new Set([
  'adding-custom-styles.mdx',
  'colors.mdx',
  'compatibility.mdx',
  'detecting-classes-in-source-files.mdx',
  'functions-and-directives.mdx',
  'hover-focus-and-other-states.mdx',
  'preflight.mdx',
  'responsive-design.mdx',
  'styling-with-utility-classes.mdx',
  'theme.mdx',
  'upgrade-guide.mdx',
]);

const routingTerms = new Map([
  ['adding-custom-styles.mdx', ['component', 'custom', 'css', 'layer', 'style']],
  ['colors.mdx', ['color', 'colour', 'oklch', 'palette']],
  ['compatibility.mdx', ['browser', 'compatibility', 'less', 'sass', 'stylus']],
  ['detecting-classes-in-source-files.mdx', ['detect', 'dynamic', 'safelist', 'scan', 'source']],
  ['functions-and-directives.mdx', ['apply', 'config', 'custom-variant', 'directive', 'plugin', 'reference', 'source', 'theme', 'utility', 'variant']],
  ['hover-focus-and-other-states.mdx', ['active', 'disabled', 'focus', 'hover', 'state', 'variant']],
  ['preflight.mdx', ['base', 'normalize', 'preflight', 'reset']],
  ['responsive-design.mdx', ['breakpoint', 'mobile', 'responsive', 'screen']],
  ['styling-with-utility-classes.mdx', ['apply', 'class', 'reuse', 'utility']],
  ['theme.mdx', ['breakpoint', 'design-token', 'namespace', 'theme', 'token', 'variable']],
  ['upgrade-guide.mdx', ['deprecated', 'migration', 'upgrade', 'v3', 'v4']],
]);

let cachedIndex;
const stopWords = new Set(['a', 'an', 'and', 'are', 'for', 'from', 'how', 'in', 'is', 'of', 'on', 'or', 'the', 'to', 'use', 'with']);

async function readText(path) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

function extractMajor(version) {
  const normalized = version.replace(/^npm:tailwindcss@/, '').trim();
  return Number(normalized.match(/^(?:[~^]|[<>]=?|=)?\s*(\d+)/)?.[1] ?? Number.NaN);
}

async function resolveTailwindVersion(projectRoot) {
  const packagePath = join(projectRoot, 'package.json');
  const packageContents = await readText(packagePath);
  if (!packageContents) throw new Error(`Cannot verify Tailwind CSS v4: ${packagePath} does not exist.`);

  let packageJson;
  try {
    packageJson = JSON.parse(packageContents);
  } catch {
    throw new Error(`Cannot verify Tailwind CSS v4: ${packagePath} is not valid JSON.`);
  }

  const declaredVersion = packageJson.dependencies?.tailwindcss ?? packageJson.devDependencies?.tailwindcss;
  if (!declaredVersion) throw new Error('Cannot verify Tailwind CSS v4: tailwindcss is not declared in package.json.');

  const installedPackage = await readText(join(projectRoot, 'node_modules', 'tailwindcss', 'package.json'));
  let installedVersion;
  if (installedPackage) {
    try {
      installedVersion = JSON.parse(installedPackage).version;
    } catch {
      throw new Error('Cannot verify Tailwind CSS v4: node_modules/tailwindcss/package.json is not valid JSON.');
    }
  }

  const checkedVersion = installedVersion ?? declaredVersion;
  if (extractMajor(checkedVersion) !== 4) {
    throw new Error(`search-tailwind-docs only supports Tailwind CSS v4; this project uses ${checkedVersion}.`);
  }

  return { declaredVersion, installedVersion: installedVersion ?? null };
}

function tokens(value) {
  return [...new Set(value
    .toLowerCase()
    .replace(/@/g, '')
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !stopWords.has(token)))];
}

function candidateScore(path, queryTokens) {
  const file = basename(path);
  const pathTokens = tokens(file.replace(/\.mdx$/, ''));
  const aliases = routingTerms.get(file) ?? [];

  return queryTokens.reduce((score, queryToken) => {
    if (pathTokens.includes(queryToken)) return score + 8;
    if (pathTokens.some((pathToken) => pathToken.includes(queryToken) || queryToken.includes(pathToken))) return score + 4;
    if (aliases.includes(queryToken)) return score + 6;
    return score;
  }, 0);
}

async function fetchJson(fetchImpl, url) {
  const response = await fetchImpl(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'robuust-craft-twig-rules',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) throw new Error(`Tailwind documentation request failed: ${response.status} ${url}`);
  return response.json();
}

async function loadIndex(fetchImpl) {
  if (fetchImpl === globalThis.fetch && cachedIndex) return cachedIndex;

  const commit = await fetchJson(fetchImpl, `https://api.github.com/repos/${repository}/commits/main`);
  const tree = await fetchJson(fetchImpl, `https://api.github.com/repos/${repository}/git/trees/${commit.sha}?recursive=1`);
  const index = {
    commit: commit.sha,
    paths: tree.tree
      .filter((entry) => entry.type === 'blob' && /^src\/docs\/[^/]+\.mdx$/.test(entry.path))
      .map((entry) => entry.path),
  };

  if (fetchImpl === globalThis.fetch) cachedIndex = index;
  return index;
}

function selectPaths(paths, query) {
  const queryTokens = tokens(query);
  const ranked = paths
    .map((path) => ({ path, score: candidateScore(path, queryTokens) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.path.localeCompare(right.path))
    .slice(0, 12)
    .map(({ path }) => path);
  const core = paths.filter((path) => coreDocs.has(basename(path)));
  return [...new Set([...ranked, ...core])];
}

async function fetchDocument(fetchImpl, commit, path) {
  const url = `https://raw.githubusercontent.com/${repository}/${commit}/${path}`;
  const response = await fetchImpl(url);
  if (!response.ok) throw new Error(`Tailwind documentation request failed: ${response.status} ${url}`);
  return { path, contents: await response.text() };
}

function titleOf(path, contents) {
  return contents.match(/^export const title = ["'](.+?)["'];?$/m)?.[1]
    ?? basename(path, '.mdx').split('-').map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join(' ');
}

function bestMatch(document, query) {
  const lines = document.contents.split('\n');
  const queryTokens = tokens(query);
  const normalizedQuery = query.toLowerCase();
  let best;

  lines.forEach((line, index) => {
    const normalizedLine = line.toLowerCase();
    const matchedTokens = queryTokens.filter((token) => normalizedLine.includes(token));
    if (matchedTokens.length === 0) return;

    const score = (normalizedLine.includes(normalizedQuery) ? 20 : 0) + (matchedTokens.length * 4);
    if (best && best.score >= score) return;

    const lineStart = Math.max(0, index - 5);
    const lineEnd = Math.min(lines.length, index + 7);
    best = {
      score,
      lineStart: lineStart + 1,
      lineEnd,
      excerpt: lines.slice(lineStart, lineEnd).join('\n').trim(),
    };
  });

  return best;
}

export async function searchTailwindDocs(projectRoot, query, { fetchImpl = globalThis.fetch, maxResults = 5 } = {}) {
  if (!query?.trim()) throw new Error('query is required.');
  if (!Number.isInteger(maxResults) || maxResults < 1 || maxResults > 10) throw new Error('maxResults must be an integer between 1 and 10.');

  const version = await resolveTailwindVersion(projectRoot);
  const index = await loadIndex(fetchImpl);
  const selectedPaths = selectPaths(index.paths, query);
  const settled = await Promise.allSettled(selectedPaths.map((path) => fetchDocument(fetchImpl, index.commit, path)));
  const documents = settled.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
  if (documents.length === 0) throw settled.find(({ status }) => status === 'rejected')?.reason ?? new Error('No Tailwind documentation pages could be loaded.');

  const results = documents
    .map((document) => ({ document, match: bestMatch(document, query) }))
    .filter(({ match }) => match)
    .sort((left, right) => right.match.score - left.match.score || left.document.path.localeCompare(right.document.path))
    .slice(0, maxResults)
    .map(({ document, match }) => {
      const slug = basename(document.path, '.mdx');
      return {
        title: titleOf(document.path, document.contents),
        documentationUrl: `https://tailwindcss.com/docs/${slug}`,
        sourceUrl: `${repositoryUrl}/blob/${index.commit}/${document.path}#L${match.lineStart}`,
        sourcePath: document.path,
        lineStart: match.lineStart,
        lineEnd: match.lineEnd,
        excerpt: match.excerpt,
      };
    });

  return {
    query,
    tailwind: {
      declaredVersion: version.declaredVersion,
      installedVersion: version.installedVersion,
      documentationTrack: 'current Tailwind CSS v4',
    },
    source: {
      repository: repositoryUrl,
      commit: index.commit,
    },
    searchedPages: selectedPaths.length,
    results,
  };
}
