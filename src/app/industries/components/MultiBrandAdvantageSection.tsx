import React from "react";
import {
  CheckCircle2,
  TrendingDown,
  Layers,
  Award,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const ADVANTAGES = [
  {
    icon: Layers,
    title: "Zero Brand Lock-In",
    desc: "Single-brand oil reps are obligated to sell their own product line even when an alternative brand has an OEM approval that fits your machine better. We recommend the exact right formulation for your warranty.",
  },
  {
    icon: TrendingDown,
    title: "Optimized Lubrication TCO",
    desc: "By matching high-performance synthetics only where extreme heat/loads demand it and premium mineral grades where appropriate, we reduce your total cost of lubrication without risking equipment health.",
  },
  {
    icon: Award,
    title: "100% Guaranteed Genuine Stocks",
    desc: "Industrial oil counterfeiting is a major threat to multi-crore machinery. Every batch supplied by Jai Deva Oil Co. is sourced directly from certified refineries with manufacturer Certificates of Analysis (CoA).",
  },
  {
    icon: Zap,
    title: "Supply Continuity Assurance",
    desc: "Refinery scheduled turnarounds or base oil shortages can choke a single-brand supply chain. With our broad multi-brand inventory, your plant never faces supply stock-outs.",
  },
];

const BRAND_CERTS = [
  "HPCL (Hindustan Petroleum) Authorized Industrial Partner",
  "Mobil Industrial Synthetic & Mineral Fluids",
  "Castrol High-Performance Industrial & Metalworking",
  "Shell, Servo & Valvoline Alternative Formulations",
];

export default function MultiBrandAdvantageSection() {
  return (
    <section className="py-24 bg-[#f8fafc] text-slate-800 relative overflow-hidden">
      {/* Decorative right accent */}
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#0C356A]/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute left-0 bottom-0 w-48 h-48 rounded-full bg-[#C86218]/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left 5 Cols: Strategic Value */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218] mb-5">
              Procurement Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0C356A] leading-tight">
              Why Leading Plants Choose{" "}
              <span className="text-[#C86218]">Multi-Brand</span> Distribution
            </h2>
            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Industrial plants with diverse machinery from Germany, Japan,
              Italy, and India rarely succeed with a single-brand catalogue. Jai
              Deva Oil Co. provides a unified procurement bridge across leading
              lubricant majors.
            </p>

            {/* Brand Certifications Card */}
            <div className="mt-8 rounded-2xl bg-[#071f3b] text-white p-6 shadow-xl border border-white/5">
              <div className="flex items-center gap-2.5 mb-4">
                <ShieldCheck size={18} className="text-[#F4B24D]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#F4B24D]">
                  Our Authorized Brand Portfolio
                </span>
              </div>
              <div className="space-y-3">
                {BRAND_CERTS.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-start gap-2.5 text-xs font-medium text-slate-300"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-emerald-400 shrink-0 mt-0.5"
                    />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
              <a
                href="/brands"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#F4B24D] hover:text-white transition-colors"
              >
                View All Brands <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Right 7 Cols: The 4 Advantage Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {ADVANTAGES.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={adv.title}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-[#0C356A] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0C356A]/0 to-[#0C356A]/0 group-hover:from-[#0C356A]/5 group-hover:to-transparent transition-all duration-300" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#0C356A]/5 group-hover:bg-[#0C356A] text-[#0C356A] group-hover:text-[#F4B24D] flex items-center justify-center transition-all duration-300">
                        <Icon size={22} />
                      </div>
                      <span className="text-[11px] font-black text-slate-300 group-hover:text-[#C86218] transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-[#0C356A] group-hover:text-[#C86218] transition-colors leading-snug">
                      {adv.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
