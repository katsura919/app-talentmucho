"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

type AuthState = { error: string | null };

export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };

  const role =
    data.user.app_metadata?.role || data.user.user_metadata?.role;

  redirect(role === "admin" ? "/admin" : "/participant");
}

export async function register(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: "participant",
      },
    },
  });

  if (error) return { error: error.message };

  redirect("/participant");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  redirect("/login");
}
