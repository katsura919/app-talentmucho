"use client";

import { useOptimistic, useTransition } from "react";
import { BookOpen, Lock, Unlock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/animate-ui/components/radix/dialog";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { toggleEnrollment } from "@/app/actions/enrollment";

export type Course = {
  id: string;
  title: string;
  slug: string;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: { id: string; name: string; email: string };
  courses: Course[];
  enrolledCourseIds: string[];
}

export function CourseAccessDialog({
  open,
  onOpenChange,
  participant,
  courses,
  enrolledCourseIds,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticIds, updateOptimistic] = useOptimistic(
    enrolledCourseIds,
    (state: string[], courseId: string) =>
      state.includes(courseId)
        ? state.filter((id) => id !== courseId)
        : [...state, courseId]
  );

  function handleToggle(courseId: string) {
    startTransition(async () => {
      updateOptimistic(courseId);
      await toggleEnrollment(participant.id, courseId);
    });
  }

  const initials = participant.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold text-white"
              style={{ background: "var(--charcoal-900)" }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <DialogTitle className="font-serif font-light text-base leading-snug">
                {participant.name}
              </DialogTitle>
              <DialogDescription className="text-xs truncate mt-0.5">
                {participant.email}
              </DialogDescription>
            </div>
          </div>
          <div
            className="text-xs font-semibold uppercase tracking-widest pt-1"
            style={{ color: "var(--clay-500)" }}
          >
            Course Access
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-2 pt-1">
          {courses.length === 0 && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No courses available.
            </p>
          )}
          {courses.map((course) => {
            const enrolled = optimisticIds.includes(course.id);
            return (
              <label
                key={course.id}
                className={[
                  "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                  enrolled
                    ? "border-[var(--clay-500)]/30 bg-[rgb(125_107_90/0.06)]"
                    : "border-[var(--beige-200)] dark:border-[var(--border)] hover:border-[var(--taupe-400)]/40",
                ].join(" ")}
              >
                <Checkbox
                  checked={enrolled}
                  onCheckedChange={() => handleToggle(course.id)}
                  disabled={isPending}
                  className="shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground leading-snug truncate">
                    {course.title}
                  </p>
                  <p className="text-xs text-[var(--taupe-400)] mt-0.5 uppercase tracking-wider">
                    {course.slug}
                  </p>
                </div>
                {enrolled ? (
                  <Unlock className="size-3.5 shrink-0 text-[var(--clay-500)]" />
                ) : (
                  <Lock className="size-3.5 shrink-0 text-[var(--taupe-400)]/50" />
                )}
              </label>
            );
          })}
        </div>

        <div
          className="flex items-center gap-1.5 pt-2 text-xs text-[var(--taupe-400)]"
          style={{ borderTop: "1px solid var(--beige-200)" }}
        >
          <BookOpen className="size-3" />
          {optimisticIds.length} of {courses.length} course
          {courses.length !== 1 ? "s" : ""} granted
        </div>
      </DialogContent>
    </Dialog>
  );
}
