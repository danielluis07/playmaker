"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const convertLbToKg = (lb: number) => Math.round(lb * 0.453592);

  const convertHeightToMeters = (height: string) => {
    const [feet, inches] = height.split(/['"]/).map((value) => parseInt(value));
    const totalInches = feet * 12 + inches;
    const meters = (totalInches * 0.0254).toFixed(2);
    return `${meters}`;
  };

  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => {
                  let cellStyle = "";
                  if (cell.column.id === "jersey") {
                    cellStyle = "ml-5";
                  }

                  if (
                    cell.column.id === "position_abbreviation" ||
                    cell.column.id === "displayHeight"
                  ) {
                    cellStyle = "ml-3";
                  }

                  if (cell.column.id === "weight") {
                    cellStyle = "ml-3";
                  }

                  if (cell.column.id === "experience_years") {
                    cellStyle = "ml-10";
                  }

                  return (
                    <TableCell key={cell.id}>
                      <div className={cn(cellStyle)}>
                        {cell.column.id === "weight"
                          ? convertLbToKg(Number(cell.getValue()))
                          : cell.column.id === "displayHeight"
                          ? convertHeightToMeters(cell.getValue() as string)
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
