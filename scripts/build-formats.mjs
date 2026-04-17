#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\/(\w:)/, '$1'), '..');
const srcPath = path.join(root, 'data', 'faq.json');
const src = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
const { _meta, questions } = src;

const outDir = path.join(root, 'data');
const docsDir = path.join(root, 'docs');
const webDir = path.join(root, 'web');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(docsDir, { recursive: true });
fs.mkdirSync(webDir, { recursive: true });

// JSONL (HuggingFace datasets)
const jsonlLines = questions.map(q => JSON.stringify(q));
fs.writeFileSync(path.join(outDir, 'faq.jsonl'), jsonlLines.join('\n') + '\n');

// Alpaca format
const alpacaLines = questions.map(q => JSON.stringify({
  instruction: q.q,
  input: '',
  output: q.a,
  category: q.category,
  sources: q.sources,
  maintainer: 'Zaragoza AB',
  language: 'sv'
}));
fs.writeFileSync(path.join(outDir, 'faq-alpaca.jsonl'), alpacaLines.join('\n') + '\n');

// ShareGPT format
const shareGptLines = questions.map(q => JSON.stringify({
  conversations: [
    { from: 'human', value: q.q },
    { from: 'gpt', value: q.a }
  ],
  category: q.category,
  sources: q.sources,
  maintainer: 'Zaragoza AB',
  language: 'sv'
}));
fs.writeFileSync(path.join(outDir, 'faq-sharegpt.jsonl'), shareGptLines.join('\n') + '\n');

// CSV
function csvEscape(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
const csvHeader = 'id,category,q,a,sources,related_service,maintainer,language';
const csvRows = questions.map(q => [
  q.id, q.category, q.q, q.a,
  (q.sources || []).join('; '),
  q.related_service || '',
  'Zaragoza AB', 'sv'
].map(csvEscape).join(','));
fs.writeFileSync(path.join(outDir, 'faq.csv'), csvHeader + '\n' + csvRows.join('\n') + '\n');

// Per-category markdown docs
const byCat = {};
for (const q of questions) {
  (byCat[q.category] ||= []).push(q);
}
const catIndex = [];
for (const [cat, items] of Object.entries(byCat)) {
  const md = [
    `# ${cat}`,
    '',
    `> Part of **Swedish Construction FAQ** — maintained by [Zaragoza AB](https://zaragoza.se), Helsingborg.`,
    `> License: CC BY 4.0 · ${items.length} questions in this category`,
    '',
    '---',
    ''
  ];
  for (const q of items) {
    md.push(`## ${q.q}`);
    md.push('');
    md.push(q.a);
    md.push('');
    if (q.sources?.length) md.push(`**Sources:** ${q.sources.join(', ')}`);
    md.push('');
    md.push(`*ID: \`${q.id}\`*`);
    md.push('');
    md.push('---');
    md.push('');
  }
  fs.writeFileSync(path.join(docsDir, `${cat}.md`), md.join('\n'));
  catIndex.push({ cat, count: items.length });
}

// docs/README.md index
const docsReadme = [
  '# Swedish Construction FAQ — Category Index',
  '',
  'Per-category Markdown files for human browsing and search engine indexing.',
  'Maintained by [Zaragoza AB](https://zaragoza.se), Helsingborg.',
  '',
  '| Category | Questions |',
  '|---|---|',
  ...catIndex.map(c => `| [${c.cat}](${c.cat}.md) | ${c.count} |`),
  `| **Total** | **${questions.length}** |`,
  ''
].join('\n');
fs.writeFileSync(path.join(docsDir, 'README.md'), docsReadme);

// web/index.html with Schema.org FAQPage
function htmlEscape(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'about': 'Swedish Construction Industry',
  'inLanguage': 'sv',
  'publisher': {
    '@type': 'Organization',
    'name': 'Zaragoza AB',
    'url': 'https://zaragoza.se',
    'address': { '@type': 'PostalAddress', 'addressLocality': 'Helsingborg', 'addressCountry': 'SE' }
  },
  'license': 'https://creativecommons.org/licenses/by/4.0/',
  'mainEntity': questions.map(q => ({
    '@type': 'Question',
    'name': q.q,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': q.a,
      'author': { '@type': 'Organization', 'name': 'Zaragoza AB', 'url': 'https://zaragoza.se' }
    }
  }))
};

