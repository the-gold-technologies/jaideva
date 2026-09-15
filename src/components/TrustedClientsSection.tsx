"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export interface TrustedClientItem {
  id?: string | number;
  name: string;
  category?: string;
  logo: string;
}

export default function TrustedClientsSection() {
  const { pages } = useCMSStore();
  const cmsClientsSection = pages["home"]?.TrustedClientsSection;

  if (!cmsClientsSection) {
    return null;
  }

  const rawClients: TrustedClientItem[] = cmsClientsSection.clients || [];

  if (rawClients.length === 0) {
    return null;
  }

  const title = cmsClientsSection.title || "";
  const subtitle =
    cmsClientsSection.subtitle || cmsClientsSection.description || "";

  // Multiple clones for seamless infinite looping
  const marqueeClients = [
    ...rawClients,
    ...rawClients,
    ...rawClients,
    ...rawClients,
  ];

  return (
    <section
      id="trusted-clients"
      className="py-14 bg-[#f8fafc] text-center font-sans overflow-hidden border-t border-b border-gray-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 mb-10">
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

      {/* Infinite Horizontal Logo Marquee Container */}
      <div className="relative w-full overflow-hidden py-2 flex select-none group">
        {/* Left & Right Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Flex Track */}
        <div className="flex gap-5 sm:gap-6 items-stretch animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          {marqueeClients.map((client, idx) => (
            <div
              key={`${client.id || idx}-${idx}`}
              className="group/card shrink-0 bg-white border border-gray-200/90 rounded-xl shadow-xs hover:shadow-lg hover:-translate-y-0.5 hover:border-[#C86218]/40 transition-all duration-300 flex flex-col items-center justify-center gap-3 w-[184px] sm:w-[208px] h-28 px-4"
            >
              {/* Client Logo */}
              {client.logo && (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200 p-2 transition-all duration-300 group-hover/card:ring-[#C86218]/50">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              {/* Client Name */}
              <p className="text-sm font-extrabold text-[#002b5c] tracking-tight leading-tight">
                {client.name}
              </p>
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
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
