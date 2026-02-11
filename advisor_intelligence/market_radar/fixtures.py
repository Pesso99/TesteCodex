from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

FIXTURES_ROOT = Path(__file__).resolve().parents[2] / "fixtures"
MARKET_ITEMS_DIR = FIXTURES_ROOT / "market_items"
MARKET_DIGESTS_DIR = FIXTURES_ROOT / "market_digests"


def _read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def _normalize_market_item(item: dict[str, Any]) -> dict[str, Any]:
    normalized = dict(item)
    normalized.setdefault("published_at", "2025-01-01T12:00:00+00:00")
    normalized.setdefault("source", "InfoMoney")
    return normalized


def load_market_item_fixtures(limit: int = 10) -> list[dict[str, Any]]:
    files = sorted(MARKET_ITEMS_DIR.glob("*.json"))
    loaded = [_normalize_market_item(_read_json(path)) for path in files]
    return loaded[:limit]


def load_market_digest_fixture(name: str) -> dict[str, Any]:
    path = MARKET_DIGESTS_DIR / f"{name}.json"
    if not path.exists():
        raise FileNotFoundError(f"Fixture de MarketDigest não encontrada: {name}")

    digest = _read_json(path)
    digest["items"] = [_normalize_market_item(item) for item in digest.get("items", [])]
    digest.setdefault("generated_at", datetime.now(timezone.utc).isoformat())
    return digest
