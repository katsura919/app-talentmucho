"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { register } from "@/app/actions/auth";
import { toast } from "sonner";

const initialState = { error: null };

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, initialState);

  useEffect(() => {
    if (state?.error) toast.error("Registration failed", { description: state.error });
  }, [state?.error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--beige-50)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="tm-eyebrow">AI Bootcamp</span>
          <h1
            className="mt-2 font-serif font-light text-[var(--charcoal-900)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
          >
            TalentMucho
          </h1>
        </div>

        <div className="tm-card">
          <h2 className="font-serif font-light text-2xl text-[var(--charcoal-900)] mb-1">
            Join the bootcamp
          </h2>
          <p className="tm-body-sm mb-6">
            Create your participant account to get started
          </p>

          <form action={formAction} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--espresso-800)]">
                Full name
              </label>
              <input
                type="text"
                name="full_name"
                required
                autoComplete="name"
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-lg border border-[var(--beige-200)] bg-white text-sm text-[var(--charcoal-900)] placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)] focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--espresso-800)]">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-[var(--beige-200)] bg-white text-sm text-[var(--charcoal-900)] placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)] focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--espresso-800)]">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-[var(--beige-200)] bg-white text-sm text-[var(--charcoal-900)] placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)] focus:border-transparent transition-all"
              />
              <p className="text-xs text-[var(--taupe-400)]">Min 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="tm-btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
            >
              {isPending ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--taupe-400)] mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--clay-500)] font-medium hover:text-[var(--clay-600)] transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
