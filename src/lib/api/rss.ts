import { RadarItem } from "@/lib/schemas/advisor";
import { defaultSettings } from "@/lib/data/sources";

function extractTag(itemBlock: string, tag: string) {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = itemBlock.match(regex);
  return match?.[1]?.trim() ?? "";
}

function stripCdata(value: string) {
  return value.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
}

function parseItems(xml: string) {
  const matches = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  return matches.slice(0, 10);
}

export async function fetchRssRadar(): Promise<RadarItem[]> {
  const enabledSources = defaultSettings.sources.filter((source) => source.enabled);

  const all = await Promise.all(
    enabledSources.map(async (source) => {
      const response = await fetch(source.url, { next: { revalidate: 300 } });
      if (!response.ok) {
        throw new Error(`Falha em ${source.label}: ${response.status}`);
      }
      const xml = await response.text();
      const items = parseItems(xml);

      return items.map((item, index): RadarItem => ({
        id: `${source.id}-${index}`,
        source: source.label,
        title: stripCdata(extractTag(item, "title")) || "Sem título",
        link: stripCdata(extractTag(item, "link")) || "https://example.com",
        publishedAt: stripCdata(extractTag(item, "pubDate")) || new Date().toISOString(),
        summary:
          stripCdata(extractTag(item, "description"))
            .replace(/<[^>]+>/g, "")
            .slice(0, 220) || "Atualização de mercado para conversa consultiva.",
        tags: ["Brasil", "Mercado"],
        educationalDisclaimer: "Informativo. Não é recomendação de investimento."
      }));
    })
  );

  return all.flat();
}
