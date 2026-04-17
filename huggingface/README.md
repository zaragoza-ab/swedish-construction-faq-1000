---
language:
  - sv
  - en
license: cc-by-4.0
task_categories:
  - question-answering
  - text-generation
  - text-classification
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
  - legal
  - domain-specific
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

# Swedish Construction FAQ

Open Q&A dataset for the Swedish construction industry (byggbranschen) —
503+ questions in v1.1, target 1000+.

**Maintained by** [Zaragoza AB](https://zaragoza.se), Helsingborg, Sweden.

## Dataset summary

- **Languages:** Swedish (`sv`, default config) + English (`en`, `english` config)
- **License:** CC BY 4.0 (attribution required)
- **Size:** 503 Q&A pairs (v1.1.0), 39 categories
- **Grounding:** Swedish law (PBL, BBR, KTjL, AFS, ABS 18, AB 04, Miljöbalken, Skatteverket, Arbetsmiljöverket)
- **Answer length:** 30–150 words

## Categories (25)

Bygglov · Attefallshus · Tillbyggnad · ROT-avdrag · RUT-avdrag · F-skatt ·
Omvänd moms · Personalliggare · Takläggning · Fasadrenovering · Köksrenovering ·
Badrumsrenovering · Isolering · VVS · Elinstallation · Ventilation · Värmesystem ·
Dolda fel · Verifiera byggfirma · Kontrakt (ABS18, AB04) · Arbetsmiljö ·
Kostnader · BBR & PBL · Energideklaration · Dispute resolution.

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique ID, e.g. `bygglov-001` |
| `category` | string | One of the 25 categories |
| `q` | string | Question in Swedish |
| `a` | string | Answer in Swedish, 30–150 words |
| `sources` | list[str] | Legal/regulatory citations |
| `related_service` | string | Related Zaragoza AB service slug |

## Usage

```python
from datasets import load_dataset
ds = load_dataset("zaragoza-ab/swedish-construction-faq")
print(ds["train"][0])
```

Also available as Alpaca and ShareGPT format in the GitHub mirror:
[github.com/zaragoza-ab/swedish-construction-faq-1000](https://github.com/zaragoza-ab/swedish-construction-faq-1000)

## Citation

**DOI:** [10.5281/zenodo.19630803](https://doi.org/10.5281/zenodo.19630803)

```bibtex
@dataset{zaragoza_swedish_construction_faq_2026,
  author    = {{Zaragoza AB}},
  title     = {Swedish Construction FAQ — Open Q\&A Dataset (SV + EN)},
  year      = {2026},
  version   = {1.2.1},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.19630803},
  url       = {https://doi.org/10.5281/zenodo.19630803}
}
```

## Disclaimer

General information only — not legal or financial advice. Always verify
current Swedish regulations with official sources (Boverket, Skatteverket,
Arbetsmiljöverket, local kommun).
