"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";

const SESSION = {
  tag: "W3 · S6",
  color: "#5A7A6B",
  weekLabel: "Week 3 · Building with Claude",
  title: "Build your business dashboard",
  date: "Sun, Jun 21",
  time: "10 AM–1 PM EST",
  videoUrl: null as string | null,
  description:
    "The big build session. You'll use Claude Code to create a custom dashboard for your business — pulling in your data, designing what matters to you, and iterating live. No coding experience required.",
  resources: [
    { label: "Dashboard planning worksheet", href: "#" },
    { label: "Claude Code examples", href: "#" },
    { label: "Week 3 deliverable checklist", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-7";
const NEXT     = "/participant/courses/cohort-1/session-9";

const bringList = [
  "Claude Code installed from Session 5",
  "5 key metrics you track in your business (write them down)",
  "Your current tracking method — spreadsheet, app, or notebook",
  "A rough sketch or description of what your dashboard should look like",
];

const objectives = [
  "Plan your dashboard before building it (5 questions first)",
  "Build a working first version with Claude Code",
  "Iterate based on what you see in the browser",
  "Know how to describe what&apos;s wrong and get it fixed precisely",
];

const planningQuestions = [
  { q: "What decision does this help you make?", hint: "\"I want to know at a glance if I need to push on revenue this week\" is a decision. \"I want to see my numbers\" isn&apos;t." },
  { q: "What are the 5 numbers you&apos;d look at first every morning?", hint: "These become your primary metric cards. If you can&apos;t name 5, start with 3." },
  { q: "Who else needs to see this?", hint: "Just you = simpler. Your team = needs labels and context. Clients = needs to look polished." },
  { q: "How will you update the data?", hint: "Manually (you type in numbers each week) or automatically (connected to a source). Start manually — it&apos;s simpler and you can automate later." },
  { q: "What does Version 1 look like?", hint: "Define the smallest version that&apos;s still useful. Resist the urge to build everything at once." },
];

const iterationRules = [
  { wrong: "It doesn&apos;t look right", right: "The revenue card font is too small — make it 32px and bold" },
  { wrong: "I want it simpler", right: "Remove the chart entirely — just show the number" },
  { wrong: "The colors are off", right: "Change the sidebar background from dark gray to navy (#1a2332)" },
  { wrong: "Something&apos;s broken", right: "The \"Active Clients\" card shows 0 instead of 12 — the sample data is in clients.json but the component isn&apos;t reading it" },
];

const PROMPTS: Record<string, string> = {
  "Dashboard planning conversation": `I want to build a business dashboard. Help me plan it before we build.

My business: [describe what you do in 2–3 sentences]
Who uses this dashboard: [just me / my team / clients]

The main reason I want this:
[What decision or habit does this dashboard support? Be specific.]

Metrics I want to track:
1. [metric name] — currently tracked in: [spreadsheet / app / my head]
2. [metric name] — currently tracked in: [where]
3. [metric name] — currently tracked in: [where]
4. [metric name] — currently tracked in: [where]
5. [metric name] — currently tracked in: [where]

How I&apos;ll update the data: [manually each week / automatically from ___]

Based on this, ask me 3 clarifying questions that will help us build the right thing — not the most impressive thing, the most useful thing.`,

  "Build prompt (use in Claude Code)": `Build me a business dashboard using React.

PURPOSE: [one sentence — what this dashboard helps me do]

METRICS TO DISPLAY (top section — large, prominent numbers):
- [Metric 1 name]: sample value [X]
- [Metric 2 name]: sample value [X]
- [Metric 3 name]: sample value [X]

SECONDARY INFO (below the main metrics):
- [List or table showing: active projects / recent clients / upcoming tasks — choose one]
  - Sample data: [describe what a few rows would look like]

LAYOUT:
- Top: [2–4] metric cards in a row
- Middle: [table / list / two-column layout]
- Colors: [your brand color as hex, or "minimal white and gray"]

NOTES:
- Store sample data in a separate data file so I can easily update it
- Make it responsive — looks good on laptop and tablet
- Run with: npm run dev
- Keep it Version 1 simple — no charts unless I specifically ask`,

  "Iterate — change specific things": `The dashboard looks good. I want to make these specific changes:

CHANGE 1:
- What: [specific element — e.g. "The Revenue card"]
- Current state: [what it looks like now — e.g. "Shows the number in small gray text"]
- What I want: [e.g. "Make the number large (40px), dark, and bold. Add a small upward arrow next to it."]

CHANGE 2:
- What: [specific element]
- Current state: [what it looks like now]
- What I want: [what it should be]

CHANGE 3:
- What: [specific element]
- Current state: [current state]
- What I want: [desired state]

Make only these changes. Don&apos;t redesign, don&apos;t improve anything else.`,

  "When something looks broken": `Something isn the dashboard isn&apos;t working correctly. Here&apos;s the exact issue:

WHAT I SEE:
[Describe what&apos;s appearing on screen — e.g. "The Active Clients card shows '0' instead of a real number"]

WHAT SHOULD HAPPEN:
[What the correct output should be — e.g. "It should show '12' based on the clients array in data.js"]

WHERE THE DATA IS:
[Tell Claude Code where to look — e.g. "The data is in /src/data/clients.json, key name is 'activeCount'"]

Fix only this issue. If you&apos;re going to change more than 5 lines, check with me first.`,
};

export default function Session8Page() {
  return (
    <div className="h-screen bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href={PREV}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          W3 · S5
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
          W4 · S7
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
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed pt-0.5" dangerouslySetInnerHTML={{ __html: obj }} />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Plan before you build */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Plan before you build — 5 questions to answer first</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The most common reason a Claude Code build comes out wrong: the builder skipped planning. Use the planning prompt below to answer these questions before you type a single build command.
              </p>
              <div className="flex flex-col gap-3">
                {planningQuestions.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-[var(--beige-200)] dark:border-white/5 last:border-0 last:pb-0">
                    <span className="size-6 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[11px] font-semibold text-[var(--taupe-400)] mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.q}</p>
                      <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: item.hint }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* V1 mindset */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">The Version 1 mindset</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The goal of this session is <strong className="font-medium">a working first version you can show someone</strong> — not a perfect version that doesn&apos;t exist yet. A real dashboard with 3 metrics is worth more than a perfect dashboard that&apos;s still being designed.
              </p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Build V1, open it in the browser, show it to someone today, iterate. The iteration is where the learning happens.
              </p>
            </div>
          </section>

          {/* Iteration rules */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">How to describe what&apos;s wrong — precision matters</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Claude Code makes exactly the change you describe. Vague feedback creates random changes. Specific feedback creates precise improvements.
              </p>
              <div className="flex flex-col gap-3">
                {iterationRules.map((rule, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="rounded-lg border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] px-3 py-2">
                      <p className="text-[10px] font-semibold text-[var(--taupe-400)] uppercase tracking-[0.1em] mb-0.5">Don&apos;t say</p>
                      <p className="text-sm text-[var(--taupe-400)] font-light" dangerouslySetInnerHTML={{ __html: `"${rule.wrong}"` }} />
                    </div>
                    <div className="rounded-lg border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 px-3 py-2">
                      <p className="text-[10px] font-semibold text-[var(--clay-500)] uppercase tracking-[0.1em] mb-0.5">Say</p>
                      <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light" dangerouslySetInnerHTML={{ __html: `"${rule.right}"` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts — copy and use these</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Start with <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Dashboard planning conversation</strong> in Claude.ai. Then use the <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Build prompt</strong> directly inside Claude Code. Use the iteration prompts when you see the first version and want to refine it.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Deliverable */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-2">Week 3 Deliverable</p>
            <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
              1 custom business dashboard built with Claude Code — running in your browser, showing at least 3 of your real metrics with sample data you can update.
            </p>
          </div>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Your full Claude stack working together</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 4 · Session 7 — Sat, Jun 27</p>
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
