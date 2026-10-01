"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Phone, ArrowRight } from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";

interface CategoryHeroProps {
  onOpenEnquiry?: () => void;
}

export function CategoryHero({ onOpenEnquiry }: CategoryHeroProps) {
  const params = useParams();
  const categorySlug = params?.category as string;
  const { productCategories, products, pageSEO } = useCMSStore();

  const category = productCategories?.find((c) => c.slug === categorySlug);
  if (!category) return null;

  const currentSEO = pageSEO?.[`products/${categorySlug}`];
  const HeadingTag = getHeadingTag(currentSEO?.headingOptions, "h1");
  const heroProduct = products?.find((p) => p.categorySlug === categorySlug);

  return (
    <section className="relative isolate overflow-hidden bg-[#071f3b] text-white">
      {category.coverImage && (
        <img
          src={category.coverImage}
          alt={category.name}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[#071f3b]/50" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071f3b]/90 via-[#071f3b]/80 to-[#071f3b]/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12 md:pt-10 md:pb-16">
        <nav className="flex items-center gap-1.5 text-[11px] text-blue-200/80 mb-8 font-medium tracking-wide">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="opacity-50" />
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <ChevronRight size={12} className="opacity-50" />
          <span className="text-[#F4B24D] font-semibold">{category.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <HeadingTag className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-[1.08] text-white">
              {category.name}
            </HeadingTag>

            {category.shortDesc && (
              <p className="mt-3 text-base md:text-lg font-semibold text-[#F4B24D]">
                {category.shortDesc}
              </p>
            )}

            {category.fullDesc && (
              <p className="mt-4 text-sm md:text-base leading-7 text-slate-200 max-w-2xl">
                {category.fullDesc}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {onOpenEnquiry && (
                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="inline-flex items-center gap-2 rounded-md bg-[#C86218] px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-[#C86218]/25 transition hover:bg-[#A74D0E] cursor-pointer"
                >
                  <Phone size={13} />
                  {category.primaryCtaText || "Request a Quote"}
                </button>
              )}
              <a
                href="#subcat-0"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("subcat-0")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
              >
                {category.secondaryCtaText} <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {heroProduct && (
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 shadow-2xl">
                  {heroProduct.containerImage && (
                    <img
                      src={heroProduct.containerImage}
                      alt={heroProduct.name}
                      className="w-full h-56 md:h-72 object-cover object-center"
                    />
                  )}
                  <div className="px-4 py-3 bg-[#071f3b]/80 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4B24D]">
                      {category.featuredBadgeText}
                    </p>
                    <p className="mt-0.5 text-sm font-extrabold uppercase tracking-wide text-white truncate">
                      {heroProduct.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
