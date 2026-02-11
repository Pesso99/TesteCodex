import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const archetypes = [
  { id: "conservative", title: "Conservador", focus: "Preservação e previsibilidade" },
  { id: "income", title: "Renda", focus: "Fluxo recorrente e estabilidade" },
  { id: "growth", title: "Crescimento", focus: "Valorização de longo prazo" },
  { id: "hnw", title: "Alta renda", focus: "Estratégia patrimonial integrada" },
  { id: "trader", title: "Trader", focus: "Disciplina tática e risco" }
];

export function ArchetypeGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {archetypes.map((item) => (
        <Card key={item.id}>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription className="mt-2">{item.focus}</CardDescription>
          <p className="mt-3 text-sm text-muted-foreground">Perfil simulado para orientar linguagem e frequência de contato.</p>
        </Card>
      ))}
    </div>
  );
}
