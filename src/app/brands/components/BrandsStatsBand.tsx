"use client";

import React from "react";

const STATS = [
  { value: "10+", label: "Brand Partners Stocked" },
  { value: "500+", label: "Product SKUs Available" },
  { value: "16+", label: "Years Serving Industry" },
  { value: "40+", label: "Cities Supplied Directly" },
];

export default function BrandsStatsBand() {
  return (
    <section className="border-y border-slate-200 bg-[#f8fafc] py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 sm:px-8 md:grid-cols-4 lg:px-12">
        {STATS.map((stat, idx) => (
          <div
            key={stat.label}
            className={`text-center ${
              idx > 0 ? "border-l border-slate-200" : ""
            }`}
          >
            <p className="text-4xl font-black text-[#0C356A] sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
