"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BrandsCtaProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function BrandsCtaSection({ onOpenEnquiry }: BrandsCtaProps) {
  return (
    <section className="relative overflow-hidden py-16 bg-white">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-[-0.03em] text-[#0C356A] sm:text-4xl">
              Need a Product Recommendation or Brand Conversation?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Our team helps you choose the right lubricant formulation for
              your machine, industry, or business needs with practical
              guidance and dependable support.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={() => onOpenEnquiry && onOpenEnquiry("Brand Consultation")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C86218] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A74D0E] shadow-md shadow-[#C86218]/20"
            >
              Request a Consultation <ArrowRight size={17} />
            </button>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#0C356A]/30 bg-white px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0C356A] transition hover:border-[#C86218] hover:bg-[#C86218] hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
