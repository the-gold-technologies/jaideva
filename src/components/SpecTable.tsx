"use client";

import React from "react";
import { FlaskConical } from "lucide-react";
import { normalizePropertiesTable } from "@/lib/propertiesTable";

interface SpecTableProps {
  title: string;
  /**
   * Title of the first (property name) column. `null`/`undefined` = never saved in the CMS
   * (older products), which falls back to "Property" on multi-column tables.
   */
  propertyHeader?: string | null;
  tableHeaders: unknown;
  rows: unknown;
}

/** Product properties table card (Physico-Chemical Properties and custom table sections). */
export function SpecTable({ title, propertyHeader, tableHeaders, rows }: SpecTableProps) {
  const specTable = normalizePropertiesTable(tableHeaders, rows);
  if (specTable.rows.length === 0) return null;

  const hasMultiCols = specTable.headers.length > 0;
  const propertyTitle =
    propertyHeader === null || propertyHeader === undefined
      ? hasMultiCols
        ? "Property"
        : ""
      : propertyHeader.trim();
  // Empty titles / columns are not shown
  const hasValueHeaders = specTable.headers.some(Boolean);
  const hasPropertyCol = !!propertyTitle || specTable.rows.some((r) => r.property);
  const hasHeaderRow = hasValueHeaders || (hasPropertyCol && !!propertyTitle);
  const colCount = specTable.colCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {title && (
        <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-[#002b5c]/10 flex items-center justify-center shrink-0">
            <FlaskConical size={16} className="text-[#002b5c]" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#002b5c] tracking-tight">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table
          className={`w-full text-left text-xs font-sans border-collapse ${hasMultiCols ? "min-w-max" : ""}`}
        >
          {hasHeaderRow && (
            <thead>
              <tr className="bg-[#002b5c]/5 border-b border-slate-200">
                {hasPropertyCol && (
                  <th
                    scope="col"
                    className="py-2.5 px-5 font-bold text-[#002b5c] border-r border-slate-200 last:border-r-0 text-[11px] uppercase tracking-wider w-[220px] min-w-[180px] whitespace-pre-line"
                  >
                    {propertyTitle}
                  </th>
                )}
                {hasMultiCols ? (
                  specTable.headers.map((hdr, hIdx) => (
                    <th
                      key={hIdx}
                      scope="col"
                      className="py-2.5 px-5 text-center font-bold text-[#002b5c] border-r border-slate-200 last:border-r-0 text-[11px] uppercase tracking-wider whitespace-pre"
                    >
                      {hdr}
                    </th>
                  ))
                ) : (
                  <th scope="col" />
                )}
              </tr>
            </thead>
          )}
          <tbody>
            {specTable.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className={`border-b border-slate-100 last:border-b-0 transition-colors ${
                  rIdx % 2 === 0
                    ? "bg-white hover:bg-slate-50/70"
                    : "bg-slate-50/60 hover:bg-slate-50"
                }`}
              >
                {hasPropertyCol && (
                  <th
                    scope="row"
                    className="py-2.5 px-5 font-semibold text-slate-700 border-r border-slate-200 text-[12px] text-left w-[220px] min-w-[180px] whitespace-pre-line"
                  >
                    {row.property}
                  </th>
                )}
                {row.values ? (
                  // One cell per column so rows always line up with the headers
                  row.values.map((v, vIdx) => (
                    <td
                      key={vIdx}
                      className="py-2.5 px-5 text-slate-800 font-bold border-r border-slate-100 last:border-r-0 text-center text-[12px] whitespace-pre"
                    >
                      {v}
                    </td>
                  ))
                ) : (
                  <td
                    colSpan={colCount}
                    className={`py-2.5 px-5 text-slate-800 font-bold text-[12px] whitespace-pre-line ${
                      hasMultiCols ? "text-center" : ""
                    }`}
                  >
                    {row.value}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
