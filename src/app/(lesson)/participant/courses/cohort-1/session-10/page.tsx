"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";

const SESSION = {
  tag: "W4 · S8",
  color: "#6B5A7A",
  weekLabel: "Week 4 · Living with Claude",
  title: "Showcases, Q&A, and graduation",
  date: "Sun, Jun 28",
  time: "10 AM–1 PM EST",
  videoUrl: null as string | null,
  description:
    "Every participant gets 2 minutes to share what they built. Then we close with open Q&A, a look at what comes next, and your graduation from Cohort 1.",
  resources: [
    { label: "Showcase template", href: "#" },
    { label: "30-day plan worksheet", href: "#" },
    { label: "Cohort 1 graduation resources", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-9";

const bringList = [
  "All 3 deliverables ready to show (Projects, AI employee, dashboard)",
  "One specific win or change from the past 4 weeks",
  "One question you still have about AI for your business",
];

const objectives = [
  "Present your 3 deliverables in 2 minutes",
  "Collect feedback and answer your final questions",
  "Write your 30-day plan",
  "Graduate from Cohort 1",
];

const deliverableChecklist = [
  { label: "3 Claude.ai Projects", desc: "Each configured with custom instructions and at least one uploaded file" },
  { label: "1 Cowork AI employee", desc: "Named, briefed with a system prompt, tested against 3 real scenarios" },
  { label: "1 Claude Code dashboard", desc: "Running in your browser with at least 3 metrics and sample data" },
  { label: "Written daily Claude routine", desc: "3 specific moments in your workday where Claude is open and ready" },
];

const whatComesNext = [
  { action: "Keep your AI employee running", desc: "Iterate on the system prompt as you learn what works. Most system prompts improve 3–4 times before they feel right." },
  { action: "Add a second Claude.ai Project", desc: "When you hit a new problem area — client communication, team management, product development — build a Project around it." },
  { action: "Build a second Claude Code tool", desc: "When you see a manual process that could be visual or interactive, that&apos;s your next build." },
  { action: "Teach someone else", desc: "Showing another person how to set up Claude.ai is the fastest way to lock in what you&apos;ve learned. Teach one person before next week." },
];

const PROMPTS: Record<string, string> = {
  "Your 30-day plan": `I just graduated from the AI Business Bootcamp. Here&apos;s what I built:

Claude.ai Projects:
1. [Project name] — use: [purpose]
2. [Project name] — use: [purpose]
3. [Project name] — use: [purpose]

Cowork AI employee:
- Name: [name], Role: [role]
- Handles: [main tasks]

Claude Code dashboard:
- Shows: [what it displays]
- I check it: [when]

My daily routine:
[Paste your written routine from Session 7]

One thing that already changed in my business: [describe — even small]

Write me a specific 30-day plan. Include:
1. Three things to build or improve in the next 30 days (be specific — not "improve my AI employee" but "add a rule to handle client refund requests without escalating")
2. One daily Claude habit to maintain (what, when, and what it replaces)
3. One team member or client to involve — and how to introduce them to what you&apos;ve built
4. One metric to track that will tell you Claude is actually working for your business`,

  "Teach someone else": `I want to introduce a [colleague / team member / business partner] to Claude.ai. They have no experience with AI tools yet.

About them: [describe their role, what they do day-to-day, what they might be skeptical about]

I want to show them:
1. How I use my [Project name] Project for [specific use case]
2. How my AI employee handles [specific task]
3. My dashboard and what it tells me

Write me:
1. A 5-minute intro script I can use to walk them through it — start with the "what&apos;s in it for them" before showing the tools
2. Three things I should let them try hands-on (so they feel it, not just watch)
3. One follow-up question I should ask them 3 days later`,

  "Review your practice in 30 days": `[Use this prompt 30 days from now — save it somewhere you&apos;ll find it]

It&apos;s been 30 days since I completed the AI Business Bootcamp. Here&apos;s my honest assessment:

What I&apos;ve actually been using:
- Claude.ai Projects: [how often, for what]
- My AI employee: [how often, what it&apos;s handling well, what still breaks]
- My dashboard: [how often, whether it&apos;s become a habit]
- My daily routine: [what stuck, what I dropped]

What I built or improved in the 30 days: [describe]

What&apos;s still not working: [be honest]

Based on this, tell me:
1. What to prioritize in the next 30 days
2. What to stop doing (even if I set it up — if it&apos;s not working, cut it)
3. One new thing to add to my Claude stack`,
};

export default function Session10Page() {
  return (
    <div className="h-screen bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href={PREV}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          W4 · S7
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
          href={OVERVIEW}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity"
        >
          Back to course
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

          {/* Final deliverables checklist */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Final deliverables — confirm you have all four</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              {deliverableChecklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-[var(--beige-200)] dark:border-white/5 last:border-0 last:pb-0 first:pt-0">
                  <div className="size-5 shrink-0 rounded border-2 border-[var(--beige-200)] dark:border-white/10 mt-0.5 flex items-center justify-center">
                    <span className="text-[var(--clay-500)] text-xs font-bold">✓</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.label}</p>
                    <p className="text-xs text-[var(--taupe-400)] font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Showcase format */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Your 2-minute showcase format</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                No slides required. This is a spoken presentation — show your actual work if you can share your screen. Keep it tight. The cohort learns as much from your specific details as from any session.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { time: "30 sec", content: "Who you are and what your business does — brief, the cohort knows you" },
                  { time: "45 sec", content: "What you built — be specific. \"I built a client intake AI employee named Alex who handles all first-response messages\" not \"I built an AI employee\"" },
                  { time: "30 sec", content: "One result or change — what&apos;s different now? Even small counts: \"I saved 2 hours last week\" or \"I sent my first AI-drafted proposal\"" },
                  { time: "15 sec", content: "What you&apos;re building or improving next — commit to one thing publicly" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs font-semibold text-[var(--taupe-400)] min-w-[48px] mt-0.5">{item.time}</span>
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What comes next */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What comes next — graduation is the beginning</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Graduation means you have a foundation — not that you&apos;re done. The businesses that get the most out of AI are the ones that keep iterating past the bootcamp. Here&apos;s what that looks like in practice:
              </p>
              <div className="flex flex-col gap-3">
                {whatComesNext.map((item) => (
                  <div key={item.action} className="flex items-start gap-3 py-2 border-b border-[var(--beige-200)] dark:border-white/5 last:border-0">
                    <div className="size-1.5 rounded-full bg-[var(--clay-500)] mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.action}</p>
                      <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts — use these today and in the weeks ahead</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Run <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Your 30-day plan</strong> in your Thinking Partner Project today. Save <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Review your practice in 30 days</strong> somewhere you&apos;ll find it — set a calendar reminder.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Graduation card */}
          <div className="rounded-2xl overflow-hidden border border-[var(--beige-200)] dark:border-white/5">
            <div className="px-6 py-5 bg-[var(--charcoal-900)] dark:bg-white flex flex-col gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 dark:text-black/50">Cohort 1 · June 2026</p>
              <p className="font-serif font-light text-white dark:text-[var(--charcoal-900)] text-lg">AI Business Bootcamp</p>
              <p className="text-sm text-white/70 dark:text-black/60 font-light">4 weeks · 9 live sessions · 4 real deliverables running in your business</p>
            </div>
            <div className="px-6 py-5 bg-white dark:bg-[var(--card)] flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">You&apos;ve completed Cohort 1</p>
                <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Congratulations. Keep building.</p>
              </div>
              <Link
                href={OVERVIEW}
                className="inline-flex items-center gap-2 shrink-0 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Back to course
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
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
