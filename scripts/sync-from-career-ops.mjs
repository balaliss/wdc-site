#!/usr/bin/env node
/**
 * sync-from-career-ops.mjs — Pull headline metrics from career-ops cv.md into docs (manual review).
 * Does not auto-edit site.ts — prints a summary for the maintainer.
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CV_CANDIDATES = [
  join(ROOT, '..', 'Code_Projects', 'apps', 'career-ops', 'cv.md'),
  join(ROOT, '..', 'career-ops', 'cv.md'),
  join(ROOT, '..', '..', 'career-ops', 'cv.md'),
];
const CV = CV_CANDIDATES.find((p) => existsSync(p));

if (!CV) {
  console.error('career-ops cv.md not found. Tried:');
  for (const p of CV_CANDIDATES) console.error(' ', p);
  process.exit(1);
}

const cv = readFileSync(CV, 'utf-8');
const metrics = [
  ...cv.matchAll(/(\d+\+?)\s+(data integration programs|external partners|direct reports|prod issues)/gi),
].map((m) => `${m[1]} ${m[2]}`);

console.log('Sync summary from career-ops/cv.md\n');
console.log('Key metrics found:');
for (const m of metrics) console.log('  -', m);
console.log('\nNext steps:');
console.log('  1. Update src/data/site.ts and case study pages if metrics changed');
console.log('  2. cp ../career-ops/site/public/resume.pdf public/resume.pdf');
console.log('  3. npm run build && npm run deploy');
