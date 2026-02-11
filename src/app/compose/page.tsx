import { ComposeStudio } from "@/components/compose/compose-studio";

export default function ComposePage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Conversation Composer</h2>
      <p className="text-sm text-muted-foreground">Scripts em PT-BR para WhatsApp, e-mail e telefone.</p>
      <ComposeStudio />
    </div>
  );
}
