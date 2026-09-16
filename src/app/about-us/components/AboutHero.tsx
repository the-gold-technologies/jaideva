"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Factory } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface AboutHeroProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function AboutHero({ onOpenEnquiry }: AboutHeroProps) {
  const { pages } = useCMSStore();
  const cmsHero = pages["about-us"]?.AboutHero;

  const heroImage = "/oil-drums-warehouse.jpg";
  const heading = cmsHero?.heading || "Built on Trust Since 2008";
  const tagline = cmsHero?.tagline || "Less You Burn, the More You Earn";
  const description =
    cmsHero?.description ||
    "Jai Deva Oil Co. is a multi-brand industrial and automotive lubricant distributor. We source, stock, and supply genuine oils, greases, and specialty fluids for plants, fleets, and workshops — with quality checks and dependable regional delivery.";

  return (
    <section className="relative isolate overflow-hidden bg-[#071f3b] text-white">
      <img
        src={heroImage}
        alt={
          cmsHero?.altText || "Jai Deva Oil Co. lubricant warehouse and supply"
        }
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071f3b]/90 via-[#071f3b]/80 to-[#071f3b]/70" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 text-center md:px-8 md:py-24">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 border-l-4 border-[#F4B24D] pl-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F4B24D]">
            <Factory size={15} />
            About Jai Deva Oil Co.
          </div>

          <h1 className="text-3xl font-black uppercase leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
            {heading}
          </h1>

          <p className="mt-3 text-base font-semibold text-[#F4B24D] sm:text-lg">
            {tagline}
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#about-story"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about-story")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 rounded-md bg-[#C86218] px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-[#C86218]/25 transition hover:bg-[#A74D0E]"
            >
              Read our story <ArrowRight size={14} />
            </a>
            {onOpenEnquiry ? (
              <button
                type="button"
                onClick={() => onOpenEnquiry("About Jai Deva Oil Co.")}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
              >
                Talk to us
              </button>
            ) : (
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
              >
                Contact us
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
