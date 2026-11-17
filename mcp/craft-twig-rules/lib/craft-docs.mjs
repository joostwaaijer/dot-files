import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const indexUrl = 'https://craft-llms.netlify.app/llms.txt';
const fullDocumentationUrl = 'https://craft-llms.netlify.app/llms-full.txt';
const stopWords = new Set(['a', 'an', 'and', 'are', 'for', 'from', 'how', 'in', 'is', 'of', 'on', 'or', 'the', 'to', 'use', 'with']);

let cachedCorpus;

async function readText(path) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

function extractMajor(version) {
  return Number(version.trim().match(/^(?:[~^]|[<>]=?|=)?\s*v?(\d+)/)?.[1] ?? Number.NaN);
}

async function resolveCraftVersion(projectRoot) {
  const composerPath = join(projectRoot, 'composer.json');
  const composerContents = await readText(composerPath);
  if (!composerContents) throw new Error(`Cannot verify Craft CMS 5: ${composerPath} does not exist.`);

  let composerJson;
  try {
    composerJson = JSON.parse(composerContents);
  } catch {
    throw new Error(`Cannot verify Craft CMS 5: ${composerPath} is not valid JSON.`);
  }

  const declaredVersion = composerJson.require?.['craftcms/cms'] ?? composerJson['require-dev']?.['craftcms/cms'];
  if (!declaredVersion) throw new Error('Cannot verify Craft CMS 5: craftcms/cms is not declared in composer.json.');

  const lockContents = await readText(join(projectRoot, 'composer.lock'));
  let lockedVersion;
  if (lockContents) {
    let lockJson;
    try {
      lockJson = JSON.parse(lockContents);
    } catch {
      throw new Error('Cannot verify Craft CMS 5: composer.lock is not valid JSON.');
    }
    const lockedPackage = [...(lockJson.packages ?? []), ...(lockJson['packages-dev'] ?? [])]
      .find(({ name }) => name === 'craftcms/cms');
    lockedVersion = lockedPackage?.version;
  }

  const checkedVersion = lockedVersion ?? declaredVersion;
  if (extractMajor(checkedVersion) !== 5) {
    throw new Error(`search-craft-docs only supports Craft CMS 5; this project uses ${checkedVersion}.`);
  }

  return { declaredVersion, lockedVersion: lockedVersion ?? null };
}

function tokens(value) {
  return [...new Set(value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !stopWords.has(token)))];
}

async function fetchText(fetchImpl, url) {
  const response = await fetchImpl(url);
  if (!response.ok) throw new Error(`Craft documentation request failed: ${response.status} ${url}`);
  return response.text();
}

function parseIndex(contents) {
  const pages = new Map();
  contents.split('\n').forEach((line) => {
    const match = line.match(/^- \[(.+?)]\((https:\/\/craftcms\.com\/docs\/5\.x\/[^)]+)\)(?: — (.*))?$/);
    if (!match || pages.has(match[1].toLowerCase())) return;
    pages.set(match[1].toLowerCase(), { documentationUrl: match[2], description: match[3] ?? '' });
  });
  return pages;
}

function parseSections(contents, pages) {
  const lines = contents.split('\n');
  const starts = lines
    .map((line, index) => (line.startsWith('# ') && lines[index - 1]?.trim() === '---' ? index : null))
    .filter((index) => index !== null);

  return starts.map((start, position) => {
    const end = starts[position + 1] ?? lines.length;
    const title = lines[start].slice(2).trim();
    const page = pages.get(title.toLowerCase());
    return {
      title,
      description: page?.description ?? '',
      documentationUrl: page?.documentationUrl ?? 'https://craftcms.com/docs/5.x/',
      lineOffset: start,
      lines: lines.slice(start, end),
    };
  });
}

function metadataOf(contents) {
  const match = contents.match(/^Last updated: (.+?) \(commit ([^)]+)\)$/m);
  return { lastUpdated: match?.[1] ?? null, commit: match?.[2] ?? null };
}

async function loadCorpus(fetchImpl) {
  if (fetchImpl === globalThis.fetch && cachedCorpus) return cachedCorpus;

  const [indexContents, fullContents] = await Promise.all([
    fetchText(fetchImpl, indexUrl),
    fetchText(fetchImpl, fullDocumentationUrl),
  ]);
  const corpus = {
    metadata: metadataOf(fullContents),
    sections: parseSections(fullContents, parseIndex(indexContents)),
  };

  if (fetchImpl === globalThis.fetch) cachedCorpus = corpus;
  return corpus;
}

function bestMatch(section, query) {
  const queryTokens = tokens(query);
  const normalizedQuery = query.toLowerCase();
  const titleTokens = tokens(section.title);
  const detailTokens = queryTokens.filter((token) => !titleTokens.includes(token));
  let best;

  section.lines.forEach((line, index) => {
    const normalizedLine = line.toLowerCase();
    const matchedTokens = queryTokens.filter((token) => normalizedLine.includes(token));
    if (matchedTokens.length === 0) return;

    const score = (normalizedLine.includes(normalizedQuery) ? 20 : 0)
      + (matchedTokens.length * 4)
      + detailTokens.filter((token) => normalizedLine.includes(token)).length * 10
      + queryTokens.filter((token) => titleTokens.includes(token)).length * 20;
    if (best && best.score >= score) return;

    const excerptStart = Math.max(0, index - 4);
    const excerptEnd = Math.min(section.lines.length, index + 8);
    best = {
      score,
      lineStart: section.lineOffset + excerptStart + 1,
      lineEnd: section.lineOffset + excerptEnd,
      excerpt: section.lines.slice(excerptStart, excerptEnd).join('\n').trim(),
    };
  });

  return best;
}

export async function searchCraftDocs(projectRoot, query, { fetchImpl = globalThis.fetch, maxResults = 5 } = {}) {
  if (!query?.trim()) throw new Error('query is required.');
  if (!Number.isInteger(maxResults) || maxResults < 1 || maxResults > 10) throw new Error('maxResults must be an integer between 1 and 10.');

  const version = await resolveCraftVersion(projectRoot);
  const corpus = await loadCorpus(fetchImpl);
  const results = corpus.sections
    .map((section) => ({ section, match: bestMatch(section, query) }))
    .filter(({ match }) => match)
    .sort((left, right) => right.match.score - left.match.score || left.section.title.localeCompare(right.section.title))
    .slice(0, maxResults)
    .map(({ section, match }) => ({
      title: section.title,
      documentationUrl: section.documentationUrl,
      sourceUrl: fullDocumentationUrl,
      lineStart: match.lineStart,
      lineEnd: match.lineEnd,
      excerpt: match.excerpt,
    }));

  return {
    query,
    craft: {
      declaredVersion: version.declaredVersion,
      lockedVersion: version.lockedVersion,
      documentationTrack: 'Craft CMS 5.x',
    },
    source: {
      indexUrl,
      fullDocumentationUrl,
      lastUpdated: corpus.metadata.lastUpdated,
      commit: corpus.metadata.commit,
    },
    searchedSections: corpus.sections.length,
    results,
  };
}
