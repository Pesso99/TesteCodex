import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const sessions = [
  { date: "Hoje 09:10", action: "Script gerado para perfil renda", status: "Concluído" },
  { date: "Ontem 16:45", action: "Radar revisado com 5 gatilhos", status: "Concluído" },
  { date: "Ontem 11:00", action: "Configuração de tom ajustada para formal", status: "Concluído" }
];

export function SessionHistory() {
  return (
    <Card>
      <CardTitle>Histórico local da sessão</CardTitle>
      <CardDescription className="mt-2">Sem persistência de dados pessoais.</CardDescription>
      <ul className="mt-4 space-y-3">
        {sessions.map((session) => (
          <li key={`${session.date}-${session.action}`} className="rounded-lg border border-border/70 bg-muted/40 p-3 text-sm">
            <p className="font-medium">{session.action}</p>
            <p className="text-muted-foreground">{session.date} • {session.status}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
