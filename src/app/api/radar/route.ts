import { NextResponse } from "next/server";
import { demoRadarItems, demoTriggers } from "@/lib/data/demo-events";
import { getCached, setCached } from "@/lib/api/cache";
import { fetchRssRadar } from "@/lib/api/rss";

const CACHE_KEY = "radar_payload";
const TTL = 1000 * 60 * 5;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const demo = url.searchParams.get("demo") !== "false";

    if (demo) {
      return NextResponse.json({ mode: "demo", items: demoRadarItems, triggers: demoTriggers });
    }

    const cached = getCached<{ mode: string; items: typeof demoRadarItems; triggers: typeof demoTriggers }>(CACHE_KEY);
    if (cached) return NextResponse.json(cached);

    const items = await fetchRssRadar();
    const triggers = items.map((item, index) => ({
      id: `rss-trigger-${index}`,
      radarItemId: item.id,
      trigger: item.title,
      whyItMatters: "Atualização útil para alinhamento de expectativas e educação financeira.",
      approachSuggestion: "Explique em linguagem acessível e convide o cliente para revisão dos objetivos.",
      audience: ["conservative", "income", "growth", "hnw", "trader"]
    }));

    const payload = { mode: "live", items, triggers };
    setCached(CACHE_KEY, payload, TTL);

    return NextResponse.json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado no radar";
    return NextResponse.json({ error: message, fallback: { items: demoRadarItems, triggers: demoTriggers } }, { status: 500 });
  }
}
