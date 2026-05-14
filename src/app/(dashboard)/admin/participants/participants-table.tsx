"use client";

import { buildColumns, type Participant, type Course } from "./columns";
import { DataTable } from "./data-table";

interface Props {
  participants: Participant[];
  courses: Course[];
}

export function ParticipantsTable({ participants, courses }: Props) {
  const columns = buildColumns(courses);
  return <DataTable columns={columns} data={participants} />;
}
