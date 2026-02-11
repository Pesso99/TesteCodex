import { ArchetypeGrid } from "@/components/profiles/archetype-grid";

export default function ProfilesPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Simulador de Perfis</h2>
      <p className="text-sm text-muted-foreground">Arquétipos sem dados reais de cliente.</p>
      <ArchetypeGrid />
    </div>
  );
}
