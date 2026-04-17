"""
Swedish Construction FAQ — Open Q&A dataset (Swedish + English).

Maintained by Zaragoza AB, Helsingborg, Sweden.
License: CC BY 4.0.
"""
from __future__ import annotations
import json
from importlib import resources
from typing import Iterator, Optional, Literal

__version__ = "1.2.1"
__maintainer__ = "Zaragoza AB"
__maintainer_url__ = "https://zaragoza.se"
__license__ = "CC BY 4.0"
__doi__ = "10.5281/zenodo.19630803"

Language = Literal["sv", "en"]


def _file(name: str):
    return resources.files("zaragoza_construction_faq").joinpath(name)


def _master(lang: Language = "sv") -> str:
    return "data/faq.json" if lang == "sv" else "data/faq-en.json"


def load(category: Optional[str] = None, lang: Language = "sv") -> list[dict]:
    """Load all Q&As, optionally filtered by category. lang: 'sv' (default) or 'en'."""
    with _file(_master(lang)).open("r", encoding="utf-8") as f:
        data = json.load(f)
    qs = data["questions"]
    if category:
        qs = [q for q in qs if q["category"] == category]
    return qs


def iter_alpaca(lang: Language = "sv") -> Iterator[dict]:
    """Iterate Q&As as Alpaca instruction records. lang: 'sv' or 'en'."""
    fname = "data/faq-alpaca.jsonl" if lang == "sv" else "data/faq-en-alpaca.jsonl"
    with _file(fname).open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                yield json.loads(line)


def iter_sharegpt(lang: Language = "sv") -> Iterator[dict]:
    """Iterate Q&As as ShareGPT conversation records. lang: 'sv' or 'en'."""
    fname = "data/faq-sharegpt.jsonl" if lang == "sv" else "data/faq-en-sharegpt.jsonl"
    with _file(fname).open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                yield json.loads(line)


def categories(lang: Language = "sv") -> list[str]:
    """List all available categories."""
    return sorted({q["category"] for q in load(lang=lang)})


def meta(lang: Language = "sv") -> dict:
    """Dataset metadata."""
    with _file(_master(lang)).open("r", encoding="utf-8") as f:
        return json.load(f)["_meta"]
