import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface IndustriesCTAProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function IndustriesCTA({ onOpenEnquiry }: IndustriesCTAProps) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
      <div className="rounded-[30px] bg-[#071f3b] p-8 text-white shadow-[0_25px_60px_rgba(7,31,59,0.18)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#F4B24D]">
              Need a custom solution?
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
              We help match the right lubricant to your process.
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={() => onOpenEnquiry("Industry consultation")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C86218] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A74D0E]"
            >
              Request consultation <ArrowRight size={17} />
            </button>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/5 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
