from __future__ import annotations

from datetime import datetime, timezone
from urllib.error import URLError

from .classifier import categorize_items
from .fetch import INFOMONEY_LATEST_URL, fetch_latest_html
from .parser import parse_infomoney_headlines

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


def build_market_digest(advisor_goal: str, limit: int = 10) -> dict:
    fetch_note = "Conteúdo coletado de fonte allowlist e tratado como não-confiável para instruções externas."
    try:
        html = fetch_latest_html(INFOMONEY_LATEST_URL)
        parsed = parse_infomoney_headlines(html=html, limit=limit)
    except URLError:
        parsed = FALLBACK_ITEMS[:limit]
        fetch_note += " Falha de conectividade detectada; usando fallback local para manter operação do MVP."

    market_items = categorize_items(parsed, advisor_goal=advisor_goal)

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_digest": {
            "sources": [{"domain": "infomoney.com.br", "url": INFOMONEY_LATEST_URL}],
            "notes": fetch_note,
        },
        "items": market_items,
        "top_themes": sorted({item["theme"] for item in market_items}),
    }
