"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Clock,
  Send,
  Headphones,
  Award,
  CheckCircle2,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const TRUST_ICON_MAP: Record<string, React.ElementType> = {
  Clock,
  clock: Clock,
  ShieldCheck,
  shieldcheck: ShieldCheck,
  Headphones,
  headphones: Headphones,
  Send,
  send: Send,
  Award,
  award: Award,
  CheckCircle2,
  checkcircle2: CheckCircle2,
};

function resolveTrustIcon(iconKey: unknown): React.ElementType {
  const key = typeof iconKey === "string" ? iconKey.trim() : "";
  return TRUST_ICON_MAP[key] || TRUST_ICON_MAP[key.toLowerCase()] || Clock;
}

interface IndustriesConsultationCTAProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function IndustriesConsultationCTA({
  onOpenEnquiry,
}: IndustriesConsultationCTAProps) {
  const { pages } = useCMSStore();
  const {
    badge,
    heading,
    description,
    formTitle,
    formSubtitle,
    dropdownLabel,
    buttonText,
    phoneText,
    phoneNumber,
    trustIndicators = [],
    sectorOptions = [],
  } = pages["industries"]?.IndustriesConsultationCTA || {};

  const options = Array.isArray(sectorOptions) ? sectorOptions : [];
  const [chosenSector, setChosenSector] = useState("");

  if (!heading && options.length === 0) return null;

  const currentSector = chosenSector || options[0] || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenEnquiry(
      currentSector
        ? `${currentSector} - ${buttonText || "Technical Enquiry"}`
        : buttonText || "Technical Enquiry",
    );
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200 text-slate-800 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-8 sm:p-12 lg:p-14 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left 7 Cols */}
            <div className="lg:col-span-7">
              {badge && (
                <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218] mb-4">
                  <FormattedText text={badge} />
                </div>
              )}

              {heading && (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A] leading-[1.08]">
                  <FormattedText text={heading} />
                </h2>
              )}

              {description && (
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  <FormattedText text={description} />
                </p>
              )}

              {/* Trust Indicators */}
              {Array.isArray(trustIndicators) && trustIndicators.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-4 border-t border-slate-200/80 pt-6">
                  {trustIndicators.map((item: any, i: number) => {
                    const ItemIcon = resolveTrustIcon(item.icon);
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-lg border border-slate-200/80 shadow-2xs"
                      >
                        <ItemIcon
                          size={16}
                          className={
                            i === 0
                              ? "text-[#C86218]"
                              : i === 1
                                ? "text-emerald-600"
                                : "text-[#0C356A]"
                          }
                        />
                        <span>
                          <FormattedText text={item.text || item.label} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right 5 Cols: Interactive Clean Form Card */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg"
              >
                {formTitle && (
                  <h3 className="text-lg font-black text-[#0C356A] uppercase tracking-tight mb-1">
                    <FormattedText text={formTitle} />
                  </h3>
                )}
                {formSubtitle && (
                  <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                    <FormattedText text={formSubtitle} />
                  </p>
                )}

                {options.length > 0 && (
                  <div className="mb-5">
                    {dropdownLabel && (
                      <label className="block text-[11px] font-black uppercase tracking-wider text-[#0C356A] mb-2">
                        <FormattedText text={dropdownLabel} />
                      </label>
                    )}
                    <select
                      value={currentSector}
                      onChange={(e) => setChosenSector(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 border border-slate-300 px-4 py-3 text-sm text-slate-800 font-medium focus:outline-none focus:border-[#C86218] focus:bg-white transition-colors cursor-pointer shadow-2xs"
                    >
                      {options.map((opt: string, i: number) => (
                        <option key={i} value={opt} className="text-slate-800">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {buttonText && (
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C86218] hover:bg-[#A74D0E] py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:translate-y-0 hover:-translate-y-0.5"
                  >
                    <Send size={15} />
                    <span>
                      <FormattedText text={buttonText} />
                    </span>
                  </button>
                )}

                {(phoneNumber || phoneText) && (
                  <div className="mt-4 text-center">
                    {phoneNumber ? (
                      <a
                        href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                        className="text-xs text-slate-500 hover:text-[#C86218] transition-colors inline-flex items-center gap-1.5 font-medium"
                      >
                        <PhoneCall size={13} />
                        <span>
                          {phoneText && (
                            <>
                              <FormattedText text={phoneText} />:{" "}
                            </>
                          )}
                          {phoneNumber}
                        </span>
                      </a>
                    ) : (
                      <Link
                        href="/contact-us"
                        className="text-xs text-slate-500 hover:text-[#C86218] transition-colors inline-flex items-center gap-1.5 font-medium"
                      >
                        <PhoneCall size={13} />
                        <span>
                          <FormattedText text={phoneText} />
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
