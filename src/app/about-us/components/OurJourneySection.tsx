"use client";

import React from "react";
import {
  Calendar,
  Layers,
  Boxes,
  ShieldCheck,
  Users,
  Clock,
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
  CheckCircle2,
};

const DEFAULT_MILESTONES = [
  {
    year: "2008",
    icon: "Calendar",
    title: "Company founded",
    description:
      "Jai Deva Oil Co. begins trading lubricants, laying the foundation for long-term partnerships built on trust.",
  },
  {
    year: "2012",
    icon: "Layers",
    title: "Multi-brand portfolio",
    description:
      "We broaden our range to include industrial and automotive lubrication brands, giving customers more choice under one roof.",
  },
  {
    year: "2016",
    icon: "Boxes",
    title: "Distribution network grows",
    description:
      "Our warehousing and logistics footprint expands, so customers across sectors can rely on consistent supply.",
  },
  {
    year: "2021",
    icon: "ShieldCheck",
    title: "Quality-first standards",
    description:
      "We strengthen sourcing and storage practices to meet stricter industry quality and handling standards.",
  },
  {
    year: "Today",
    icon: "Users",
    title: "A trusted industry partner",
    description:
      "We keep growing alongside our customers, offering industry-focused lubrication solutions and dependable service.",
  },
];

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

export default function OurJourneySection() {
  const { pages } = useCMSStore();
  const cmsStory = pages["about-us"]?.AboutJaiDevaContent || {};

  const eyebrow = cmsStory.journeyEyebrow || "Our Journey";
  const heading = cmsStory.journeyHeading || "Building Trust Since 2008";
  const intro =
    cmsStory.journeyIntro ||
    "Every milestone below reflects a step in how we grew from a single trading desk into a multi-brand lubricant distribution partner.";
  const milestones: any[] =
    Array.isArray(cmsStory.journeyMilestones) &&
    cmsStory.journeyMilestones.length
      ? cmsStory.journeyMilestones
      : DEFAULT_MILESTONES;

  return (
    <section
      id="our-journey"
      className="max-w-6xl mx-auto px-4 md:px-8 py-14 sm:py-20 font-sans"
    >
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        {eyebrow && (
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#C86218]">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-[#0C356A] md:text-3xl lg:text-[2.5rem]">
            {heading}
          </h2>
        )}
        {intro && (
          <p className="mt-3 max-w-2xl text-slate-600 text-sm md:text-base leading-relaxed md:mx-0 mx-auto">
            <FormattedText text={intro} />
          </p>
        )}
      </div>

      {/* Timeline Tree */}
      <div className="relative">
        {/* Spine */}
        <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-px border-l-2 border-dashed border-[#cbd5e1] md:-translate-x-1/2" />

        <div className="space-y-10 md:space-y-14">
          {milestones.map((m, idx) => {
            const Icon = resolveIcon(m.icon);
            const isEven = idx % 2 === 1;

            return (
              <div
                key={`${m.title}-${idx}`}
                className={`relative flex items-start md:items-center gap-5 md:gap-0 ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Icon node */}
                <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-[#0C356A] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(12,53,106,0.25)] ring-4 ring-[#f8fafc]">
                    <Icon size={20} />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`flex-1 pl-2 md:pl-0 ${
                    isEven
                      ? "md:pr-[calc(50%+2rem)] md:text-right"
                      : "md:pl-[calc(50%+2rem)]"
                  }`}
                >
                  <div className="inline-block w-full rounded-2xl border border-slate-200 bg-white p-5 md:p-6 hover:border-[#C86218] transition-colors shadow-2xs">
                    {m.year && (
                      <span className="inline-block mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#C86218]">
                        {m.year}
                      </span>
                    )}
                    {m.title && (
                      <h3 className="text-lg font-bold text-[#0C356A] mb-1.5">
                        <FormattedText text={m.title} />
                      </h3>
                    )}
                    {m.description && (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        <FormattedText text={m.description} />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
