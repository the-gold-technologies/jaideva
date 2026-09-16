"use client";

import React from "react";
import { Factory, Wrench, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";

const BRAND_PILLARS = [
  {
    title: "Refinery-Direct Authenticity",
    description:
      "Every barrel, pail, and carton is sourced through authorized refinery channels with verified batch test reports and tamper-proof seals.",
    icon: Factory,
  },
  {
    title: "Application-Matched Formulations",
    description:
      "Our lubrication specialists map the exact OEM specification, viscosity index, and operating temperature to eliminate equipment wear.",
    icon: Wrench,
  },
  {
    title: "Buffer Stock & Fast Road Logistics",
    description:
      "We maintain multi-brand buffer stock across major viscosity grades, eliminating factory shutdown risks and delivery delays.",
    icon: Truck,
  },
  {
    title: "Total Quality Assurance",
    description:
      "From sealed storage segregation to oil condition monitoring advisory, we help plants achieve optimal oil drain intervals and machinery health.",
    icon: ShieldCheck,
  },
];

export default function BrandsPillarsSection() {
  return (
    <section className="py-20 bg-white font-sans border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & 4 Pillars */}
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-black tracking-[0.25em] uppercase mb-2 text-[#C86218]">
              ENGINEERING RELIABILITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-[-0.03em] text-[#0C356A]">
              Strong Brands. Better Operations.
            </h2>
            <p className="mt-3 max-w-xl text-base text-slate-600 leading-relaxed">
              A trusted brand behind a lubricant isn&apos;t a formality &mdash; it&apos;s the
              difference between predictable maintenance and catastrophic machinery downtime.
            </p>

            <div className="mt-8 space-y-4">
              {BRAND_PILLARS.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#C86218]/40 hover:bg-white transition-all flex items-start gap-4 shadow-2xs"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0C356A]/10 text-[#0C356A]">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#0C356A]">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Engine Oil & Warehouse Photography Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
              <img
                src="/oil-drums-warehouse.jpg"
                alt="Sealed motor oil barrels and warehouse distribution"
                className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C356A]/90 via-[#0C356A]/25 to-transparent" />

              {/* Floating Verified Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0C356A] text-xs font-black uppercase tracking-wider shadow-sm">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  Authorized Refinery Stocks
                </span>
              </div>

              {/* Bottom Inset Card */}
              <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-slate-800">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-black uppercase text-[#C86218] tracking-wider">
                    REFINERY STOCK GUARANTEE
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    ISO VG 32 to 680
                  </span>
                </div>
                <div className="text-sm font-bold text-[#0C356A]">
                  Direct Factory-Sealed Distribution
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Over 10,000+ barrels and lubricants buffered for prompt industrial dispatch across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
