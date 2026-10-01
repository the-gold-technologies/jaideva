"use client";

import React from "react";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

interface BrandsCtaProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function BrandsCtaSection({ onOpenEnquiry }: BrandsCtaProps) {
  const { pages } = useCMSStore();
  const { badge, heading, description, image, buttonText, phoneText, phoneNumber } =
    pages["brands"]?.BrandsCtaSection || {};

  if (!heading && !image) return null;

  return (
    <section className="py-20 bg-white font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#071f3b] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          {image && (
            <img
              src={image}
              alt="Engine oil and synthetic lubricants"
              className="absolute inset-0 h-full w-full object-cover object-right opacity-30 mix-blend-luminosity"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071f3b] via-[#071f3b]/95 to-transparent" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              {badge && (
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D]/15 border border-[#F4B24D]/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#F4B24D] mb-4">
                  <ShieldCheck size={14} /> <FormattedText text={badge} />
                </div>
              )}
              {heading && (
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-[-0.03em] leading-tight">
                  <FormattedText text={heading} />
                </h2>
              )}
              {description && (
                <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed">
                  <FormattedText text={description} />
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3.5 sm:flex-row lg:flex-col">
              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry("Brand Lubricant Consultation")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C86218] px-6 py-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#A74D0E] shadow-lg shadow-[#C86218]/30 cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowRight size={15} />
              </button>

              {phoneNumber && (
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4B24D]/20 text-[#F4B24D]">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {phoneText}
                    </p>
                    <a
                      href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                      className="text-sm font-black text-white hover:text-[#F4B24D] transition"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
