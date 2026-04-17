---
language:
  - sv
  - en
license: cc-by-4.0
task_categories:
  - question-answering
  - text-generation
  - text-classification
  - text-retrieval
pretty_name: Swedish Construction FAQ
size_categories:
  - n<1K
tags:
  - swedish
  - construction
  - byggbransch
  - faq
  - bygglov
  - rot-avdrag
  - rut-avdrag
  - abs-18
  - ab-04
  - legal
  - domain-specific
  - instruction-tuning
source_datasets:
  - original
annotations_creators:
  - expert-generated
language_creators:
  - expert-generated
multilinguality:
  - multilingual
configs:
  - config_name: default
    data_files:
      - split: train
        path: "data/faq.jsonl"
  - config_name: english
    data_files:
      - split: train
        path: "data/faq-en.jsonl"
---

# Swedish Construction FAQ — Open Q&A Dataset

Open bilingual (Swedish/English) Q&A dataset for the Swedish construction
industry (byggbranschen). 503 Q&A pairs across 39 categories, every answer
grounded in Swedish primary law and authoritative guidance.

**Maintained by** [Zaragoza AB](https://zaragoza.se), Helsingborg, Sweden.
**DOI:** [10.5281/zenodo.19630803](https://doi.org/10.5281/zenodo.19630803) ·
**Wikidata:** [Q139393633](https://www.wikidata.org/wiki/Q139393633)

## Try it first

- **Live search demo:** [huggingface.co/spaces/DecDEPO/swedish-construction-faq-search](https://huggingface.co/spaces/DecDEPO/swedish-construction-faq-search)
- **Colab quickstart:** [Open in Colab](https://colab.research.google.com/github/zaragoza-ab/swedish-construction-faq-1000/blob/main/notebooks/quickstart.ipynb)
- **Landing page:** [zaragoza-ab.github.io/swedish-construction-faq-1000/dataset.html](https://zaragoza-ab.github.io/swedish-construction-faq-1000/dataset.html)

## Dataset summary

- **Languages:** Swedish (`sv`, default config) + English (`en`, `english` config)
- **License:** CC BY 4.0 (attribution required)
- **Size:** 503 Q&A pairs, 39 categories
- **Version:** 1.2.2 (2026-04-17)
- **Grounding:** Swedish primary law (PBL, BBR, KTjL, AFS, ABS 18, AB 04, Miljöbalken) +
  Skatteverket, Boverket, Arbetsmiljöverket, Konsumentverket
- **Answer length:** 30–150 words
- **Formats on GitHub:** JSON, JSONL, CSV, Alpaca, ShareGPT

## Categories (39)

Bygglov · Attefallshus · Friggebod · Tillbyggnad · ROT-avdrag · RUT-avdrag ·
F-skatt · Omvänd moms · Personalliggare · Takläggning · Fasadrenovering ·
Köksrenovering · Badrumsrenovering · Isolering · Fönsterbyte · VVS · Elinstallation ·
Ventilation · Värmesystem (värmepump) · Dolda fel · Garanti · Verifiera byggfirma ·
Kontrakt (ABS18) · Kontrakt (AB04/ABT06) · Arbetsmiljö & AFS · Kostnader ·
Offerter · BBR · PBL · Energideklaration · Miljöbalken · Dispute resolution ·
Konsumentverket & ARN · Renovering av kulturhistorisk byggnad · Solceller ·
Avlopp & VA · Rivning · Markarbete · Bygganmälan.

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique ID, e.g. `bygglov-001` |
| `category` | string | One of the 39 categories |
| `q` | string | Question in Swedish |
| `a` | string | Answer in Swedish, 30–150 words |
| `sources` | list[str] | Legal/regulatory citations |
| `related_service` | string | Related Zaragoza AB service slug |

## Usage

```python
from datasets import load_dataset

# Default (Swedish)
ds = load_dataset("DecDEPO/swedish-construction-faq")
print(ds["train"][0])

# English config
ds_en = load_dataset("DecDEPO/swedish-construction-faq", "english")
```

**Filter by category:**
```python
bygglov = ds["train"].filter(lambda x: x["category"] == "Bygglov")
print(f"{len(bygglov)} bygglov questions")
```

**Keyword search:**
```python
rot_hits = ds["train"].filter(
    lambda x: "ROT" in x["q"] or "ROT" in x["a"]
)
for row in rot_hits.select(range(3)):
    print(row["q"], "→", row["a"][:80], "…")
```

**Instruction-tuning format (Alpaca/ShareGPT)** is available in the GitHub
mirror: [github.com/zaragoza-ab/swedish-construction-faq-1000](https://github.com/zaragoza-ab/swedish-construction-faq-1000)

## Related datasets (same organization)

| Dataset | Wikidata | Description |
|---|---|---|
| [swedish-construction-terminology](https://github.com/zaragoza-ab/swedish-construction-terminology) | [Q139393817](https://www.wikidata.org/wiki/Q139393817) | 500+ term glossary |
| [byggmaterial-spec-sweden](https://github.com/zaragoza-ab/byggmaterial-spec-sweden) | [Q139393818](https://www.wikidata.org/wiki/Q139393818) | Material specs (SS-EN 206, etc.) |
| [besiktningsprotokoll-mallar](https://github.com/zaragoza-ab/besiktningsprotokoll-mallar) | [Q139393819](https://www.wikidata.org/wiki/Q139393819) | Inspection protocol templates |
| [renovation-timeline-planner](https://github.com/zaragoza-ab/renovation-timeline-planner) | [Q139393821](https://www.wikidata.org/wiki/Q139393821) | Renovation timelines & bygglov flow |

## Citation

```bibtex
@dataset{zaragoza_swedish_construction_faq_2026,
  author    = {{Zaragoza AB}},
  title     = {Swedish Construction FAQ — Open Q\&A Dataset (SV + EN)},
  year      = {2026},
  version   = {1.2.2},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.19630803},
  url       = {https://doi.org/10.5281/zenodo.19630803}
}
```

## Disclaimer

General information only — not legal or financial advice. Always verify
current Swedish regulations with official sources (Boverket, Skatteverket,
Arbetsmiljöverket, local kommun).
