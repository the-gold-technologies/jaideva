"use client";

import React, { useState } from "react";
import {
  Factory,
  Building2,
  Zap,
  Car,
  Wrench,
  UtensilsCrossed,
  Shirt,
  FileText,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Flame,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface IndustryStageSectionProps {
  onOpenEnquiry: (productName?: string) => void;
}

export interface SectorStageItem {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  plantImage: string;
  oilImage: string;
  headline: string;
  promise: string; // "Less You Burn..."
  operatingCondition: string;
  equipment: string[];
  recommendedProduct: {
    name: string;
    grade: string;
    oemMatch: string;
    highlight: string;
  };
}

export const SECTOR_STAGE_DATA: SectorStageItem[] = [
  {
    id: "steel",
    name: "Steel & Metallurgy",
    shortName: "Steel & Metals",
    icon: Factory,
    plantImage:
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    oilImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    headline: "Extreme-Heat & Shock-Load Protection",
    promise: "Resists 650°C radiant heat & eliminates bearing seizure",
    operatingCondition: "Temps up to 650°C • Extreme Shock Load • Heavy Mill Scale",
    equipment: ["Continuous Casters (Concast)", "Hot & Cold Rolling Mills", "Heavy Reduction Drives"],
    recommendedProduct: {
      name: "HP Parthan EP 320 / 460 Heavy Industrial Gear Oil",
      grade: "ISO VG 320 / 460",
      oemMatch: "Flender, David Brown & Danieli Compliant",
      highlight: "FVA 54 Micropitting certified with high demulsibility against cooling spray water",
    },
  },
  {
    id: "cement",
    name: "Cement & Mining",
    shortName: "Cement & Mining",
    icon: Building2,
    plantImage:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80",
    oilImage:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=600&q=80",
    headline: "Abrasive Clinker Dust & Kiln Heat Resistance",
    promise: "Prevents girth gear pitting and cuts relubrication cycles",
    operatingCondition: "Kiln Drive 220°C • Fine Clinker Abrasives • High Vibration",
    equipment: ["Kiln Girth Gears & Pinions", "Ball Mills & VRMs", "Primary Jaw Crushers"],
    recommendedProduct: {
      name: "Synthetic Asphaltic Open Gear Compound 1000",
      grade: "ISO VG 1000 / Sprayable",
      oemMatch: "FLSmidth & Thyssenkrupp Approved",
      highlight: "Resilient heavy hydrodynamic cushion protecting gear teeth under 100+ ton loads",
    },
  },
  {
    id: "power",
    name: "Power Generation & Turbines",
    shortName: "Power & Turbines",
    icon: Zap,
    plantImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    oilImage:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=600&q=80",
    headline: "Varnish-Free Ultra-Clean Turbine Fluids",
    promise: "20,000+ hour oxidation life with zero servo valve sticking",
    operatingCondition: "Continuous 24/7 Run • Steam Condensation • High Thermal Stress",
    equipment: ["Gas & Supercritical Turbines", "EHV Transformers", "Boiler Feed Pumps"],
    recommendedProduct: {
      name: "Non-Zinc Ashless Premium Turbine Oil",
      grade: "ISO VG 32 / 46 (Group II / III)",
      oemMatch: "GE GEK 32568, Siemens TLV 9013",
      highlight: "Ultra-low MPC Delta E varnish rating guaranteeing rapid electro-hydraulic response",
    },
  },
  {
    id: "automotive",
    name: "Automotive & Logistics",
    shortName: "Automotive & Fleets",
    icon: Car,
    plantImage:
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80",
    oilImage:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    headline: "Heavy Fleet Efficiency & Press Hydraulics",
    promise: "Maximizes fleet km/L fuel savings and extends oil drains to 80k km",
    operatingCondition: "BS-VI DPF Aftertreatment • 250 Bar Stamping Cycle • Highway Hauls",
    equipment: ["Commercial Fleet HCVs", "Stamping Presses", "Heavy Axles & Differentials"],
    recommendedProduct: {
      name: "Kixx HDX API CK-4 15W-40 Low-SAPS Engine Oil",
      grade: "API CK-4 / CJ-4",
      oemMatch: "Cummins CES 20086, Volvo VDS-4.5, MB 228.31",
      highlight: "Protects particulate filters against ash buildup while lowering fuel burn",
    },
  },
  {
    id: "cnc",
    name: "Precision CNC & Engineering",
    shortName: "CNC & Machining",
    icon: Wrench,
    plantImage:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    oilImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    headline: "Bio-Stable Coolants & Anti-Chatter Waylubes",
    promise: "Extends tool life by 30% and eliminates slideway stick-slip",
    operatingCondition: "30,000 RPM Spindles • Micro-Tolerances • High Cutting Heat",
    equipment: ["Multi-Axis VMC/HMC Centers", "High-Speed Tool Spindles", "Precision Slideways"],
    recommendedProduct: {
      name: "Bio-Stable Soluble Coolant + Waylube 68",
      grade: "Semi-Synthetic + ISO VG 68",
      oemMatch: "DIN 51502 CGLP, Fives Cincinnati P-47",
      highlight: "Long sump life without odor, separating cleanly from tramp oils",
    },
  },
  {
    id: "food",
    name: "Food & Pharmaceuticals (H1)",
    shortName: "Food & Cleanroom",
    icon: UtensilsCrossed,
    plantImage:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    oilImage:
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80",
    headline: "100% Non-Toxic NSF H1 Certified Lubricants",
    promise: "Guarantees food safety compliance and resists caustic steam washdowns",
    operatingCondition: "Incidental Food Contact • Daily Chemical Washdown • Sub-Zero Freezers",
    equipment: ["Rotary Bottling Carousels", "Tablet Punch Presses", "Packaging Lines"],
    recommendedProduct: {
      name: "NSF H1 Synthetic Food-Grade Gear Oil & Grease",
      grade: "ISO VG 220 / NLGI 2",
      oemMatch: "FDA 21 CFR 178.3570, Halal & Kosher",
      highlight: "Odorless, colorless, and immune to wash-off during CIP sanitation cycles",
    },
  },
  {
    id: "textile",
    name: "Textile & Looms",
    shortName: "Textile & Looms",
    icon: Shirt,
    plantImage:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80",
    oilImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    headline: "Zero-Staining Scourable Needle Oils & Chain Fluids",
    promise: "Prevents fabric oil spots and resists carbonization in 240°C stenter ovens",
    operatingCondition: "1,200 Picks/min • 240°C Stenter Heat • High Lint Atmosphere",
    equipment: ["Knitting Needles & Sinkers", "Air-Jet Looms", "Stenter Drying Frames"],
    recommendedProduct: {
      name: "Washable Scourable Needle Oil + Synthetic Chain 220",
      grade: "ISO VG 22 / ISO VG 220",
      oemMatch: "Mayer & Cie, Terrot & Monforts Specs",
      highlight: "100% washable in standard scouring baths, leaving no spot stains",
    },
  },
];

export default function IndustryStageSection({ onOpenEnquiry }: IndustryStageSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSector = SECTOR_STAGE_DATA[activeIdx];
  const Icon = activeSector.icon;

  return (
    <section id="sector-stage" className="py-20 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── SECTION TITLE BAR ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218] mb-2">
              Interactive Sector Explorer
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
              Engineered Sector Formulations
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 font-medium">
              Jai Deva Oil Co. delivers on its promise:{" "}
              <span className="text-[#C86218] font-bold">"Less You Burn, the More You Earn"</span>
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>Select a sector to explore</span>
            <ChevronRight size={14} className="text-[#C86218]" />
          </div>
        </div>

        {/* ── INTERACTIVE STAGE (SPLIT SCREEN LAYOUT) ── */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 4 COLS: Clean Vertical Interactive Selector */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {SECTOR_STAGE_DATA.map((sector, idx) => {
              const SectorIcon = sector.icon;
              const isActive = idx === activeIdx;
              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#0C356A] text-white shadow-lg shadow-[#0C356A]/20 scale-[1.01]"
                      : "bg-[#f8fafc] text-slate-700 hover:bg-slate-100 hover:text-[#0C356A] border border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? "bg-white/15 text-[#F4B24D]" : "bg-white text-[#C86218] border border-slate-200"
                      }`}
                    >
                      <SectorIcon size={20} />
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-black uppercase tracking-wide truncate">
                        {sector.name}
                      </div>
                      <div
                        className={`text-xs truncate ${
                          isActive ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {sector.headline}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`shrink-0 ml-2 transition-transform ${
                      isActive ? "text-[#F4B24D] translate-x-0.5" : "text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT 8 COLS: Cinematic Feature Stage (Plant Photo + Floating Oil Card + Specs) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Cinematic Plant Banner with Floating Badges */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-10 bg-[#071f3b] text-white">
              <img
                src={activeSector.plantImage}
                alt={activeSector.name}
                className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.5] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b] via-[#071f3b]/50 to-transparent" />

              {/* Top Row: Sector Badge & Condition Chip */}
              <div className="relative flex flex-wrap items-center justify-between gap-3 z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#071f3b] shadow-md">
                  <Icon size={14} />
                  <span>{activeSector.name}</span>
                </div>
                <div className="text-xs font-bold text-slate-200 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  {activeSector.operatingCondition.split("•")[0]}
                </div>
              </div>

              {/* Bottom Row: The Jai Deva Promise & Machinery */}
              <div className="relative z-10 max-w-2xl mt-auto pt-8">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#F4B24D] mb-1.5">
                  <Sparkles size={13} /> The Jai Deva Promise
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight drop-shadow-md">
                  {activeSector.promise}
                </h3>

                {/* Covered Machinery Chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeSector.equipment.map((eq, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20"
                    >
                      ✓ {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Product & Oil Reflection Spotlight (Addresses User Request: Visual Oil/Product reflection!) */}
            <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-7 shadow-md flex flex-col sm:flex-row items-center gap-6">
              {/* Product Thumbnail with Gradient */}
              <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-slate-900 shrink-0 shadow-sm">
                <img
                  src={activeSector.oilImage}
                  alt={activeSector.recommendedProduct.name}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b] via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded bg-[#0C356A] text-white text-[10px] font-black uppercase tracking-wider">
                    {activeSector.recommendedProduct.grade}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2.5 right-2 text-center">
                  <span className="text-[10px] font-bold text-[#F4B24D] uppercase">
                    Refinery Certified
                  </span>
                </div>
              </div>

              {/* Product Description & Action */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C86218] mb-1">
                  <Droplets size={14} /> Recommended Industrial Formulation
                </div>
                <h4 className="text-base sm:text-lg font-black text-[#0C356A] leading-snug">
                  {activeSector.recommendedProduct.name}
                </h4>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                  {activeSector.recommendedProduct.highlight}
                </p>
                <div className="mt-2 text-[11px] font-bold text-slate-500">
                  OEM Compliance: {activeSector.recommendedProduct.oemMatch}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenEnquiry(
                        `${activeSector.name} - ${activeSector.recommendedProduct.name} Quote`,
                      )
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                  >
                    <span>Request Spec Sheet & Quote</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
