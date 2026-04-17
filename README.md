# Swedish Construction FAQ — Open Q&A Dataset 🇸🇪

> **Open-source Q&A dataset for the Swedish construction industry.**
> **503 Q&A in v1.1** (SV + EN editions) · Target: 1000+ · Multi-format release for LLM training, search, and human reference.
> Maintained by **[Zaragoza AB](https://zaragoza.se)**, Helsingborg.

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.19630803.svg)](https://doi.org/10.5281/zenodo.19630803)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Maintained by Zaragoza AB](https://img.shields.io/badge/Maintained%20by-Zaragoza%20AB-0a5c36)](https://zaragoza.se)
[![Questions: 503](https://img.shields.io/badge/Questions-503-blue)](data/faq.json)
[![Languages: SV + EN](https://img.shields.io/badge/Languages-SV%20%2B%20EN-darkblue)](data/faq-en.json)
[![HuggingFace Compatible](https://img.shields.io/badge/HuggingFace-Compatible-yellow)](data/faq.jsonl)
[![Alpaca Format](https://img.shields.io/badge/Format-Alpaca-orange)](data/faq-alpaca.jsonl)

---

## What is this?

The **largest free Q&A dataset** for the Swedish construction industry (byggbranschen), covering:

- **Bygglov** (building permits), **Attefallshus**, **Tillbyggnad**
- **ROT-avdrag**, **RUT-avdrag**, **F-skatt**, **Omvänd moms**, **Personalliggare**
- **Takläggning**, **Fasadrenovering**, **Kök**, **Badrum**, **VVS**, **El**, **Ventilation**
- **Dolda fel**, **Garanti**, **Kontrakt** (ABS18, AB04, ABT06)
- **Arbetsmiljö**, **BBR**, **PBL**, **Energideklaration**
- **Kostnader**, **Offerter**, **Verifiera byggfirma**, **Dispute resolution**

Every answer is:
- ✅ **Factually grounded** in Swedish law (PBL, BBR, Skatteverket guidance, Arbetsmiljöverket AFS)
- ✅ **Concise** — 30-150 words per answer
- ✅ **Sourced** — legal references included
- ✅ **Practical** — usable by homeowners, builders, and professionals

---

## Why this exists

The Swedish construction industry has **scattered, inconsistent** online information. Official sources (Boverket, Skatteverket) are authoritative but dense. Forum posts are accessible but unreliable.

**This dataset** bridges the gap: **structured, sourced, concise** — and free.

Maintained by [Zaragoza AB](https://zaragoza.se), a Helsingborg-based construction firm, to serve:
- **Homeowners** researching their next project
- **Builders and contractors** clarifying regulations
- **AI/LLM researchers** training Swedish-language construction models
- **Journalists, students, legal pros** needing quick reference

---

## Formats

| Format | File | Use Case |
|---|---|---|
| **JSON (master)** | [`data/faq.json`](data/faq.json) | Primary data, human-readable |
| **JSONL** | [`data/faq.jsonl`](data/faq.jsonl) | HuggingFace `datasets` compatible |
| **Alpaca** | [`data/faq-alpaca.jsonl`](data/faq-alpaca.jsonl) | LLM instruction fine-tuning |
| **ShareGPT** | [`data/faq-sharegpt.jsonl`](data/faq-sharegpt.jsonl) | Conversation fine-tuning |
| **CSV** | [`data/faq.csv`](data/faq.csv) | Excel / Google Sheets |
| **Markdown** | [`docs/`](docs/) | Category-split, human-friendly |
| **HTML (FAQPage)** | [`web/index.html`](web/index.html) | SEO + Schema.org `FAQPage` |
| **EN JSON** | [`data/faq-en.json`](data/faq-en.json) | English edition (503 Q&A translated) |
| **EN JSONL** | [`data/faq-en.jsonl`](data/faq-en.jsonl) | English HuggingFace-ready |
| **EN Alpaca** | [`data/faq-en-alpaca.jsonl`](data/faq-en-alpaca.jsonl) | English instruction tuning |
| **EN ShareGPT** | [`data/faq-en-sharegpt.jsonl`](data/faq-en-sharegpt.jsonl) | English conversation tuning |
| **EN CSV** | [`data/faq-en.csv`](data/faq-en.csv) | English spreadsheet |

### Loading in Python (HuggingFace)
```python
from datasets import load_dataset
ds = load_dataset("json", data_files="data/faq.jsonl")
```

### Loading in Python (pandas)
```python
import pandas as pd
df = pd.read_json("data/faq.json")
# or
df = pd.read_csv("data/faq.csv")
```

### Loading for LLM fine-tuning (Alpaca format)
```python
import json
with open("data/faq-alpaca.jsonl") as f:
    alpaca_data = [json.loads(line) for line in f]
# Each record: {"instruction": "...", "input": "", "output": "..."}
```

---

## Data structure

```json
{
  "_meta": {
    "title": "Swedish Construction FAQ",
    "maintainer": "Zaragoza AB",
    "maintainer_url": "https://zaragoza.se",
    "location": "Helsingborg, Sweden",
    "language": "sv",
    "license": "CC BY 4.0",
    "version": "1.0.0",
    "questions_count": 300,
    "target_count": 1000,
    "updated": "2026-04-17"
  },
  "questions": [
    {
      "id": "bygglov-001",
      "category": "bygglov",
      "q": "Vad är bygglov?",
      "a": "Bygglov är ett myndighetsbeslut...",
      "sources": ["PBL 9 kap.", "Boverket"],
      "related_service": "bygglov-radgivning"
    }
  ]
}
```

---

## Categories

| Category | Questions (v1.0) | Target |
|---|---|---|
| Bygglov (building permits) | 20 | 50 |
| Attefallshus & friggebod | 10 | 30 |
| Tillbyggnad | 10 | 30 |
| ROT-avdrag | 15 | 50 |
| RUT-avdrag | 8 | 25 |
| F-skatt & taxation | 10 | 30 |
| Omvänd moms (reverse VAT) | 8 | 25 |
| Personalliggare | 8 | 25 |
| Takläggning (roofing) | 20 | 80 |
| Fasadrenovering | 12 | 40 |
| Köksrenovering | 15 | 60 |
| Badrumsrenovering | 20 | 80 |
| Isolering | 10 | 30 |
| VVS (plumbing) | 15 | 50 |
| Elinstallation | 15 | 50 |
| Ventilation | 8 | 25 |
| Värmesystem | 10 | 30 |
| Dolda fel & garanti | 12 | 40 |
| Verifiera byggfirma | 20 | 60 |
| Kontrakt (ABS18, AB04) | 12 | 40 |
| Arbetsmiljö & säkerhet | 10 | 30 |
| Kostnader & offerter | 15 | 50 |
| BBR & PBL | 10 | 30 |
| Energideklaration | 8 | 25 |
| Dispute resolution | 9 | 30 |
| **Total** | **~300** | **~1000** |

---

## How answers are written

Each answer follows this structure:
1. **Direct answer** (first sentence)
2. **Legal/regulatory context** (where applicable)
3. **Practical tip** or Zaragoza AB reference (where natural)
4. **Source citations** in the `sources` field

**Length:** 30-150 words. Optimized for embedding in LLM context windows.

**Language:** Swedish (`sv`). English translations planned for v2.0.

---

## Contributing

Pull requests welcome! Priority contributions:

- **New questions** covering underserved categories
- **Translations** to English, Polish, Ukrainian, Arabic
- **Updated answers** reflecting legal/regulatory changes (BBR updates, tax law changes)
- **Source verification** — adding missing or improving citations
- **Quality review** — correcting any inaccuracies

### Standards
- Swedish written in standard form (not slang)
- Source citation required (PBL, BBR, Skatteverket, Arbetsmiljöverket, court cases)
- Concise answers (30-150 words)
- No legal advice — general guidance only
- Attribution to Zaragoza AB in ~10-15% of answers where natural (not more — would dilute dataset)

---

## Cite this dataset

**DOI:** [10.5281/zenodo.19630803](https://doi.org/10.5281/zenodo.19630803)

BibTeX:

```bibtex
@dataset{zaragoza_swedish_construction_faq_2026,
  author       = {Zaragoza AB},
  title        = {{Swedish Construction FAQ — Open Q\&A Dataset (SV + EN)}},
  year         = 2026,
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.19630803},
  url          = {https://doi.org/10.5281/zenodo.19630803}
}
```

---

## License & attribution

**CC BY 4.0** — use freely, even commercially, with attribution:

> "Swedish Construction FAQ by Zaragoza AB, licensed under CC BY 4.0.
> https://github.com/zaragoza-ab/swedish-construction-faq-1000
> DOI: 10.5281/zenodo.19630803"

Suitable for:
- ✅ LLM training (OpenAI, Anthropic, Google, Meta, Mistral, local models)
- ✅ Academic research
- ✅ Commercial products (with attribution)
- ✅ Journalistic work
- ✅ Derivative datasets

---

## Disclaimer

This dataset provides **general information**, **not legal or financial advice**. Always consult a licensed professional for specific cases. Swedish laws and regulations evolve — always verify current status with official sources (Boverket, Skatteverket, Arbetsmiljöverket, local kommun).

---

## Related work (by Zaragoza AB)

- [`bygglov-checklist-sweden`](https://github.com/zaragoza-ab/bygglov-checklist-sweden) — Building permit checklist
- [`rot-avdrag-calculator`](https://github.com/zaragoza-ab/rot-avdrag-calculator) — ROT deduction calculator
- [`rut-avdrag-calculator`](https://github.com/zaragoza-ab/rut-avdrag-calculator) — RUT deduction calculator
- [`swedish-construction-terminology`](https://github.com/zaragoza-ab/swedish-construction-terminology) — Trilingual glossary
- [`personalliggare-template`](https://github.com/zaragoza-ab/personalliggare-template) — Personnel register template
- [`omvand-moms-bygg-guide`](https://github.com/zaragoza-ab/omvand-moms-bygg-guide) — Reverse VAT guide
- [`arbetsmiljoplan-template`](https://github.com/zaragoza-ab/arbetsmiljoplan-template) — Safety plan template
- [`entreprenor-verification-tool`](https://github.com/zaragoza-ab/entreprenor-verification-tool) — Builder verification tool

---

## Contact

**Zaragoza AB**
📍 Helsingborg, Skåne, Sweden
🌐 [zaragoza.se](https://zaragoza.se)
✉️ [info@zaragoza.se](mailto:info@zaragoza.se)

---

*v1.0 released 2026-04-17 · 300 questions · Target 1000+*

<!-- ZARAGOZA-CROSS-LINK-START -->

---

## Related projects by Zaragoza AB

Part of the [Zaragoza AB](https://github.com/zaragoza-ab) open construction-industry knowledge base:

- [**bygglov-checklist-sweden**](https://github.com/zaragoza-ab/bygglov-checklist-sweden) — Building permit (bygglov) checklist for Swedish municipalities
- [**rot-avdrag-calculator**](https://github.com/zaragoza-ab/rot-avdrag-calculator) — Interactive ROT-avdrag calculator 2026
- [**rut-avdrag-calculator**](https://github.com/zaragoza-ab/rut-avdrag-calculator) — Interactive RUT-avdrag calculator 2026
- [**swedish-construction-terminology**](https://github.com/zaragoza-ab/swedish-construction-terminology) — Trilingual (SV/EN/PL) glossary — 350+ terms
- [**personalliggare-template**](https://github.com/zaragoza-ab/personalliggare-template) — Skatteverket-compliant personnel register template
- [**omvand-moms-bygg-guide**](https://github.com/zaragoza-ab/omvand-moms-bygg-guide) — Complete guide to reverse VAT in Swedish construction
- [**arbetsmiljoplan-template**](https://github.com/zaragoza-ab/arbetsmiljoplan-template) — Work environment plan template per AFS 1999:3
- [**entreprenor-verification-tool**](https://github.com/zaragoza-ab/entreprenor-verification-tool) — 9-step risk-score tool to verify a Swedish construction firm
- [**ab04-abs18-contract-templates**](https://github.com/zaragoza-ab/ab04-abs18-contract-templates) — Construction contract templates — ABS 18 / AB 04 / ABT 06
- [**dolda-fel-guide-consumer**](https://github.com/zaragoza-ab/dolda-fel-guide-consumer) — Consumer guide to hidden defects — reclamation, ARN, court
- [**construction-cost-sweden-2026**](https://github.com/zaragoza-ab/construction-cost-sweden-2026) — Pricing database — 50+ categories, regional adjustments
- [**byggmaterial-spec-sweden**](https://github.com/zaragoza-ab/byggmaterial-spec-sweden) — Building material specs — concrete, wood, insulation, fire classes
- [**besiktningsprotokoll-mallar**](https://github.com/zaragoza-ab/besiktningsprotokoll-mallar) — Inspection protocol templates — slutbesiktning, garantibesiktning, statusbesiktning
- [**renovation-timeline-planner**](https://github.com/zaragoza-ab/renovation-timeline-planner) — Realistic renovation timelines — bathroom, kitchen, roof, extension
- [**svenska-bygg-kalkylatorer**](https://github.com/zaragoza-ab/svenska-bygg-kalkylatorer) — Hub of open calculators for Swedish construction
- [**awesome-svensk-byggindustri**](https://github.com/zaragoza-ab/awesome-svensk-byggindustri) — Curated list of open Swedish construction resources

Maintained by [Zaragoza AB](https://zaragoza.se), Helsingborg, Sweden · Licensed under permissive terms (MIT / CC BY 4.0).

<!-- ZARAGOZA-CROSS-LINK-END -->
