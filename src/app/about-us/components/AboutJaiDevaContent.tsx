"use client";

import React from "react";
import { Users } from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const DEFAULT_TITLE = "About Jai Deva Oil Co.";
const DEFAULT_SUBTITLE =
  "Mr. Mayank Goyal – Mentor & Proprietor, Jai Deva Oil Co.";
const DEFAULT_PARAGRAPHS = [
  "Established in the year 2007, Jai Deva Oil Co. is a leading and prominent wholesaler, distributor, and trader of lubricant oil, engine oil, automotive grease, hydraulic oil, cutting oil, gear oil, rust preventive oil and much more. Made using the finest quality inputs alongside superior machinery, our products are highly admired and recommended, and each is tested carefully before delivery to our customers. Available in a range of sizes and packing, they can be purchased from us at affordable costs.",
  "Our team of professionals keeps a close watch on clients' evolving requirements, helping us meet them within a defined period of time. Owing to our quality-centric approach, we have been highly proficient in meeting the needs of clients across the marketplace, backed by a team of skilled and dexterous professionals with years of expertise in this business.",
  "We are headed by our mentor Mr. Mayank Goyal, who brings extensive knowledge and experience to the field. Owing to his balanced business plans and policies, we have attained a noteworthy position in the industry.",
];

export default function AboutJaiDevaContent() {
  const { pages, pageSEO } = useCMSStore();
  const cmsStory = pages["about-us"]?.AboutJaiDevaContent || {};

  const title = cmsStory.title || DEFAULT_TITLE;
  const subtitle = cmsStory.subtitle || DEFAULT_SUBTITLE;
  const paragraphs: string[] =
    Array.isArray(cmsStory.paragraphs) && cmsStory.paragraphs.length
      ? cmsStory.paragraphs
      : typeof cmsStory.description === "string" && cmsStory.description
        ? [cmsStory.description]
        : DEFAULT_PARAGRAPHS;

  const HeadingTag = getHeadingTag(pageSEO["about-us"]?.headingOptions, "h1");

  return (
    <section
      id="about-story"
      className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16 font-sans scroll-mt-24"
    >
      {/* Main Section Header */}
      {title && (
        <HeadingTag className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-3 border-b-2 border-gray-100 pb-4">
          <FormattedText text={title} />
        </HeadingTag>
      )}

      {/* Mentor byline */}
      {subtitle && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#0C356A] text-white flex items-center justify-center shadow-xs">
            <Users size={18} />
          </div>
          <p className="text-base md:text-lg font-bold text-[#C86218]">
            <FormattedText text={subtitle} />
          </p>
        </div>
      )}

      {/* Text Paragraphs */}
      {paragraphs.length > 0 && (
        <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed font-sans">
          {paragraphs.map((p, idx) => (
            <p key={idx}>
              <FormattedText text={p} />
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
