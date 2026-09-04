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

const ICON_MAP: Record<string, React.ElementType> = {
  Calendar,
  calendar: Calendar,
  Layers,
  layers: Layers,
  Boxes,
  boxes: Boxes,
  ShieldCheck,
  shieldcheck: ShieldCheck,
  "shield-check": ShieldCheck,
  Users,
  users: Users,
  Clock,
  clock: Clock,
  CheckCircle2,
};

export default function AboutJaiDevaContent() {
  const { pages, pageSEO } = useCMSStore();
  const cmsStory = pages["about-us"]?.AboutJaiDevaContent;

  if (!cmsStory) {
    return null;
  }

  const title = cmsStory.title || "";
  const subtitle = cmsStory.subtitle || "";
  const paragraphs: string[] = Array.isArray(cmsStory.paragraphs)
    ? cmsStory.paragraphs
    : typeof cmsStory.description === "string" && cmsStory.description
    ? [cmsStory.description]
    : [];

  const whyChooseTitle = cmsStory.whyChooseTitle || "";
  const whyChooseSubtitle = cmsStory.whyChooseSubtitle || "";
  const whyChooseItems: any[] = Array.isArray(cmsStory.whyChooseItems)
    ? cmsStory.whyChooseItems
    : [];

  const HeadingTag = getHeadingTag(pageSEO["about-us"]?.headingOptions, "h1");

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 font-sans">
      {/* Main Section Header */}
      {title && (
        <HeadingTag className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-6 border-b-2 border-gray-100 pb-4">
          <FormattedText text={title} />
        </HeadingTag>
      )}

      {/* Sub-header */}
      {subtitle && (
        <h2 className="text-xl md:text-2xl font-bold text-[#C86218] mb-6">
          <FormattedText text={subtitle} />
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
      {(whyChooseTitle || whyChooseSubtitle || whyChooseItems.length > 0) && (
        <div className="mt-14 pt-10 border-t border-gray-200">
          {whyChooseTitle && (
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-2">
              <FormattedText text={whyChooseTitle} />
            </h2>
          )}
          {whyChooseSubtitle && (
            <p className="text-[#C86218] font-bold text-base md:text-lg mb-8">
              <FormattedText text={whyChooseSubtitle} />
            </p>
          )}

          {/* Feature Grid */}
          {whyChooseItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseItems.map((item: any, index: number) => {
                const iconKey =
                  typeof item.icon === "string" ? item.icon.trim() : "";
                const IconComp =
                  (iconKey && ICON_MAP[iconKey]) ||
                  (iconKey && ICON_MAP[iconKey.toLowerCase()]) ||
                  (typeof item.icon === "function" ? item.icon : CheckCircle2);

                const descText = item.description || item.desc || "";

                return (
                  <div
                    key={index}
                    className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#C86218] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#0C356A] text-white flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                      <IconComp size={24} />
                    </div>
                    {item.title && (
                      <h3 className="text-lg font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors mb-2">
                        <FormattedText text={item.title} />
                      </h3>
                    )}
                    {descText && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <FormattedText text={descText} />
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
