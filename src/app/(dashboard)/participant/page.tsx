import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function ParticipantDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-[var(--beige-50)] flex flex-col items-center justify-center">
      <div className="text-center space-y-3">
        <span className="tm-eyebrow">Participant</span>
        <h1 className="tm-h3 mt-2">Dashboard</h1>
        <p className="tm-body-sm">
          {user.user_metadata?.full_name || user.email}
        </p>
        <form action={logout}>
          <button type="submit" className="tm-btn-secondary mt-4 text-sm px-6 py-2.5">
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
