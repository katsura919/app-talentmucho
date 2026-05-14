"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import { toast } from "sonner";

const initialState = { error: null };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  useEffect(() => {
    if (state?.error) toast.error("Sign in failed", { description: state.error });
  }, [state?.error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[var(--beige-50)]">
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
            Welcome back
          </h2>
          <p className="tm-body-sm mb-6">Sign in to your account</p>

          <form action={formAction} className="space-y-4">
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
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-[var(--beige-200)] bg-white text-sm text-[var(--charcoal-900)] placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)] focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="tm-btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
            >
              {isPending ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--taupe-400)] mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--clay-500)] font-medium hover:text-[var(--clay-600)] transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
