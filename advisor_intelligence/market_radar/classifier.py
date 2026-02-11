from __future__ import annotations

from typing import Iterable

THEME_KEYWORDS = {
    "selic_juros": ["selic", "juros", "copom", "banco central"],
    "inflacao": ["inflação", "ipca", "igp", "preços"],
    "dolar_fx": ["dólar", "câmbio", "real"],
    "bolsa_acoes": ["ibovespa", "ações", "bolsa", "b3"],
    "commodities": ["petróleo", "minério", "commodities", "soja"],
    "politica_fiscal": ["fiscal", "arcabouço", "déficit", "tribut"],
    "empresas": ["empresa", "resultado", "lucro", "receita"],
    "fundos": ["fundo", "fiis", "multimercado"],
    "previdencia": ["previdência", "aposentadoria", "inss", "pgb l", "vgb l"],
}


def classify_theme(headline: str) -> str:
    text = headline.lower()
    for theme, keywords in THEME_KEYWORDS.items():
        if any(keyword in text for keyword in keywords):
            return theme
    return "mercado_geral"


def build_opportunity_angle(theme: str, advisor_goal: str) -> str:
    return (
        f"Conectar tema '{theme}' ao objetivo '{advisor_goal}' com linguagem consultiva, "
        "focando revisão de estratégia e educação financeira sem indicar ativos específicos."
    )


def categorize_items(items: Iterable[dict], advisor_goal: str) -> list[dict]:
    categorized = []
    for item in items:
        theme = classify_theme(item["headline"])
        category = theme.split("_")[0]
        categorized.append(
            {
                **item,
                "theme": theme,
                "category": category,
                "key_facts": [item["headline"]],
                "advisor_opportunity_angle": build_opportunity_angle(theme, advisor_goal),
            }
        )
    return categorized
