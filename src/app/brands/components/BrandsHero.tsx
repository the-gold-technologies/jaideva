"use client";

import React from "react";
import { ArrowRight, Award } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

interface BrandsHeroProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function BrandsHero({ onOpenEnquiry }: BrandsHeroProps) {
  const { pages } = useCMSStore();
  const {
    badge,
    heading,
    description,
    bannerImage,
    ctaPrimaryText,
    ctaPrimaryUrl,
    ctaSecondaryText,
  } = pages["brands"]?.BrandsHero || {};

  if (!heading && !bannerImage) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#071f3b] text-white">
      {bannerImage && (
        <img
          src={bannerImage}
          alt={heading || "Brands hero"}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071f3b]/90 via-[#071f3b]/80 to-[#071f3b]/70" />

      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D]/15 border border-[#F4B24D]/30 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#F4B24D] mb-6">
            <Award size={15} /> <FormattedText text={badge} />
          </div>
        )}
        {heading && (
          <h1 className="text-3xl font-black uppercase leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            <FormattedText text={heading} />
          </h1>
        )}
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            <FormattedText text={description} />
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={ctaPrimaryUrl}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C86218] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A74D0E] shadow-lg shadow-[#C86218]/25"
          >
            {ctaPrimaryText} <ArrowRight size={17} />
          </a>
          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry("Brand Consultation")}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b] cursor-pointer"
          >
            {ctaSecondaryText}
          </button>
        </div>
      </div>
    </section>
  );
}
