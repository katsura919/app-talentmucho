"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, Users, Trash2, ShieldCheck } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/animate-ui/components/radix/tabs";
import {
  updateAdminProfile,
  updateAdminEmail,
  updateAdminPassword,
  promoteToAdmin,
  demoteAdmin,
} from "@/app/actions/admin-settings";

const initialState = { error: null };

export interface AdminProfile {
  id: string;
  full_name: string | null;
  email: string;
}

interface Props {
  fullName: string;
  email: string;
  currentUserId: string;
  admins: AdminProfile[];
}

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-[var(--espresso-700)] text-sm text-[var(--charcoal-900)] dark:text-foreground placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)] focus:border-transparent transition-all";

const btnClass =
  "tm-btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none";

const btnStyle = { padding: "0.625rem 1.25rem", fontSize: "0.875rem" };

const cardClass =
  "rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 sm:p-6";

function PasswordInput({ name, autoComplete }: { name: string; autoComplete?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        required
        autoComplete={autoComplete}
        minLength={6}
        placeholder="••••••••"
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

function AdminAvatar({ name, email }: { name: string | null; email: string }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : email[0].toUpperCase();
  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-semibold text-white"
      style={{ background: "var(--clay-500)" }}
    >
      {initials}
    </div>
  );
}

export function AdminSettingsForm({ fullName, email, currentUserId, admins }: Props) {
  const [profileState, profileAction, profilePending] = useActionState(updateAdminProfile, initialState);
  const [emailState, emailAction, emailPending] = useActionState(updateAdminEmail, initialState);
  const [passwordState, passwordAction, passwordPending] = useActionState(updateAdminPassword, initialState);
  const [promoteState, promoteAction, promotePending] = useActionState(promoteToAdmin, initialState);
  const [demotePending, startDemoteTransition] = useTransition();

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

  useEffect(() => {
    if (promoteState?.error) toast.error(promoteState.error);
    if (promoteState?.success) toast.success("User promoted to admin");
  }, [promoteState]);

  function handleDemote(userId: string, name: string | null) {
    startDemoteTransition(async () => {
      const result = await demoteAdmin(userId);
      if (result.error) toast.error(result.error);
      else toast.success(`${name ?? "User"} removed from admin team`);
    });
  }

  return (
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="flex flex-col md:flex-row gap-4 md:gap-6 h-full"
    >
      {/* Tab nav */}
      <div className="w-full md:w-44 md:shrink-0">
        <TabsList className="flex flex-row md:flex-col h-auto w-full items-center md:items-stretch p-1.5">
          <TabsTrigger value="profile" className="justify-center md:justify-start px-3 py-2 md:py-2.5 h-auto flex-1 md:flex-none">
            <User className="size-3.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="email" className="justify-center md:justify-start px-3 py-2 md:py-2.5 h-auto flex-1 md:flex-none">
            <Mail className="size-3.5" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="justify-center md:justify-start px-3 py-2 md:py-2.5 h-auto flex-1 md:flex-none">
            <Lock className="size-3.5" />
            Security
          </TabsTrigger>
          <TabsTrigger value="team" className="justify-center md:justify-start px-3 py-2 md:py-2.5 h-auto flex-1 md:flex-none">
            <Users className="size-3.5" />
            Team
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Profile */}
        <TabsContent value="profile">
          <div className={cardClass}>
            <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground mb-5">Profile</h3>
            <form action={profileAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">Full name</label>
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

        {/* Email */}
        <TabsContent value="email">
          <div className={cardClass}>
            <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground mb-5">Email</h3>
            <form action={emailAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">Email address</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={email}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
                <p className="text-xs text-[var(--taupe-400)]">A confirmation link will be sent to the new address.</p>
              </div>
              <button type="submit" disabled={emailPending} className={btnClass} style={btnStyle}>
                {emailPending ? "Sending…" : "Update email"}
              </button>
            </form>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className={cardClass}>
            <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground mb-5">Password</h3>
            <form action={passwordAction} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">Current password</label>
                <PasswordInput name="current_password" autoComplete="current-password" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">New password</label>
                  <PasswordInput name="new_password" autoComplete="new-password" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">Confirm password</label>
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

        {/* Team */}
        <TabsContent value="team">
          <div className="space-y-4">
            {/* Current admins */}
            <div className={cardClass}>
              <div className="flex items-center gap-2 mb-5">
                <ShieldCheck className="size-4 text-[var(--clay-500)]" />
                <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground">Admin Team</h3>
                <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--beige-200)] dark:bg-white/10 text-[var(--taupe-400)]">
                  {admins.length}
                </span>
              </div>

              {admins.length === 0 ? (
                <p className="text-sm text-[var(--taupe-400)]">No admins found.</p>
              ) : (
                <ul className="space-y-2">
                  {admins.map((admin) => {
                    const isYou = admin.id === currentUserId;
                    return (
                      <li
                        key={admin.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-[var(--beige-200)] dark:border-white/5"
                      >
                        <AdminAvatar name={admin.full_name} email={admin.email} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground truncate">
                            {admin.full_name ?? admin.email}
                            {isYou && (
                              <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-[var(--clay-500)]">
                                you
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-[var(--taupe-400)] truncate">{admin.email}</p>
                        </div>
                        {!isYou && (
                          <button
                            type="button"
                            onClick={() => handleDemote(admin.id, admin.full_name)}
                            disabled={demotePending}
                            title="Remove admin access"
                            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--taupe-400)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-40"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Add co-admin */}
            <div className={cardClass}>
              <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground mb-1">
                Add co-admin
              </h3>
              <p className="tm-body-sm mb-5">
                Enter the email of a registered participant to grant them admin access.
              </p>
              <form action={promoteAction} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="colleague@example.com"
                    className={inputClass}
                  />
                  <p className="text-xs text-[var(--taupe-400)]">
                    The user must already have a registered account. They&apos;ll get admin access on their next login.
                  </p>
                </div>
                <button type="submit" disabled={promotePending} className={btnClass} style={btnStyle}>
                  {promotePending ? "Promoting…" : "Grant admin access"}
                </button>
              </form>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
