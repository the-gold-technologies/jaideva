"use client";

import React, { useState } from "react";
import {
  Cog,
  Gauge,
  Wind,
  Disc,
  ArrowRight,
  Droplets,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Factory,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

const ICON_MAP: Record<string, React.ElementType> = {
  Cog,
  cog: Cog,
  Gauge,
  gauge: Gauge,
  Wind,
  wind: Wind,
  Disc,
  disc: Disc,
  Wrench,
  wrench: Wrench,
  Factory,
  factory: Factory,
};

function resolveIcon(iconKey: unknown): React.ElementType {
  const key = typeof iconKey === "string" ? iconKey.trim() : "";
  return ICON_MAP[key] || ICON_MAP[key.toLowerCase()] || Cog;
}

interface MachineryFeatureProps {
  onOpenEnquiry?: (systemName?: string) => void;
}

export default function MachineryFeatureSection({ onOpenEnquiry }: MachineryFeatureProps) {
  const { pages } = useCMSStore();
  const {
    eyebrow,
    heading,
    description,
    protectionLabel,
    formulationsLabel,
    buttonText,
    systems = [],
  } = pages["industries"]?.MachineryFeatureSection || {};

  const [activeTab, setActiveTab] = useState(0);

  if (!heading && (!Array.isArray(systems) || systems.length === 0)) return null;

  const currentSystem = systems[activeTab] || systems[0];
  if (!currentSystem) return null;

  const SystemIcon = resolveIcon(currentSystem.icon);
  const benefitsList = Array.isArray(currentSystem.benefits) ? currentSystem.benefits : [];

  return (
    <section className="py-20 bg-[#f8fafc] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218]">
              <FormattedText text={eyebrow} />
            </div>
          )}
          {heading && (
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
              <FormattedText text={heading} />
            </h2>
          )}
          {description && (
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              <FormattedText text={description} />
            </p>
          )}
        </div>

        {/* Dynamic System Tabs */}
        {systems.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-200">
            {systems.map((sys: any, idx: number) => {
              const TabIcon = resolveIcon(sys.icon);
              const isSelected = idx === activeTab;
              return (
                <button
                  key={sys.id || idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#0C356A] text-white shadow-md shadow-[#0C356A]/20 scale-[1.02]"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-[#C86218] hover:text-[#0C356A]"
                  }`}
                >
                  <TabIcon size={16} className={isSelected ? "text-[#F4B24D]" : "text-[#C86218]"} />
                  <span>{sys.title}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* The Feature Display (Split layout with Large Image and Technical Highlights) */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg grid lg:grid-cols-12 gap-8 items-center">
          {/* Left 6 Cols: Large High-Resolution Machinery Image with Overlay */}
          <div className="lg:col-span-6 relative h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
            {currentSystem.image && (
              <img
                src={currentSystem.image}
                alt={currentSystem.title}
                className="h-full w-full object-cover object-center"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              {currentSystem.spec && (
                <span className="px-3 py-1 rounded-md bg-[#0C356A] text-white text-xs font-black uppercase tracking-wider">
                  {currentSystem.spec}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-[#F4B24D] text-[#071f3b] flex items-center justify-center shadow-md">
                <SystemIcon size={20} />
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Technical Specification & Product Match */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {protectionLabel && (
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#C86218] mb-2">
                  <ShieldCheck size={16} />
                  <span>
                    <FormattedText text={protectionLabel} />
                  </span>
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl font-black text-[#0C356A] uppercase tracking-tight">
                <FormattedText text={currentSystem.title} />
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                <FormattedText text={currentSystem.desc} />
              </p>

              {/* Benefits Checklist */}
              {benefitsList.length > 0 && (
                <div className="mt-6 space-y-2.5">
                  {benefitsList.map((b: string, bIdx: number) => (
                    <div
                      key={bIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                    >
                      <CheckCircle2 size={16} className="text-[#C86218] shrink-0 mt-0.5" />
                      <span>
                        <FormattedText text={b} />
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Recommended Oils Box */}
              {currentSystem.oilHighlight && (
                <div className="mt-6 p-4 rounded-xl bg-[#0C356A]/5 border border-[#0C356A]/15">
                  {formulationsLabel && (
                    <div className="text-[11px] font-black uppercase tracking-wider text-[#0C356A] flex items-center gap-1.5 mb-1">
                      <Droplets size={13} className="text-[#C86218]" />
                      <span>
                        <FormattedText text={formulationsLabel} />
                      </span>
                    </div>
                  )}
                  <div className="text-xs sm:text-sm font-bold text-slate-800">
                    <FormattedText text={currentSystem.oilHighlight} />
                  </div>
                </div>
              )}
            </div>

            {buttonText && (
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    onOpenEnquiry && onOpenEnquiry(`${currentSystem.title} - ${buttonText}`)
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                >
                  <span>
                    <FormattedText text={buttonText} />
                  </span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
