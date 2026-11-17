#!/usr/bin/env node
import { argv, cwd, exit } from 'node:process';
import { searchCraftDocs } from '../lib/craft-docs.mjs';

const args = argv.slice(2);
const projectRootFlag = args.indexOf('--project-root');
const projectRoot = projectRootFlag === -1 ? cwd() : args[projectRootFlag + 1];
if (projectRootFlag !== -1) args.splice(projectRootFlag, 2);
const query = args.join(' ').trim();
if (!query) {
  console.error('Usage: search-craft-docs [--project-root <path>] <query>');
  exit(1);
}

console.log(JSON.stringify(await searchCraftDocs(projectRoot, query), null, 2));
