import { ComposeResponse, RadarItem, Trigger } from "@/lib/schemas/advisor";

export const demoRadarItems: RadarItem[] = [
  {
    id: "radar-1",
    source: "Banco Central do Brasil",
    title: "Copom reforça tom cauteloso sobre inflação de serviços",
    link: "https://www.bcb.gov.br/detalhenoticia/demo-copom",
    publishedAt: new Date().toISOString(),
    summary: "A ata destaca atenção ao núcleo de inflação e ao ritmo de atividade doméstica.",
    tags: ["Selic", "Inflação", "Copom"],
    educationalDisclaimer: "Informativo. Não é recomendação de investimento."
  },
  {
    id: "radar-2",
    source: "InfoMoney",
    title: "Ibovespa fecha em alta com commodities e bancos",
    link: "https://www.infomoney.com.br/mercados/demo-ibov",
    publishedAt: new Date().toISOString(),
    summary: "Movimento puxado por minério e recuperação parcial de instituições financeiras.",
    tags: ["Ibovespa", "Commodities"],
    educationalDisclaimer: "Informativo. Não é recomendação de investimento."
  },
  {
    id: "radar-3",
    source: "InfoMoney",
    title: "Tesouro IPCA+ volta a atrair atenção no varejo",
    link: "https://www.infomoney.com.br/onde-investir/demo-tesouro",
    publishedAt: new Date().toISOString(),
    summary: "Investidores buscam proteção real no médio prazo com volatilidade global.",
    tags: ["Renda fixa", "IPCA+"],
    educationalDisclaimer: "Informativo. Não é recomendação de investimento."
  },
  {
    id: "radar-4",
    source: "Banco Central do Brasil",
    title: "BC publica relatório com leitura sobre crédito para famílias",
    link: "https://www.bcb.gov.br/detalhenoticia/demo-credito",
    publishedAt: new Date().toISOString(),
    summary: "Documento aponta estabilidade na inadimplência e mudança no mix de prazos.",
    tags: ["Crédito", "Famílias"],
    educationalDisclaimer: "Informativo. Não é recomendação de investimento."
  },
  {
    id: "radar-5",
    source: "InfoMoney",
    title: "Dólar oscila com agenda externa e payroll nos EUA",
    link: "https://www.infomoney.com.br/mercados/demo-dolar",
    publishedAt: new Date().toISOString(),
    summary: "Moeda teve sessão volátil com revisão de expectativas para juros globais.",
    tags: ["Câmbio", "Macro global"],
    educationalDisclaimer: "Informativo. Não é recomendação de investimento."
  }
];

export const demoTriggers: Trigger[] = demoRadarItems.map((item, index) => ({
  id: `trigger-${index + 1}`,
  radarItemId: item.id,
  trigger: `Gancho de conversa: ${item.title}`,
  whyItMatters: "Ajuda o cliente a interpretar cenário e manter disciplina com serenidade.",
  approachSuggestion:
    "Use linguagem simples, valide objetivos de prazo e convide para uma revisão educativa sem indicação de compra/venda.",
  audience: ["conservative", "income", "growth", "hnw", "trader"]
}));

export const demoComposeOutput: ComposeResponse = {
  outreachStrategy:
    "Aborde contexto macro, conecte ao objetivo do cliente e reforce acompanhamento contínuo sem direcionamento transacional.",
  script: {
    whatsapp:
      "Oi! Passei para compartilhar uma leitura rápida do mercado de hoje e como isso pode impactar o planejamento de longo prazo. Se fizer sentido, te mando um resumo em 2 minutos.",
    email:
      "Assunto: Panorama de mercado e próximos passos no seu planejamento\n\nOlá! Separei os principais pontos do cenário de hoje para apoiar decisões com mais clareza. O foco é educacional e alinhado aos seus objetivos. Se quiser, marcamos 15 minutos para revisar prioridades.",
    phone:
      "Queria te atualizar com uma visão objetiva do mercado e ouvir como você está percebendo este momento. A ideia é ajustar comunicação e próximos acompanhamentos, sempre com foco no seu plano."
  },
  objections: [
    {
      objection: "Prefiro esperar a volatilidade passar.",
      response: "Perfeito, cautela é saudável. Podemos usar este período para revisar objetivos e critérios, sem pressa para qualquer decisão."
    },
    {
      objection: "Já vi muitas notícias contraditórias.",
      response: "Concordo, por isso organizo apenas os sinais mais relevantes e traduzidos para seu contexto pessoal."
    }
  ],
  followUps: [
    { timing: "D+1", action: "Enviar resumo com 3 bullets do cenário." },
    { timing: "D+7", action: "Checar percepção do cliente sobre risco e prioridades." },
    { timing: "Mensal", action: "Reunião curta de acompanhamento educacional." }
  ],
  safetyNotes: [
    "Material educacional e informativo.",
    "Não constitui recomendação de investimento.",
    "Não utilizar dados pessoais sensíveis neste MVP."
  ]
};
