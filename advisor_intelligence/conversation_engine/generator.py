from __future__ import annotations

from datetime import datetime, timezone


def generate_conversation_brief(market_theme: str, archetype: dict, advisor_goal: str) -> dict:
    name = archetype["name"]

    opening = (
        f"Olá! Vi um movimento recente sobre {market_theme.replace('_', ' ')} e pensei em você. "
        f"Posso te mostrar em 2 minutos como isso pode impactar seu planejamento?"
    )

    talking_points = [
        f"Contexto do tema {market_theme}: o que mudou e por que isso importa agora.",
        f"Leitura para perfil {name}: conectar com {', '.join(archetype['typical_concerns'][:2])}.",
        "Próximo passo prático: revisão de estratégia e ajustes de prioridade financeira.",
    ]

    objections = [
        {
            "objection": archetype["objections"][0],
            "response": "Faz sentido. A ideia aqui é mapear cenários com calma, sem decisão imediata.",
        },
        {
            "objection": archetype["objections"][1],
            "response": "Ótimo ponto. Eu te mostro opções e trade-offs de forma simples para decidir com segurança.",
        },
    ]

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "advisor_goal": advisor_goal,
        "market_theme": market_theme,
        "archetype": name,
        "channel_opening": {
            "whatsapp": opening,
            "email": f"Assunto: Atualização relevante sobre {market_theme.replace('_', ' ')}\n\n{opening}",
            "call": "Ligação breve para contextualizar cenário e marcar revisão de estratégia.",
        },
        "talking_points": talking_points,
        "objections_and_responses": objections,
        "cta": "Podemos agendar uma conversa de 15 minutos amanhã?",
        "follow_up_sequence": [
            {"day": "D+1", "message": "Retomo com um resumo objetivo e 2 cenários possíveis."},
            {"day": "D+3", "message": "Se fizer sentido, fechamos um plano de ação com prioridades."},
        ],
        "compliance_disclaimer": "Material informativo e educacional; não constitui recomendação de investimento.",
    }
