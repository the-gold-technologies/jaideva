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

function resolveIcon(iconKey: string): React.ElementType {
  const key = typeof iconKey === "string" ? iconKey.trim() : "";
  return ICON_MAP[key] || ICON_MAP[key.toLowerCase()] || ShieldCheck;
}

export default function BrandsPillarsSection() {
  const { pages } = useCMSStore();
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
  } = pages["brands"]?.BrandsPillarsSection || {};

  const sidePhoto = image || sideImage;

  if (!heading && (!Array.isArray(pillars) || pillars.length === 0))
    return null;

  return (
    <section className="py-20 bg-white font-sans border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Pillars */}
          <div className="lg:col-span-7">
            {eyebrow && (
              <span className="inline-block text-xs font-black tracking-[0.25em] uppercase mb-2 text-[#C86218]">
                <FormattedText text={eyebrow} />
              </span>
            )}
            {heading && (
              <h2 className="text-3xl sm:text-4xl font-black text-[#0C356A] uppercase tracking-[-0.02em] leading-tight mb-4">
                <FormattedText text={heading} />
              </h2>
            )}
            {description && (
              <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-2xl">
                <FormattedText text={description} />
              </p>
            )}

            {Array.isArray(pillars) && pillars.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6">
                {pillars.map((pillar: any, index: number) => {
                  const IconComp = resolveIcon(pillar.icon);
                  return (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#C86218] hover:bg-white hover:shadow-md transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0C356A] text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <IconComp size={20} />
                      </div>
                      {pillar.title && (
                        <h3 className="text-base font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors mb-1.5">
                          <FormattedText text={pillar.title} />
                        </h3>
                      )}
                      {pillar.description && (
                        <p className="text-xs text-slate-600 leading-relaxed">
                          <FormattedText text={pillar.description} />
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Visual Feature & Guarantee Badge */}
          {sidePhoto && (
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
                <img
                  src={sidePhoto}
                  alt={heading || "Refinery warehouse distribution"}
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C356A]/90 via-[#0C356A]/25 to-transparent" />

                {verifiedBadge && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0C356A] text-xs font-black uppercase tracking-wider shadow-sm">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      {verifiedBadge}
                    </span>
                  </div>
                )}

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
                      <div className="text-sm font-bold text-[#0C356A]">
                        {guaranteeHeadline}
                      </div>
                    )}
                    {guaranteeDesc && (
                      <p className="text-xs text-slate-500 mt-1">
                        {guaranteeDesc}
                      </p>
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
