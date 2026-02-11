import json
from pathlib import Path

from advisor_intelligence.conversation_engine import generate_conversation_brief
from advisor_intelligence.planner import build_daily_plan
from advisor_intelligence.profiling import get_archetype_profile
from advisor_intelligence.schemas.validator import validate_required_and_types

SCHEMA_DIR = Path("advisor_intelligence/schemas")


def load_schema(name: str) -> dict:
    return json.loads((SCHEMA_DIR / name).read_text(encoding="utf-8"))


def test_conversation_brief_matches_schema_basics() -> None:
    archetype = get_archetype_profile("Conservador")
    brief = generate_conversation_brief("selic_juros", archetype, "captar")
    validate_required_and_types(instance=brief, schema=load_schema("conversation_brief.schema.json"))


def test_daily_plan_matches_schema_basics() -> None:
    archetype = get_archetype_profile("Trader")
    brief = generate_conversation_brief("bolsa_acoes", archetype, "reativar")
    plan = build_daily_plan("Trader", "reativar", [brief])
    validate_required_and_types(instance=plan, schema=load_schema("daily_plan.schema.json"))
