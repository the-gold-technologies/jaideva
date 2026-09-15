"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Clock,
  Send,
} from "lucide-react";

interface IndustriesConsultationCTAProps {
  onOpenEnquiry: (productName?: string) => void;
}

const SECTOR_OPTIONS = [
  "Steel & Hot Rolling Mills",
  "Cement & Heavy Mining",
  "Power Generation & Turbines",
  "Automotive & Component Stamping",
  "Food & Beverage NSF H1 Safe",
  "Pharmaceuticals & Cleanrooms",
  "Textile High-Speed Spinning",
  "Plastics & Injection Molding",
  "Paper Machine Circulating Systems",
  "General Precision CNC Machining",
];

export default function IndustriesConsultationCTA({
  onOpenEnquiry,
}: IndustriesConsultationCTAProps) {
  const [chosenSector, setChosenSector] = useState(SECTOR_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenEnquiry(`${chosenSector} - Technical Assessment & Supply Quote`);
  };

  return (
    <section className="py-20 bg-[#041224] text-white relative isolate overflow-hidden">
      {/* Subtle radial lighting */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#C86218]/25 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-white/10 via-white/5 to-white/[0.02] p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D]/15 border border-[#F4B24D]/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#F4B24D] mb-4">
                <ShieldCheck size={14} />
                <span>Zero-Cost Plant Technical Assessment</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Optimize Your Plant's Lubrication Performance Today
              </h2>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Whether you need an urgent barrel replacement, a cross-reference
                recommendation for an imported machine, or a full plant SKU audit,
                our lubrication specialists are ready to support your facility.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 max-w-lg">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Clock size={16} className="text-[#F4B24D]" />
                  <span>24-Hour Quotation Turnaround</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Genuine Factory Batch CoAs</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Quick Interactive Launcher */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/15 bg-[#071f3b]/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  Request Sector Specification
                </h3>
                <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                  Select your primary operating vertical to launch a tailored technical enquiry:
                </p>

                <div className="mb-5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#F4B24D] mb-2">
                    Industry / Machinery Application:
                  </label>
                  <select
                    value={chosenSector}
                    onChange={(e) => setChosenSector(e.target.value)}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4B24D] transition-colors"
                  >
                    {SECTOR_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#071f3b] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C86218] hover:bg-[#a94e0e] py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
                >
                  <Send size={15} />
                  <span>Get Technical Recommendation & Pricing</span>
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/contact-us"
                    className="text-xs text-slate-400 hover:text-[#F4B24D] transition-colors inline-flex items-center gap-1.5"
                  >
                    <PhoneCall size={13} />
                    <span>Or visit our contact page for direct depot locations</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
