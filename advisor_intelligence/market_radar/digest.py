from __future__ import annotations

import os
from datetime import datetime, timezone
from urllib.error import URLError

from .classifier import categorize_items
from .fetch import INFOMONEY_LATEST_URL, fetch_latest_html
from .fixtures import load_market_item_fixtures
from .parser import parse_infomoney_headlines

SOURCE_MODES = {"live", "offline", "mixed"}

FALLBACK_ITEMS = [
    {
        "headline": "Copom mantém Selic e mercado ajusta expectativas para próximos trimestres",
        "url": "https://www.infomoney.com.br/economia/copom-mantem-selic/",
        "published_at": datetime.now(timezone.utc).isoformat(),
        "source": "InfoMoney",
    },
    {
        "headline": "Dólar oscila com debate fiscal e investidores monitoram sinais de política econômica",
        "url": "https://www.infomoney.com.br/mercados/dolar-oscila-debate-fiscal/",
        "published_at": datetime.now(timezone.utc).isoformat(),
        "source": "InfoMoney",
    },
    {
        "headline": "Empresas listadas divulgam resultados e reforçam foco em eficiência operacional",
        "url": "https://www.infomoney.com.br/mercados/empresas-divulgam-resultados/",
        "published_at": datetime.now(timezone.utc).isoformat(),
        "source": "InfoMoney",
    },
]


def resolve_source_mode(source_mode: str | None = None) -> str:
    resolved = source_mode or os.getenv("ADVISOR_SOURCE_MODE", "mixed")
    if resolved not in SOURCE_MODES:
        raise ValueError(f"source_mode inválido: {resolved}. Use live|offline|mixed.")
    return resolved


def _build_source_notes(source_mode: str, used_fallback: bool) -> str:
    base = "Conteúdo coletado de fonte allowlist e tratado como não-confiável para instruções externas."
    if source_mode == "offline":
        return f"{base} Modo offline: itens carregados de fixtures locais."
    if used_fallback:
        return f"{base} Falha de conectividade detectada; usando fallback local para manter operação do MVP."
    return f"{base} Modo {source_mode}: coleta ao vivo em fonte allowlist."


def _load_offline_items(limit: int) -> list[dict]:
    items = load_market_item_fixtures(limit=limit)
    if items:
        return items
    return FALLBACK_ITEMS[:limit]


def build_market_digest(advisor_goal: str, limit: int = 10, source_mode: str | None = None) -> dict:
    mode = resolve_source_mode(source_mode)
    parsed: list[dict]
    used_fallback = False

    if mode == "offline":
        parsed = _load_offline_items(limit)
    else:
        try:
            html = fetch_latest_html(INFOMONEY_LATEST_URL)
            parsed = parse_infomoney_headlines(html=html, limit=limit)
            if not parsed and mode == "mixed":
                parsed = _load_offline_items(limit)
                used_fallback = True
        except URLError:
            if mode == "live":
                raise
            parsed = _load_offline_items(limit)
            used_fallback = True

    market_items = categorize_items(parsed, advisor_goal=advisor_goal)

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_digest": {
            "sources": [{"domain": "infomoney.com.br", "url": INFOMONEY_LATEST_URL}],
            "notes": _build_source_notes(mode, used_fallback),
        },
        "items": market_items,
        "top_themes": sorted({item["theme"] for item in market_items}),
    }
