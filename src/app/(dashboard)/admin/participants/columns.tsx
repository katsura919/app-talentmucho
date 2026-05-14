"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { type Course } from "./course-access-dialog";

export type { Course };

export type Participant = {
  id: string;
  name: string;
  email: string;
  enrolledCourseIds: string[];
  enrolledAt: string;
};

export function buildColumns(courses: Course[]): ColumnDef<Participant>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8 font-semibold text-xs uppercase tracking-wider text-[var(--taupe-400)] hover:text-[var(--espresso-700)]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Participant
          <ArrowUpDown className="ml-1.5 size-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const name: string = row.getValue("name");
        const email: string = row.original.email;
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold text-white bg-[var(--charcoal-900)] dark:bg-[var(--accent)] dark:text-foreground">
              {initials}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground truncate">
                {name}
              </span>
              <span className="text-xs text-[var(--taupe-400)] truncate">{email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "enrolledCourseIds",
      header: () => (
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--taupe-400)]">
          Courses
        </span>
      ),
      cell: ({ row }) => {
        const ids: string[] = row.getValue("enrolledCourseIds");
        const count = ids.length;
        return count > 0 ? (
          <div className="flex items-center gap-1.5">
            <BookOpen className="size-3.5 text-[var(--clay-500)]" />
            <span className="text-sm text-[var(--charcoal-900)] dark:text-foreground">
              {count} course{count !== 1 ? "s" : ""}
            </span>
          </div>
        ) : (
          <span className="text-xs text-[var(--taupe-400)]">No access</span>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "enrolledAt",
      header: () => (
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--taupe-400)]">
          Joined
        </span>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-[var(--taupe-400)]">
          {new Date(row.getValue("enrolledAt")).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];
}
