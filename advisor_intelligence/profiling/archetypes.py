from __future__ import annotations

ARCHETYPES = {
    "Conservador": {
        "name": "Conservador",
        "typical_concerns": ["preservação de capital", "volatilidade", "liquidez"],
        "objections": ["prefiro esperar", "não quero correr risco"],
        "preferred_language": "clareza, segurança e previsibilidade",
        "risk_tolerance_cues": "baixa",
    },
    "Renda Passiva": {
        "name": "Renda Passiva",
        "typical_concerns": ["fluxo de caixa mensal", "consistência de rendimento", "inflação"],
        "objections": ["a renda pode cair?", "quanto tempo para maturar?"],
        "preferred_language": "foco em fluxo, disciplina e horizonte",
        "risk_tolerance_cues": "média-baixa",
    },
    "Growth": {
        "name": "Growth",
        "typical_concerns": ["potencial de valorização", "timing de mercado", "diversificação"],
        "objections": ["já subiu demais", "não quero perder oportunidade"],
        "preferred_language": "dados, cenário e opcionalidade",
        "risk_tolerance_cues": "média-alta",
    },
    "Alta Renda": {
        "name": "Alta Renda",
        "typical_concerns": ["eficiência tributária", "proteção patrimonial", "sucessão"],
        "objections": ["isso otimiza meu patrimônio total?", "qual impacto fiscal?"],
        "preferred_language": "sofisticação objetiva e visão patrimonial",
        "risk_tolerance_cues": "variável por mandato",
    },
    "Trader": {
        "name": "Trader",
        "typical_concerns": ["volatilidade intradiária", "risco-retorno", "execução rápida"],
        "objections": ["sinal está atrasado", "preciso de gatilho claro"],
        "preferred_language": "objetiva, com timing e cenário",
        "risk_tolerance_cues": "alta",
    },
}


def list_archetypes() -> list[str]:
    return sorted(ARCHETYPES.keys())


def get_archetype_profile(name: str) -> dict:
    if name not in ARCHETYPES:
        available = ", ".join(list_archetypes())
        raise ValueError(f"Arquétipo inválido: {name}. Opções: {available}")
    return ARCHETYPES[name]
