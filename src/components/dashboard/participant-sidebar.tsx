"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Award,
  Settings,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/animate/tooltip";

const nav = [
  { href: "/participant", label: "Dashboard", icon: LayoutDashboard },
  { href: "/participant/courses", label: "My Courses", icon: BookOpen },
  { href: "/participant/progress", label: "Progress", icon: BarChart2 },
  { href: "/participant/certificates", label: "Certificates", icon: Award },
  { href: "/participant/settings", label: "Settings", icon: Settings },
];

interface Props {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function ParticipantSidebar({ onClose, collapsed, onToggleCollapse }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className="h-full flex flex-col rounded-r-3xl md:rounded-3xl overflow-hidden"
      style={{
        background: "var(--charcoal-900)",
        boxShadow:
          "0 8px 32px -4px rgb(0 0 0 / 0.30), inset -1px 0 0 rgb(255 255 255 / 0.04)",
      }}
    >
      {/* Brand */}
      <div
        className={[
          "pt-6 pb-5 flex items-center",
          collapsed
            ? "px-2 flex-col gap-3 justify-center"
            : "px-4 justify-between",
        ].join(" ")}
        style={{ borderBottom: "1px solid rgb(255 255 255 / 0.08)" }}
      >
        {collapsed ? (
          <>
            <Image
              src="/tm-logo.png"
              alt="TalentMucho"
              width={32}
              height={32}
              className="object-contain"
            />
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden md:flex w-7 h-7 rounded-xl items-center justify-center transition-colors hover:bg-white/10"
                style={{ color: "rgb(255 255 255 / 0.35)" }}
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <PanelLeftOpen className="size-4" />
              </button>
            )}
          </>
        ) : (
          <>
            <Image
              src="/tm-logo.png"
              alt="TalentMucho"
              width={96}
              height={24}
              className="object-contain "
            />

            <div className="flex items-center gap-1 shrink-0">
              {onClose && (
                <button
                  onClick={onClose}
                  className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                  style={{ color: "rgb(255 255 255 / 0.4)" }}
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </button>
              )}
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="hidden md:flex w-7 h-7 rounded-xl items-center justify-center transition-colors hover:bg-white/10"
                  style={{ color: "rgb(255 255 255 / 0.35)" }}
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="size-4" />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto overflow-x-hidden">
        <TooltipProvider>
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            const linkContent = (
              <Link
                href={href}
                onClick={onClose}
                className={[
                  "flex items-center py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  collapsed ? "justify-center px-0 w-full" : "gap-3 px-3",
                ].join(" ")}
                style={{
                  background: active ? "rgb(255 255 255 / 0.08)" : "transparent",
                  color: active ? "rgb(255 255 255 / 0.95)" : "rgb(255 255 255 / 0.45)",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLElement).style.background =
                      "rgb(255 255 255 / 0.05)";
                  (e.currentTarget as HTMLElement).style.color =
                    active ? "rgb(255 255 255 / 0.95)" : "rgb(255 255 255 / 0.70)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = active
                    ? "rgb(255 255 255 / 0.08)"
                    : "transparent";
                  (e.currentTarget as HTMLElement).style.color = active
                    ? "rgb(255 255 255 / 0.95)"
                    : "rgb(255 255 255 / 0.45)";
                }}
              >
                <Icon
                  className="size-4 shrink-0"
                  style={{ color: active ? "var(--clay-500)" : "inherit" }}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1">{label}</span>
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "var(--clay-500)" }}
                      />
                    )}
                  </>
                )}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={href} side="right">
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              );
            }

            return <div key={href}>{linkContent}</div>;
          })}
        </TooltipProvider>
      </nav>

      {/* Bottom decoration */}
      {!collapsed && (
        <div
          className="px-6 py-5 shrink-0"
          style={{ borderTop: "1px solid rgb(255 255 255 / 0.06)" }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{ color: "rgb(255 255 255 / 0.2)" }}
          >
            Claude AI Bootcamp
            <br />
            by TalentMucho
          </p>
        </div>
      )}

      {collapsed && <div className="py-4 shrink-0" />}
    </aside>
  );
}
