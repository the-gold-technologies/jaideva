"use client";

import React from "react";
import {
  Users,
  Award,
  ShieldCheck,
  Building2,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Quote,
  Star,
  Sparkles,
} from "lucide-react";

interface AboutLeadershipProps {
  onOpenEnquiry?: (subject?: string) => void;
}

const STAT_TILES = [
  { label: "Year Established", value: "2008", desc: "16+ years continuous market leadership", icon: Calendar },
  { label: "Proprietorship", value: "Private Firm", desc: "Wholesaler, Distributor & Trader", icon: Building2 },
  { label: "Annual Turnover", value: "₹25 – 100 Cr", desc: "Robust commercial & supply volume", icon: TrendingUp },
  { label: "Total Employees", value: "26 – 50 People", desc: "Lubrication engineers & operations staff", icon: Users },
  { label: "Authorized Brands", value: "10+ Global Brands", desc: "Refinery-direct procurement channels", icon: Award },
  { label: "Product Portfolio", value: "500+ SKUs", desc: "Engine, hydraulic, gear, cutting & greases", icon: ShieldCheck },
];

export default function AboutLeadershipImageSection({ onOpenEnquiry }: AboutLeadershipProps) {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow and Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218]">
            Vision & Corporate Profile
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
            Leadership & Credibility
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Guided by visionary mentorship and backed by over a decade and a half of industry experience,
            Jai Deva Oil Co. stands as a premier distribution bridge between top global lubricant manufacturers
            and critical industrial operations.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Leadership Photo & Mentor Profile */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col justify-between">
              {/* Executive Image Card with Overlays */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
                  alt="Mr. Mayank Goyal - Mentor & Proprietor, Jai Deva Oil Co."
                  className="h-full w-full object-cover object-top filter brightness-[0.95]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b] via-[#071f3b]/40 to-transparent" />

                {/* Star rating badge */}
                <div className="absolute top-4 left-4 bg-[#0C356A]/85 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-white">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="text-[#F4B24D] fill-[#F4B24D]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-200 ml-1">
                    Industry Leader
                  </span>
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F4B24D]">
                    Mentor & Proprietor
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5">
                    Mr. Mayank Goyal
                  </h3>
                  <p className="text-xs text-slate-200 font-medium">
                    Jai Deva Oil Co. — Founded 2008
                  </p>
                </div>
              </div>

              {/* Mentor Quote & Leadership Statement */}
              <div className="p-6 sm:p-7 relative bg-white flex-1 flex flex-col justify-between">
                <Quote size={60} className="absolute top-3 right-4 text-[#0C356A]/5 pointer-events-none" />

                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic border-l-2 border-[#C86218] pl-4">
                    "Our objective has never been just selling barrels of oil; it is about guaranteeing machine reliability,
                    minimizing costly downtime, and ensuring our industrial clients receive genuine refinery-grade lubrication on time, every time."
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-2">
                    Under Mr. Goyal’s mentorship, Jai Deva Oil Co. has maintained long-standing dealer networks and industrial partnerships
                    anchored on transparent commercial terms and technical advisory.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0C356A] flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    Verified Proprietary Leadership
                  </span>
                  <span className="text-slate-400 text-[11px]">Since 2008</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Company Factsheet & Core Pillars Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* 6 Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STAT_TILES.map((tile) => {
                const Icon = tile.icon;
                return (
                  <div
                    key={tile.label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#C86218] hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0C356A]/5 text-[#0C356A] flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#C86218] bg-[#C86218]/10 px-2.5 py-1 rounded-md">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      {tile.label}
                    </p>
                    <p className="text-xl sm:text-2xl font-black text-[#0C356A] mt-1">
                      {tile.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {tile.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Strategic Value Proposition Dark Card */}
            <div className="rounded-3xl bg-[#071f3b] text-white p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#F4B24D] mb-3">
                  <Sparkles size={15} /> Distribution Core Values
                </div>
                <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  Why Leading Industries Rely on Jai Deva Oil Co.
                </h4>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#F4B24D] shrink-0 mt-0.5" />
                    <span><strong>100% Genuine Seals:</strong> Zero counterfeit risk through factory direct procurement.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#F4B24D] shrink-0 mt-0.5" />
                    <span><strong>Viscosity Cross-Referencing:</strong> Expert technical mapping between OEM specs.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#F4B24D] shrink-0 mt-0.5" />
                    <span><strong>Emergency Stock Reserves:</strong> Dedicated buffer warehouses for high-demand grades.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#F4B24D] shrink-0 mt-0.5" />
                    <span><strong>Direct Dispatch Logistics:</strong> Regional delivery networks covering 40+ manufacturing cities.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
