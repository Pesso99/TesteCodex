import { demoComposeOutput } from "@/lib/data/demo-events";
import { ComposeRequest, ComposeResponse } from "@/lib/schemas/advisor";

const archetypeHints: Record<ComposeRequest["archetype"], string> = {
  conservative: "priorize preservação de capital e previsibilidade",
  income: "destaque consistência de fluxo e gestão de renda",
  growth: "conecte oportunidades a horizonte de médio/longo prazo",
  hnw: "aborde visão patrimonial integrada e governança familiar",
  trader: "enfatize disciplina de risco e leitura de cenário"
};

export function generateComposeOutput(request: ComposeRequest): ComposeResponse {
  const tonePrefix = request.tone === "formal" ? "Prezado(a)," : "Oi,";

  return {
    ...demoComposeOutput,
    outreachStrategy: `Objetivo: ${request.objective}. Para perfil ${request.archetype}, ${archetypeHints[request.archetype]}.`,
    script: {
      whatsapp: `${tonePrefix} trouxe um update relevante para apoiar seu acompanhamento de mercado sem decisões precipitadas. Posso te enviar um resumo?`,
      email: `Assunto: Atualização objetiva para seu planejamento\n\n${tonePrefix} organizei os pontos de hoje para apoiar seu objetivo (${request.objective}). O conteúdo é informativo e podemos revisar juntos em 15 min.`,
      phone: `${tonePrefix} aqui é do seu time de assessoria. Quero compartilhar uma leitura objetiva conectada ao seu objetivo (${request.objective}) e combinar próximos checkpoints.`
    }
  };
}
