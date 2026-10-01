"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Factory, Truck } from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

interface HomeHeroProps {
  onOpenEnquiry: (productName?: string) => void;
  onOpenDistributor: (type?: string) => void;
}

export default function HomeHero({
  onOpenEnquiry,
  onOpenDistributor,
}: HomeHeroProps) {
  const { pages, globalSEO } = useCMSStore();

  const HeadingTag = getHeadingTag(globalSEO?.headingOptions, "h1");

  // 1-to-1 direct mapping from CMS HomeHero API
  const {
    badge,
    heading,
    description,
    primaryBtnLabel,
    primaryBtnUrl,
    secondaryBtnLabel,
    secondaryBtnUrl,
    points: heroPoints = [],
    productImage,
    bgImage,
  } = pages["home"]?.HomeHero || {};

  const handlePrimaryClick = () => {
    if (primaryBtnUrl && primaryBtnUrl.startsWith("#")) {
      const el = document.querySelector(primaryBtnUrl);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    } else if (primaryBtnUrl && primaryBtnUrl.startsWith("/")) {
      window.location.href = primaryBtnUrl;
      return;
    }
    onOpenEnquiry(primaryBtnLabel || "General Lubricant Enquiry");
  };

  const handleSecondaryClick = () => {
    if (secondaryBtnUrl && secondaryBtnUrl.startsWith("#")) {
      const el = document.querySelector(secondaryBtnUrl);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    } else if (secondaryBtnUrl && secondaryBtnUrl.startsWith("/")) {
      window.location.href = secondaryBtnUrl;
      return;
    }
    onOpenDistributor(secondaryBtnLabel || "Industrial Lube Distributor (ILD)");
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#071f3b] text-white">
      {bgImage && (
        <img
          src={bgImage}
          alt="Hero Background"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-[#071f3b]/70" />
      <div className="absolute inset-y-0 right-0 -z-10 w-full bg-[#071f3b]/30 lg:w-3/5" />

      <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:min-h-[610px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-12 lg:py-24">
        <div className="max-w-2xl">
          {badge && (
            <div className="mb-6 inline-flex items-center gap-2 border-l-4 border-[#F4B24D] pl-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F4B24D]">
              <Factory size={15} />
              <FormattedText text={badge} />
            </div>
          )}

          {heading && (
            <HeadingTag className="text-3xl font-black uppercase leading-[1.05] tracking-[-0.04em] sm:text-[2.75rem] lg:text-[3.6rem]">
              <FormattedText text={heading} />
            </HeadingTag>
          )}

          {description && (
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
              <FormattedText text={description} />
            </p>
          )}

          {(primaryBtnLabel || secondaryBtnLabel) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryBtnLabel && (
                <button
                  type="button"
                  onClick={handlePrimaryClick}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C86218] px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A74D0E] cursor-pointer"
                >
                  <span>{primaryBtnLabel}</span> <ArrowRight size={17} />
                </button>
              )}
              {secondaryBtnLabel && (
                <button
                  type="button"
                  onClick={handleSecondaryClick}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b] cursor-pointer"
                >
                  <Truck size={17} /> <span>{secondaryBtnLabel}</span>
                </button>
              )}
            </div>
          )}

          {heroPoints.length > 0 && (
            <div className="mt-10 grid gap-3 border-t border-white/20 pt-5 sm:grid-cols-3">
              {heroPoints.map((point: string, idx: number) => (
                <div
                  key={`${point}-${idx}`}
                  className="flex items-start gap-2 text-xs leading-5 text-slate-200"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-[#F4B24D]"
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          {productImage && (
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <img
                src={productImage}
                alt="Featured lubricant product"
                className="max-h-[460px] w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
