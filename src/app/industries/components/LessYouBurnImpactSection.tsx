"use client";

import React from "react";
import { ArrowRight, TrendingDown, ThermometerSnowflake, Clock, Award } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const ICON_MAP: Record<string, React.ElementType> = {
  ThermometerSnowflake,
  thermometersnowflake: ThermometerSnowflake,
  Clock,
  clock: Clock,
  TrendingDown,
  trendingdown: TrendingDown,
  Award,
  award: Award,
};

function resolveIcon(iconKey: unknown): React.ElementType {
  const key = typeof iconKey === "string" ? iconKey.trim() : "";
  return ICON_MAP[key] || ICON_MAP[key.toLowerCase()] || TrendingDown;
}

interface LessYouBurnImpactProps {
  onOpenEnquiry: (subject?: string) => void;
}

export default function LessYouBurnImpactSection({ onOpenEnquiry }: LessYouBurnImpactProps) {
  const { pages } = useCMSStore();
  const {
    badge,
    heading,
    subtitle,
    buttonText,
    pillars = [],
  } = pages["industries"]?.LessYouBurnImpactSection || {};

  if (!heading && (!Array.isArray(pillars) || pillars.length === 0)) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#071f3b] text-white py-20 border-y border-white/10 font-sans">
      {/* Background industrial glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,98,24,0.18),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto">
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D]/15 border border-[#F4B24D]/30 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#F4B24D] mb-4">
              <Award size={15} /> <FormattedText text={badge} />
            </div>
          )}
          {heading && (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              <FormattedText text={heading} />
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              <FormattedText text={subtitle} />
            </p>
          )}
        </div>

        {/* 3 Impact Pillars in a Clean Horizontal Flow */}
        {Array.isArray(pillars) && pillars.length > 0 && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {pillars.map((pillar: any, index: number) => {
              const PillarIcon = resolveIcon(pillar.icon);
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-[#F4B24D]/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#C86218] text-white flex items-center justify-center mb-5 shadow-lg shadow-[#C86218]/30">
                    <PillarIcon size={26} />
                  </div>
                  {pillar.metric && (
                    <div className="text-2xl sm:text-3xl font-black text-[#F4B24D] tracking-tight mb-2">
                      <FormattedText text={pillar.metric} />
                    </div>
                  )}
                  {pillar.title && (
                    <h3 className="text-lg font-black text-white uppercase tracking-wide mb-2">
                      <FormattedText text={pillar.title} />
                    </h3>
                  )}
                  {pillar.desc && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <FormattedText text={pillar.desc} />
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Action Bar */}
        {buttonText && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => onOpenEnquiry(buttonText)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer hover:scale-105"
            >
              <span>
                <FormattedText text={buttonText} />
              </span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
