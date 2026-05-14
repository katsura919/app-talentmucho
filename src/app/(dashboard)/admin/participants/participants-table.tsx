"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import { buildColumns, type Participant, type Course } from "./columns";
import { DataTable } from "./data-table";
import { CourseAccessDialog } from "./course-access-dialog";
import {
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface Props {
  participants: Participant[];
  courses: Course[];
}

export function ParticipantsTable({ participants, courses }: Props) {
  const [selected, setSelected] = useState<Participant | null>(null);
  const columns = buildColumns(courses);

  return (
    <>
      <DataTable
        columns={columns}
        data={participants}
        onRowClick={(p) => setSelected(p)}
        rowContextMenu={(p) => (
          <>
            <ContextMenuLabel>{p.name}</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem
              onSelect={() => navigator.clipboard.writeText(p.email)}
            >
              Copy email
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => setSelected(p)}>
              <KeyRound className="size-3.5" />
              Manage access
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Remove</ContextMenuItem>
          </>
        )}
      />
      {selected && (
        <CourseAccessDialog
          open={true}
          onOpenChange={(open) => !open && setSelected(null)}
          participant={selected}
          courses={courses}
          enrolledCourseIds={selected.enrolledCourseIds}
        />
      )}
    </>
  );
}
