"use client";

import React from "react";
import { Factory, Globe2, Bike, Cog, ArrowRight, Sparkles } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

const ICON_MAP: Record<string, React.ElementType> = {
  Factory,
  factory: Factory,
  Globe2,
  globe2: Globe2,
  Bike,
  bike: Bike,
  Cog,
  cog: Cog,
};

function resolveIcon(iconKey: string): React.ElementType {
  return ICON_MAP[iconKey] || ICON_MAP[iconKey?.toLowerCase()] || Factory;
}

interface OurTeamStructureProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function OurTeamStructureSection({ onOpenEnquiry }: OurTeamStructureProps) {
  const { pages } = useCMSStore();
  const { heading, description, cards = [] } = pages["about-us"]?.OurTeamStructureSection || {};

  if (!heading && (!Array.isArray(cards) || cards.length === 0)) return null;

  return (
    <section
      id="team-structure"
      className="py-14 sm:py-20 bg-white font-sans border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Title + Description */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            {heading && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0C356A] uppercase leading-tight tracking-tight">
                {heading}
              </h2>
            )}
            {description && (
              <p
                className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>

          {/* Cards Row */}
          {Array.isArray(cards) && cards.length > 0 && (
            <div className="w-full max-w-5xl flex flex-col sm:flex-row items-stretch justify-between gap-3.5 xl:gap-3">
              {cards.map((card: any, idx: number) => {
                const CardIcon = resolveIcon(card.icon);

                return (
                  <React.Fragment key={card.step ?? idx}>
                    <div className="group flex-1 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 bg-[#F3F6FC] hover:bg-[#0C356A] text-slate-800 hover:text-white border border-slate-100/90 hover:border-[#0C356A] shadow-xs hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                      {/* Top: Step + separator */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-3">
                          <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 bg-[#0C356A]/10 text-[#0C356A] group-hover:bg-white/20 group-hover:text-white transition-colors duration-200">
                            {card.step}
                          </span>
                          <div className="h-px w-6 bg-slate-300 group-hover:bg-white/25 transition-colors duration-200" />
                        </div>

                        {/* Center Icon */}
                        <div className="flex justify-center mb-3">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[#0C356A] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                            <CardIcon className="w-6 h-6 stroke-[2]" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xs sm:text-sm font-black text-center tracking-tight leading-tight mb-1.5 text-[#0C356A] group-hover:text-white transition-colors duration-200">
                          {card.title}
                        </h3>

                        {/* Total count */}
                        <div className="text-center mb-3">
                          <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0C356A]/10 text-[#0C356A] group-hover:bg-white/20 group-hover:text-[#F4B24D] transition-colors duration-200">
                            {card.total}
                          </span>
                        </div>
                      </div>

                      {/* Bottom: Roles */}
                      <div className="pt-2.5 border-t border-slate-200/60 group-hover:border-white/15 transition-colors duration-200">
                        <div className="space-y-0.5 text-center">
                          {Array.isArray(card.roles) &&
                            card.roles.map((r: any, rIdx: number) => (
                              <p
                                key={rIdx}
                                className="text-[11px] sm:text-xs leading-snug font-medium text-slate-600 group-hover:text-slate-200 transition-colors duration-200"
                              >
                                <span className="font-black text-[#0C356A] group-hover:text-[#F4B24D] transition-colors duration-200">
                                  {r.count}
                                </span>{" "}
                                {r.label}
                              </p>
                            ))}
                        </div>

                        {card.tagline && (
                          <div className="mt-2 text-center">
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 group-hover:bg-white/15 group-hover:text-white transition-colors duration-200">
                              <Sparkles className="w-2.5 h-2.5 text-[#C86218] group-hover:text-[#F4B24D] transition-colors duration-200" />
                              {card.tagline}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Horizontal Arrow between cards (Desktop) */}
                    {idx < cards.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center shrink-0 -mx-1 text-slate-300">
                        <ArrowRight className="w-4 h-4 stroke-[2]" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
