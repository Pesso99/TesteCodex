"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, MessageSquareText, Users, History, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/radar", label: "Market Radar", icon: BarChart3 },
  { href: "/compose", label: "Composer", icon: MessageSquareText },
  { href: "/profiles", label: "Perfis", icon: Users },
  { href: "/history", label: "Histórico", icon: History },
  { href: "/settings", label: "Configurações", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass sticky top-4 hidden h-[calc(100vh-2rem)] w-72 rounded-2xl p-4 lg:block">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Advisor OS</p>
        <h1 className="text-lg font-semibold">Intelligence Layer BR</h1>
      </div>

      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition",
                active ? "bg-primary/20 text-foreground" : "hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
