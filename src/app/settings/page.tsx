import { SettingsPanel } from "@/components/settings/settings-panel";

export default function SettingsPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Configurações</h2>
      <p className="text-sm text-muted-foreground">Fontes whitelist, tom e disclaimer.</p>
      <SettingsPanel />
    </div>
  );
}
