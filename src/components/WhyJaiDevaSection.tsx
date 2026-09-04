"use client";

import React from "react";
import {
  Calendar,
  Layers,
  Boxes,
  ShieldCheck,
  Users,
  Clock,
  Sparkles,
} from "lucide-react";

export default function WhyJaiDevaSection() {
  const points = [
    {
      title: "18+ Years of Experience",
      desc: "Strong industry experience in lubricant distribution and trading since 2008.",
      icon: Calendar,
      color: "bg-[#0C356A]/10 text-[#0C356A]",
    },
    {
      title: "Multi-Brand Portfolio",
      desc: "A diverse range of lubricant products from leading brands.",
      icon: Layers,
      color: "bg-[#C86218]/10 text-[#C86218]",
    },
    {
      title: "Wide Product Range",
      desc: "Industrial oils, automotive lubricants, greases and specialty lubrication products.",
      icon: Boxes,
      color: "bg-[#EAA824]/15 text-[#C86218]",
    },
    {
      title: "Quality-Focused Approach",
      desc: "We focus on supplying quality products suited to customer requirements.",
      icon: ShieldCheck,
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "Experienced Team",
      desc: "Skilled professionals with industry knowledge and understanding of customer needs.",
      icon: Users,
      color: "bg-[#0C356A]/10 text-[#0C356A]",
    },
    {
      title: "Reliable Service",
      desc: "Committed to dependable supply and long-term customer relationships.",
      icon: Clock,
      color: "bg-[#C86218]/10 text-[#C86218]",
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-white font-sans text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-wide section-underline font-sans">
            WHY JAI DEVA OIL CO.?
          </h2>
          <p className="mt-3 text-lg md:text-xl font-bold text-[#C86218]">
            Your Trusted Lubrication Partner Since 2008
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="bg-[#f8fafc] rounded-xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#C86218] transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${pt.color} transition-transform duration-300 group-hover:scale-110 shadow-2xs`}
                  >
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                      {pt.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed font-sans">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
