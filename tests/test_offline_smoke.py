import json
import subprocess
import sys
from pathlib import Path

from advisor_intelligence.cli import run
from advisor_intelligence.schemas.validator import validate_required_and_types

SCHEMA_DIR = Path("advisor_intelligence/schemas")


def load_schema(name: str) -> dict:
    return json.loads((SCHEMA_DIR / name).read_text(encoding="utf-8"))


def test_cli_offline_end_to_end_smoke() -> None:
    cmd = [
        sys.executable,
        "-m",
        "advisor_intelligence.cli",
        "--goal",
        "captar",
        "--archetype",
        "Conservador",
        "--limit",
        "5",
        "--source-mode",
        "offline",
    ]
    completed = subprocess.run(cmd, capture_output=True, text=True, check=True)
    payload = json.loads(completed.stdout)

    digest = payload["market_digest"]
    briefs = payload["conversation_briefs"]

    validate_required_and_types(digest, load_schema("market_digest.schema.json"))
    validate_required_and_types(briefs[0], load_schema("conversation_brief.schema.json"))
    validate_required_and_types(payload["daily_plan"], load_schema("daily_plan.schema.json"))

    assert digest["items"], "Esperado ao menos um item no digest"
    for item in digest["items"]:
        assert item["theme"].strip() != ""
        assert item["advisor_opportunity_angle"].strip() != ""

    for brief in briefs:
        assert all(point.strip() for point in brief["talking_points"])
        assert brief["cta"].strip() != ""


def test_run_offline_respects_limit() -> None:
    payload = run(goal="educar", archetype_name="Renda Passiva", limit=3, source_mode="offline")
    assert len(payload["market_digest"]["items"]) == 3
