"use client";

import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import ContainerLayout from "../../layouts/container-layout";
import TitleContentBlock from "../../contents/title-content-block";
import { Button } from "@/components/ui/button";
import SubHeadingText from "@/components/ui/sub-heading-text";

interface GenericTableProps<T> {
  title: string;
  overview: string;
  data: T[];
  columns: {
    key: keyof T | string;
    title: string;
    render?: (item: T) => ReactNode;
  }[];
  button?: {
    label: string;
    onClick: (item: T) => void;
    variant?: "secondary" | "destructive";
    size?: "sm" | "md" | "lg";
    disabled?: (item: T) => boolean;
  };
}

function GenericTable<T>({
  title,
  overview,
  data,
  columns,
  button,
}: GenericTableProps<T>) {
  if (!data || data.length === 0) return null;

  const renderValue = (value: unknown): ReactNode => {
    if (React.isValidElement(value)) return value;
    if (value === null || value === undefined) return "-";
    return String(value);
  };

  return (
    <>
      <SubHeadingText> {title} </SubHeadingText>
      {/* <p className=" ">{overview}</p> */}
      <Table className="w-full mt-5">
        <TableHeader style={{ backgroundColor: "var(--color-primary-dark)" }}>
          <TableRow className="hover:bg-transparent">
            {columns.map((col) => (
              <TableCell
                key={col.key as string}
                style={{ color: "var(--color-on-primary)", fontWeight: 500 }}
              >
                {col.title}
              </TableCell>
            ))}
            {button && (
              <TableCell
                style={{ color: "var(--color-on-primary)", fontWeight: 500 }}
                className="w-[140px]"
              />
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx} className="hover:bg-zinc-100 text-sm">
              {columns.map((col) => (
                <TableCell key={col.key as string}>
                  {col.render
                    ? col.render(row)
                    : renderValue(row[col.key as keyof T])}
                </TableCell>
              ))}
              {button && (
                <TableCell>
                  <Button
                    className="cursor-pointer  border-1"
                    size={"sm"}
                    variant={button.variant || "secondary"}
                    disabled={button.disabled?.(row) || false}
                    onClick={() => button.onClick(row)}
                  >
                    {button.label}
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default GenericTable;
