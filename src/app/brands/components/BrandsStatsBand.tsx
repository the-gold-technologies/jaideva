"use client";

import React from "react";

// Updated with the 4 brand & scale metrics requested by the user
const STATS = [
  { value: "91%", label: "Growth in 3 Years" },
  { value: "24%", label: "CAGR (FY 22-23 to FY 25-26)" },
  { value: "1.9X", label: "Turnover in 3 Years" },
  { value: "60+", label: "Employee Strength" },
];

export default function BrandsStatsBand() {
  return (
    <section className="border-y border-slate-200 bg-[#f8fafc] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 divide-y sm:divide-y-0 md:divide-x divide-slate-200/80">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center px-4 pt-4 sm:pt-0"
            >
              <p className="text-4xl font-black text-[#0C356A] sm:text-5xl tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
