"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

export default function BrandsStatsBand() {
  const { pages } = useCMSStore();
  const { stats = [] } = pages["brands"]?.BrandsStatsBand || {};

  if (!Array.isArray(stats) || stats.length === 0) return null;

  return (
    <section className="bg-white border-b border-slate-200 py-6 sm:py-8 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center divide-y sm:divide-y-0 md:divide-x divide-slate-200/80">
          {stats.map((stat: { value: string; label: string; highlight?: boolean }, idx: number) => (
            <div key={`${stat.label}-${idx}`} className="p-3">
              <div
                className={`text-3xl sm:text-4xl font-black ${
                  stat.highlight ? "text-[#C86218]" : "text-[#0C356A]"
                } tracking-tight`}
              >
                <FormattedText text={stat.value} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                <FormattedText text={stat.label} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
