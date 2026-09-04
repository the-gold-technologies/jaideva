"use client";

import React from "react";
import Link from "next/link";
import { Award, CheckCircle2, ArrowRight } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

interface BrandClosingBannerProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function BrandClosingBanner({ onOpenEnquiry }: BrandClosingBannerProps) {
  const { pages } = useCMSStore();
  const cmsSection = pages["home"]?.BrandClosingBannerSection;

  if (!cmsSection) {
    return null;
  }

  const badge = cmsSection.badge || "";
  const title = cmsSection.title || "";
  const description = cmsSection.description || "";
  const btnLabel = cmsSection.btnLabel || "";
  const btnUrl = cmsSection.btnUrl || "/contact-us";
  const highlights: string[] = Array.isArray(cmsSection.highlights)
    ? cmsSection.highlights
    : [];

  return (
    <section className="bg-white py-16 border-t border-b border-slate-100 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand Name / Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#C86218] uppercase tracking-widest bg-orange-50 border border-orange-200 px-4 py-1 rounded-full mb-3 shadow-2xs">
            <Award size={16} />
            <span>
              <FormattedText text={badge} />
            </span>
          </div>
        )}

        {/* Title */}
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0C356A] tracking-tight uppercase">
            <FormattedText text={title} />
          </h2>
        )}

        <div className="w-16 h-1 bg-[#C86218] mx-auto mt-4 mb-6 rounded-full" />

        {/* Description */}
        {description && (
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
            <FormattedText text={description} />
          </p>
        )}

        {/* Highlights / Pillars Badges */}
        {highlights.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {highlights.map((p, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 shadow-2xs px-4 py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0C356A]"
              >
                <CheckCircle2 size={16} className="text-[#C86218]" />
                <span>
                  <FormattedText text={p} />
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        {btnLabel && (
          <div className="mt-10">
            {btnUrl && btnUrl !== "#enquiry" ? (
              <Link
                href={btnUrl}
                className="inline-flex items-center justify-center gap-2 bg-[#C86218] hover:bg-[#A74D0E] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-md shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wider cursor-pointer"
              >
                <span>{btnLabel}</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <button
                onClick={() =>
                  onOpenEnquiry &&
                  onOpenEnquiry("Industrial Lubrication Partnership")
                }
                className="inline-flex items-center justify-center gap-2 bg-[#C86218] hover:bg-[#A74D0E] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-md shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wider cursor-pointer"
              >
                <span>{btnLabel}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
