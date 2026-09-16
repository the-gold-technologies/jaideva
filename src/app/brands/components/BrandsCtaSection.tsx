"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";

interface BrandsCtaProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function BrandsCtaSection({ onOpenEnquiry }: BrandsCtaProps) {
  return (
    <section className="py-20 bg-white font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#071f3b] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Engine Oil Bottles & Reflection Background */}
          <img
            src="/engine-oil-bottles.jpg"
            alt="Engine oil and synthetic lubricants"
            className="absolute inset-0 h-full w-full object-cover object-right opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071f3b] via-[#071f3b]/95 to-transparent" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D]/15 border border-[#F4B24D]/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#F4B24D] mb-4">
                <ShieldCheck size={14} /> Certified Lubrication Engineering Advisory
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-[-0.03em] leading-tight">
                Need an Engine Oil Recommendation or Brand Consultation?
              </h2>
              <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed">
                Our lubrication engineers map OEM engine viscosities (0W-20, 5W-30, 15W-40), industrial gear grades, and drain intervals to maximize your equipment life.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 sm:flex-row lg:flex-col">
              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry("Brand Lubricant Consultation")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C86218] px-6 py-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#A74D0E] shadow-lg shadow-[#C86218]/30 cursor-pointer"
              >
                <span>Request Engine Oil Quote</span>
                <ArrowRight size={15} />
              </button>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-xs font-black uppercase tracking-wider text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
              >
                <PhoneCall size={15} />
                <span>Contact Engineering Desk</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
