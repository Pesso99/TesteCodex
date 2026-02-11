import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "Gatilhos hoje", value: "05", hint: "Atualizados em demo mode" },
  { label: "Perfis simulados", value: "05", hint: "Conservador a trader" },
  { label: "Canais de script", value: "03", hint: "WhatsApp, email, telefone" }
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</p>
            <p className="mt-1 text-3xl font-semibold">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.hint}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardTitle>Market Radar BR</CardTitle>
          <CardDescription className="mt-2">
            Resumos de sinais públicos para iniciar conversas consultivas com clientes.
          </CardDescription>
          <Link href="/radar" className="mt-4 inline-block">
            <Button>Abrir radar</Button>
          </Link>
        </Card>

        <Card>
          <CardTitle>Conversation Composer</CardTitle>
          <CardDescription className="mt-2">
            Gere estratégia, scripts naturais e follow-ups por perfil e objetivo.
          </CardDescription>
          <Link href="/compose" className="mt-4 inline-block">
            <Button>Abrir composer</Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
