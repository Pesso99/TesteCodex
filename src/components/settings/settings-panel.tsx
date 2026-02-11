"use client";

import { useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { defaultSettings } from "@/lib/data/sources";

export function SettingsPanel() {
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardTitle>Fontes configuráveis (whitelist BR)</CardTitle>
        <CardDescription className="mt-2">Ative/desative sem alterar código.</CardDescription>
        <ul className="mt-4 space-y-2">
          {settings.sources.map((source) => (
            <li key={source.id} className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/40 p-3">
              <div>
                <p className="text-sm font-medium">{source.label}</p>
                <p className="text-xs text-muted-foreground">{source.url}</p>
              </div>
              <input
                type="checkbox"
                checked={source.enabled}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    sources: prev.sources.map((item) =>
                      item.id === source.id ? { ...item, enabled: event.target.checked } : item
                    )
                  }))
                }
              />
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle>Tom e disclaimer</CardTitle>
        <CardDescription className="mt-2">Aplicado nas sugestões e scripts do Composer.</CardDescription>

        <label className="mt-4 block text-sm text-muted-foreground">Tom padrão</label>
        <select
          value={settings.tone}
          onChange={(event) => setSettings((prev) => ({ ...prev, tone: event.target.value as "formal" | "friendly" }))}
          className="mt-1 w-full rounded-lg border bg-muted px-3 py-2"
        >
          <option value="friendly">Amigável</option>
          <option value="formal">Formal</option>
        </select>

        <label className="mt-4 block text-sm text-muted-foreground">Disclaimer curto</label>
        <textarea
          className="mt-1 h-24 w-full rounded-lg border bg-muted px-3 py-2"
          value={settings.disclaimer}
          onChange={(event) => setSettings((prev) => ({ ...prev, disclaimer: event.target.value }))}
        />
      </Card>
    </div>
  );
}
