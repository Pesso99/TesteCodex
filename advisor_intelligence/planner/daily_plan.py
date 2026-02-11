from __future__ import annotations

from datetime import datetime, timezone


def build_daily_plan(archetype_name: str, advisor_goal: str, briefs: list[dict]) -> dict:
    actions = []
    for index, brief in enumerate(briefs[:5], start=1):
        actions.append(
            {
                "rank": index,
                "contact_bucket": f"{archetype_name}-bucket-{index}",
                "task": f"Enviar abertura via WhatsApp sobre {brief['market_theme']} e registrar reação.",
                "why_now": f"Tema em alta alinhado ao objetivo de {advisor_goal}.",
                "eta_minutes": 2,
            }
        )

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "advisor_goal": advisor_goal,
        "archetype_focus": archetype_name,
        "timebox_minutes": 10,
        "actions": actions,
        "notes": "Plano com placeholders. TODO: substituir buckets por contatos reais via CRM.",
    }
