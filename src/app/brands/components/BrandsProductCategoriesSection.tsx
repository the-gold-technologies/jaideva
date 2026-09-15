"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BRAND_CATEGORIES = [
  {
    name: "Automotive Lubricants",
    description: "Engine oils, gear oils, coolants and driveline products.",
  },
  {
    name: "Industrial Oils",
    description: "Hydraulic, compressor, circulating and process lubricants.",
  },
  {
    name: "Greases & Specialty",
    description: "High-performance greases and anti-wear compounds.",
  },
  {
    name: "Metalworking Fluids",
    description: "Cutting fluids and machining support products.",
  },
  {
    name: "Rust Preventives",
    description: "Corrosion protection for storage and transit.",
  },
  {
    name: "Maintenance Products",
    description: "Cleaners, degreasers and workshop consumables.",
  },
];

export default function BrandsProductCategoriesSection() {
  return (
    <section className="bg-[#f8fafc] py-16 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black uppercase tracking-[-0.03em] text-[#0C356A] sm:text-4xl">
            Covering the Full Lubricant Spectrum
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Whatever the machine or industry, there's a formulation matched to
            it in our distribution catalog.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
          {BRAND_CATEGORIES.map((item) => (
            <Link
              key={item.name}
              href="/products"
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex-1 p-5">
                <h3 className="text-base font-extrabold text-[#0C356A] sm:text-lg">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2 bg-[#0C356A] px-5 py-3 transition-colors duration-300 group-hover:bg-[#C86218]">
                <span className="text-xs font-bold uppercase tracking-wide text-white">
                  View products
                </span>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
