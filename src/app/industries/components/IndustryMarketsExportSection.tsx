"use client";

import React from "react";
import { Globe2, MapPin, Plane, CheckCircle2, TrendingUp, ArrowUpRight } from "lucide-react";

export default function IndustryMarketsExportSection() {
  const INTERNATIONAL_MARKETS = [
    {
      country: "Nepal",
      region: "South Asia",
      flag: "🇳🇵",
      desc: "Cross-border heavy industrial and automotive supply.",
    },
    {
      country: "Bangladesh",
      region: "South Asia",
      flag: "🇧🇩",
      desc: "Textile, power, and manufacturing lubrication.",
    },
    {
      country: "Russia",
      region: "Eurasia",
      flag: "🇷🇺",
      desc: "Industrial lubricant trading and product coordination.",
    },
    {
      country: "DR Congo",
      region: "Africa",
      flag: "🇨🇩",
      desc: "Mining, heavy machinery, and fleet equipment oils.",
    },
    {
      country: "Myanmar",
      region: "Southeast Asia",
      flag: "🇲🇲",
      desc: "Industrial engineering and automotive lubricants.",
    },
  ];

  const DOMESTIC_HIGHLIGHTS = [
    "Pan-India distribution network via road freight",
    "Delhi NCR same-day emergency dispatch capability",
    "Authorized dealer partnerships across 15+ states",
    "Customized bulk order scheduling for large plants",
  ];

  return (
    <section className="py-24 bg-white text-slate-800 relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0C356A]/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0C356A]/20 bg-[#0C356A]/5 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#0C356A] mb-5">
            <Globe2 size={14} />
            Market Footprint
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A] leading-[1.05]">
            Major Markets &{" "}
            <span className="text-[#C86218]">Export Presence</span>
          </h2>
          <p className="mt-5 text-base text-slate-600 leading-relaxed">
            Trusted business relationships across domestic and international
            corridors — serving critical manufacturing and export markets since
            2008.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Domestic Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Domestic card */}
            <div className="rounded-2xl bg-[#f8fafc] border border-slate-200 p-7 shadow-sm flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#0C356A]/10 text-[#0C356A] flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase text-[#0C356A]">
                    Pan-India Domestic Distribution
                  </h3>
                  <p className="text-xs text-slate-500">
                    Delhi NCR headquartered • 15+ state reach
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {DOMESTIC_HIGHLIGHTS.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-600 shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export logistics note */}
            <div className="rounded-2xl bg-[#0C356A] text-white p-6 shadow-lg">
              <div className="flex items-center gap-2 text-[#F4B24D] mb-3">
                <Plane size={18} />
                <span className="text-xs font-black uppercase tracking-wider">
                  Export Readiness
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                Seamless documentation, export packaging, and customs clearance
                support for international buyers. EXIM Code:{" "}
                <span className="text-[#F4B24D] font-bold">0515052311</span>
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-emerald-400">
                <CheckCircle2 size={14} />
                Cross-Border Ready
              </div>
            </div>
          </div>

          {/* Right: International Markets */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#071f3b] text-white p-7 sm:p-8 shadow-2xl border border-white/10 h-full relative overflow-hidden">
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(244,178,77,0.08),transparent)] pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C86218]/20 text-[#F4B24D] flex items-center justify-center">
                      <Globe2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-black uppercase text-white">
                        International Export Destinations
                      </h3>
                      <p className="text-xs text-slate-400">
                        Active trade relationships
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F4B24D] bg-[#F4B24D]/10 border border-[#F4B24D]/20 px-3 py-1.5 rounded-full">
                    5 Countries
                  </span>
                </div>

                <div className="space-y-3">
                  {INTERNATIONAL_MARKETS.map((m, idx) => (
                    <div
                      key={m.country}
                      className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/8 p-4 hover:bg-white/10 hover:border-[#C86218]/40 transition-all duration-200 cursor-default"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{m.flag}</span>
                        <div>
                          <p className="text-sm font-black text-white">
                            {m.country}
                          </p>
                          <p className="text-xs text-slate-400">{m.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#F4B24D] bg-[#F4B24D]/10 px-2.5 py-1 rounded-lg">
                          {m.region}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-white/20 group-hover:text-[#C86218] transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <MapPin size={14} className="text-[#F4B24D]" />
                    Headquartered: Delhi NCR, India
                  </div>
                  <span className="text-xs font-black text-emerald-400">
                    Est. 2008
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
