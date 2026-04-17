#!/usr/bin/env node
// Merge _batch-a.json and _batch-b.json into data/faq.json, dedupe by id, update _meta, backup.

import fs from 'fs';
import path from 'path';

const dataDir = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/i, '$1')), '..', 'data');
const faqPath = path.join(dataDir, 'faq.json');
const batchA = path.join(dataDir, '_batch-a.json');
const batchB = path.join(dataDir, '_batch-b.json');

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

const faq = readJson(faqPath);
const a = readJson(batchA);
const b = readJson(batchB);

console.log(`current: ${faq.questions.length} entries`);
console.log(`batch A: ${a.length} entries`);
console.log(`batch B: ${b.length} entries`);

const existingIds = new Set(faq.questions.map(q => q.id));
const newEntries = [];
let skipped = 0;

for (const e of [...a, ...b]) {
  if (existingIds.has(e.id)) {
    skipped++;
    continue;
  }
  existingIds.add(e.id);
  // Normalize: ensure required fields
  if (!e.related_service) e.related_service = null;
  if (!Array.isArray(e.sources)) e.sources = [];
  newEntries.push(e);
}

console.log(`merged: ${newEntries.length} new (skipped ${skipped} dupes)`);

// backup
fs.writeFileSync(faqPath + '.bak', JSON.stringify(faq, null, 2));

faq.questions.push(...newEntries);
faq._meta.questions_count = faq.questions.length;
faq._meta.updated = '2026-04-17';
faq._meta.version = '1.1.0';

fs.writeFileSync(faqPath, JSON.stringify(faq, null, 2));
console.log(`wrote ${faqPath} with ${faq.questions.length} total entries`);

// clean up temp batches
fs.unlinkSync(batchA);
fs.unlinkSync(batchB);
console.log('removed temp batch files');
