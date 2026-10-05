"use client";

import React from "react";
import {
  Factory,
  Wrench,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Boxes,
  Layers,
  Award,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const ICON_MAP: Record<string, React.ElementType> = {
  Factory,
  factory: Factory,
  Wrench,
  wrench: Wrench,
  Truck,
  truck: Truck,
  ShieldCheck,
  shieldcheck: ShieldCheck,
  "shield-check": ShieldCheck,
  CheckCircle2,
  Boxes,
  Layers,
  Award,
};

function resolveIcon(iconKey: any): React.ElementType {
  if (typeof iconKey !== "string") return ShieldCheck;
  const key = iconKey.trim();
  return ICON_MAP[key] || ICON_MAP[key.toLowerCase()] || ShieldCheck;
}

export default function BrandsPillarsSection() {
  const { pages } = useCMSStore();
  const rawData = pages["brands"]?.BrandsPillarsSection;
  const sectionData =
    typeof rawData === "string"
      ? (() => {
          try {
            return JSON.parse(rawData);
          } catch {
            return {};
          }
        })()
      : rawData || {};

  const {
    eyebrow,
    heading,
    description,
    image,
    sideImage,
    verifiedBadge,
    guaranteeTitle,
    guaranteeTag,
    guaranteeHeadline,
    guaranteeDesc,
    pillars = [],
  } = sectionData;

  const sidePhoto = image || sideImage;

  if (!heading && (!Array.isArray(pillars) || pillars.length === 0)) {
    return null;
  }

  return (
    <section className="py-20 bg-white font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & 4 Pillars */}
          <div className="lg:col-span-7">
            {eyebrow && (
              <span className="inline-block text-xs font-black tracking-[0.25em] uppercase mb-2 text-[#C86218]">
                <FormattedText text={eyebrow} />
              </span>
            )}
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-[-0.03em] text-[#0C356A] leading-tight">
                <FormattedText text={heading} />
              </h2>
            )}
            {description && (
              <p className="mt-3 max-w-xl text-base text-slate-600 leading-relaxed">
                <FormattedText text={description} />
              </p>
            )}

            {Array.isArray(pillars) && pillars.length > 0 && (
              <div className="mt-8 space-y-4">
                {pillars.map((pillar: any, index: number) => {
                  const IconComp = resolveIcon(pillar.icon);
                  return (
                    <div
                      key={pillar.title || index}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#C86218]/40 hover:bg-white transition-all flex items-start gap-4 shadow-2xs"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0C356A]/10 text-[#0C356A]">
                        <IconComp size={20} />
                      </div>
                      <div>
                        {pillar.title && (
                          <h3 className="text-base font-extrabold text-[#0C356A]">
                            <FormattedText text={pillar.title} />
                          </h3>
                        )}
                        {pillar.description && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                            <FormattedText text={pillar.description} />
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Engine Oil & Warehouse Photography Showcase */}
          {sidePhoto && (
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
                <img
                  src={sidePhoto}
                  alt={heading || "Sealed motor oil barrels and warehouse distribution"}
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C356A]/90 via-[#0C356A]/25 to-transparent" />

                {/* Floating Verified Badge */}
                {verifiedBadge && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0C356A] text-xs font-black uppercase tracking-wider shadow-sm">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      {verifiedBadge}
                    </span>
                  </div>
                )}

                {/* Bottom Inset Card */}
                {(guaranteeHeadline || guaranteeTitle || guaranteeDesc) && (
                  <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-slate-800">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      {guaranteeTitle && (
                        <span className="text-xs font-black uppercase text-[#C86218] tracking-wider">
                          {guaranteeTitle}
                        </span>
                      )}
                      {guaranteeTag && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {guaranteeTag}
                        </span>
                      )}
                    </div>
                    {guaranteeHeadline && (
                      <div className="text-sm font-bold text-[#0C356A]">{guaranteeHeadline}</div>
                    )}
                    {guaranteeDesc && (
                      <p className="text-xs text-slate-500 mt-1">{guaranteeDesc}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
