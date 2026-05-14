import { cookies } from "next/headers";
import { Users, BookOpen } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { type Participant, type Course } from "./columns";
import { ParticipantsTable } from "./participants-table";

export default async function ParticipantsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [profilesRes, coursesRes, enrollmentsRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, email, created_at")
      .eq("role", "participant")
      .order("created_at"),
    supabase
      .from("courses")
      .select("id, title, slug")
      .eq("is_published", true)
      .order("order_index"),
    supabase.from("enrollments").select("participant_id, course_id"),
  ]);

  const profiles = profilesRes.data ?? [];
  const courses: Course[] = (coursesRes.data ?? []) as Course[];
  const enrollments = enrollmentsRes.data ?? [];

  const enrollmentMap: Record<string, string[]> = {};
  for (const e of enrollments) {
    if (!enrollmentMap[e.participant_id]) enrollmentMap[e.participant_id] = [];
    enrollmentMap[e.participant_id].push(e.course_id);
  }

  const participants: Participant[] = profiles.map((p) => ({
    id: p.id,
    name: p.full_name ?? p.email,
    email: p.email,
    enrolledCourseIds: enrollmentMap[p.id] ?? [],
    enrolledAt: p.created_at,
  }));

  const totalWithAccess = participants.filter((p) => p.enrolledCourseIds.length > 0).length;
  const totalNoAccess = participants.filter((p) => p.enrolledCourseIds.length === 0).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <span className="tm-eyebrow block mb-2">Bootcamp Management</span>
          <h2
            className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
          >
            Participants
          </h2>
          <p className="tm-body-sm mt-1">
            View and manage all enrolled participants across cohorts.
          </p>
        </div>
        <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--beige-100)] dark:bg-[var(--card)] border border-[var(--beige-200)] dark:border-[var(--border)]">
          <Users className="size-5 text-[var(--clay-500)]" />
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex items-center gap-3 flex-wrap mb-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-[var(--beige-100)] dark:bg-[var(--card)] border-[var(--beige-200)] dark:border-[var(--border)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--taupe-400)]">
            Total
          </span>
          <span className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">
            {participants.length}
          </span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-[rgb(125_107_90/0.08)] border-[rgb(125_107_90/0.2)]">
          <BookOpen className="size-3 text-[var(--clay-500)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--clay-500)]">
            Has Access
          </span>
          <span className="text-sm font-semibold text-[var(--clay-500)]">
            {totalWithAccess}
          </span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-[var(--beige-100)] dark:bg-[var(--card)] border-[var(--beige-200)] dark:border-[var(--border)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--taupe-400)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--taupe-400)]">
            No Access
          </span>
          <span className="text-sm font-semibold text-[var(--taupe-400)]">
            {totalNoAccess}
          </span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-[var(--beige-100)] dark:bg-[var(--card)] border-[var(--beige-200)] dark:border-[var(--border)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--taupe-400)]">
            Courses
          </span>
          <span className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">
            {courses.length}
          </span>
        </div>
      </div>

      <ParticipantsTable participants={participants} courses={courses} />
    </div>
  );
}
