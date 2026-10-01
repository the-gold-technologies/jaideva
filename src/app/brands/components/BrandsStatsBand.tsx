"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export default function BrandsStatsBand() {
  const { pages } = useCMSStore();
  const { stats = [] } = pages["brands"]?.BrandsStatsBand || {};

  if (!Array.isArray(stats) || stats.length === 0) return null;

  return (
    <section className="border-y border-slate-200 bg-[#f8fafc] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 divide-y sm:divide-y-0 md:divide-x divide-slate-200/80">
          {stats.map((stat: { value: string; label: string }, idx: number) => (
            <div key={`${stat.label}-${idx}`} className="text-center px-4 pt-4 sm:pt-0">
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
