"use client";

import React from "react";
import { Users } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

export default function AboutJaiDevaContent() {
  const { pages } = useCMSStore();
  const cmsContent = pages["about-us"]?.AboutJaiDevaContent || {};

  const title = cmsContent.title || cmsContent.mainTitle;
  const subtitle =
    cmsContent.subtitle || cmsContent.mentorSubHeader || cmsContent.proprietorSubHeader;
  const paragraphs: string[] = Array.isArray(cmsContent.paragraphs) ? cmsContent.paragraphs : [];
  const image = cmsContent.image || cmsContent.imageUrl;
  const imageAlt = cmsContent.imageAlt || subtitle || title || "";

  if (!title && paragraphs.length === 0 && !image) return null;

  const hasImage = Boolean(image);

  return (
    <section
      id="about-story"
      className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16 font-sans scroll-mt-24"
    >
      <div
        className={
          hasImage
            ? "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            : "max-w-4xl mx-auto"
        }
      >
        {/* Left Column: Title, Subtitle & Paragraphs */}
        <div className={`${hasImage ? "lg:col-span-7" : "w-full"} flex flex-col justify-center`}>
          {title && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-3 border-b-2 border-gray-100 pb-3">
              <FormattedText text={title} />
            </h2>
          )}

          {subtitle && (
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 flex-shrink-0 rounded-full bg-[#0C356A] text-white flex items-center justify-center shadow-xs">
                <Users size={16} />
              </div>
              <p className="text-base md:text-lg font-bold text-[#C86218]">
                <FormattedText text={subtitle} />
              </p>
            </div>
          )}

          {paragraphs.length > 0 && (
            <div className="space-y-3.5 text-gray-700 text-sm md:text-base leading-relaxed font-sans">
              {paragraphs.map((p: string, idx: number) => (
                <p key={idx}>
                  <FormattedText text={p} />
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: CMS Image with Overlay & Est. Badge */}
        {hasImage && (
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle gradient to ensure bottom text is legible while keeping head clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b]/90 via-[#071f3b]/15 to-transparent pointer-events-none" />

                {/* Top Badge: Est. 2007 */}
                <div className="absolute top-4 left-4 bg-[#0C356A]/85 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#F4B24D] animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-white">
                    Est. 2007
                  </span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F4B24D] block mb-0.5">
                    Mentor & Proprietor
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Mr. Mayank Goyal
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    Jai Deva Oil Co. — Trusted Lubricant Distribution
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