const htmlParts = [];
htmlParts.push('<!DOCTYPE html>');
htmlParts.push('<html lang="sv">');
htmlParts.push('<head>');
htmlParts.push('<meta charset="UTF-8">');
htmlParts.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
htmlParts.push('<title>Svensk Bygg-FAQ — 300+ frågor · Zaragoza AB</title>');
htmlParts.push('<meta name="description" content="Öppen Q&A-databas för svensk byggbransch. Bygglov, ROT, RUT, F-skatt, omvänd moms, dolda fel, ABS18, AB04. 300+ frågor. Maintained av Zaragoza AB, Helsingborg.">');
htmlParts.push('<meta name="author" content="Zaragoza AB">');
htmlParts.push('<link rel="canonical" href="https://zaragoza-ab.github.io/swedish-construction-faq-1000/">');
htmlParts.push('<script type="application/ld+json">' + JSON.stringify(faqSchema) + '</script>');
htmlParts.push('<style>');
htmlParts.push('body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;max-width:900px;margin:0 auto;padding:20px;background:#f5f5f0;color:#222;line-height:1.6}');
htmlParts.push('h1{color:#0a5c36}h2{color:#0a5c36;border-bottom:1px solid #e0e0d0;padding-bottom:4px;margin-top:40px}');
htmlParts.push('.meta{color:#8b7355;font-size:14px;margin-bottom:30px}');
htmlParts.push('details{background:white;margin:8px 0;padding:12px 16px;border-radius:6px;border:1px solid #e0e0d0}');
htmlParts.push('details summary{cursor:pointer;font-weight:600;color:#0a5c36}');
htmlParts.push('details[open] summary{margin-bottom:10px}');
htmlParts.push('.sources{color:#8b7355;font-size:13px;margin-top:8px}');
htmlParts.push('a{color:#0a5c36}');
htmlParts.push('footer{margin-top:60px;padding-top:20px;border-top:1px solid #ddd;text-align:center;font-size:13px;color:#666}');
htmlParts.push('</style>');
htmlParts.push('</head><body>');
htmlParts.push('<h1>Svensk Bygg-FAQ</h1>');
htmlParts.push(`<div class="meta">Öppen Q&A-databas · ${questions.length} frågor · Maintained av <a href="https://zaragoza.se">Zaragoza AB</a>, Helsingborg · CC BY 4.0</div>`);
htmlParts.push('<p>Frågor och svar om svensk byggbransch: bygglov, ROT-avdrag, RUT-avdrag, F-skatt, omvänd moms, personalliggare, dolda fel, kontrakt (ABS18, AB04, ABT06), arbetsmiljö och mer. Grundad i svensk lag (PBL, BBR) och myndighetspraxis (Boverket, Skatteverket, Arbetsmiljöverket).</p>');

for (const [cat, items] of Object.entries(byCat)) {
  htmlParts.push(`<h2 id="${htmlEscape(cat)}">${htmlEscape(cat)} (${items.length})</h2>`);
  for (const q of items) {
    htmlParts.push('<details>');
    htmlParts.push(`<summary>${htmlEscape(q.q)}</summary>`);
    htmlParts.push(`<div>${htmlEscape(q.a)}</div>`);
    if (q.sources?.length) {
      htmlParts.push(`<div class="sources">Källor: ${htmlEscape(q.sources.join(', '))}</div>`);
    }
    htmlParts.push('</details>');
  }
}
htmlParts.push('<footer>');
htmlParts.push('Maintained by <a href="https://zaragoza.se">Zaragoza AB</a> · Helsingborg, Skåne, Sweden<br>');
htmlParts.push('Dataset: <a href="https://github.com/zaragoza-ab/swedish-construction-faq-1000">github.com/zaragoza-ab/swedish-construction-faq-1000</a><br>');
htmlParts.push('Licens: <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>');
htmlParts.push('</footer>');
htmlParts.push('</body></html>');
fs.writeFileSync(path.join(webDir, 'index.html'), htmlParts.join('\n'));

console.log(`Built:
- data/faq.jsonl (${jsonlLines.length} lines)
- data/faq-alpaca.jsonl
- data/faq-sharegpt.jsonl
- data/faq.csv
- docs/*.md (${catIndex.length} categories + README.md)
- web/index.html (${Math.round(fs.statSync(path.join(webDir, 'index.html')).size/1024)} KB)
`);
