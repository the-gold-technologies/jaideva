"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  Flame,
  Droplets,
  Activity,
} from "lucide-react";

interface IndustriesHeroProps {
  onOpenEnquiry: (productName?: string) => void;
  onSelectIndustry?: (industryId: string) => void;
}

const QUICK_SECTORS = [
  { id: "steel", name: "Steel & Metals", temp: "Up to 650°C", focus: "Extreme Pressure & Shock Load" },
  { id: "cement", name: "Cement & Mining", temp: "Heavy Dust / 200°C", focus: "Kiln Drives & Heavy Wear" },
  { id: "power", name: "Power & Turbines", temp: "Continuous 24/7", focus: "Oxidation & Sludge Resistance" },
  { id: "automotive", name: "Automotive & Fleet", temp: "High RPM", focus: "Fuel Economy & Component Life" },
  { id: "food", name: "Food & Pharma H1", temp: "Hygienic Cleanroom", focus: "NSF H1 Non-Toxic Certified" },
  { id: "textile", name: "Textile & Looms", temp: "High Speed", focus: "Zero Fabric Staining" },
];

export default function IndustriesHero({
  onOpenEnquiry,
  onSelectIndustry,
}: IndustriesHeroProps) {
  const [activePreview, setActivePreview] = useState(QUICK_SECTORS[0]);

  return (
    <section className="relative isolate overflow-hidden bg-[#031124] text-white">
      {/* Cinematic Industrial Atmosphere */}
      <img
        src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=2400&q=85"
        alt="Steel manufacturing plant furnace and heavy equipment"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center opacity-25 mix-blend-luminosity"
      />

      {/* Layered Gradient Grids */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#031124]/90 via-[#061a35]/95 to-[#031124]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(200,98,24,0.25),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Top Eyebrow Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-12">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#F4B24D]/30 bg-[#F4B24D]/10 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F4B24D] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F4B24D]" />
            </span>
            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#F4B24D]">
              Plant-Level Industrial Lubrication
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs text-slate-300 font-semibold tracking-wide">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck size={16} /> 100% Genuine Batch CoAs
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5 text-[#F4B24D]">
              <Clock size={16} /> 24-48h Urgent Plant Dispatch
            </span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: 7 Cols */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-5xl lg:text-[4.2rem] font-black uppercase tracking-tight text-white leading-[1.02]">
              Precision Lubricants For Heavy Machinery &{" "}
              <span className="bg-gradient-to-r from-[#F4B24D] via-[#f7cb7b] to-[#C86218] bg-clip-text text-transparent">
                Critical Operations.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Every production line operates under distinct thermal loads, mechanical
              shear, and environmental friction. Jai Deva Oil Co. delivers engineered
              multi-brand lubrication solutions that extend drain intervals, reduce
              costly equipment downtime, and safeguard capital machinery.
            </p>

            {/* Quick Sector Selector Pills */}
            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F4B24D] mb-3">
                Select Your Sector For Immediate Recommendations:
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_SECTORS.map((sector) => {
                  const isActive = activePreview.id === sector.id;
                  return (
                    <button
                      key={sector.id}
                      type="button"
                      onClick={() => {
                        setActivePreview(sector);
                        if (onSelectIndustry) onSelectIndustry(sector.id);
                      }}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? "bg-[#C86218] text-white shadow-[0_4px_16px_rgba(200,98,24,0.4)]"
                          : "bg-white/5 border border-white/15 text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{sector.name}</span>
                      {isActive && <ChevronRight size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() =>
                  onOpenEnquiry(
                    `${activePreview.name} - Plant Lubrication Consultation`,
                  )
                }
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#C86218] hover:bg-[#a94e0e] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(200,98,24,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Request Plant Consultation</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="#sector-explorer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-4 text-sm font-bold uppercase tracking-wide text-slate-200 backdrop-blur-md transition-all duration-200"
              >
                <Layers size={17} className="text-[#F4B24D]" />
                <span>Explore Full Sector Matrix</span>
              </a>
            </div>
          </div>

          {/* Right Column: 5 Cols - Live Interactive Sector Dossier Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 via-white/[0.04] to-black/40 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F4B24D]">
                    Sector Operating Spec
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    {activePreview.name}
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0C356A] text-[#F4B24D] border border-white/10">
                  <Activity size={20} />
                </div>
              </div>

              {/* Technical Operating Parameters */}
              <div className="mt-5 space-y-3.5">
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/10">
                  <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Flame size={16} className="text-[#C86218]" /> Thermal Environment
                  </span>
                  <span className="text-xs font-bold text-white bg-black/30 px-2.5 py-1 rounded-md">
                    {activePreview.temp}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/10">
                  <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Droplets size={16} className="text-[#F4B24D]" /> Primary Lubrication Objective
                  </span>
                  <span className="text-xs font-bold text-[#F4B24D] bg-black/30 px-2.5 py-1 rounded-md text-right max-w-[180px]">
                    {activePreview.focus}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/10">
                  <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Building2 size={16} className="text-emerald-400" /> Supply Format
                  </span>
                  <span className="text-xs font-bold text-slate-200">
                    Barrels (210L) & Bulk Tankers
                  </span>
                </div>
              </div>

              {/* Performance Metric Callout */}
              <div className="mt-5 rounded-2xl bg-gradient-to-r from-[#0C356A]/80 to-[#133c70]/80 p-4 border border-[#F4B24D]/20">
                <div className="flex items-start gap-3">
                  <Sparkles size={20} className="text-[#F4B24D] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-white">
                      Guaranteed Multi-Brand Sourcing
                    </p>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      HPCL, Mobil, Castrol, Shell & Servo alternatives matched to your OEM warranties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button inside card */}
              <button
                type="button"
                onClick={() =>
                  onOpenEnquiry(
                    `${activePreview.name} Technical Datasheets & Pricing`,
                  )
                }
                className="mt-5 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-extrabold uppercase tracking-wider text-white transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Get {activePreview.name} Product Range</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Operational Proof Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-8">
          {[
            { metric: "16+ Years", label: "Industry Expertise", desc: "Operational since 2008" },
            { metric: "11+ Sectors", label: "Specialized Verticals", desc: "Heavy metals to food NSF H1" },
            { metric: "500+ Plants", label: "Active Industrial Clients", desc: "Supplied with repeat reliability" },
            { metric: "100% Certified", label: "Genuine Batch CoAs", desc: "Zero counterfeit assurance" },
          ].map((item) => (
            <div key={item.label} className="p-3">
              <p className="text-2xl sm:text-3xl font-black text-white">{item.metric}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#F4B24D] mt-1">
                {item.label}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
