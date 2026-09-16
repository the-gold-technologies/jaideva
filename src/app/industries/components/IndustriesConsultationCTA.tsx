"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Clock,
  Send,
  CheckCircle2,
  Headphones,
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
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200 text-slate-800 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-8 sm:p-12 lg:p-14 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218] mb-4">
                Zero-Cost Technical Assessment
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A] leading-[1.08]">
                Optimize Your Plant's Lubrication Performance Today
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Whether you need urgent barrel dispatch, cross-referencing for an imported machine,
                or a full plant SKU consolidation audit, our lubrication specialists are ready to support your facility.
              </p>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap gap-4 border-t border-slate-200/80 pt-6">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-lg border border-slate-200/80 shadow-2xs">
                  <Clock size={16} className="text-[#C86218]" />
                  <span>24-Hour Quotation Turnaround</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-lg border border-slate-200/80 shadow-2xs">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>100% Genuine Batch CoAs</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-lg border border-slate-200/80 shadow-2xs">
                  <Headphones size={16} className="text-[#0C356A]" />
                  <span>Dedicated Plant Support</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Interactive Clean Form Card */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg"
              >
                <h3 className="text-lg font-black text-[#0C356A] uppercase tracking-tight mb-1">
                  Request Sector Specification
                </h3>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  Select your primary operating vertical to launch a tailored technical enquiry:
                </p>

                <div className="mb-5">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#0C356A] mb-2">
                    Industry / Machinery Application:
                  </label>
                  <select
                    value={chosenSector}
                    onChange={(e) => setChosenSector(e.target.value)}
                    className="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-800 font-medium focus:outline-none focus:border-[#C86218] focus:bg-white transition-colors cursor-pointer shadow-2xs"
                  >
                    {SECTOR_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="text-slate-800">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C86218] hover:bg-[#A74D0E] py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:translate-y-0 hover:-translate-y-0.5"
                >
                  <Send size={15} />
                  <span>Get Technical Recommendation & Pricing</span>
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/contact-us"
                    className="text-xs text-slate-500 hover:text-[#C86218] transition-colors inline-flex items-center gap-1.5 font-medium"
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
