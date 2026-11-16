"use client";

import React from "react";
import { AlignLeft, CheckCircle2, Images } from "lucide-react";
import { FormattedText } from "@/components/FormattedText";
import { SpecTable } from "@/components/SpecTable";
import { normalizeSections, type ProductSection } from "@/lib/productSections";

interface ProductCustomSectionsProps {
  sections: unknown;
  productName: string;
}

const cardCls = "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm";

function SectionHeading({
  title,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}) {
  if (!title) return null;
  return (
    <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-slate-100">
      <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
        <Icon size={16} className={iconColor} />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-[#002b5c] tracking-tight">{title}</h3>
    </div>
  );
}

function Section({ section, productName }: { section: ProductSection; productName: string }) {
  switch (section.type) {
    case "table":
      return (
        <SpecTable
          title={section.title}
          propertyHeader={section.tablePropertyHeader ?? ""}
          tableHeaders={section.tableHeaders}
          rows={section.propertiesTable}
        />
      );

    case "text":
      if (!section.content?.trim()) return null;
      return (
        <div className={cardCls}>
          <SectionHeading
            title={section.title}
            icon={AlignLeft}
            iconBg="bg-[#002b5c]/10"
            iconColor="text-[#002b5c]"
          />
          <div className="px-6 py-5">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              <FormattedText text={section.content.trim()} />
            </p>
          </div>
        </div>
      );

    case "list":
      if (!section.items?.length) return null;
      return (
        <div className={cardCls}>
          <SectionHeading
            title={section.title}
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <ul className="px-6 py-5 space-y-2.5">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                <span className="leading-snug">
                  <FormattedText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "images":
      if (!section.images?.length) return null;
      return (
        <div className={cardCls}>
          <SectionHeading
            title={section.title}
            icon={Images}
            iconBg="bg-[#C86218]/10"
            iconColor="text-[#C86218]"
          />
          <div
            className={`px-6 py-5 grid gap-4 ${
              section.images.length === 1
                ? "grid-cols-1"
                : section.images.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-2 md:grid-cols-3"
            }`}
          >
            {section.images.map((src, i) => (
              <a
                key={i}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-slate-50 border border-slate-200 p-3 hover:border-[#C86218]/40 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${section.title || productName} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-48 object-contain mx-auto"
                />
              </a>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

/** Extra sections added per product in the CMS ("Additional Sections"). */
export function ProductCustomSections({ sections, productName }: ProductCustomSectionsProps) {
  const list = normalizeSections(sections);
  if (list.length === 0) return null;
  return (
    <>
      {list.map((section) => (
        <Section key={section.id} section={section} productName={productName} />
      ))}
    </>
  );
}
