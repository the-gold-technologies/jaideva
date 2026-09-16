"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Clock, Award, Droplets, Factory } from "lucide-react";

interface IndustriesHeroProps {
  onOpenEnquiry: (productName?: string) => void;
  onSelectIndustry?: (industryId: string) => void;
}

export default function IndustriesHero({ onOpenEnquiry }: IndustriesHeroProps) {
  return (
    <div>
      {/* ── MAIN HERO BANNER ── */}
      <section className="relative isolate overflow-hidden bg-[#071f3b] text-white">
        <img
          src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=85"
          alt="Jai Deva Oil Co. Industrial Lubrication"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center brightness-[0.4]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#071f3b]/90 via-[#071f3b]/80 to-[#071f3b]/95" />

        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24 text-center">
          {/* Logo Brand Eyebrow with Motto */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D]/15 border border-[#F4B24D]/35 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#F4B24D] mb-5 backdrop-blur-md">
            <Award size={15} />
            <span>Jai Deva Oil Co. • Less You Burn, the More You Earn</span>
          </div>

          {/* Punchy Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.08] tracking-[-0.03em] text-white">
            Industrial Lubricants Engineered For{" "}
            <span className="text-[#F4B24D]">Peak Efficiency.</span>
          </h1>

          {/* Short, Scannable Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200 font-normal">
            Refinery-certified multi-brand oils, greases, and fluids tailored to minimize friction,
            extend machinery life, and cut your plant operating costs.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#sectors-grid"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C86218] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A74D0E] shadow-lg shadow-[#C86218]/30 cursor-pointer"
            >
              Explore Industries <ArrowRight size={16} />
            </a>
            <button
              type="button"
              onClick={() => onOpenEnquiry("Industrial Plant Assessment")}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b] cursor-pointer"
            >
              Request Plant Quote
            </button>
          </div>
        </div>
      </section>

      {/* ── QUICK METRICS BAND ── */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-black text-[#0C356A]">11+ Sectors</div>
              <div className="text-xs text-slate-600 mt-0.5">Heavy to Precision Plants</div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-black text-[#0C356A]">100% Genuine</div>
              <div className="text-xs text-slate-600 mt-0.5">Refinery Batch CoAs</div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-black text-[#0C356A]">24–48h</div>
              <div className="text-xs text-slate-600 mt-0.5">Emergency Plant Dispatch</div>
            </div>
            <div className="p-3">
              <div className="text-xl sm:text-2xl font-black text-[#C86218]">Up to 35%</div>
              <div className="text-xs text-slate-600 mt-0.5">Lubrication TCO Savings</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
