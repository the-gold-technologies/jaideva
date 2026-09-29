"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export interface BrandItem {
  id: string;
  name: string;
  logo: string;
}

export default function TrustedClientsSection() {
  const { pages } = useCMSStore();
  const {
    title,
    subtitle,
    clients = [],
  } = pages["home"]?.TrustedClientsSection || {};

  if (!Array.isArray(clients) || clients.length === 0) {
    return null;
  }

  // Data comes strictly from CMS
  const brandsSource: BrandItem[] = clients
    .filter((c: any) => c && c.logo)
    .map((c: any) => ({
      id: c.id || c.slug || c.name,
      name: c.name || "",
      logo: c.logo,
    }));

  if (brandsSource.length === 0) {
    return null;
  }

  // Quadruple clone for a completely seamless infinite loop
  const marqueeBrands = [
    ...brandsSource,
    ...brandsSource,
    ...brandsSource,
    ...brandsSource,
  ];

  return (
    <section
      id="trusted-clients"
      className="py-14 sm:py-16 bg-[#f8fafc] text-center font-sans overflow-hidden border-t border-b border-gray-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 mb-8 sm:mb-10">
        {/* Section Heading */}
        {title && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] uppercase tracking-wide section-underline">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-3xl mx-auto font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {/* Seamless Borderless Marquee (No Boxes, No Bottom Names) */}
      <div className="relative w-full overflow-hidden py-6 flex select-none group bg-white border-y border-slate-200/70 shadow-2xs">
        {/* Left & Right Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Flex Track */}
        <div className="flex gap-12 sm:gap-16 items-center animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          {marqueeBrands.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="shrink-0 flex items-center justify-center px-4 py-2 hover:scale-110 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 sm:h-12 max-w-[160px] sm:max-w-[200px] w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind marquee keyframe styling inlined */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}
