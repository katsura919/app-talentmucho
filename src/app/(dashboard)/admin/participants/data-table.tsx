"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search, UserPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
} from "@/components/ui/context-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
  rowContextMenu?: (data: TData) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  rowContextMenu,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: { pagination: { pageSize: 10 } },
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-0 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none"
            style={{ color: "var(--taupe-400)" }}
          />
          <input
            placeholder="Search by name or email…"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            className="w-full h-9 pl-9 pr-4 text-sm rounded-xl border border-[var(--beige-200)] dark:border-white/10 bg-[var(--beige-50)] dark:bg-white/5 text-[var(--charcoal-900)] dark:text-foreground placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)]/30 focus:border-[var(--clay-500)] transition-all"
          />
        </div>

        <Button
          size="sm"
          className="gap-1.5 rounded-xl shrink-0 bg-[var(--charcoal-900)] text-white hover:bg-[var(--espresso-800)] dark:bg-foreground dark:text-background dark:hover:bg-[var(--beige-200)]"
        >
          <UserPlus className="size-3.5" />
          Add Participant
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-[var(--beige-200)] dark:border-white/5 hover:bg-transparent bg-[var(--beige-100)] dark:bg-[var(--muted)]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-10 px-4 first:pl-5 last:pr-5">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <ContextMenu key={row.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className={[
                        "border-b border-[var(--beige-200)] dark:border-white/5 hover:bg-[var(--beige-50)] dark:hover:bg-white/[0.02] data-[state=selected]:bg-[var(--beige-100)] dark:data-[state=selected]:bg-white/5 transition-colors",
                        onRowClick ? "cursor-pointer" : "",
                      ].join(" ")}
                      onClick={() => onRowClick?.(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4 py-3 first:pl-5 last:pr-5">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  </ContextMenuTrigger>
                  {rowContextMenu && (
                    <ContextMenuContent>
                      {rowContextMenu(row.original)}
                    </ContextMenuContent>
                  )}
                </ContextMenu>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-[var(--taupe-400)]"
                >
                  No participants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-[var(--taupe-400)]">
          {selectedCount > 0
            ? `${selectedCount} of ${totalCount} selected`
            : `${totalCount} participant${totalCount !== 1 ? "s" : ""}`}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--taupe-400)]">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-xl border-[var(--beige-200)] dark:border-white/10"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-xl border-[var(--beige-200)] dark:border-white/10"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
