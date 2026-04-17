# zaragoza-construction-faq (Python package)

Pip-installable wrapper for the
[Swedish Construction FAQ](https://github.com/zaragoza-ab/swedish-construction-faq-1000)
dataset by [Zaragoza AB](https://zaragoza.se).

## Install

```bash
pip install zaragoza-construction-faq
```

## Use

```python
import zaragoza_construction_faq as zcf

zcf.meta()               # dataset metadata
zcf.categories()         # list of 25 categories
zcf.load()               # all 310 Q&As
zcf.load("bygglov")      # only bygglov category

for rec in zcf.iter_alpaca():
    print(rec["instruction"], "→", rec["output"][:60])
```

## License

CC BY 4.0 — attribution to Zaragoza AB required.

## Build & publish (maintainer)

```bash
cp -r ../data zaragoza_construction_faq/data
python -m build
twine upload dist/*
```
