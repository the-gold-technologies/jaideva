"use client";

import React from "react";
import {
  Calendar,
  Layers,
  Boxes,
  ShieldCheck,
  Users,
  Clock,
  Sparkles,
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
  Sparkles,
  sparkles: Sparkles,
  CheckCircle2,
};

const COLOR_STYLES = [
  "bg-[#0C356A]/10 text-[#0C356A]",
  "bg-[#C86218]/10 text-[#C86218]",
  "bg-[#EAA824]/15 text-[#C86218]",
  "bg-emerald-100 text-emerald-800",
  "bg-[#0C356A]/10 text-[#0C356A]",
  "bg-[#C86218]/10 text-[#C86218]",
];

export default function WhyJaiDevaSection() {
  const { pages } = useCMSStore();
  const cmsSection = pages["home"]?.WhyJaiDevaSection;

  if (!cmsSection) {
    return null;
  }

  const title = cmsSection.title || "";
  const subtitle = cmsSection.subtitle || "";
  const points: any[] = Array.isArray(cmsSection.points)
    ? cmsSection.points
    : [];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-white font-sans text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-wide section-underline font-sans">
              <FormattedText text={title} />
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-lg md:text-xl font-bold text-[#C86218]">
              <FormattedText text={subtitle} />
            </p>
          )}
        </div>

        {/* 6 Feature Cards Grid */}
        {points.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            {points.map((pt: any, idx: number) => {
              const iconKey = typeof pt.icon === "string" ? pt.icon.trim() : "";
              const Icon =
                (iconKey && ICON_MAP[iconKey]) ||
                (iconKey && ICON_MAP[iconKey.toLowerCase()]) ||
                (typeof pt.icon === "function" && pt.icon) ||
                CheckCircle2;
              const colorClass = COLOR_STYLES[idx % COLOR_STYLES.length];

              return (
                <div
                  key={pt.title || idx}
                  className="bg-[#f8fafc] rounded-xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#C86218] transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass} transition-transform duration-300 group-hover:scale-110 shadow-2xs`}
                    >
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                        <FormattedText text={pt.title || ""} />
                      </h3>
                      {pt.desc && (
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed font-sans">
                          <FormattedText text={pt.desc} />
                        </p>
                      )}
                    </div>
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
