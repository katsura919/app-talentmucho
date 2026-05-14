import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-[var(--charcoal-900)] flex flex-col items-center justify-center">
      <div className="text-center space-y-3">
        <span
          className="tm-eyebrow"
          style={{ color: "var(--taupe-400)" }}
        >
          Admin
        </span>
        <h1
          className="tm-h3 mt-2"
          style={{ color: "var(--beige-50)" }}
        >
          Dashboard
        </h1>
        <p style={{ color: "var(--taupe-400)", fontSize: "var(--text-sm)" }}>
          {user.user_metadata?.full_name || user.email}
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="mt-4 text-sm px-6 py-2.5 border border-[var(--taupe-400)] text-[var(--beige-100)] rounded-lg hover:border-[var(--beige-200)] hover:text-[var(--beige-50)] transition-all"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
