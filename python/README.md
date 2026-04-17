# zaragoza-construction-faq (Python package)

Pip-installable wrapper for the
[Swedish Construction FAQ](https://github.com/zaragoza-ab/swedish-construction-faq-1000)
dataset by [Zaragoza AB](https://zaragoza.se).

**Bilingual:** 503 Q&A pairs in Swedish (`sv`) and English (`en`), grounded in Swedish construction law (PBL, BBR, Inkomstskattelagen, AFS, ABS 18, AB 04).

## Install

```bash
pip install zaragoza-construction-faq
```

## Use

```python
import zaragoza_construction_faq as zcf

# Swedish (default)
zcf.meta()                    # dataset metadata
zcf.categories()              # list of 39 categories
zcf.load()                    # all 503 Q&As in Swedish
zcf.load("bygglov")           # only bygglov category

# English
zcf.meta(lang="en")
zcf.load(lang="en")
zcf.categories(lang="en")

# Alpaca / ShareGPT iterators
for rec in zcf.iter_alpaca():          # Swedish Alpaca
    print(rec["instruction"], "→", rec["output"][:60])

for rec in zcf.iter_alpaca(lang="en"):  # English Alpaca
    print(rec["instruction"], "→", rec["output"][:60])

for rec in zcf.iter_sharegpt(lang="en"):  # English ShareGPT
    ...
```

## License

CC BY 4.0 — attribution to Zaragoza AB required.

> "Swedish Construction FAQ by Zaragoza AB, CC BY 4.0.
> https://github.com/zaragoza-ab/swedish-construction-faq-1000"

## Build & publish (maintainer)

```bash
cd python/
rm -rf zaragoza_construction_faq/data
cp -r ../data zaragoza_construction_faq/data
python -m build
twine upload dist/*
```
