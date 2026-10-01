"use client";

import React from "react";
import { Users } from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

export default function AboutJaiDevaContent() {
  const { pages } = useCMSStore();
  const { title, subtitle, paragraphs = [] } = pages["about-us"]?.AboutJaiDevaContent || {};

  if (!title && (!Array.isArray(paragraphs) || paragraphs.length === 0)) return null;

  return (
    <section
      id="about-story"
      className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16 font-sans scroll-mt-24"
    >
      {title && (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-3 border-b-2 border-gray-100 pb-4">
          <FormattedText text={title} />
        </h2>
      )}

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

      {Array.isArray(paragraphs) && paragraphs.length > 0 && (
        <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed font-sans">
          {paragraphs.map((p: string, idx: number) => (
            <p key={idx}>
              <FormattedText text={p} />
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
