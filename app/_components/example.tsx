"use client";

import { Input } from "@/components/Field";
import { SearchField } from "@/components/SearchField";
import {
  Table,
  TableBody,
  Cell as TableCell,
  Column as TableColumn,
  TableHeader,
  Row as TableRow,
} from "@/components/Table";
import { MoreHorizontalIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { columns, rowHeader, rows } from "@/data";
import { Button } from "@/components/Button";
import { Popover } from "@/components/Popover";
import { MenuTrigger } from "react-aria-components";
import { Menu, MenuItem } from "@/components/Menu";

export function Example() {
  const [filterText, setFilterText] = useState("");

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      return row.name.toLowerCase().includes(filterText.toLowerCase());
    });
  }, [rows, filterText]);

  return (
    <section className="flex flex-col gap-y-6">
      <SearchField
        aria-label="Search"
        onChange={setFilterText}
        value={filterText}
        placeholder="Filter by name..."
      >
        <Input className="border border-neutral-400 rounded px-3 py-1.5" />
      </SearchField>

      <p>{filteredRows.length} items</p>

      <Table
        aria-label="Fruits and vegetables"
        className="w-full"
        selectionMode="multiple"
      >
        <TableHeader columns={columns}>
          {(column) => {
            return (
              <TableColumn
                className="text-left p-1"
                isRowHeader={column.id === rowHeader}
              >
                {column.label}
              </TableColumn>
            );
          }}
        </TableHeader>
        <TableBody items={filteredRows}>
          {(row) => {
            return (
              <TableRow key={row.id} columns={columns}>
                {(column) => {
                  switch (column.id) {
                    case "actions": {
                      return (
                        <TableCell className="text-left p-1 border-b border-neutral-200">
                          <MenuTrigger>
                            <Button aria-label="Actions" variant="icon">
                              <MoreHorizontalIcon className="size-5" />
                            </Button>
                            <Popover placement="bottom end">
                              <Menu>
                                <MenuItem>Edit</MenuItem>
                                <MenuItem>Delete</MenuItem>
                              </Menu>
                            </Popover>
                          </MenuTrigger>
                        </TableCell>
                      );
                    }

                    default: {
                      return (
                        <TableCell className="text-left p-1 border-b border-neutral-200">
                          {row[column.id]}
                        </TableCell>
                      );
                    }
                  }
                }}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </section>
  );
}
