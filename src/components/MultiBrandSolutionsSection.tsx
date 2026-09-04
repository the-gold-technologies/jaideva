"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  ThumbsUp,
  Truck,
  Headphones,
  Layers,
  Sparkles,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const ICON_MAP: Record<string, React.ElementType> = {
  Search,
  ThumbsUp,
  Truck,
  Headphones,
  CheckCircle2,
  Layers,
  Sparkles,
};

export default function MultiBrandSolutionsSection() {
  const { pages } = useCMSStore();
  const cmsSection = pages["home"]?.MultiBrandSolutionsSection;

  if (!cmsSection) {
    return null;
  }

  const badge = cmsSection.badge || "";
  const title = cmsSection.title || "";
  const titleHighlight = cmsSection.titleHighlight || "";
  const paragraph1 = cmsSection.paragraph1 || "";
  const paragraph2 = cmsSection.paragraph2 || "";
  const btnLabel = cmsSection.btnLabel || "";
  const btnUrl = cmsSection.btnUrl || "#brands";
  const steps: any[] = Array.isArray(cmsSection.steps) ? cmsSection.steps : [];

  return (
    <section id="solutions" className="py-16 sm:py-20 bg-white border-y border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & Company Narrative */}
          <div className="lg:col-span-6 text-left">
            {badge && (
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-widest text-[#C86218] uppercase mb-2">
                <Layers size={16} />
                <span><FormattedText text={badge} /></span>
              </div>
            )}

            {(title || titleHighlight) && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-tight leading-tight">
                {title && <FormattedText text={title} />}
                {title && titleHighlight && <br />}
                {titleHighlight && (
                  <span className="text-[#C86218]">
                    <FormattedText text={titleHighlight} />
                  </span>
                )}
              </h2>
            )}

            <div className="w-16 h-1 bg-[#C86218] mt-4 mb-6 rounded-full" />

            {(paragraph1 || paragraph2) && (
              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
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

            {/* Inline Process Tag */}
            {steps.length > 0 && (
              <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0C356A] flex-wrap">
                {steps.map((st, idx) => (
                  <React.Fragment key={st.name || idx}>
                    <span className="bg-white px-3 py-1 rounded border border-slate-200 shadow-2xs">
                      {st.name}
                    </span>
                    {idx < steps.length - 1 && (
                      <span className="text-[#C86218] font-bold">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* CTA Button */}
            {btnLabel && (
              <div className="mt-8">
                <Link
                  href={btnUrl}
                  className="inline-flex items-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <span>{btnLabel}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Clean Vertical Process Cards with Left Timeline Indicator */}
          {steps.length > 0 && (
            <div className="lg:col-span-6">
              <div className="space-y-3.5">
                {steps.map((step, idx) => {
                  const Icon =
                    (typeof step.icon === "string" && ICON_MAP[step.icon]) ||
                    (typeof step.icon === "function" && step.icon) ||
                    CheckCircle2;
                  const stepNum = step.num || `${idx + 1}`;
                  return (
                    <div
                      key={step.name || idx}
                      className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex items-start gap-4 shadow-2xs hover:shadow-md hover:border-[#C86218] transition-all duration-200 group"
                    >
                      <div className="w-11 h-11 rounded-lg bg-[#0C356A] group-hover:bg-[#C86218] text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                            {step.name}
                          </h3>
                          <span className="text-xs font-black text-slate-400 group-hover:text-[#C86218] transition-colors">
                            {stepNum.length === 1 ? `0${stepNum}` : stepNum}
                          </span>
                        </div>
                        {step.desc && (
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                            <FormattedText text={step.desc} />
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
