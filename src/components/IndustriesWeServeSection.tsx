"use client";

import React from "react";
import Link from "next/link";
import {
  Factory,
  Building2,
  Zap,
  Scissors,
  FileText,
  Cog,
  Wrench,
  Car,
  ArrowRight,
} from "lucide-react";

interface IndustriesWeServeSectionProps {
  onOpenEnquiry?: (industryName?: string) => void;
}

const INDUSTRIES = [
  { name: "Steel", icon: Factory },
  { name: "Cement", icon: Building2 },
  { name: "Power", icon: Zap },
  { name: "Textile", icon: Scissors },
  { name: "Paper", icon: FileText },
  { name: "Manufacturing", icon: Cog },
  { name: "Engineering", icon: Wrench },
  { name: "Automotive", icon: Car },
];

export default function IndustriesWeServeSection({
  onOpenEnquiry,
}: IndustriesWeServeSectionProps) {
  return (
    <section id="industries" className="py-14 sm:py-16 bg-[#f8fafc] text-center font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Underline */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-wide section-underline font-sans">
          INDUSTRIES WE SERVE
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-lg md:text-xl font-bold text-[#C86218]">
          Lubrication Solutions for Diverse Industries
        </p>

        {/* Lead Intro Text */}
        <p className="mt-4 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Our extensive lubricant portfolio serves the requirements of various industries, including:
        </p>

        {/* Clean 8 Industries Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                onClick={() => onOpenEnquiry && onOpenEnquiry(`${ind.name} Industry Lubricants`)}
                className="bg-white border border-slate-200/90 hover:border-[#C86218] rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-md cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0C356A]/5 group-hover:bg-[#0C356A] text-[#0C356A] group-hover:text-white flex items-center justify-center mb-2.5 transition-colors">
                  <Icon size={20} />
                </div>
                <span className="text-sm sm:text-base font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                  {ind.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Description Paragraph */}
        <p className="mt-8 text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
          We provide lubrication products for industrial machinery, hydraulic systems, gears, bearings, engines, metalworking equipment and other critical applications.
        </p>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() =>
              onOpenEnquiry && onOpenEnquiry("Industry Specific Lubrication Consultation")
            }
            className="inline-flex items-center justify-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>Explore Industries</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
