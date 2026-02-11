export type SourceConfig = {
  id: string;
  label: string;
  url: string;
  enabled: boolean;
  country: "BR";
};

export type AppSettings = {
  demoMode: boolean;
  tone: "formal" | "friendly";
  disclaimer: string;
  sources: SourceConfig[];
};
