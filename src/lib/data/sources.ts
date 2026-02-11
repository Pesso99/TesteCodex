import { AppSettings } from "@/lib/types/settings";

export const defaultSettings: AppSettings = {
  demoMode: true,
  tone: "friendly",
  disclaimer: "Conteúdo informativo e educacional. Não constitui recomendação de investimento.",
  sources: [
    {
      id: "infomoney",
      label: "InfoMoney",
      url: "https://www.infomoney.com.br/feed/",
      enabled: true,
      country: "BR"
    },
    {
      id: "bcb",
      label: "Banco Central do Brasil",
      url: "https://www.bcb.gov.br/rss/noticias",
      enabled: true,
      country: "BR"
    }
  ]
};
