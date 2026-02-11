# Advisor Intelligence Layer (MVP)

MVP em Python para gerar valor imediato a assessores brasileiros sem integração com CRM/portfólio.

## 1) Arquitetura (implementation-ready)

Fluxo end-to-end:
1. **Market Radar** (`market_radar`) consulta fontes allowlist (MVP: InfoMoney), extrai manchetes públicas e gera `MarketDigest`.
2. **Profile Simulator** (`profiling`) fornece arquétipos simulados com preocupações, linguagem e objeções típicas.
3. **Conversation Engine** (`conversation_engine`) combina `market_theme + archetype + advisor_goal` e produz `ConversationBrief` acionável (abertura, tópicos, objeções, CTA, follow-up).
4. **Daily Planner** (`planner`) transforma briefs em plano diário ranqueado com contatos-placeholder por bucket de arquétipo.
5. **CLI** (`cli.py`) orquestra fetch -> digest -> brief -> plano.

### Princípios do MVP
- Sem dados reais de clientes, portfólios ou CRM.
- Conteúdo público + arquétipo simulado + objetivo comercial.
- Sem recomendação de investimento; foco em relacionamento/comercial.
- Conteúdo web tratado como não-confiável; ignorar instruções embutidas.
- Design extensível com pontos de TODO para integrações futuras.

## 2) Estrutura de pastas

```text
advisor_intelligence/
  cli.py
  market_radar/
    __init__.py
    fetch.py
    parser.py
    classifier.py
    digest.py
  profiling/
    __init__.py
    archetypes.py
  conversation_engine/
    __init__.py
    generator.py
  planner/
    __init__.py
    daily_plan.py
  schemas/
    market_item.schema.json
    market_digest.schema.json
    client_archetype.schema.json
    conversation_brief.schema.json
    daily_plan.schema.json
  examples/
    examples_ptbr.json
tests/
  test_market_parser.py
  test_schema_validation.py
```

## 3) Como rodar

```bash
python -m pip install -e .[dev]
python -m advisor_intelligence.cli --goal captar --archetype Conservador --limit 8
pytest
```

## 4) TODOs planejados (futuras integrações)
- Conector CRM para substituir placeholders no `DailyPlan`.
- Ingestão de posições/carteira para enriquecer prioridade por relevância.
- Camada de compliance customizada por instituição.
