"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";

const SESSION = {
  tag: "W1 · S1",
  color: "#C4A882",
  weekLabel: "Week 1 · Knowing Claude",
  title: "The interface, Projects, your first conversation",
  date: "Sat, Jun 6",
  time: "10 AM–1 PM EST",
  videoUrl: null as string | null,
  description:
    "We start with the interface itself — getting oriented in Claude.ai, understanding how Projects differ from conversations, and building your first real exchange with Claude using your actual business context.",
  resources: [
    { label: "Session slides", href: "#" },
    { label: "Claude.ai interface guide", href: "#" },
    { label: "Projects quick-start", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-2";
const NEXT     = "/participant/courses/cohort-1/session-4";

const objectives = [
  "Navigate the Claude.ai interface confidently",
  "Understand the difference between a Project and a conversation",
  "Start a meaningful business conversation with Claude",
  "Leave with Claude knowing your actual business context",
];

const bringList = [
  "Claude.ai account — logged in and ready",
  "Your Bootcamp Map answers from the intake form",
  "3 real problems from your business you want help with",
];

const steps_project = [
  "Go to claude.ai and sign in",
  "Click "Projects" in the left sidebar",
  "Click "New Project" and name it after your business (e.g. \"Acme Co — General\")",
  "You're now inside a Project — any files or instructions you add here will persist across every conversation in this Project",
  "Leave the Project open for the exercises below",
];

const PROMPTS: Record<string, string> = {
  "Orient Claude to my business": `I run a [type of business — e.g. coaching practice, e-commerce store, design agency].

Here's the context you need to work with me effectively:

Business: [describe what you do in 2–3 sentences]
Customers: [who you serve and what they hire you to do]
Team size: [solo / small team of ___]
My biggest current challenge: [one clear, specific problem]
My goal for this bootcamp: [what I want to walk away able to do]

From now on in this Project, use this context to give me specific, relevant advice — not generic tips.

Before we start, ask me one clarifying question that would help you give me better answers.`,

  "Your first real ask": `Based on the business context I just gave you, help me with this specific task:

[Describe one task or problem from your actual business. Be specific — not "help me with marketing" but "help me write a follow-up email for a prospect who went quiet after our discovery call."]

Format your response as:
1. Your recommendation
2. The specific steps I should take
3. One thing to watch out for

Keep it practical. I should be able to act on this today.`,

  "Test Claude's understanding": `Before we go further, I want to check what you know about me.

Summarize my business in your own words — what I do, who I serve, and what I'm working on.

Then tell me:
- What types of tasks you think I should use you for most in this bootcamp
- What information you're still missing that would make you more useful
- One question you'd want me to answer before our next conversation`,
};

export default function Session3Page() {
  return (
    <div className="h-screen bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href={PREV}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Intake
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
          W1 · S2
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

          {/* Why this matters */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Why this session matters</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The participants who get the most out of Claude aren&apos;t the ones who use it the most — they&apos;re the ones who use it right from the start. That means treating Claude like a thinking partner, not a search engine. Vague questions get generic answers. Specific context gets specific, useful output.
              </p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                This session is about building that muscle. By the time you finish today, Claude will know enough about your business to give you advice that actually applies to you — not generic tips you could find anywhere.
              </p>
            </div>
          </section>

          {/* Projects vs Conversations */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Projects vs. conversations — the key difference</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                When you start a new conversation on Claude.ai, Claude has zero memory of you, your business, or anything you&apos;ve discussed before. Every new chat starts cold. For one-off questions, that&apos;s fine. For running your business, it&apos;s a problem.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 flex flex-col gap-1.5">
                  <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">Conversation</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed font-light">Starts fresh every time. Claude knows nothing about you. You have to re-explain your context in every session.</p>
                </div>
                <div className="rounded-xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-4 flex flex-col gap-1.5">
                  <p className="text-xs font-semibold text-[var(--clay-500)] uppercase tracking-[0.12em]">Project ✓</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed font-light">A persistent room where your files, custom instructions, and business context always live. Claude walks in already briefed.</p>
                </div>
              </div>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Think of a Project like hiring a contractor who keeps all your notes on file. Every time they show up, they already know your preferences, your style, and what you&apos;re working on. That&apos;s what we&apos;re building today.
              </p>
            </div>
          </section>

          {/* Create your first Project */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Create your first Project — step by step</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
              <ol className="flex flex-col gap-3">
                {steps_project.map((step, i) => (
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

          {/* Prompts to copy */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts — copy and use these in your Project</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Start with <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Orient Claude to my business</strong> — paste it into your new Project, fill in the blanks, and send. Then follow with the next two in order.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Exercise */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Your exercise for this session</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Do this before Session 2:</p>
              <ol className="flex flex-col gap-2">
                {[
                  "Create a Project named after your business (or just \"My Business — General\")",
                  "Paste the \"Orient Claude to my business\" prompt, fill it in with your real details, and send it",
                  "Answer Claude's clarifying question honestly",
                  "Use \"Your first real ask\" to get help with one actual task from your business this week",
                  "Paste the \"Test Claude's understanding\" prompt to see how well Claude has internalized your context",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="size-5 shrink-0 rounded-full border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[10px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="text-xs text-[var(--taupe-400)] font-light">
                Share the most surprising insight Claude gave you in the cohort group chat.
              </p>
            </div>
          </section>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Custom instructions, file uploads</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 1 · Session 2 — Sun, Jun 7</p>
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
