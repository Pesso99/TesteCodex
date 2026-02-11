import { SessionHistory } from "@/components/history/session-history";

export default function HistoryPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Histórico local</h2>
      <SessionHistory />
    </div>
  );
}
