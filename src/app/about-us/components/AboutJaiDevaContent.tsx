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
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";
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

// Fallback milestones, used until the CMS provides `journeyMilestones`.
// Edit / reorder here, or move this array into the CMS under
// pages["about-us"].AboutJaiDevaContent.journeyMilestones
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

function JourneyTimeline({
  eyebrow,
  heading,
  intro,
  milestones,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  milestones: any[];
}) {
  if (!milestones.length) return null;

  return (
    <div className="mb-14">
      <div className="mb-10 text-center md:text-left">
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
                  <div className="inline-block w-full rounded-2xl border border-slate-200 bg-white p-5 md:p-6 hover:border-[#C86218] transition-colors">
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
    </div>
  );
}

const DEFAULT_TITLE = "About Jai Deva Oil Co.";
const DEFAULT_SUBTITLE =
  "Mr. Mayank Goyal – Mentor & Proprietor, Jai Deva Oil Co.";
const DEFAULT_PARAGRAPHS = [
  "Established in the year 2008, Jai Deva Oil Co. is a leading and prominent wholesaler, distributor, and trader of lubricant oil, engine oil, automotive grease, hydraulic oil, cutting oil, gear oil, rust preventive oil and much more. Made using the finest quality inputs alongside superior machinery, our products are highly admired and recommended, and each is tested carefully before delivery to our customers. Available in a range of sizes and packing, they can be purchased from us at affordable costs.",
  "Our team of professionals keeps a close watch on clients' evolving requirements, helping us meet them within a defined period of time. Owing to our quality-centric approach, we have been highly proficient in meeting the needs of clients across the marketplace, backed by a team of skilled and dexterous professionals with years of expertise in this business.",
  "We are headed by our mentor Mr. Mayank Goyal, who brings extensive knowledge and experience to the field. Owing to his balanced business plans and policies, we have attained a noteworthy position in the industry.",
];

export default function AboutJaiDevaContent() {
  const { pages, pageSEO } = useCMSStore();
  const cmsStory = pages["about-us"]?.AboutJaiDevaContent;

  if (!cmsStory) {
    return null;
  }

  const title = cmsStory.title || DEFAULT_TITLE;
  const subtitle = cmsStory.subtitle || DEFAULT_SUBTITLE;
  const paragraphs: string[] =
    Array.isArray(cmsStory.paragraphs) && cmsStory.paragraphs.length
      ? cmsStory.paragraphs
      : typeof cmsStory.description === "string" && cmsStory.description
        ? [cmsStory.description]
        : DEFAULT_PARAGRAPHS;

  const whyChooseTitle = cmsStory.whyChooseTitle || "";
  const whyChooseSubtitle = cmsStory.whyChooseSubtitle || "";
  const whyChooseItems: any[] = Array.isArray(cmsStory.whyChooseItems)
    ? cmsStory.whyChooseItems
    : [];

  const journeyEyebrow = cmsStory.journeyEyebrow || "Our Journey";
  const journeyHeading = cmsStory.journeyHeading || "Building Trust Since 2008";
  const journeyIntro =
    cmsStory.journeyIntro ||
    "Every milestone below reflects a step in how we grew from a single trading desk into a multi-brand lubricant distribution partner.";
  const journeyMilestones: any[] = Array.isArray(cmsStory.journeyMilestones)
    ? cmsStory.journeyMilestones
    : DEFAULT_MILESTONES;

  const HeadingTag = getHeadingTag(pageSEO["about-us"]?.headingOptions, "h1");

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 font-sans">
      {/* Main Section Header */}
      {title && (
        <HeadingTag className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-3 border-b-2 border-gray-100 pb-4">
          <FormattedText text={title} />
        </HeadingTag>
      )}

      {/* Mentor byline */}
      {subtitle && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#0C356A] text-white flex items-center justify-center">
            <Users size={18} />
          </div>
          <p className="text-base md:text-lg font-bold text-[#C86218]">
            <FormattedText text={subtitle} />
          </p>
        </div>
      )}

      {/* Text Paragraphs */}
      {paragraphs.length > 0 && (
        <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed font-sans mb-14">
          {paragraphs.map((p, idx) => (
            <p key={idx}>
              <FormattedText text={p} />
            </p>
          ))}
        </div>
      )}

      <JourneyTimeline
        eyebrow={journeyEyebrow}
        heading={journeyHeading}
        intro={journeyIntro}
        milestones={journeyMilestones}
      />

      {/* Why Choose Jai Deva Oil Co. Section */}
      {(whyChooseTitle || whyChooseSubtitle || whyChooseItems.length > 0) && (
        <div className="mt-14 pt-10 border-t border-gray-200">
          {whyChooseTitle && (
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0C356A] tracking-tight uppercase mb-2">
              <FormattedText text={whyChooseTitle} />
            </h2>
          )}
          {whyChooseSubtitle && (
            <p className="text-[#C86218] font-bold text-base md:text-lg mb-8">
              <FormattedText text={whyChooseSubtitle} />
            </p>
          )}

          {/* Feature Grid */}
          {whyChooseItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseItems.map((item: any, index: number) => {
                const IconComp = resolveIcon(item.icon);
                const descText = item.description || item.desc || "";

                return (
                  <div
                    key={index}
                    className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#C86218] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#0C356A] text-white flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                      <IconComp size={24} />
                    </div>
                    {item.title && (
                      <h3 className="text-lg font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors mb-2">
                        <FormattedText text={item.title} />
                      </h3>
                    )}
                    {descText && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <FormattedText text={descText} />
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
