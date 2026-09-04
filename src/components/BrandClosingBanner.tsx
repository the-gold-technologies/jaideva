"use client";

import React from "react";
import { Award, CheckCircle2, ArrowRight } from "lucide-react";

interface BrandClosingBannerProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function BrandClosingBanner({ onOpenEnquiry }: BrandClosingBannerProps) {
  const pillars = [
    "Quality Products",
    "Multiple Brands",
    "Reliable Supply",
    "Customer-Focused Service",
  ];

  return (
    <section className="bg-white py-16 border-t border-b border-slate-100 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand Name */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#C86218] uppercase tracking-widest bg-orange-50 border border-orange-200 px-4 py-1 rounded-full mb-3 shadow-2xs">
          <Award size={16} />
          <span>JAI DEVA OIL CO.</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0C356A] tracking-tight uppercase">
          Your Trusted Partner in Industrial &amp; Automotive Lubrication
        </h2>

        <div className="w-16 h-1 bg-[#C86218] mx-auto mt-4 mb-6 rounded-full" />

        <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
          With 18+ years of industry experience, a diverse multi-brand portfolio and a customer-focused approach, <strong className="text-[#0C356A]">Jai Deva Oil Co.</strong> continues to provide dependable lubrication products and solutions for industries, machinery and automotive applications.
        </p>

        {/* 4 Pillars Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {pillars.map((p) => (
            <div
              key={p}
              className="bg-white border border-slate-200/80 shadow-2xs px-4 py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0C356A]"
            >
              <CheckCircle2 size={16} className="text-[#C86218]" />
              <span>{p}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-10">
          <button
            onClick={() => onOpenEnquiry && onOpenEnquiry("Industrial Lubrication Partnership")}
            className="inline-flex items-center justify-center gap-2 bg-[#C86218] hover:bg-[#A74D0E] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-md shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wider cursor-pointer"
          >
            <span>Partner With Jai Deva Oil Co.</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
