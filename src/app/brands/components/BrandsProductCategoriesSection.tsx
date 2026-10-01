"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

export default function BrandsProductCategoriesSection() {
  const { pages } = useCMSStore();
  const {
    eyebrow,
    heading,
    description,
    categories = [],
  } = pages["brands"]?.BrandsProductCategoriesSection || {};

  if (!heading && (!Array.isArray(categories) || categories.length === 0)) return null;

  return (
    <section className="py-20 bg-slate-50 font-sans border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading || description) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
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
              <p className="text-slate-600 text-base leading-relaxed">
                <FormattedText text={description} />
              </p>
            )}
          </div>
        )}

        {Array.isArray(categories) && categories.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category: any, idx: number) => (
              <div
                key={`${category.name}-${idx}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {category.image && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name || "Product category"}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    {category.badge && (
                      <span className="absolute bottom-3 left-3 inline-block px-2.5 py-1 rounded bg-[#0C356A] text-white text-[11px] font-bold uppercase tracking-wider">
                        {category.badge}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {category.name && (
                      <h3 className="text-lg font-bold text-[#0C356A] mb-2 group-hover:text-[#C86218] transition-colors">
                        <FormattedText text={category.name} />
                      </h3>
                    )}
                    {category.description && (
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        <FormattedText text={category.description} />
                      </p>
                    )}
                  </div>

                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C86218] hover:text-[#0C356A] transition-colors"
                  >
                    View Lubricants <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
