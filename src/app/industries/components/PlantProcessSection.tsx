"use client";

import React from "react";
import {
  TestTube2,
  Boxes,
  FileCheck2,
  Truck,
  ArrowRight,
  ShieldCheck,
  Cog,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const ICON_MAP: Record<string, React.ElementType> = {
  TestTube2,
  testtube2: TestTube2,
  FileCheck2,
  filecheck2: FileCheck2,
  Boxes,
  boxes: Boxes,
  Truck,
  truck: Truck,
  ShieldCheck,
  shieldcheck: ShieldCheck,
  Cog,
  cog: Cog,
};

function resolveIcon(iconKey: unknown): React.ElementType {
  const key = typeof iconKey === "string" ? iconKey.trim() : "";
  return ICON_MAP[key] || ICON_MAP[key.toLowerCase()] || TestTube2;
}

interface PlantProcessProps {
  onOpenEnquiry?: (serviceName?: string) => void;
}

export default function PlantProcessSection({
  onOpenEnquiry,
}: PlantProcessProps) {
  const { pages } = useCMSStore();
  const {
    eyebrow,
    heading,
    description,
    buttonText,
    steps = [],
  } = pages["industries"]?.PlantProcessSection || {};

  if (!heading && (!Array.isArray(steps) || steps.length === 0)) return null;

  return (
    <section className="py-20 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            {eyebrow && (
              <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218] mb-2">
                <FormattedText text={eyebrow} />
              </div>
            )}
            {heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
                <FormattedText text={heading} />
              </h2>
            )}
            {description && (
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                <FormattedText text={description} />
              </p>
            )}
          </div>

          {buttonText && (
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry(buttonText)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0C356A] hover:bg-[#C86218] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer shrink-0"
            >
              <span>
                <FormattedText text={buttonText} />
              </span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* 4 Connected Process Timeline Steps */}
        {Array.isArray(steps) && steps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((s: any, idx: number) => {
              const StepIcon = resolveIcon(s.icon);
              return (
                <div
                  key={idx}
                  className="relative flex flex-col justify-between"
                >
                  <div>
                    {/* Step Number & Line */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-3xl sm:text-4xl font-black text-[#C86218]">
                        {s.step || (idx + 1).toString().padStart(2, "0")}
                      </span>
                      <div className="h-[2px] flex-1 bg-slate-200" />
                    </div>

                    {/* Icon & Title */}
                    <div className="w-12 h-12 rounded-xl bg-[#0C356A]/10 text-[#0C356A] flex items-center justify-center mb-4">
                      <StepIcon size={22} className="text-[#C86218]" />
                    </div>

                    <h3 className="text-lg font-black text-[#0C356A] uppercase tracking-tight">
                      <FormattedText text={s.title} />
                    </h3>
                    {s.tagline && (
                      <div className="text-xs font-bold text-[#C86218] uppercase tracking-wide mt-0.5 mb-2">
                        <FormattedText text={s.tagline} />
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <FormattedText text={s.desc} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
