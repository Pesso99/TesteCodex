"use client";

import { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trigger, RadarItem } from "@/lib/schemas/advisor";

type RadarResponse = {
  mode: "demo" | "live";
  items: RadarItem[];
  triggers: Trigger[];
};

export function RadarBoard() {
  const [data, setData] = useState<RadarResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/radar")
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error ?? "Falha ao carregar radar");
        setData(payload);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-sm text-rose-300">{error}</p>;
  if (!data) return <p className="text-sm text-muted-foreground">Carregando sinais...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge>Modo {data.mode === "demo" ? "Demo" : "Live"}</Badge>
        <p className="text-xs text-muted-foreground">Informativo. Não é recomendação de investimento.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {data.triggers.map((trigger) => {
          const source = data.items.find((item) => item.id === trigger.radarItemId);
          return (
            <Card key={trigger.id}>
              <CardTitle>{trigger.trigger}</CardTitle>
              <CardDescription className="mt-2">{source?.summary}</CardDescription>
              <p className="mt-3 text-sm text-foreground/90">
                <strong>Por que importa:</strong> {trigger.whyItMatters}
              </p>
              <p className="mt-2 text-sm text-foreground/90">
                <strong>Como abordar hoje:</strong> {trigger.approachSuggestion}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">Fonte: {source?.source}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
