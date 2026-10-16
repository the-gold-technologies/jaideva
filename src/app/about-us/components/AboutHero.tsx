"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Factory } from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

interface AboutHeroProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function AboutHero({ onOpenEnquiry }: AboutHeroProps) {
  const { pages } = useCMSStore();
  const HeadingTag = getHeadingTag(pages["about-us"]?.seo?.headingOptions, "h1");
  const {
    badge,
    heading,
    tagline,
    description,
    altText,
    bannerImage,
    ctaPrimaryText,
    ctaPrimaryUrl,
    ctaSecondaryText,
    ctaSecondaryUrl,
  } = pages["about-us"]?.AboutHero || {};

  if (!heading && !bannerImage && !badge) return null;

  const handlePrimaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const targetUrl = ctaPrimaryUrl || "";
    if (targetUrl.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(targetUrl.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#071f3b] text-white">
      {bannerImage && (
        <img
          src={bannerImage || ""}
          alt={altText || ""}
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071f3b]/90 via-[#071f3b]/80 to-[#071f3b]/70" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 text-center md:px-8 md:py-24">
        <div>
          {badge && (
            <div className="mb-5 inline-flex items-center gap-2 border-l-4 border-[#F4B24D] pl-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F4B24D]">
              <Factory size={15} />
              <FormattedText text={badge} />
            </div>
          )}

          {heading && (
            <HeadingTag className="text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
              <FormattedText text={heading} />
            </HeadingTag>
          )}

          {tagline && (
            <p className="mt-3 text-base font-semibold text-[#F4B24D] sm:text-lg">
              <FormattedText text={tagline} />
            </p>
          )}

          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              <FormattedText text={description} />
            </p>
          )}

          {(ctaPrimaryText || ctaSecondaryText) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {ctaPrimaryText && (
                <a
                  href={ctaPrimaryUrl || "#"}
                  onClick={handlePrimaryClick}
                  className="inline-flex items-center gap-2 rounded-md bg-[#C86218] px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-[#C86218]/25 transition hover:bg-[#A74D0E]"
                >
                  {ctaPrimaryText} <ArrowRight size={14} />
                </a>
              )}
              {ctaSecondaryText && (
                ctaSecondaryUrl ? (
                  <Link
                    href={ctaSecondaryUrl}
                    className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
                  >
                    {ctaSecondaryText}
                  </Link>
                ) : onOpenEnquiry ? (
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(badge || heading || "")}
                    className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
                  >
                    {ctaSecondaryText}
                  </button>
                ) : (
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
                  >
                    {ctaSecondaryText}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
