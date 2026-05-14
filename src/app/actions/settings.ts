"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

type State = { error: string | null; success?: boolean };

export async function updateProfile(_prev: State, formData: FormData): Promise<State> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const fullName = (formData.get("full_name") as string | null)?.trim();
  if (!fullName) return { error: "Name is required" };

  const [authUpdate, profileUpdate] = await Promise.all([
    supabase.auth.updateUser({ data: { full_name: fullName } }),
    supabase
      .from("profiles")
      .update({ full_name: fullName, updated_at: new Date().toISOString() })
      .eq("id", user.id),
  ]);

  if (authUpdate.error) return { error: authUpdate.error.message };
  if (profileUpdate.error) return { error: profileUpdate.error.message };

  revalidatePath("/participant");
  revalidatePath("/participant/settings");
  return { error: null, success: true };
}

export async function updateEmail(_prev: State, formData: FormData): Promise<State> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const email = (formData.get("email") as string | null)?.trim();
  if (!email) return { error: "Email is required" };
  if (email === user.email) return { error: "That's already your current email" };

  const { error } = await supabase.auth.updateUser({ email });
  if (error) return { error: error.message };

  return { error: null, success: true };
}

export async function updatePassword(_prev: State, formData: FormData): Promise<State> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const currentPassword = formData.get("current_password") as string;
  const newPassword = formData.get("new_password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (!currentPassword || !newPassword || !confirmPassword)
    return { error: "All fields are required" };
  if (newPassword !== confirmPassword)
    return { error: "Passwords do not match" };
  if (newPassword.length < 6)
    return { error: "Password must be at least 6 characters" };

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  });
  if (signInError) return { error: "Current password is incorrect" };

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };

  return { error: null, success: true };
}
