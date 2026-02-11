import { RadarBoard } from "@/components/radar/radar-board";

export default function RadarPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Market Radar</h2>
      <p className="text-sm text-muted-foreground">Sinais Brasil-first para “o que dizer hoje”.</p>
      <RadarBoard />
    </div>
  );
}
