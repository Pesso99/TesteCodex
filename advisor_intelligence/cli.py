from __future__ import annotations

import argparse
import json

from advisor_intelligence.conversation_engine import generate_conversation_brief
from advisor_intelligence.market_radar import build_market_digest
from advisor_intelligence.planner import build_daily_plan
from advisor_intelligence.profiling import get_archetype_profile


def run(goal: str, archetype_name: str, limit: int) -> dict:
    digest = build_market_digest(advisor_goal=goal, limit=limit)
    archetype = get_archetype_profile(archetype_name)

    briefs = [
        generate_conversation_brief(
            market_theme=item["theme"],
            archetype=archetype,
            advisor_goal=goal,
        )
        for item in digest["items"][:3]
    ]

    plan = build_daily_plan(archetype_name=archetype_name, advisor_goal=goal, briefs=briefs)
    return {"market_digest": digest, "conversation_briefs": briefs, "daily_plan": plan}


def main() -> None:
    parser = argparse.ArgumentParser(description="Advisor Intelligence Layer MVP")
    parser.add_argument("--goal", default="captar", choices=["captar", "reativar", "educar", "alocar", "retenção"])
    parser.add_argument("--archetype", default="Conservador")
    parser.add_argument("--limit", type=int, default=8)
    args = parser.parse_args()

    output = run(goal=args.goal, archetype_name=args.archetype, limit=args.limit)
    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
