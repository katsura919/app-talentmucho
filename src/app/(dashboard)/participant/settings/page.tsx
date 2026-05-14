import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const fullName =
    profile?.full_name || user.user_metadata?.full_name || "";
  const email = user.email ?? "";

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="px-5 pt-6 pb-0 sm:px-8 sm:pt-8">
        <span className="tm-eyebrow block mb-2">Account</span>
        <h2
          className="font-serif font-light"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
        >
          Settings
        </h2>
        <p className="tm-body-sm mt-1">Manage your profile, email, and password.</p>
      </div>

      <div className="my-8 h-px bg-gradient-to-r from-transparent via-[var(--beige-200)] dark:via-white/10 to-transparent" />

      {/* Tabs — flex-1 fills remaining height, min-h-0 allows shrink */}
      <div className="flex-1 min-h-0 px-5 sm:px-8 pb-8">
        <SettingsForm fullName={fullName} email={email} />
      </div>
    </div>
  );
}
