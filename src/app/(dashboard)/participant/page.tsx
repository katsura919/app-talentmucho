import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { BookOpen, Lock } from "lucide-react";

export default async function ParticipantDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] || "there";

  const [coursesRes, enrollmentsRes] = await Promise.all([
    supabase
      .from("courses")
      .select("id, title, description, slug")
      .eq("is_published", true)
      .order("order_index"),
    supabase
      .from("enrollments")
      .select("course_id")
      .eq("participant_id", user?.id ?? ""),
  ]);

  const courses = coursesRes.data ?? [];
  const enrolledIds = new Set((enrollmentsRes.data ?? []).map((e) => e.course_id));

  return (
    <div className="p-8">
      {/* Welcome */}
      <div className="relative mb-8 rounded-2xl overflow-hidden bg-[var(--beige-100)] dark:bg-[var(--card)] border border-[var(--beige-200)] dark:border-white/5 px-5 pt-6 pb-0 sm:px-8 sm:pt-8 flex items-end justify-between gap-4">
        <div className="relative z-10 pb-6 sm:pb-8">
          <span className="tm-eyebrow block mb-2">Welcome back</span>
          <h2
            className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            Good to see you, {firstName}.
          </h2>
          <p className="tm-body-sm mt-1">
            Here&apos;s a summary of your bootcamp progress.
          </p>
        </div>
        <Image
          src="/assets/stickers/abiemeri.png"
          alt=""
          width={180}
          height={180}
          className="shrink-0 select-none w-24 sm:w-36 md:w-[180px] h-auto object-contain"
          style={{ transform: "translateY(8px)" }}
          priority
        />
      </div>

      {/* Courses */}
      <div>
        <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground mb-4">
          My Courses
        </h3>

        {courses.length === 0 ? (
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-10 text-center">
            <BookOpen className="size-8 mx-auto mb-3 text-[var(--beige-300)]" />
            <p className="text-sm text-[var(--taupe-400)]">No courses available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => {
              const hasAccess = enrolledIds.has(course.id);
              return hasAccess ? (
                <Link
                  key={course.id}
                  href={`/participant/courses/${course.slug}`}
                  className="group rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col gap-3 hover:shadow-md hover:border-[var(--beige-300)] dark:hover:border-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="tm-eyebrow">{course.slug}</span>
                    <BookOpen className="size-4 text-[var(--taupe-400)]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground text-base leading-snug">
                      {course.title}
                    </h4>
                    {course.description && (
                      <p className="tm-body-sm mt-1 line-clamp-2">{course.description}</p>
                    )}
                  </div>
                  <div className="mt-auto pt-2 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between text-xs text-[var(--taupe-400)]">
                    <span>8 modules</span>
                    <span className="group-hover:underline">View course →</span>
                  </div>
                </Link>
              ) : (
                <div
                  key={course.id}
                  className="relative rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col gap-3 opacity-50 select-none"
                >
                  {/* Lock overlay */}
                  <div className="absolute inset-0 rounded-2xl flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: "var(--charcoal-900)" }}
                      >
                        <Lock className="size-4 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-[var(--charcoal-900)] dark:text-foreground bg-[var(--beige-50)] dark:bg-[var(--card)] px-2 py-0.5 rounded-full border border-[var(--beige-200)] dark:border-white/10">
                        No access
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="tm-eyebrow">{course.slug}</span>
                    <BookOpen className="size-4 text-[var(--taupe-400)]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground text-base leading-snug">
                      {course.title}
                    </h4>
                    {course.description && (
                      <p className="tm-body-sm mt-1 line-clamp-2">{course.description}</p>
                    )}
                  </div>
                  <div className="mt-auto pt-2 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between text-xs text-[var(--taupe-400)]">
                    <span>8 modules</span>
                    <span>Locked</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
