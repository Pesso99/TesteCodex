"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComposeResponse } from "@/lib/schemas/advisor";

const archetypes = ["conservative", "income", "growth", "hnw", "trader"] as const;

export function ComposeStudio() {
  const [archetype, setArchetype] = useState<(typeof archetypes)[number]>("conservative");
  const [tone, setTone] = useState<"formal" | "friendly">("friendly");
  const [objective, setObjective] = useState("Reforçar acompanhamento proativo em semana de volatilidade");
  const [result, setResult] = useState<ComposeResponse | null>(null);

  async function handleGenerate() {
    const response = await fetch("/api/compose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archetype, tone, objective, channel: "whatsapp" })
    });
    const payload = await response.json();
    setResult(payload.output);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[360px,1fr]">
      <Card>
        <CardTitle>Parâmetros da conversa</CardTitle>
        <label className="mt-4 block text-sm text-muted-foreground">Perfil</label>
        <select className="mt-1 w-full rounded-lg border bg-muted px-3 py-2" value={archetype} onChange={(e) => setArchetype(e.target.value as (typeof archetypes)[number])}>
          {archetypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <label className="mt-4 block text-sm text-muted-foreground">Tom</label>
        <select className="mt-1 w-full rounded-lg border bg-muted px-3 py-2" value={tone} onChange={(e) => setTone(e.target.value as "formal" | "friendly")}>
          <option value="friendly">Amigável</option>
          <option value="formal">Formal</option>
        </select>

        <label className="mt-4 block text-sm text-muted-foreground">Objetivo do assessor</label>
        <textarea className="mt-1 h-24 w-full rounded-lg border bg-muted px-3 py-2" value={objective} onChange={(e) => setObjective(e.target.value)} />

        <Button className="mt-4 w-full" onClick={handleGenerate}>
          Gerar abordagem
        </Button>
      </Card>

      <Card>
        <CardTitle>Scripts e próximos passos</CardTitle>
        {!result ? (
          <p className="mt-3 text-sm text-muted-foreground">Clique em “Gerar abordagem” para montar WhatsApp, e-mail e telefone.</p>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm"><strong>Estratégia:</strong> {result.outreachStrategy}</p>
            <p className="text-sm"><strong>WhatsApp:</strong> {result.script.whatsapp}</p>
            <p className="text-sm"><strong>Email:</strong> {result.script.email}</p>
            <p className="text-sm"><strong>Telefone:</strong> {result.script.phone}</p>
            <div>
              <p className="text-sm font-semibold">Objeções prováveis</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {result.objections.map((item) => (
                  <li key={item.objection}><strong>{item.objection}</strong> — {item.response}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
