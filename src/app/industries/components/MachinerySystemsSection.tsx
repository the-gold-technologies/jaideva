"use client";

import React from "react";
import {
  Cog,
  Gauge,
  Wind,
  Disc,
  Wrench,
  Layers,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface MachinerySystemsSectionProps {
  onOpenEnquiry?: (systemName?: string) => void;
}

const MACHINERY_SYSTEMS = [
  {
    icon: Cog,
    title: "Heavy-Duty Industrial Gearboxes",
    spec: "ISO VG 150–1000 • Synthetic PAO & Mineral",
    desc: "Formulated with sulphur-phosphorus extreme pressure (EP) chemistry to prevent micropitting and gear tooth scuffing in continuous planetary, bevel, and helical drives.",
    keyPoints: [
      "Micropitting resistance (FVA 54 test)",
      "Non-foaming under high churning",
      "Flender & David Brown compliant",
    ],
    color: "from-[#0C356A] to-[#0a2857]",
    accent: "#F4B24D",
  },
  {
    icon: Gauge,
    title: "High-Pressure Hydraulic Systems",
    spec: "ISO VG 32, 46, 68 • DIN 51524 HLP / HVLP",
    desc: "Engineered for tight-tolerance proportional valves and high-flow vane/piston pumps with ultra-rapid air release and superior filterability.",
    keyPoints: [
      "Thermal shear stability",
      "Zero sludge valve sticking",
      "Denison HF-0 & Eaton Vickers approved",
    ],
    color: "from-[#1a4480] to-[#0f2f60]",
    accent: "#C86218",
  },
  {
    icon: Wind,
    title: "Industrial Turbines & Compressors",
    spec: "Rotary Screw & Centrifugal • 8,000+ Hr Drain",
    desc: "Ashless, premium non-zinc lubricants designed for extreme oxidation stability and zero lacquer formation in high-speed rotating equipment.",
    keyPoints: [
      "Rapid water demulsibility",
      "Zero varnish formation",
      "GE, Siemens & Atlas Copco grade match",
    ],
    color: "from-[#0C356A] to-[#0a2857]",
    accent: "#F4B24D",
  },
  {
    icon: Disc,
    title: "Heavy Bearings & High-Temp Grease",
    spec: "NLGI 1, 2, 3 • Polyurea, Lithium Complex & Sulfonate",
    desc: "Specially fortified with Moly (MoS2) and extreme water-washout inhibitors for kiln trunnions, vibrating screens, and furnace roller bearings.",
    keyPoints: [
      "Drop point > 280°C",
      "High 4-Ball weld load (> 400 kgf)",
      "Corrosion protection in wet washdown",
    ],
    color: "from-[#7c2d0e] to-[#5a1f08]",
    accent: "#F4B24D",
  },
  {
    icon: Wrench,
    title: "CNC & Precision Metalworking Coolants",
    spec: "Neat Oils & Bio-Stable Soluble Coolants",
    desc: "Chlorine-free extreme-pressure cutting fluids providing high surface finishes and extended carbide tool life in multi-axis machining.",
    keyPoints: [
      "Bio-stable, odor-free sumps",
      "Low foaming at high pressure (>70 bar)",
      "Tramp oil rejective chemistry",
    ],
    color: "from-[#1a4480] to-[#0f2f60]",
    accent: "#C86218",
  },
  {
    icon: Layers,
    title: "Circulating & Heat Transfer Systems",
    spec: "Mineral & Synthetic Thermic Fluids to 320°C",
    desc: "High specific heat capacity thermal oils designed to resist cracking and carbon deposition in closed-loop industrial heating circuits.",
    keyPoints: [
      "High flash point (> 220°C)",
      "Low vapor pressure to avoid pump cavitation",
      "Long thermal cracking resistance",
    ],
    color: "from-[#0C356A] to-[#0a2857]",
    accent: "#F4B24D",
  },
];

export default function MachinerySystemsSection({
  onOpenEnquiry,
}: MachinerySystemsSectionProps) {
  return (
    <section className="py-24 bg-[#071f3b] text-white relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(200,98,24,0.15),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#F4B24D]/30 bg-[#F4B24D]/10 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#F4B24D] mb-5 backdrop-blur-sm">
            <Cog size={14} />
            Machinery-Specific Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
            Critical Plant Systems{" "}
            <span className="bg-gradient-to-r from-[#F4B24D] to-[#C86218] bg-clip-text text-transparent">
              We Safeguard
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Industrial downtime is almost always triggered by a failure in one
            of these six core mechanical systems. Here is how our lubrication
            matrix keeps them running.
          </p>
        </div>

        {/* Machinery Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MACHINERY_SYSTEMS.map((sys, idx) => {
            const Icon = sys.icon;
            return (
              <div
                key={sys.title}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 flex flex-col justify-between hover:bg-white/10 hover:border-[#C86218]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                {/* System Number */}
                <div className="absolute top-5 right-5 text-[11px] font-black uppercase tracking-widest text-white/20 group-hover:text-[#F4B24D]/60 transition-colors">
                  0{idx + 1}
                </div>

                <div>
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sys.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={26} color={sys.accent} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-lg font-black text-white leading-snug group-hover:text-[#F4B24D] transition-colors">
                    {sys.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] font-bold text-[#C86218] uppercase tracking-wider">
                    {sys.spec}
                  </p>
                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    {sys.desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                    {sys.keyPoints.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center gap-2 text-xs text-slate-300 font-medium"
                      >
                        <CheckCircle
                          size={13}
                          className="text-emerald-400 shrink-0"
                        />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenEnquiry && onOpenEnquiry(`${sys.title} Recommendation`)
                  }
                  className="mt-7 w-full py-3 rounded-xl bg-white/5 hover:bg-[#C86218] border border-white/10 hover:border-[#C86218] text-white text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Consult On This System</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
