"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Droplets,
  Shield,
  Cog,
  Wrench,
  Flame,
  Disc,
  ArrowRight,
  Sparkles,
  Award,
} from "lucide-react";

interface IndustryPortfolioBrandsProps {
  onOpenEnquiry?: (subject?: string) => void;
}

const PRODUCT_CATEGORIES = [
  { name: "Engine Oil", icon: Flame, desc: "High-performance automotive & heavy industrial engine protection." },
  { name: "Hydraulic Oil", icon: Droplets, desc: "Anti-wear hydraulic fluids for precision machinery and high-pressure pumps." },
  { name: "Gear Oil", icon: Cog, desc: "Extreme-pressure gear oils for heavy-duty reduction and transmission drives." },
  { name: "Automotive Grease", icon: Disc, desc: "Chassis and wheel bearing greases for fleet and commercial vehicles." },
  { name: "Industrial Grease", icon: Disc, desc: "High-temperature and severe shock-load greases for plant machinery." },
  { name: "Cutting Oil", icon: Wrench, desc: "Neat and bio-stable soluble coolants for precision CNC machining." },
  { name: "Rust Preventive Oil", icon: Shield, desc: "Superior de-watering and barrier films protecting metals from corrosion." },
  { name: "Industrial Lubricants", icon: Layers, desc: "Complete plant lubrication for circulating, turbine, and compressor systems." },
  { name: "Automotive Lubricants", icon: Flame, desc: "Driveline, transmission, and multi-grade motor oils for fleet productivity." },
  { name: "Specialty Lubricants", icon: Sparkles, desc: "Food-grade NSF H1, cleanroom paraffins, and high-temp synthetic fluids." },
  { name: "Other Lubrication Products", icon: Layers, desc: "Thermic heating fluids, slideway lubricants, and transformer insulating oils." },
];

const BRANDS_LIST = [
  { name: "HP Lubricants", desc: "Authorized Industrial Partner" },
  { name: "Valvoline", desc: "Automotive & Heavy Duty" },
  { name: "GS Caltex", desc: "Kixx Synthetic Range" },
  { name: "Idemitsu", desc: "Precision Japanese OEM Tech" },
  { name: "Molygraph", desc: "Specialty Greases & Moly Compounds" },
  { name: "MotulTech", desc: "High-Performance Industrial Fluids" },
  { name: "Deep Pneumatics", desc: "Compressor & Air Line Oils" },
  { name: "Lubricon", desc: "Customized Industrial Formulations" },
  { name: "TW Chemie", desc: "Advanced Metalworking Solutions" },
  { name: "Filtermist", desc: "Industrial Mist Extraction & Care" },
];

export default function IndustryPortfolioBrandsSection({
  onOpenEnquiry,
}: IndustryPortfolioBrandsProps) {
  return (
    <section className="py-20 bg-white text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header: Portfolio */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218]">
            Complete Lubrication Solutions
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
            Our Product Portfolio
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Jai Deva Oil Co. offers a wide range of products for industrial and automotive applications.
            Our multi-brand product portfolio enables us to cater to different equipment, machinery, and operational requirements.
          </p>
        </div>

        {/* 11 Product Categories Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PRODUCT_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => onOpenEnquiry && onOpenEnquiry(`${cat.name} Supply Enquiry`)}
                className="group rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 hover:bg-white hover:border-[#C86218] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0C356A]/5 group-hover:bg-[#0C356A] text-[#0C356A] group-hover:text-[#F4B24D] flex items-center justify-center transition-colors">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-[#C86218]">
                  <span>Request Grade Spec</span>
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Brand Distribution Showcase */}
        <div className="mt-16 rounded-3xl bg-[#071f3b] text-white p-8 sm:p-12 relative isolate overflow-hidden shadow-xl">
          <div
            className="absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(244,178,77,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(244,178,77,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B24D]">
              Multi-Brand Distribution
            </span>
            <h3 className="mt-2 text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Multiple Brands. Diverse Applications. One Trusted Partner.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Jai Deva Oil Co. works with multiple established lubricant and industrial solution brands
              to provide customers with a broad selection of products. Our multi-brand approach allows
              us to serve different industries and applications while helping customers source suitable
              lubrication products from a single distribution partner.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-slate-300">
              {[
                "Industrial Lubricants",
                "Automotive Lubricants",
                "Greases",
                "Hydraulic Oils",
                "Gear Oils",
                "Specialty Lubricants",
              ].map((pill) => (
                <span
                  key={pill}
                  className="bg-white/10 border border-white/15 px-3 py-1.5 rounded-lg text-slate-200"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Brands We Deal In Grid */}
          <div className="mt-10 pt-10 border-t border-white/10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B24D] mb-6">
              Brands We Deal In
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {BRANDS_LIST.map((b) => (
                <div
                  key={b.name}
                  className="rounded-xl bg-white/5 border border-white/10 p-4 hover:border-[#F4B24D] hover:bg-white/10 transition-all duration-200"
                >
                  <p className="text-sm font-black text-white">{b.name}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-[11px] text-slate-400 max-w-xl italic">
                * Brand names and distribution references are supplied under valid authorization and genuine refinery procurement channels.
              </p>
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C86218] hover:bg-[#a94e0e] px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors"
              >
                <span>Explore Full Brand Catalog</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
