"use client";

import React from "react";
import {
  Calendar,
  Layers,
  Boxes,
  ShieldCheck,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const DEFAULT_WHY_CHOOSE = [
  {
    title: "18+ Years of Experience",
    description: "Strong industry experience in lubricant distribution and trading since 2008.",
    icon: Calendar,
  },
  {
    title: "Multi-Brand Portfolio",
    description: "A diverse range of lubricant products from leading brands.",
    icon: Layers,
  },
  {
    title: "Wide Product Range",
    description: "Industrial oils, automotive lubricants, greases and specialty lubrication products.",
    icon: Boxes,
  },
  {
    title: "Quality-Focused Approach",
    description: "We focus on supplying quality products suited to customer requirements.",
    icon: ShieldCheck,
  },
  {
    title: "Experienced Team",
    description: "Skilled professionals with industry knowledge and understanding of customer needs.",
    icon: Users,
  },
  {
    title: "Reliable Service",
    description: "Committed to dependable supply and long-term customer relationships.",
    icon: Clock,
  },
];

export default function AboutJaiDevaContent() {
  const { pages, pageSEO } = useCMSStore();
  const cmsStory =
    pages["about-us"]?.AboutJaiDevaContent ||
    pages["about-us"]?.AboutMahalaxmiContent ||
    pages["about-us"]?.MahalaxmiStory;

  const title = cmsStory?.title || "ABOUT JAI DEVA OIL CO.";
  const subtitle =
    cmsStory?.subtitle ||
    "Your Trusted Partner in Industrial & Automotive Lubrication Since 2008";
  const paragraphs: string[] = Array.isArray(cmsStory?.paragraphs) && cmsStory.paragraphs.length > 0
    ? cmsStory.paragraphs
    : cmsStory?.description
    ? [cmsStory.description]
    : [
        "Established in 2008, Jai Deva Oil Co. is a trusted Authorized Distributor of Industrial & Automotive Lubricants, offering a comprehensive range of quality lubrication products from leading brands.",
        "From Engine Oil, Hydraulic Oil and Gear Oil to Automotive Grease, Cutting Oil, Rust Preventive Oil and Specialty Lubricants, we provide reliable lubrication solutions for diverse industrial, automotive and machinery applications.",
        "With 18+ years of industry experience, a diverse multi-brand portfolio and a customer-focused approach, Jai Deva Oil Co. continues to provide dependable lubrication products and solutions for industries, machinery and automotive applications.",
      ];

  const whyChooseTitle = cmsStory?.whyChooseTitle || "WHY JAI DEVA OIL CO.?";
  const whyChooseSubtitle =
    cmsStory?.whyChooseSubtitle || "Your Trusted Lubrication Partner Since 2008";
  const whyChooseItems =
    Array.isArray(cmsStory?.whyChooseItems) && cmsStory.whyChooseItems.length > 0
      ? cmsStory.whyChooseItems
      : DEFAULT_WHY_CHOOSE;

  const HeadingTag = getHeadingTag(pageSEO["about-us"]?.headingOptions, "h1");

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 font-sans">
      {/* Main Section Header */}
      {title && (
        <HeadingTag className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-6 border-b-2 border-gray-100 pb-4">
          {title}
        </HeadingTag>
      )}

      {/* Sub-header */}
      {subtitle && (
        <h2 className="text-xl md:text-2xl font-bold text-[#C86218] mb-6">
          {subtitle}
        </h2>
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

      {/* Why Choose Jai Deva Oil Co. Section */}
      <div className="mt-14 pt-10 border-t border-gray-200">
        {whyChooseTitle && (
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-2">
            {whyChooseTitle}
          </h2>
        )}
        {whyChooseSubtitle && (
          <p className="text-[#C86218] font-bold text-base md:text-lg mb-8">
            {whyChooseSubtitle}
          </p>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseItems.map((item: any, index: number) => {
            const IconComp = item.icon || CheckCircle2;
            return (
              <div
                key={index}
                className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#C86218] transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#0C356A] text-white flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                  <IconComp size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
