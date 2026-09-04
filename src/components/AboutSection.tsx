"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";

export default function AboutSection() {
  const { pages, pageSEO } = useCMSStore();
  const cmsAbout = pages["home"]?.AboutSection;

  const title = cmsAbout?.title || "JAI DEVA OIL CO.";
  const subtitle1 =
    cmsAbout?.subtitle1 ||
    "Multi-Brand Industrial & Automotive Lubricant Distributor";
  const subtitle2 =
    cmsAbout?.subtitle2 ||
    "Reliable Lubrication Solutions for Every Industry & Application";

  const paragraph1 =
    cmsAbout?.paragraph1 ||
    "Established in 2008, Jai Deva Oil Co. is a trusted Authorized Distributors of Industrial & Automotive Lubricants, offering a comprehensive range of quality lubrication products from leading brands.";

  const paragraph2 =
    cmsAbout?.paragraph2 ||
    "From Engine Oil, Hydraulic Oil and Gear Oil to Automotive Grease, Cutting Oil, Rust Preventive Oil and Specialty Lubricants, we provide reliable lubrication solutions for diverse industrial, automotive and machinery applications.";

  const HeadingTag = getHeadingTag(pageSEO["home"]?.headingOptions, "h1");

  return (
    <section id="about" className="py-14 sm:py-16 bg-white text-center font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        {title && (
          <HeadingTag className="text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-wide section-underline font-sans">
            {title}
          </HeadingTag>
        )}

        {/* Tagline & Subheading */}
        <div className="mt-5 space-y-1.5">
          <p className="text-lg md:text-xl font-bold text-[#C86218]">
            {subtitle1}
          </p>
          <p className="text-base md:text-lg font-semibold text-gray-800">
            {subtitle2}
          </p>
        </div>

        {/* Content Paragraphs */}
        <div className="mt-6 space-y-4 text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
          <p>{paragraph1}</p>
          <p>{paragraph2}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3 rounded shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>Explore Products</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center gap-2 bg-[#C86218] hover:bg-[#A74D0E] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3 rounded shadow-md hover:shadow-lg transition-all duration-200"
          >
            <PhoneCall size={16} />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
