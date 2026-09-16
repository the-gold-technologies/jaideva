"use client";

import React from "react";
import { TestTube2, Boxes, FileCheck2, Truck, ArrowRight, CheckCircle2 } from "lucide-react";

interface PlantProcessProps {
  onOpenEnquiry?: (serviceName?: string) => void;
}

const STEPS = [
  {
    step: "01",
    title: "On-Site Oil Sampling",
    tagline: "Field Inspection",
    icon: TestTube2,
    desc: "Our lubrication engineers draw hot operating oil samples from critical gearboxes and hydraulic sumps.",
  },
  {
    step: "02",
    title: "Lab Spectroscopic Testing",
    tagline: "Predictive Analytics",
    icon: FileCheck2,
    desc: "Testing for wear metals (Fe, Cu, Al), moisture ppm, acid number (TAN), and remaining useful life (RUL).",
  },
  {
    step: "03",
    title: "Plant SKU Consolidation",
    tagline: "35% Inventory Reduction",
    icon: Boxes,
    desc: "Auditing plant manuals to streamline dozens of grease and oil grades into 8–10 high-performance multi-grades.",
  },
  {
    step: "04",
    title: "Emergency Drum Dispatch",
    tagline: "Zero Line Stoppage",
    icon: Truck,
    desc: "24–48h emergency barrel (210L) reserves across ISO VG 32 to 680 to prevent catastrophic line shutdowns.",
  },
];

export default function PlantProcessSection({ onOpenEnquiry }: PlantProcessProps) {
  return (
    <section className="py-20 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218] mb-2">
              Lifecycle Engineering Support
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
              Our Plant Lubrication Journey
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              A proven four-stage engineering process ensuring zero unplanned equipment downtime.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry("Full Plant Lubrication Audit")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0C356A] hover:bg-[#C86218] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer shrink-0"
          >
            <span>Book Plant Audit</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4 Connected Process Timeline Steps (Not uniform cards!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="relative flex flex-col justify-between">
                <div>
                  {/* Step Number & Line */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl sm:text-4xl font-black text-[#C86218]">
                      {s.step}
                    </span>
                    <div className="h-[2px] flex-1 bg-slate-200" />
                  </div>

                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-xl bg-[#0C356A]/10 text-[#0C356A] flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#C86218]" />
                  </div>

                  <h3 className="text-lg font-black text-[#0C356A] uppercase tracking-tight">
                    {s.title}
                  </h3>
                  <div className="text-xs font-bold text-[#C86218] uppercase tracking-wide mt-0.5 mb-2">
                    {s.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
