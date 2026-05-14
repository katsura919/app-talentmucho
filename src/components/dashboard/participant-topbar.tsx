"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { Bell, Menu, LogOut } from "lucide-react";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { logout } from "@/app/actions/auth";

const SEGMENT_LABELS: Record<string, string> = {
  participant: "Dashboard",
  courses: "My Courses",
  progress: "Progress",
  certificates: "Certificates",
  "cohort-1": "Cohort 1",
  "cohort-2": "Cohort 2",
  "cohort-3": "Cohort 3",
};

const HIDDEN_SEGMENTS = new Set(["courses"]);

function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const visible = segments.filter((seg) => !HIDDEN_SEGMENTS.has(seg));
  return visible.map((seg, i) => {
    const originalIndex = segments.indexOf(seg);
    return {
      label: SEGMENT_LABELS[seg] ?? seg,
      href: "/" + segments.slice(0, originalIndex + 1).join("/"),
      isLast: i === visible.length - 1,
    };
  });
}

interface Props {
  fullName: string;
  email: string;
  onMenuClick: () => void;
}

export function ParticipantTopbar({ fullName, email, onMenuClick }: Props) {
  const crumbs = useBreadcrumbs();
  const [, startTransition] = useTransition();
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header
      className="shrink-0 h-14 md:h-16 bg-white dark:bg-[var(--charcoal-900)] md:rounded-2xl border-b border-[var(--beige-200)] dark:border-white/5 md:border flex items-center px-4 md:px-6 gap-3"
      style={{ boxShadow: "0 1px 8px -1px rgb(61 53 46 / 0.06)" }}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[var(--taupe-400)] hover:bg-[var(--beige-100)] dark:hover:bg-[var(--accent)] transition-all"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <Breadcrumb className="flex-1 min-w-0">
        <BreadcrumbList>
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb.href}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground truncate" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}>
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href} className="font-sans text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground">
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <ThemeTogglerButton
          modes={["light", "dark"]}
          variant="ghost"
          size="default"
          className="w-9 h-9 rounded-xl text-[var(--taupe-400)] hover:bg-[var(--beige-100)] dark:hover:bg-[var(--accent)] hover:text-[var(--espresso-700)] dark:hover:text-foreground"
          aria-label="Toggle theme"
        />

        {/* Notifications */}
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--taupe-400)] hover:bg-[var(--beige-100)] dark:hover:bg-[var(--accent)] hover:text-[var(--espresso-700)] dark:hover:text-foreground transition-all duration-150"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </button>

        {/* User dropdown */}
        <div className="pl-2 ml-1 border-l border-[var(--beige-200)] dark:border-[var(--border)]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[var(--beige-100)] dark:hover:bg-[var(--accent)] transition-all duration-150"
                aria-label="User menu"
              >
                <span className="text-sm font-medium text-[var(--espresso-800)] dark:text-foreground hidden sm:block">
                  {fullName.split(" ")[0]}
                </span>
                <div className="w-8 h-8 rounded-full bg-[var(--beige-200)] dark:bg-[var(--accent)] flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-[var(--espresso-700)] dark:text-foreground">
                    {initials}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col gap-0.5 py-2">
                <span className="font-semibold text-sm text-foreground">{fullName}</span>
                <span className="font-normal text-xs text-muted-foreground truncate">{email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => startTransition(() => logout())}
                className="cursor-pointer"
              >
                <LogOut />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
