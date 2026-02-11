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
    fixtures.py
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
fixtures/
  market_items/
  market_digests/
tests/
  golden/
  test_market_parser.py
  test_schema_validation.py
  test_offline_smoke.py
  test_golden_outputs.py
```

## 3) Modos de fonte (Market Radar)

`build_market_digest` e CLI suportam três modos com `--source-mode` (ou env `ADVISOR_SOURCE_MODE`):

- `live`: busca apenas online (erro de rede é propagado).
- `offline`: usa apenas fixtures locais em `fixtures/market_items`.
- `mixed`: tenta online e faz fallback para fixtures locais (padrão atual).

## 4) Como rodar

```bash
python -m pip install -e .[dev]
python -m advisor_intelligence.cli --goal captar --archetype Conservador --limit 8 --source-mode mixed
pytest
```

## 5) Pack de testes offline-first

Para validar de forma confiável sem internet/proxy:

```bash
python -m advisor_intelligence.cli --goal captar --archetype Conservador --limit 5 --source-mode offline
pytest tests/test_offline_smoke.py tests/test_golden_outputs.py
```

O pack inclui:
- Fixtures de `MarketItem` (20 amostras cobrindo macro, bolsa, empresas, fundos, previdência).
- 3 `MarketDigest` de referência.
- Casos de borda: data ausente, manchete incomum, manchete duplicada, manchete muito longa.
- Smoke test end-to-end offline e snapshots (golden tests) para 5 entradas fixas.

## 6) TODOs planejados (futuras integrações)
- Conector CRM para substituir placeholders no `DailyPlan`.
- Ingestão de posições/carteira para enriquecer prioridade por relevância.
- Camada de compliance customizada por instituição.
