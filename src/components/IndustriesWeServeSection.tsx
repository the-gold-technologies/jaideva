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
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

interface IndustriesWeServeSectionProps {
  onOpenEnquiry?: (industryName?: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Factory,
  Building2,
  Zap,
  Scissors,
  FileText,
  Cog,
  Wrench,
  Car,
};

export default function IndustriesWeServeSection({
  onOpenEnquiry,
}: IndustriesWeServeSectionProps) {
  const { pages } = useCMSStore();
  const cmsSection = pages["home"]?.IndustriesWeServeSection;

  if (!cmsSection) {
    return null;
  }

  const title = cmsSection.title || "";
  const subtitle = cmsSection.subtitle || "";
  const leadText = cmsSection.leadText || "";
  const description = cmsSection.description || "";
  const btnLabel = cmsSection.btnLabel || "";
  const btnUrl = cmsSection.btnUrl || "#industries";
  const industries: any[] = Array.isArray(cmsSection.industries)
    ? cmsSection.industries
    : [];

  return (
    <section id="industries" className="py-14 sm:py-16 bg-[#f8fafc] text-center font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Underline */}
        {title && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-wide section-underline font-sans">
            <FormattedText text={title} />
          </h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-3 text-lg md:text-xl font-bold text-[#C86218]">
            <FormattedText text={subtitle} />
          </p>
        )}

        {/* Lead Intro Text */}
        {leadText && (
          <p className="mt-4 text-sm sm:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
            <FormattedText text={leadText} />
          </p>
        )}

        {/* Dynamic Industries Grid */}
        {industries.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
            {industries.map((ind: any, idx: number) => {
              const Icon =
                (typeof ind.icon === "string" && ICON_MAP[ind.icon]) ||
                (typeof ind.icon === "function" && ind.icon) ||
                Factory;

              return (
                <div
                  key={ind.name || idx}
                  onClick={() =>
                    onOpenEnquiry && onOpenEnquiry(`${ind.name} Industry Lubricants`)
                  }
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
        )}

        {/* Description Paragraph */}
        {description && (
          <p className="mt-8 text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
            <FormattedText text={description} />
          </p>
        )}

        {/* CTA Button */}
        {btnLabel && (
          <div className="mt-8 text-center">
            {btnUrl.startsWith("/") || btnUrl.startsWith("#") ? (
              <Link
                href={btnUrl}
                className="inline-flex items-center justify-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>{btnLabel}</span>
                <ArrowRight size={16} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() =>
                  onOpenEnquiry &&
                  onOpenEnquiry("Industry Specific Lubrication Consultation")
                }
                className="inline-flex items-center justify-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>{btnLabel}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
