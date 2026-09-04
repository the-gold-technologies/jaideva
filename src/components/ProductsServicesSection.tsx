"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface ProductsServicesProps {
  onSelectCategory?: (category: string) => void;
}

const DEFAULT_PRODUCTS = [
  {
    id: "engine-oil",
    slug: "engine-oil",
    name: "Engine Oil",
    img: "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-1.png",
    hoverImg:
      "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-1-hover.png",
  },
  {
    id: "hydraulic-oil",
    slug: "hydraulic-oil",
    name: "Hydraulic Oil",
    img: "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-2.png",
    hoverImg:
      "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-2-hover.png",
  },
  {
    id: "gear-oil",
    slug: "gear-oil",
    name: "Gear Oil",
    img: "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-3.png",
    hoverImg:
      "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-3-hover.png",
  },
  {
    id: "industrial-grease",
    slug: "industrial-grease",
    name: "Industrial Grease",
    img: "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-4.png",
    hoverImg:
      "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-4-hover.png",
  },
  {
    id: "cutting-oil",
    slug: "cutting-oil",
    name: "Cutting Oil",
    img: "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-5.png",
    hoverImg:
      "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-5-hover.png",
  },
  {
    id: "rust-preventive-oil",
    slug: "rust-preventive-oil",
    name: "Rust Preventive Oil",
    img: "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-6.png",
    hoverImg:
      "https://res.cloudinary.com/dpa93copz/image/upload/v1787731177/mahalaxmi/products/cat-6-hover.png",
  },
];

export default function ProductsServicesSection({
  onSelectCategory,
}: ProductsServicesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { pages } = useCMSStore();

  const cmsSection = pages["home"]?.ProductsServicesSection;

  const title = cmsSection?.title || "OUR PRODUCT RANGE";
  const subtitle =
    cmsSection?.subtitle || "Complete Lubrication Solutions under One Roof";

  const items: any[] =
    cmsSection?.items && cmsSection.items.length > 0
      ? cmsSection.items
      : DEFAULT_PRODUCTS;

  return (
    <section id="products" className="py-16 bg-[#f8fafc] text-center font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with Underline */}
        {title && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-wide section-underline font-sans">
            {title}
          </h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-base md:text-lg font-bold text-gray-700 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Category Items in Clean Circular UI Layout (Without Description) */}
        <div className="mt-12 flex justify-center items-center gap-8 sm:gap-14 md:gap-20 flex-wrap">
          {items.map((item, idx) => {
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
                <h3 className="mt-4 text-sm sm:text-base font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                  {item.name || item.title}
                </h3>
              </Link>
            );
          })}
        </div>

        {/* View All Products Button */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
