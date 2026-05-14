"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";

const SESSION = {
  tag: "W3 · S5",
  color: "#5A7A6B",
  weekLabel: "Week 3 · Building with Claude",
  title: "Claude Code — your first build",
  date: "Sat, Jun 20",
  time: "10 AM–1 PM EST",
  videoUrl: null as string | null,
  description:
    "Claude Code makes building with AI tangible — no prior coding needed. We'll set up your environment, understand the build loop, and complete a small business tool together so you feel the mechanics before the big build in Session 6.",
  resources: [
    { label: "Claude Code setup guide", href: "#" },
    { label: "Build loop reference", href: "#" },
    { label: "Session slides", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-6";
const NEXT     = "/participant/courses/cohort-1/session-8";

const bringList = [
  "Laptop with Node.js v18 or later installed (nodejs.org)",
  "Your Anthropic account credentials (same email as Claude.ai)",
  "A specific idea: one business tool or dashboard you want to build",
];

const objectives = [
  "Install Claude Code and confirm it runs on your machine",
  "Understand what Claude Code can and can't build",
  "Submit your first build prompt and see code generated",
  "Know how to describe a build prompt vs. a chat prompt",
];

const canBuild = [
  "Custom dashboards — show your key metrics in a single view",
  "Internal tools — intake forms, checklists, calculators",
  "Client-facing portals — onboarding forms, status pages, resource hubs",
  "Report generators — weekly summary builders, client update templates",
  "Data entry and display tools — anything you currently track in a spreadsheet",
];

const cannotBuild = [
  "Anything needing a live database connection (without additional setup)",
  "Real-time integrations with external services (without API configuration)",
  "Production-deployed apps (Claude Code builds; you need hosting separately)",
];

const INSTALL_COMMANDS: Record<string, string> = {
  "1. Check Node.js version": `node --version
# Should return v18.0.0 or higher
# If not installed: download from nodejs.org`,

  "2. Install Claude Code": `npm install -g @anthropic-ai/claude-code`,

  "3. Verify installation": `claude --version`,

  "4. Start in your project folder": `# Create a folder for your build first
mkdir my-dashboard
cd my-dashboard

# Then start Claude Code
claude`,
};

const BUILD_PROMPTS: Record<string, string> = {
  "First build prompt": `Build me a [type of tool — e.g. business dashboard, client intake form, weekly report template] for my [type of business].

This will be used by: [who — just me / my team / my clients]

It needs to:
1. [core function 1 — be specific, e.g. "Show my 5 key weekly metrics as large numbers at the top"]
2. [core function 2 — e.g. "Display a list of active client projects with their status"]
3. [core function 3 — e.g. "Include a section for my top 3 priorities this week"]

How it should look:
[describe visually — e.g. "Clean, minimal design with a white background. Metrics in cards across the top. Table below. Mobile-friendly."]

Tech requirements:
- Use React
- Use static sample data I can update manually later
- No backend or database needed
- Make it run with: npm run dev

Keep it simple. Version 1 — get something real on screen.`,

  "Iterate on what you built": `I can see the first version. Here&apos;s what I want to change:

KEEP:
- [what&apos;s working well — be specific]

CHANGE:
- [element] → [what it should be instead — e.g. "The font is too small → make all body text at least 16px"]
- [element] → [change — e.g. "The color of the header → change it to a dark navy (#1a2332)"]
- [element] → [change — e.g. "The table has too many columns → remove the 'Last Modified' column"]

ADD:
- [new element, if any — e.g. "Add a footer with today&apos;s date"]

REMOVE:
- [what to cut, if anything — e.g. "Remove the chart — just the numbers for now"]

Make only these changes. Don&apos;t redesign anything else.`,

  "Describe what&apos;s wrong precisely": `The build has an issue. I want to fix this specifically:

WHAT&apos;S WRONG:
[Describe what you see that&apos;s wrong — not "it looks bad" but "the revenue number shows $0 instead of the sample data values"]

WHERE IT IS:
[Location on the page — e.g. "Top left card" / "The table in the middle section" / "The navigation bar"]

WHAT IT SHOULD DO:
[Describe the correct behavior — e.g. "The revenue card should show $12,400 using the sample data in the data file"]

Don&apos;t change anything else while fixing this.`,
};

export default function Session7Page() {
  return (
    <div className="h-screen bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href={PREV}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          W2 · S4
        </Link>

        <div className="flex items-center gap-2">
          <span
            className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
            style={{ background: `${SESSION.color}22`, color: SESSION.color, border: `1px solid ${SESSION.color}44` }}
          >
            {SESSION.tag}
          </span>
          <span className="font-medium text-sm text-[var(--charcoal-900)] dark:text-foreground line-clamp-1 max-w-[280px]">
            {SESSION.title}
          </span>
        </div>

        <Link
          href={NEXT}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity"
        >
          W3 · S6
          <ArrowRight className="size-3.5" />
        </Link>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* Content */}
        <main className="flex-1 min-w-0 overflow-y-auto p-6 md:p-8 flex flex-col gap-8">

          {/* Title */}
          <div>
            <p className="tm-eyebrow mb-1">{SESSION.weekLabel}</p>
            <h1 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground mb-3" style={{ fontSize: "clamp(1.25rem, 2vw, 1.875rem)" }}>
              {SESSION.title}
            </h1>
            <p className="tm-body-sm max-w-2xl">{SESSION.description}</p>
          </div>

          {/* Objectives */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What you&apos;ll do in this session</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
              <ol className="flex flex-col gap-3">
                {objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="size-6 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[11px] font-semibold text-[var(--taupe-400)]">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed pt-0.5">{obj}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* What Claude Code is */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What Claude Code actually is</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Claude Code is not a chatbot. It&apos;s an agentic coding tool that runs in your terminal. It reads your files, writes new ones, and builds software by working through tasks step by step — more like a developer sitting next to you than a tool you query.
              </p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                You don&apos;t need to know how to code. You describe what you want in plain language, Claude Code builds it, you review and approve each step, and you iterate until it&apos;s right. The build loop is: describe → review → approve → iterate.
              </p>
              <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4">
                <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em] mb-2">The build loop</p>
                <div className="flex items-center gap-2 flex-wrap text-sm text-[var(--charcoal-900)] dark:text-foreground">
                  {["Describe what you want", "Claude builds it", "You review the code", "You approve the change", "See it in the browser", "Iterate"].map((step, i, arr) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="font-light">{step}</span>
                      {i < arr.length - 1 && <ArrowRight className="size-3 text-[var(--taupe-400)] shrink-0" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Can and can't build */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What it can (and can&apos;t) build for your business</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
                <p className="text-xs font-semibold text-[var(--clay-500)] uppercase tracking-[0.12em]">Can build ✓</p>
                <ul className="flex flex-col gap-2">
                  {canBuild.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                      <span className="text-[var(--clay-500)] shrink-0 mt-0.5">·</span>
                      <span className="font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-5 flex flex-col gap-3">
                <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">Can&apos;t do (without more setup) ×</p>
                <ul className="flex flex-col gap-2">
                  {cannotBuild.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                      <span className="text-[var(--taupe-400)] shrink-0 mt-0.5">×</span>
                      <span className="font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Anatomy of a build prompt */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">The anatomy of a great build prompt</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The most common reason a Claude Code build comes out wrong is a vague prompt. Claude Code is precise — it builds exactly what you describe. If you describe something vague, you get something generic. If you describe something specific, you get something useful.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "WHAT", desc: "Exactly what you&apos;re building — dashboard, form, tool, report generator" },
                  { label: "FOR WHO", desc: "Who will use it — just you, your team, or your clients" },
                  { label: "DATA", desc: "What information goes in and comes out — list the specific metrics or fields" },
                  { label: "LOOK", desc: "How it should appear — describe visually, not technically (\"cards at top, table below\" is better than \"grid layout\")" },
                  { label: "TECH", desc: "Keep it simple — React, static sample data, no backend. Ask for npm run dev to start it." },
                ].map((part) => (
                  <div key={part.label} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-[var(--taupe-400)] uppercase tracking-[0.1em] min-w-[48px] mt-0.5">{part.label}</span>
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{part.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Install commands */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Setup — install Claude Code</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">Run these in your terminal in order. If you get stuck on any step, paste the error into your Claude.ai Project and ask for help.</p>
            <CodeTabs codes={INSTALL_COMMANDS} lang="bash" />
          </section>

          {/* Build prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Build prompts — use these inside Claude Code</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Once Claude Code is running (<code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">claude</code> in your terminal), paste these prompts directly into it.
            </p>
            <CodeTabs codes={BUILD_PROMPTS} lang="markdown" />
          </section>

          {/* What to bring to session 8 */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prepare for Session 6: Build your dashboard</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Come to Session 6 with this ready:</p>
              <ol className="flex flex-col gap-2">
                {[
                  "Claude Code installed and confirmed working on your machine",
                  "A clear description of the dashboard you want to build (write it out in plain language — not code)",
                  "Your 5 key business metrics you want to see in one place",
                  "A sketch of the layout — even on paper, even rough",
                  "One question about what you&apos;re building (we&apos;ll answer them live)",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="size-5 shrink-0 rounded-full border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[10px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Build your business dashboard</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 3 · Session 6 — Sun, Jun 21</p>
            </div>
            <Link
              href={NEXT}
              className="inline-flex items-center gap-2 shrink-0 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Next
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:w-72 xl:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-6 flex flex-col gap-6 overflow-y-auto">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">Session details</p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--taupe-400)]">Date</dt>
                <dd className="font-medium text-[var(--charcoal-900)] dark:text-foreground text-right">{SESSION.date}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--taupe-400)]">Time</dt>
                <dd className="font-medium text-[var(--charcoal-900)] dark:text-foreground text-right">{SESSION.time}</dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">Bring to this session</p>
            <ul className="space-y-2">
              {bringList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                  <span className="size-1.5 rounded-full bg-[var(--clay-500)] mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">Resources</p>
            <ul className="space-y-2">
              {SESSION.resources.map((r) => (
                <li key={r.label}>
                  <a href={r.href} className="text-sm text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity underline underline-offset-2 decoration-[var(--beige-200)]">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <a href="#" className="inline-flex items-center justify-center gap-2 w-full bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity">
              Join live on Zoom
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
