#!/usr/bin/env node
// Merge _en-batches/en-*.json translations into data/faq-en.json (master EN edition).
// Also rebuild EN jsonl/csv/alpaca/sharegpt from it.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\//, ''), '..');
const DATA = path.join(ROOT, 'data');
const BATCH_DIR = path.join(DATA, '_en-batches');
const SRC_FAQ = path.join(DATA, 'faq.json');

const src = JSON.parse(fs.readFileSync(SRC_FAQ, 'utf8'));
const sourceById = Object.fromEntries(src.questions.map(q => [q.id, q]));

const batchFiles = fs.readdirSync(BATCH_DIR).filter(f => f.startsWith('en-') && f.endsWith('.json'));
const translations = {};
for (const f of batchFiles) {
  const arr = JSON.parse(fs.readFileSync(path.join(BATCH_DIR, f), 'utf8'));
  for (const t of arr) translations[t.id] = t;
}
console.log(`Loaded ${Object.keys(translations).length} translations from ${batchFiles.length} batches`);

const enQuestions = src.questions.map(q => {
  const tr = translations[q.id];
  if (!tr) { console.warn(`MISSING translation for ${q.id}`); return null; }
  return {
    id: q.id,
    category: q.category,
    q: tr.q_en,
    a: tr.a_en,
    sources: q.sources,
    related_service: q.related_service,
  };
}).filter(Boolean);

const enMaster = {
  _meta: {
    ...src._meta,
    title: 'Swedish Construction FAQ — English edition',
    language: 'en',
    version: '1.1.0',
    updated: new Date().toISOString().slice(0, 10),
    questions_count: enQuestions.length,
    translated_from: 'faq.json (sv)',
  },
  questions: enQuestions,
};
fs.writeFileSync(path.join(DATA, 'faq-en.json'), JSON.stringify(enMaster, null, 2) + '\n', 'utf8');
console.log(`Wrote faq-en.json (${enQuestions.length} Q&A)`);

// JSONL
const jsonl = enQuestions.map(q => JSON.stringify(q)).join('\n') + '\n';
fs.writeFileSync(path.join(DATA, 'faq-en.jsonl'), jsonl, 'utf8');
console.log('Wrote faq-en.jsonl');

// Alpaca
const alpaca = enQuestions.map(q => JSON.stringify({
  instruction: q.q,
  input: '',
  output: q.a,
})).join('\n') + '\n';
fs.writeFileSync(path.join(DATA, 'faq-en-alpaca.jsonl'), alpaca, 'utf8');
console.log('Wrote faq-en-alpaca.jsonl');

// ShareGPT
const sharegpt = enQuestions.map(q => JSON.stringify({
  conversations: [
    { from: 'human', value: q.q },
    { from: 'gpt', value: q.a },
  ],
})).join('\n') + '\n';
fs.writeFileSync(path.join(DATA, 'faq-en-sharegpt.jsonl'), sharegpt, 'utf8');
console.log('Wrote faq-en-sharegpt.jsonl');

// CSV
const csvLines = ['id,category,q,a,sources'];
for (const q of enQuestions) {
  const esc = s => `"${(s ?? '').replace(/"/g, '""')}"`;
  csvLines.push([esc(q.id), esc(q.category), esc(q.q), esc(q.a), esc((q.sources || []).join('; '))].join(','));
}
fs.writeFileSync(path.join(DATA, 'faq-en.csv'), csvLines.join('\n') + '\n', 'utf8');
console.log('Wrote faq-en.csv');

// Cleanup
for (const f of batchFiles) fs.unlinkSync(path.join(BATCH_DIR, f));
for (const f of fs.readdirSync(BATCH_DIR).filter(f => f.startsWith('source-'))) fs.unlinkSync(path.join(BATCH_DIR, f));
fs.rmdirSync(BATCH_DIR);
console.log('Cleaned up _en-batches/');
