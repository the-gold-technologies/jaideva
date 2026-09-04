"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface ProductsServicesProps {
  onSelectCategory?: (category: string) => void;
}

export default function ProductsServicesSection({
  onSelectCategory,
}: ProductsServicesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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

  const topRowItems = items.slice(0, 4);
  const bottomRowItems = items.slice(4);

  const renderProductCard = (item: any, idx: number) => {
    const itemId = item.id || item.slug || `cat-${idx}`;
    const isHovered = hoveredId === itemId;
    const bgImage = isHovered
      ? item.hoverImg || item.img
      : item.img || item.hoverImg;
    const link = item.link || `/products/${item.slug || itemId}`;

    return (
      <Link
        key={itemId}
        href={link}
        onMouseEnter={() => setHoveredId(itemId)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => onSelectCategory && onSelectCategory(itemId)}
        className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
      >
        {/* Circular Background Image Box */}
        {bgImage ? (
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-contain bg-no-repeat bg-center transition-all duration-300 drop-shadow-md group-hover:drop-shadow-xl"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          />
        ) : (
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-b from-[#009bf2] to-[#004f9e] transition-all duration-300 drop-shadow-md group-hover:drop-shadow-xl flex items-center justify-center text-white font-bold" />
        )}

        {/* Product Name */}
        <h3 className="mt-2.5 text-sm sm:text-base font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors text-center">
          {item.name || item.title}
        </h3>
      </Link>
    );
  };

  return (
    <section id="products" className="py-10 sm:py-12 bg-[#f8fafc] text-center font-sans">
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

        {/* Row 1: 4 in Top Row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto justify-items-center">
          {topRowItems.map((item, idx) => renderProductCard(item, idx))}
        </div>

        {/* Row 2: Rest 2 in Bottom Row with Reduced Gap */}
        {bottomRowItems.length > 0 && (
          <div className="mt-4 sm:mt-5 flex justify-center items-center gap-10 sm:gap-16 flex-wrap">
            {bottomRowItems.map((item, idx) =>
              renderProductCard(item, idx + 4)
            )}
          </div>
        )}

        {/* View All Products Button */}
        <div className="mt-8 text-center">
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
