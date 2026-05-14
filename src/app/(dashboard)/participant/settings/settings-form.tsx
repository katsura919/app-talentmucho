"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/animate-ui/components/radix/tabs";
import { updateProfile, updateEmail, updatePassword } from "@/app/actions/settings";

const initialState = { error: null };

interface Props {
  fullName: string;
  email: string;
}

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-[var(--espresso-700)] text-sm text-[var(--charcoal-900)] dark:text-foreground placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)] focus:border-transparent transition-all";

const btnClass =
  "tm-btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none";

const btnStyle = { padding: "0.625rem 1.25rem", fontSize: "0.875rem" };

function PasswordInput({
  name,
  autoComplete,
  placeholder = "••••••••",
}: {
  name: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        required
        autoComplete={autoComplete}
        minLength={6}
        placeholder={placeholder}
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

export function SettingsForm({ fullName, email }: Props) {
  const [profileState, profileAction, profilePending] = useActionState(updateProfile, initialState);
  const [emailState, emailAction, emailPending] = useActionState(updateEmail, initialState);
  const [passwordState, passwordAction, passwordPending] = useActionState(updatePassword, initialState);

  useEffect(() => {
    if (profileState?.error) toast.error(profileState.error);
    if (profileState?.success) toast.success("Name updated");
  }, [profileState]);

  useEffect(() => {
    if (emailState?.error) toast.error(emailState.error);
    if (emailState?.success)
      toast.success("Verification email sent", { description: "Click the link in your inbox to confirm." });
  }, [emailState]);

  useEffect(() => {
    if (passwordState?.error) toast.error(passwordState.error);
    if (passwordState?.success) toast.success("Password changed");
  }, [passwordState]);

  return (
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="flex flex-col md:flex-row gap-4 md:gap-6 h-full"
    >
      {/* Tab nav — horizontal on mobile, vertical on desktop */}
      <div className="w-full md:w-44 md:shrink-0">
        <TabsList className="flex flex-row md:flex-col h-auto w-full items-center md:items-stretch p-1.5">
          <TabsTrigger
            value="profile"
            className="justify-center md:justify-start px-3 py-2 md:py-2.5 h-auto flex-1 md:flex-none"
          >
            <User className="size-3.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="justify-center md:justify-start px-3 py-2 md:py-2.5 h-auto flex-1 md:flex-none"
          >
            <Mail className="size-3.5" />
            Email
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="justify-center md:justify-start px-3 py-2 md:py-2.5 h-auto flex-1 md:flex-none"
          >
            <Lock className="size-3.5" />
            Security
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Content — plain div, no TabsContents (avoids AutoHeight overflow:hidden clipping) */}
      <div className="flex-1 min-w-0">
        <TabsContent value="profile">
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 sm:p-6">
            <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground mb-5">
              Profile
            </h3>
            <form action={profileAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">
                  Full name
                </label>
                <input
                  type="text"
                  name="full_name"
                  defaultValue={fullName}
                  required
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <button type="submit" disabled={profilePending} className={btnClass} style={btnStyle}>
                {profilePending ? "Saving…" : "Save changes"}
              </button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="email">
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 sm:p-6">
            <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground mb-5">
              Email
            </h3>
            <form action={emailAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={email}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
                <p className="text-xs text-[var(--taupe-400)]">
                  A confirmation link will be sent to the new address.
                </p>
              </div>
              <button type="submit" disabled={emailPending} className={btnClass} style={btnStyle}>
                {emailPending ? "Sending…" : "Update email"}
              </button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 sm:p-6">
            <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground mb-5">
              Password
            </h3>
            <form action={passwordAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">
                  Current password
                </label>
                <PasswordInput name="current_password" autoComplete="current-password" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">
                    New password
                  </label>
                  <PasswordInput name="new_password" autoComplete="new-password" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">
                    Confirm password
                  </label>
                  <PasswordInput name="confirm_password" autoComplete="new-password" />
                </div>
              </div>
              <p className="text-xs text-[var(--taupe-400)]">Min 6 characters.</p>
              <button type="submit" disabled={passwordPending} className={btnClass} style={btnStyle}>
                {passwordPending ? "Updating…" : "Change password"}
              </button>
            </form>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
