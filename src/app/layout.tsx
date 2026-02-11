import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { AppHeader } from "@/components/layout/app-header";

export const metadata: Metadata = {
  title: "Advisor Intelligence Layer",
  description: "MVP para assessores brasileiros: radar de mercado e composição de conversas."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="mx-auto flex min-h-screen max-w-[1600px] gap-4 p-4 lg:p-6">
          <Sidebar />
          <main className="flex-1 space-y-4">
            <AppHeader />
            <section className="glass rounded-2xl p-4 lg:p-6">{children}</section>
          </main>
        </div>
      </body>
    </html>
  );
}
