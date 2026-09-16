"use client";

import React, { useState } from "react";
import { Cog, Gauge, Wind, Disc, ArrowRight, Droplets, CheckCircle2, ShieldCheck } from "lucide-react";

interface MachineryFeatureProps {
  onOpenEnquiry?: (systemName?: string) => void;
}

const SYSTEMS = [
  {
    id: "gearboxes",
    icon: Cog,
    title: "Heavy Industrial Gearboxes",
    spec: "ISO VG 150 to 680 • FVA 54 Certified",
    image: "/industrial-gear-oil.jpg",
    desc: "Formulated with sulfur-phosphorus EP chemistry to eliminate gear tooth micropitting in continuous planetary and helical drives.",
    oilHighlight: "HP Parthan EP / Mobilgear 600 XP / Omala S2 G",
    benefits: [
      "Zero micropitting under extreme shock loads",
      "Superior demulsibility against mill water ingress",
      "Flender, David Brown & Danieli approved",
    ],
  },
  {
    id: "hydraulics",
    icon: Gauge,
    title: "High-Pressure Hydraulic Systems",
    spec: "ISO VG 32, 46, 68 • DIN 51524 HLP/HVLP",
    image: "/oil-drums-warehouse.jpg",
    desc: "Engineered for high-flow proportional servo valves with ultra-rapid air release and sub-3-micron filterability.",
    oilHighlight: "HP Enklo / Mobil DTE 10 Excel / Tellus S2 MX",
    benefits: [
      "Thermal shear stability under continuous 250 bar",
      "Zero sticky sludge or servo valve hang-ups",
      "Denison HF-0, Eaton Vickers & Rexroth certified",
    ],
  },
  {
    id: "turbines",
    icon: Wind,
    title: "Turbines & Rotary Compressors",
    spec: "Non-Zinc Ashless • 20,000+ Hour Drain",
    image: "/oil-lab-quality.jpg",
    desc: "Ashless non-zinc formulation delivering extreme oxidation resistance and zero lacquer formation across high-speed rotating shafts.",
    oilHighlight: "HP Turbinol / Mobil DTE 700 / Rarus 427",
    benefits: [
      "Rapid water separation under steam condensates",
      "Ultra-low MPC Delta E varnish prevention",
      "GE, Siemens & Atlas Copco grade compliant",
    ],
  },
  {
    id: "bearings",
    icon: Disc,
    title: "Heavy Bearings & Open Girth Gears",
    spec: "NLGI 1, 2, 3 • High-Temp Synthetic Base",
    image: "/industrial-gear-oil.jpg",
    desc: "Heavy calcium sulfonate and polyurea greases with solid MoS2 for kiln hoods, vibrating screens, and heavy crusher bearings.",
    oilHighlight: "Molygraph Ultra / Mobilith SHC / Gadus S2",
    benefits: [
      "Drop point exceeding 280°C for extreme heat",
      "Resists heavy water spray and abrasive dust",
      "Extreme 4-ball weld load exceeding 400 kgf",
    ],
  },
];

export default function MachineryFeatureSection({ onOpenEnquiry }: MachineryFeatureProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activeSystem = SYSTEMS[activeTab];
  const Icon = activeSystem.icon;

  return (
    <section className="py-20 bg-[#f8fafc] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218]">
            Machinery-Specific Lubrication
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
            Critical Plant Machinery Systems
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Tailored viscosity grades and chemical additive packages designed for specific equipment stress points.
          </p>
        </div>

        {/* Dynamic System Tabs (Breaks the repetitive card pattern!) */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-200">
          {SYSTEMS.map((sys, idx) => {
            const TabIcon = sys.icon;
            const isSelected = idx === activeTab;
            return (
              <button
                key={sys.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#0C356A] text-white shadow-md shadow-[#0C356A]/20 scale-[1.02]"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-[#C86218] hover:text-[#0C356A]"
                }`}
              >
                <TabIcon size={16} className={isSelected ? "text-[#F4B24D]" : "text-[#C86218]"} />
                <span>{sys.title}</span>
              </button>
            );
          })}
        </div>

        {/* The Feature Display (Split layout with Large Image and Technical Highlights) */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg grid lg:grid-cols-12 gap-8 items-center">
          {/* Left 6 Cols: Large High-Resolution Machinery Image with Overlay */}
          <div className="lg:col-span-6 relative h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
            <img
              src={activeSystem.image}
              alt={activeSystem.title}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-md bg-[#0C356A] text-white text-xs font-black uppercase tracking-wider">
                {activeSystem.spec}
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#F4B24D] text-[#071f3b] flex items-center justify-center shadow-md">
                <Icon size={20} />
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Technical Specification & Product Match */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#C86218] mb-2">
                <ShieldCheck size={16} /> Machinery Protection Profile
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0C356A] uppercase tracking-tight">
                {activeSystem.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {activeSystem.desc}
              </p>

              {/* Benefits Checklist */}
              <div className="mt-6 space-y-2.5">
                {activeSystem.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-[#C86218] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Oils Box */}
              <div className="mt-6 p-4 rounded-xl bg-[#0C356A]/5 border border-[#0C356A]/15">
                <div className="text-[11px] font-black uppercase tracking-wider text-[#0C356A] flex items-center gap-1.5 mb-1">
                  <Droplets size={13} className="text-[#C86218]" />
                  <span>Equivalent Industrial Formulations:</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  {activeSystem.oilHighlight}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  onOpenEnquiry &&
                  onOpenEnquiry(`${activeSystem.title} - Machinery Specification & Quote`)
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                <span>Request Spec Sheet & Quote</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
