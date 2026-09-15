"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface ProductsServicesProps {
  onSelectCategory?: (category: string) => void;
}

export default function ProductsServicesSection({
  onSelectCategory,
}: ProductsServicesProps) {
  const { pages } = useCMSStore();

  const cmsSection = pages["home"]?.ProductsServicesSection;

  if (!cmsSection) {
    return null;
  }

  const title = cmsSection.title || "";
  const subtitle = cmsSection.subtitle || "";
  const items: any[] = Array.isArray(cmsSection.items) ? cmsSection.items : [];

  if (items.length === 0 && !title) {
    return null;
  }

  const renderProductTile = (item: any, idx: number) => {
    const itemId = item.id || item.slug || `cat-${idx}`;
    const link = item.link || `/products/${item.slug || itemId}`;
    const name = item.name || item.title;
    const baseImage = item.img;
    const hoverImage = item.hoverImg;

    return (
      <Link
        key={itemId}
        href={link}
        onClick={() => onSelectCategory && onSelectCategory(itemId)}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        {/* Icon Ring Panel */}
        <div className="flex aspect-square w-full items-center justify-center bg-[#f8fafc] p-6">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-[#0C356A]/30 bg-white transition-colors duration-300 sm:h-28 sm:w-28 group-hover:border-[#C86218]">
            {baseImage ? (
              <>
                <img
                  src={baseImage}
                  alt={name}
                  className="h-full w-full rounded-full object-contain p-3 transition-opacity duration-300 group-hover:opacity-0"
                />
                {hoverImage && (
                  <img
                    src={hoverImage}
                    alt={name}
                    className="absolute inset-0 h-full w-full rounded-full object-contain p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
              </>
            ) : (
              <span className="text-2xl font-black text-[#0C356A]">
                {name ? name.charAt(0) : "?"}
              </span>
            )}
          </div>
        </div>

        {/* Name Band */}
        <div className="flex min-h-[56px] items-center justify-between gap-2 bg-[#0C356A] px-4 py-3 transition-colors duration-300 group-hover:bg-[#C86218] sm:min-h-[64px]">
          <span className="text-xs font-bold uppercase leading-snug tracking-wide text-white sm:text-sm">
            {name}
          </span>
          <ArrowRight
            size={14}
            className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </Link>
    );
  };

  return (
    <section
      id="products"
      className="py-10 sm:py-12 bg-[#f8fafc] text-center font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with Underline */}
        {title && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-wide section-underline font-sans">
            {title}
          </h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-2.5 text-base md:text-lg font-bold text-gray-700 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Catalog Tile Grid */}
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {items.map((item, idx) => renderProductTile(item, idx))}
        </div>

        {/* View All Products Button */}
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3 rounded shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
