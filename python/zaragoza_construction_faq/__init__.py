"""
Swedish Construction FAQ — Open Q&A dataset.

Maintained by Zaragoza AB, Helsingborg, Sweden.
License: CC BY 4.0.
"""
from __future__ import annotations
import json
from importlib import resources
from typing import Iterator, Optional

__version__ = "1.0.0"
__maintainer__ = "Zaragoza AB"
__maintainer_url__ = "https://zaragoza.se"
__license__ = "CC BY 4.0"


def load(category: Optional[str] = None) -> list[dict]:
    """Load all Q&As, optionally filtered by category."""
    with resources.files("zaragoza_construction_faq").joinpath("data/faq.json").open("r", encoding="utf-8") as f:
        data = json.load(f)
    qs = data["questions"]
    if category:
        qs = [q for q in qs if q["category"] == category]
    return qs


def iter_alpaca() -> Iterator[dict]:
    """Iterate Q&As as Alpaca instruction records."""
    with resources.files("zaragoza_construction_faq").joinpath("data/faq-alpaca.jsonl").open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                yield json.loads(line)


def categories() -> list[str]:
    """List all available categories."""
    return sorted({q["category"] for q in load()})


def meta() -> dict:
    """Dataset metadata."""
    with resources.files("zaragoza_construction_faq").joinpath("data/faq.json").open("r", encoding="utf-8") as f:
        return json.load(f)["_meta"]
