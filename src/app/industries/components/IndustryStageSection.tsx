"use client";

import React, { useState } from "react";
import {
  Factory,
  Building2,
  Zap,
  Car,
  Wrench,
  UtensilsCrossed,
  Shirt,
  FileText,
  ArrowRight,
  Droplets,
  Sparkles,
  ChevronRight,
  Cog,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const ICON_MAP: Record<string, React.ElementType> = {
  Factory,
  factory: Factory,
  Building2,
  building2: Building2,
  Zap,
  zap: Zap,
  Car,
  car: Car,
  Wrench,
  wrench: Wrench,
  UtensilsCrossed,
  "utensils-crossed": UtensilsCrossed,
  Shirt,
  shirt: Shirt,
  FileText,
  "file-text": FileText,
  Cog,
  cog: Cog,
};

function resolveIcon(iconKey: unknown): React.ElementType {
  const key = typeof iconKey === "string" ? iconKey.trim() : "";
  return ICON_MAP[key] || ICON_MAP[key.toLowerCase()] || Factory;
}

interface IndustryStageSectionProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function IndustryStageSection({
  onOpenEnquiry,
}: IndustryStageSectionProps) {
  const { pages } = useCMSStore();
  const {
    eyebrow,
    heading,
    description,
    selectorHint,
    promiseLabel,
    productBadge,
    recommendedLabel,
    oemPrefix,
    buttonText,
    sectors = [],
  } = pages["industries"]?.IndustryStageSection || {};

  const [activeIdx, setActiveIdx] = useState(0);

  if (!heading && (!Array.isArray(sectors) || sectors.length === 0))
    return null;

  const activeSector = sectors[activeIdx] || sectors[0];
  if (!activeSector) return null;

  const ActiveIcon = resolveIcon(activeSector.icon);

  return (
    <section id="sector-stage" className="py-20 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── SECTION TITLE BAR ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
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
              <p className="mt-1 text-sm sm:text-base text-slate-600 font-medium">
                <FormattedText text={description} />
              </p>
            )}
          </div>

          {selectorHint && (
            <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-500">
              <span>
                <FormattedText text={selectorHint} />
              </span>
              <ChevronRight size={14} className="text-[#C86218]" />
            </div>
          )}
        </div>

        {/* ── INTERACTIVE STAGE (SPLIT SCREEN LAYOUT) ── */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 4 COLS: Clean Vertical Interactive Selector */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {sectors.map((sector: any, idx: number) => {
              const SectorIcon = resolveIcon(sector.icon);
              const isActive = idx === activeIdx;
              return (
                <button
                  key={sector.id || idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#0C356A] text-white shadow-lg shadow-[#0C356A]/20 scale-[1.01]"
                      : "bg-[#f8fafc] text-slate-700 hover:bg-slate-100 hover:text-[#0C356A] border border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-white/15 text-[#F4B24D]"
                          : "bg-white text-[#C86218] border border-slate-200"
                      }`}
                    >
                      <SectorIcon size={20} />
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-black uppercase tracking-wide truncate">
                        {sector.name}
                      </div>
                      <div
                        className={`text-xs truncate ${
                          isActive ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {sector.headline}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`shrink-0 ml-2 transition-transform ${
                      isActive
                        ? "text-[#F4B24D] translate-x-0.5"
                        : "text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT 8 COLS: Cinematic Feature Stage (Plant Photo + Floating Oil Card + Specs) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Cinematic Plant Banner with Floating Badges */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-10 bg-[#071f3b] text-white">
              {activeSector.plantImage && (
                <img
                  src={activeSector.plantImage}
                  alt={activeSector.name}
                  className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.5] transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b] via-[#071f3b]/50 to-transparent" />

              {/* Top Row: Sector Badge & Condition Chip */}
              <div className="relative flex flex-wrap items-center justify-between gap-3 z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#071f3b] shadow-md">
                  <ActiveIcon size={14} />
                  <span>{activeSector.name}</span>
                </div>
                {activeSector.operatingCondition && (
                  <div className="text-xs font-bold text-slate-200 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                    {activeSector.operatingCondition.split("•")[0]}
                  </div>
                )}
              </div>

              {/* Bottom Row: The Jai Deva Promise & Machinery */}
              <div className="relative z-10 max-w-2xl mt-auto pt-8">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#F4B24D] mb-1.5">
                  <Sparkles size={13} /> <FormattedText text={promiseLabel} />
                </div>
                {activeSector.promise && (
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight drop-shadow-md">
                    {activeSector.promise}
                  </h3>
                )}

                {/* Covered Machinery Chips */}
                {Array.isArray(activeSector.equipment) &&
                  activeSector.equipment.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeSector.equipment.map((eq: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20"
                        >
                          ✓ {eq}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {/* Floating Product & Oil Reflection Spotlight */}
            {activeSector.recommendedProduct && (
              <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-7 shadow-md flex flex-col sm:flex-row items-center gap-6">
                {/* Product Thumbnail with Gradient */}
                <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-slate-900 shrink-0 shadow-sm">
                  {(activeSector.oilImage || activeSector.plantImage) && (
                    <img
                      src={activeSector.oilImage || activeSector.plantImage}
                      alt={activeSector.recommendedProduct.name}
                      className="h-full w-full object-cover object-center"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b] via-transparent to-transparent" />
                  {activeSector.recommendedProduct.grade && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded bg-[#0C356A] text-white text-[10px] font-black uppercase tracking-wider">
                        <FormattedText
                          text={activeSector.recommendedProduct.grade}
                        />
                      </span>
                    </div>
                  )}
                  {productBadge && (
                    <div className="absolute bottom-2 left-2.5 right-2 text-center">
                      <span className="text-[10px] font-bold text-[#F4B24D] uppercase">
                        <FormattedText text={productBadge} />
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Description & Action */}
                <div className="flex-1 min-w-0">
                  {recommendedLabel && (
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C86218] mb-1">
                      <Droplets size={14} />{" "}
                      <FormattedText text={recommendedLabel} />
                    </div>
                  )}
                  <h4 className="text-base sm:text-lg font-black text-[#0C356A] leading-snug">
                    <FormattedText
                      text={activeSector.recommendedProduct.name}
                    />
                  </h4>
                  {activeSector.recommendedProduct.highlight && (
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                      <FormattedText
                        text={activeSector.recommendedProduct.highlight}
                      />
                    </p>
                  )}
                  {activeSector.recommendedProduct.oemMatch && (
                    <div className="mt-2 text-[11px] font-bold text-slate-500">
                      {oemPrefix && <FormattedText text={oemPrefix} />}{" "}
                      <FormattedText
                        text={activeSector.recommendedProduct.oemMatch}
                      />
                    </div>
                  )}

                  {buttonText && (
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenEnquiry(
                            `${activeSector.name} - ${activeSector.recommendedProduct.name} Quote`,
                          )
                        }
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                      >
                        <span>
                          <FormattedText text={buttonText} />
                        </span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
