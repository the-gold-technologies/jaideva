"use client";

import React from "react";
import {
  Calendar,
  Layers,
  Boxes,
  ShieldCheck,
  Users,
  Clock,
  Truck,
  Factory,
  Award,
  CheckCircle2,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
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
  Truck,
  truck: Truck,
  Factory,
  factory: Factory,
  Award,
  award: Award,
  CheckCircle2,
};

function resolveIcon(iconKey: unknown): React.ElementType {
  const key = typeof iconKey === "string" ? iconKey.trim() : "";
  return (
    (key && ICON_MAP[key]) ||
    (key && ICON_MAP[key.toLowerCase()]) ||
    (typeof iconKey === "function"
      ? (iconKey as React.ElementType)
      : CheckCircle2)
  );
}

export default function AboutWhyChooseSection() {
  const { pages } = useCMSStore();
  const sectionData =
    pages["about-us"]?.AboutWhyChooseSection ||
    pages["about-us"]?.AboutWhyChoose ||
    pages["about-us"]?.AboutJaiDevaContent ||
    {};

  const whyChooseTitle = sectionData.whyChooseTitle || sectionData.title;
  const whyChooseSubtitle = sectionData.whyChooseSubtitle || sectionData.subtitle;
  const whyChooseItems = sectionData.whyChooseItems || sectionData.items || [];

  if (!whyChooseTitle && (!Array.isArray(whyChooseItems) || whyChooseItems.length === 0))
    return null;

  return (
    <section
      id="why-choose-us"
      className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200/80 font-sans"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {whyChooseTitle && (
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-2 text-center md:text-left">
            <FormattedText text={whyChooseTitle} />
          </h2>
        )}
        {whyChooseSubtitle && (
          <p className="text-[#C86218] font-bold text-base md:text-lg mb-8 text-center md:text-left">
            <FormattedText text={whyChooseSubtitle} />
          </p>
        )}

        {Array.isArray(whyChooseItems) && whyChooseItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseItems.map((item: any, index: number) => {
              const IconComp = resolveIcon(item.icon);
              const descText = item.description || item.desc || "";

              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:shadow-md hover:border-[#C86218] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0C356A] text-white flex items-center justify-center mb-4 transition-transform group-hover:scale-105 shadow-2xs">
                    <IconComp size={24} />
                  </div>
                  {item.title && (
                    <h3 className="text-lg font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors mb-2">
                      <FormattedText text={item.title} />
                    </h3>
                  )}
                  {descText && (
                    <p className="text-slate-600 text-sm leading-relaxed">
                      <FormattedText text={descText} />
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
