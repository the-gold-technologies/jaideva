"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

export default function AboutSection() {
  const { pages, pageSEO } = useCMSStore();
  const cmsAbout = pages["home"]?.AboutSection;

  if (!cmsAbout) {
    return null;
  }

  const title = cmsAbout.title || "";
  const subtitle1 = cmsAbout.subtitle1 || "";
  const subtitle2 = cmsAbout.subtitle2 || "";
  const paragraph1 = cmsAbout.paragraph1 || "";
  const paragraph2 = cmsAbout.paragraph2 || "";
  const primaryBtnUrl = cmsAbout.primaryBtnUrl || "/products";
  const primaryBtnLabel = cmsAbout.primaryBtnLabel || "";
  const secondaryBtnUrl = cmsAbout.secondaryBtnUrl || "/contact-us";
  const secondaryBtnLabel = cmsAbout.secondaryBtnLabel || "";

  const HeadingTag = getHeadingTag(pageSEO["home"]?.headingOptions, "h1");

  return (
    <section id="about" className="py-14 sm:py-16 bg-white text-center font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        {title && (
          <HeadingTag className="text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-wide section-underline font-sans">
            <FormattedText text={title} />
          </HeadingTag>
        )}

        {/* Tagline & Subheading */}
        {(subtitle1 || subtitle2) && (
          <div className="mt-5 space-y-1.5">
            {subtitle1 && (
              <p className="text-lg md:text-xl font-bold text-[#C86218]">
                <FormattedText text={subtitle1} />
              </p>
            )}
            {subtitle2 && (
              <p className="text-base md:text-lg font-semibold text-gray-800">
                <FormattedText text={subtitle2} />
              </p>
            )}
          </div>
        )}

        {/* Content Paragraphs with link format parsing */}
        {(paragraph1 || paragraph2) && (
          <div className="mt-6 space-y-4 text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            {paragraph1 && (
              <p>
                <FormattedText text={paragraph1} />
              </p>
            )}
            {paragraph2 && (
              <p>
                <FormattedText text={paragraph2} />
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {(primaryBtnLabel || secondaryBtnLabel) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {primaryBtnLabel && (
              <Link
                href={primaryBtnUrl}
                className="inline-flex items-center justify-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3 rounded shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>{primaryBtnLabel}</span>
                <ArrowRight size={16} />
              </Link>
            )}

            {secondaryBtnLabel && (
              <Link
                href={secondaryBtnUrl}
                className="inline-flex items-center justify-center gap-2 bg-[#C86218] hover:bg-[#A74D0E] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3 rounded shadow-md hover:shadow-lg transition-all duration-200"
              >
                <PhoneCall size={16} />
                <span>{secondaryBtnLabel}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
