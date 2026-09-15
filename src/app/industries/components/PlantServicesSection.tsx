import React from "react";
import {
  TestTube2,
  FileCheck2,
  Boxes,
  Truck,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface PlantServicesProps {
  onOpenEnquiry?: (serviceName?: string) => void;
}

const PLANT_SERVICES = [
  {
    icon: TestTube2,
    title: "Used Oil Laboratory Analysis",
    tagline: "Predictive Health Monitoring",
    description:
      "Routine oil sampling and laboratory testing for kinematic viscosity, Total Acid Number (TAN), moisture ppm, and spectroscopic elemental wear metals (Fe, Cu, Cr, Al).",
    deliverable:
      "Detailed lab report with actionable maintenance recommendations.",
    highlight: true,
  },
  {
    icon: Boxes,
    title: "Plant SKU Rationalization",
    tagline: "Inventory & Cost Reduction",
    description:
      "Our lubrication engineers audit your plant equipment to consolidate dozens of redundant grease and oil grades into 8–10 high-performance multi-grade lubricants.",
    deliverable:
      "Up to 35% reduction in carrying inventory & zero accidental cross-contamination.",
    highlight: false,
  },
  {
    icon: FileCheck2,
    title: "OEM Warranty Compliance Mapping",
    tagline: "100% Manufacturer Compliance",
    description:
      "Mapping your machine manuals (Flender, Danieli, Rexroth, Cincinnati, Siemens) directly to certified multi-brand equivalents from HPCL, Mobil, Castrol, and Shell.",
    deliverable:
      "Certified cross-reference chart with batch Test Certificates (CoAs).",
    highlight: false,
  },
  {
    icon: Truck,
    title: "Dedicated Emergency Dispatch",
    tagline: "Guaranteed Zero Line Stoppage",
    description:
      "Stock reserves maintained across standard industrial viscosity grades (ISO VG 32 to 680) ready for same-day dispatch in barrels (210L) or bulk tankers during emergency leaks.",
    deliverable:
      "Priority dispatch hotlines for registered industrial manufacturing clients.",
    highlight: false,
  },
];

export default function PlantServicesSection({
  onOpenEnquiry,
}: PlantServicesProps) {
  return (
    <section className="py-24 bg-white text-slate-800 relative overflow-hidden border-t border-slate-100">
      {/* Decorative side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#C86218] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218] mb-5">
              <ShieldCheck size={14} />
              Plant Services Beyond Product Supply
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A] leading-[1.05]">
              Technical Lubrication{" "}
              <span className="text-[#C86218]">Management</span>
              <br className="hidden sm:block" /> For Modern Plants
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              We do not just deliver oil drums to your factory gate. We partner
              with maintenance heads and plant managers to optimize lubrication
              lifecycle costs.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenEnquiry &&
              onOpenEnquiry("Comprehensive Plant Lubrication Audit")
            }
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0C356A] hover:bg-[#C86218] px-7 py-4 text-sm font-black uppercase tracking-wider text-white transition-all duration-300 cursor-pointer shrink-0 shadow-lg hover:shadow-[0_8px_30px_rgba(200,98,24,0.35)]"
          >
            <Zap size={16} />
            <span>Book A Plant Lube Audit</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANT_SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.title}
                className="group relative rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 flex flex-col justify-between hover:bg-white hover:border-[#0C356A] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step badge */}
                <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#0C356A]/5 group-hover:bg-[#0C356A] text-[#0C356A] group-hover:text-white text-[11px] font-black flex items-center justify-center transition-all duration-300">
                  {idx + 1}
                </div>

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0C356A] to-[#0a2c58] text-[#F4B24D] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C86218]">
                    {srv.tagline}
                  </span>
                  <h3 className="text-base font-black text-[#0C356A] mt-1.5 leading-snug group-hover:text-[#C86218] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 group-hover:border-[#0C356A]/20 transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Tangible Result:
                  </span>
                  <p className="text-xs font-bold text-emerald-700 mt-1 leading-relaxed">
                    ✓ {srv.deliverable}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
