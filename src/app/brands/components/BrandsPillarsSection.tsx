"use client";

import React from "react";
import { Factory, Wrench, Truck, ShieldCheck } from "lucide-react";

const BRAND_PILLARS = [
  {
    title: "Refinery-Direct Authenticity",
    description:
      "Every barrel, pail, and carton is sourced through authorized refinery channels with verified batch test reports and tamper-proof seals.",
    icon: Factory,
  },
  {
    title: "Application-Matched Recommendations",
    description:
      "Our lubrication specialists map the exact OEM specification, viscosity index, and operating temperature to eliminate equipment wear.",
    icon: Wrench,
  },
  {
    title: "Buffer Stock & Fast Logistics",
    description:
      "We maintain multi-brand buffer stock across major viscosity grades, eliminating factory shutdown risks and delivery delays.",
    icon: Truck,
  },
  {
    title: "Total Quality Assurance",
    description:
      "From storage segregation to on-site oil condition monitoring advisory, we help plants achieve optimal oil drain intervals and machinery health.",
    icon: ShieldCheck,
  },
];

export default function BrandsPillarsSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:px-12">
      <h2 className="text-3xl font-black uppercase tracking-[-0.03em] text-[#0C356A] sm:text-4xl">
        Strong Brands. Better Operations.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        A trusted brand behind a lubricant isn't a formality — it's the
        difference between predictable maintenance and unplanned downtime.
      </p>

      <div className="mt-10 divide-y divide-slate-200 border-t border-slate-200">
        {BRAND_PILLARS.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:gap-8"
          >
            <div className="flex shrink-0 items-center gap-4 sm:w-64">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F4B24D]/15 text-[#C86218]">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-extrabold text-[#0C356A]">
                {title}
              </h3>
            </div>
            <p className="text-sm leading-6 text-slate-600 sm:flex-1">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
