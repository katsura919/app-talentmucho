"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";

const SESSION = {
  tag: "W2 · S4",
  color: "#7D6B5A",
  weekLabel: "Week 2 · Delegating to Claude",
  title: "Build and test your first AI employee live",
  date: "Sun, Jun 14",
  time: "10 AM–1 PM EST",
  videoUrl: null as string | null,
  description:
    "You'll build your first named AI employee in Cowork from scratch: write the briefing, configure the role, and run it against real scenarios from your own business. By the end, your AI employee is live and tested.",
  resources: [
    { label: "AI employee briefing template", href: "#" },
    { label: "Testing scenarios worksheet", href: "#" },
    { label: "Week 2 deliverable checklist", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-5";
const NEXT     = "/participant/courses/cohort-1/session-7";

const bringList = [
  "The role you defined in Session 3 (name, title, responsibilities)",
  "Your draft system prompt from the Session 3 exercise",
  "3 real client requests (actual emails or messages you&apos;ve received)",
];

const objectives = [
  "Create a named AI employee in Cowork",
  "Brief them with a tested system prompt",
  "Run 3 real test scenarios and know what good looks like",
  "Iterate and improve based on what breaks",
];

const buildSteps = [
  "Open Cowork and click \"New Employee\"",
  "Give them a name (first name only — e.g. \"Alex\") and a job title",
  "Paste your system prompt into the briefing field",
  "Add reference files (same documents from your Claude.ai Project are a good start)",
  "Set your escalation rules — what should automatically come to you",
  "Save and open a test conversation",
];

const PROMPTS: Record<string, string> = {
  "System prompt template": `You are [Employee Name], [Job Title] for [Business Name].

ABOUT THE BUSINESS:
[Business Name] is a [type of business]. We serve [describe your clients — who they are, what they're trying to achieve, what they care about].

YOUR ROLE:
Your job is to [primary responsibility in one sentence]. You are the first point of contact for [type of interactions this employee handles].

YOUR RESPONSIBILITIES:
You handle the following autonomously:
- [Task 1: be specific — e.g. "Respond to new client inquiries within 24 hours with a warm, professional greeting and 3 qualifying questions"]
- [Task 2]
- [Task 3]

You escalate to [Owner/Manager Name] when:
- [Escalation trigger 1 — e.g. "A client expresses frustration or dissatisfaction"]
- [Escalation trigger 2]
- [Escalation trigger 3 — e.g. "A request falls outside the services we offer"]

TONE AND COMMUNICATION STYLE:
- Voice: [warm and professional / direct and efficient / friendly and approachable]
- Always write in full sentences. No bullet points in client-facing messages.
- Sign off with: [how you want messages to close]
- Never use: [words or phrases you want to avoid — e.g. "synergy", "circle back", "as per my last email"]

WHEN IN DOUBT:
If you&apos;re unsure how to handle something, say: "That&apos;s a great question — let me check with [Owner Name] and get back to you shortly." Do not guess. Do not make commitments you can&apos;t keep.`,

  "Test scenario pack": `Generate 3 test scenarios for my AI employee based on the system prompt I just gave you.

The scenarios should be:

SCENARIO 1 — EASY CASE:
A typical, straightforward interaction this employee handles all the time. They should be able to respond confidently and correctly.

SCENARIO 2 — EDGE CASE:
An unusual or ambiguous situation where the right answer isn&apos;t obvious. The employee should ask one clarifying question rather than guessing.

SCENARIO 3 — OUT OF SCOPE:
A request that is clearly outside this employee&apos;s role. The employee should acknowledge this gracefully and redirect the person without leaving them stuck.

For each scenario:
- Write the incoming message (as if from a real client)
- Write what an ideal response looks like
- Note what a bad response would look like (so I know what to watch for)`,

  "Debrief and iterate": `I just tested my AI employee against 3 scenarios. Here&apos;s what happened:

SCENARIO 1 result: [paste what your employee actually said]
What worked: [what was good]
What was off: [what missed the mark — tone, accuracy, format?]

SCENARIO 2 result: [paste what your employee actually said]
What worked: [what was good]
What was off: [what missed the mark]

SCENARIO 3 result: [paste what your employee actually said]
What worked: [what was good]
What was off: [what missed the mark]

Based on this, rewrite my system prompt to fix the problems I found. Show me the specific sections you changed and explain why each change helps.`,
};

export default function Session6Page() {
  return (
    <div className="h-screen bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href={PREV}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          W2 · S3
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
          W3 · S5
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

          {/* Three-part brief */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">The three-part employee brief</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Every AI employee that works well has three things fully defined before they go live. If any of these is vague, the employee will produce vague, inconsistent output.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "1. Identity", desc: "Who they are, what their job title is, and how they sound. A name makes them real — it&apos;s easier to refine \"Alex\" than \"my AI assistant.\"" },
                  { label: "2. Context", desc: "Your business, your clients, your standards, and your voice. This is where you upload your files and write your business description. The more specific, the better." },
                  { label: "3. Rules", desc: "What they handle autonomously vs. what they escalate. Without clear rules, your employee will either over-reach (making decisions they shouldn&apos;t) or under-reach (asking you about everything)." },
                ].map((part) => (
                  <div key={part.label} className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4">
                    <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground mb-1">{part.label}</p>
                    <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">{part.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Build steps */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Building in Cowork — step by step</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
              <ol className="flex flex-col gap-3">
                {buildSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="size-6 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[11px] font-semibold text-[var(--taupe-400)]">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Testing */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What good looks like — testing all 3 scenarios</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Before you declare your AI employee ready, run them through three types of scenarios. One easy, one ambiguous, one out of scope. Most employees fail the edge cases first — and that&apos;s where the iteration happens.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { scenario: "Easy case", expect: "Clean, accurate, sounds like your business. If this fails, your context or tone instructions are wrong." },
                  { scenario: "Edge case", expect: "Asks one good clarifying question before proceeding. If your employee guesses instead of asking, add a rule: \"When unsure, ask one question.\"" },
                  { scenario: "Out of scope", expect: "Acknowledges it&apos;s outside their role and tells the person exactly what to do next (contact you, wait, who to call). Never leaves them hanging." },
                ].map((item) => (
                  <div key={item.scenario} className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 flex flex-col gap-1.5">
                    <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">{item.scenario}</p>
                    <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">{item.expect}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts — copy and use these</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Start with the <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">System prompt template</strong> — paste it into Cowork as your employee&apos;s brief. Use <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Test scenario pack</strong> in Claude.ai to generate realistic test cases. After testing, use <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Debrief and iterate</strong> to improve.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Exercise */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Your exercise for this session</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Complete your AI employee by end of this week:</p>
              <ol className="flex flex-col gap-2">
                {[
                  "Paste your system prompt into Cowork and save your employee",
                  "Generate 3 test scenarios using the prompt above (in Claude.ai Thinking Partner)",
                  "Run all 3 scenarios in Cowork and record what happened",
                  "Use the \"Debrief and iterate\" prompt to get a revised system prompt",
                  "Update your employee&apos;s brief with the improved version",
                  "Run the scenarios one more time to confirm the issues are fixed",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="size-5 shrink-0 rounded-full border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[10px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Deliverable */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-2">Week 2 Deliverable</p>
            <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
              1 named AI employee in Cowork, briefed with a tested system prompt and confirmed to handle at least 3 real scenarios from your business.
            </p>
          </div>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Claude Code — your first build</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 3 · Session 5 — Sat, Jun 20</p>
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
                  <span dangerouslySetInnerHTML={{ __html: item }} />
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
