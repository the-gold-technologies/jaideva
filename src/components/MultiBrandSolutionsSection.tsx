"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, ThumbsUp, Truck, Headphones, Layers } from "lucide-react";

export default function MultiBrandSolutionsSection() {
  const steps = [
    {
      num: "1",
      name: "Understand",
      desc: "Analyze machinery and operating conditions to define exact lubrication needs.",
      icon: Search,
    },
    {
      num: "2",
      name: "Recommend",
      desc: "Suggest the ideal brand, grade, and viscosity for maximum equipment life.",
      icon: ThumbsUp,
    },
    {
      num: "3",
      name: "Supply",
      desc: "Prompt delivery of 100% genuine lubricants directly from authorized stock.",
      icon: Truck,
    },
    {
      num: "4",
      name: "Support",
      desc: "Ongoing technical guidance, oil condition monitoring, and customer support.",
      icon: Headphones,
    },
  ];

  return (
    <section id="solutions" className="py-16 sm:py-20 bg-white border-y border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & Company Narrative */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-widest text-[#C86218] uppercase mb-2">
              <Layers size={16} />
              <span>MULTI-BRAND LUBRICANT SOLUTIONS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0C356A] uppercase tracking-tight leading-tight">
              Multiple Brands. <br />
              <span className="text-[#C86218]">One Reliable Partner.</span>
            </h2>

            <div className="w-16 h-1 bg-[#C86218] mt-4 mb-6 rounded-full" />

            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                At <strong className="text-[#0C356A] font-bold">Jai Deva Oil Co.</strong>, we bring together a diverse portfolio of leading lubricant and industrial solution brands, making it easier for businesses to source the right products from one trusted distributor.
              </p>
              <p>
                Our multi-brand approach allows us to cater to different industrial, automotive and machinery lubrication requirements with a broad range of products and applications.
              </p>
            </div>

            {/* Inline Process Tag */}
            <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0C356A] flex-wrap">
              <span className="bg-white px-3 py-1 rounded border border-slate-200 shadow-2xs">Understand</span>
              <span className="text-[#C86218] font-bold">→</span>
              <span className="bg-white px-3 py-1 rounded border border-slate-200 shadow-2xs">Recommend</span>
              <span className="text-[#C86218] font-bold">→</span>
              <span className="bg-white px-3 py-1 rounded border border-slate-200 shadow-2xs">Supply</span>
              <span className="text-[#C86218] font-bold">→</span>
              <span className="bg-white px-3 py-1 rounded border border-slate-200 shadow-2xs">Support</span>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="#brands"
                className="inline-flex items-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Explore Our Brands</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Vertical Process Cards with Left Timeline Indicator */}
          <div className="lg:col-span-6">
            <div className="space-y-3.5">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex items-start gap-4 shadow-2xs hover:shadow-md hover:border-[#C86218] transition-all duration-200 group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#0C356A] group-hover:bg-[#C86218] text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                          {step.name}
                        </h3>
                        <span className="text-xs font-black text-slate-400 group-hover:text-[#C86218] transition-colors">
                          0{step.num}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
