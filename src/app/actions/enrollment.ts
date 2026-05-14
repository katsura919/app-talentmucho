"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function toggleEnrollment(
  participantId: string,
  courseId: string
): Promise<{ error: string | null }> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: existing } = await supabase
    .from("enrollments")
    .select("id")
    .eq("participant_id", participantId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("enrollments")
      .delete()
      .eq("id", existing.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("enrollments")
      .insert({ participant_id: participantId, course_id: courseId });
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/participants");
  return { error: null };
}
