"use client";

import React from "react";
import { ArrowRight, ShieldCheck, TrendingDown, ThermometerSnowflake, Clock, Award, Sparkles } from "lucide-react";

interface LessYouBurnImpactProps {
  onOpenEnquiry: (subject?: string) => void;
}

export default function LessYouBurnImpactSection({ onOpenEnquiry }: LessYouBurnImpactProps) {
  const PILLARS = [
    {
      icon: ThermometerSnowflake,
      metric: "-15°C to -22°C",
      title: "Reduced Sump Operating Heat",
      desc: "High-VI synthetic base stocks cut internal fluid shear and mechanical friction across heavy reduction gearboxes.",
    },
    {
      icon: Clock,
      metric: "2x to 3x Longer",
      title: "Extended Oil Drain Intervals",
      desc: "Superior thermal oxidation resistance prevents viscosity breakdown, doubling working hours between oil changes.",
    },
    {
      icon: TrendingDown,
      metric: "Up to 35%",
      title: "Lower Plant Lubrication TCO",
      desc: "Less lubricant consumed, zero sludge valve sticking, and eliminated unplanned catastrophic equipment downtime.",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#071f3b] text-white py-20 border-y border-white/10">
      {/* Background industrial glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,98,24,0.18),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D]/15 border border-[#F4B24D]/30 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#F4B24D] mb-4">
            <Award size={15} /> The Jai Deva Operating Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            "Less You Burn, The More You Earn"
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Lubrication isn't just an operating expense—it's your plant's frontline protection against friction, thermal breakdown, and multimillion-rupee machinery failures.
          </p>
        </div>

        {/* 3 Impact Pillars in a Clean Horizontal Flow (Not uniform cards!) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-[#F4B24D]/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C86218] text-white flex items-center justify-center mb-5 shadow-lg shadow-[#C86218]/30">
                  <Icon size={26} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#F4B24D] tracking-tight mb-2">
                  {p.metric}
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-wide mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onOpenEnquiry("Plant Lubrication TCO Assessment")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer hover:scale-105"
          >
            <span>Request Plant TCO Audit</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
