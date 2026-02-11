import { Badge } from "@/components/ui/badge";

export function AppHeader() {
  return (
    <header className="glass rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Advisor Intelligence Layer</h2>
          <p className="text-sm text-muted-foreground">
            Insights educacionais para relacionamentos com clientes no Brasil.
          </p>
        </div>
        <Badge>Sem PII • Não é recomendação de investimento</Badge>
      </div>
    </header>
  );
}
