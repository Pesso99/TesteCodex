import json
from pathlib import Path

from advisor_intelligence.conversation_engine import generate_conversation_brief
from advisor_intelligence.profiling import get_archetype_profile

SNAPSHOT_PATH = Path("tests/golden/conversation_brief_snapshots.json")


def test_conversation_brief_golden_snapshots() -> None:
    snapshots = json.loads(SNAPSHOT_PATH.read_text(encoding="utf-8"))

    for snapshot in snapshots:
        case = snapshot["input"]
        expected = snapshot["expected"]
        archetype = get_archetype_profile(case["archetype"])
        brief = generate_conversation_brief(case["market_theme"], archetype, case["goal"])

        actual = {
            "advisor_goal": brief["advisor_goal"],
            "market_theme": brief["market_theme"],
            "archetype": brief["archetype"],
            "whatsapp_opening": brief["channel_opening"]["whatsapp"],
            "first_talking_point": brief["talking_points"][0],
            "first_objection": brief["objections_and_responses"][0]["objection"],
            "cta": brief["cta"],
            "follow_up_days": [entry["day"] for entry in brief["follow_up_sequence"]],
            "compliance_disclaimer": brief["compliance_disclaimer"],
        }

        assert actual == expected
