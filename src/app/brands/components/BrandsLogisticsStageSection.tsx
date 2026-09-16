"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Banknote,
  FileCheck,
  Building2,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface BrandsLogisticsStageSectionProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export interface LogisticsStageItem {
  step: number;
  stageCode: string;
  label: string;
  stageTag: string;
  title: string;
  description: string;
  equipmentOrModeLabel: string;
  equipmentOrModeValue: string;
  specCardTitle: string;
  specHeadline: string;
  specSubtext: string;
  specStatus: string;
  icon: React.ElementType;
  interactivePills: { name: string; badge: string; desc: string; icon: React.ElementType }[];
}

const STAGES_DATA: LogisticsStageItem[] = [
  {
    step: 1,
    stageCode: "PACKAGING",
    label: "PACKAGING",
    stageTag: "STAGE 1: REFINERY SEALING & PACKAGING",
    title: "Industrial-Grade Packaging & Tamper-Evident Sealing",
    description:
      "All lubricants and industrial fluids are supplied in original factory-sealed containers with tamper-evident bung seals and batch barcodes, preventing airborne moisture ingress and ambient particulate contamination.",
    equipmentOrModeLabel: "Pack Formats Available",
    equipmentOrModeValue: "210L Steel & HDPE Barrels • 20L/26L Pails • 50L Kegs • 10–25 KL Bulk Road Tankers",
    specCardTitle: "QUALITY THRESHOLD",
    specHeadline: "100% Tamper-Evident Bung Seals & Zero Contamination",
    specSubtext: "Every barrel and pail is checked at refinery dispatch to guarantee pristine ISO 4406 fluid cleanliness.",
    specStatus: "Passed Inspection",
    icon: Package,
    interactivePills: [
      { name: "210L Barrel", badge: "Standard Drum", desc: "Factory bung sealed", icon: Layers },
      { name: "20L / 26L Pail", badge: "Workshop Pack", desc: "Molded pour spout", icon: Package },
      { name: "50L / 55L Keg", badge: "Mid-Size Fleet", desc: "Direct workshop use", icon: Package },
      { name: "Bulk Tanker", badge: "10–25 KL", desc: "Insulated direct supply", icon: Truck },
    ],
  },
  {
    step: 2,
    stageCode: "PAYMENT",
    label: "PAYMENT",
    stageTag: "STAGE 2: COMMERCIAL MODES & SETTLEMENT",
    title: "Flexible Business Payment & Multi-Channel Terms",
    description:
      "We accommodate diverse enterprise procurement workflows with transparent invoicing, flexible corporate terms, instant computer-generated GST receipts, and multiple secure settlement modes.",
    equipmentOrModeLabel: "Supported Payment Modes",
    equipmentOrModeValue: "Cash • Cheque • Demand Draft (DD) • Credit Card (POS & Corporate)",
    specCardTitle: "COMMERCIAL COMPLIANCE",
    specHeadline: "Instant GST Tax Invoicing & Clean Corporate ITC",
    specSubtext: "100% compliant tax documentation ensuring seamless finance audit and input tax credit reconciliations.",
    specStatus: "Multi-Mode Verified",
    icon: CreditCard,
    interactivePills: [
      { name: "Cash", badge: "Instant", desc: "Immediate counter billing & GST receipt", icon: Banknote },
      { name: "Cheque", badge: "Corporate", desc: "Account payee & PDC settlement", icon: FileCheck },
      { name: "Demand Draft", badge: "Bank Guaranteed", desc: "Tender & public-sector allocations", icon: Building2 },
      { name: "Credit Card", badge: "Digital Swipe", desc: "Visa, Mastercard & RuPay POS", icon: CreditCard },
    ],
  },
  {
    step: 3,
    stageCode: "SHIPPING",
    label: "SHIPPING",
    stageTag: "STAGE 3: DISPATCH & ROAD TRANSPORTATION",
    title: "Shipment Mode: By Road — Coordinated Direct Delivery",
    description:
      "We coordinate product dispatch and transportation according to customer order requirements and delivery locations, utilizing a dedicated road freight network for safe, on-schedule plant gate handover.",
    equipmentOrModeLabel: "Transportation Logistics",
    equipmentOrModeValue: "Shipment Mode: By Road (Dedicated FTL Freight & Express PTL Corridors)",
    specCardTitle: "DELIVERY SPECIFICATION",
    specHeadline: "Coordinated Plant Gate Delivery & Transit Safety",
    specSubtext: "Heavy-duty transit strapping, hydraulic tail-lift fleet, and live receiver scheduling.",
    specStatus: "Dispatched By Road",
    icon: Truck,
    interactivePills: [
      { name: "By Road Transit", badge: "Primary Backbone", desc: "Dedicated road fleet", icon: Truck },
      { name: "Customer Site", badge: "Coordinated", desc: "Delivery timing matched to shifts", icon: MapPin },
      { name: "Express 24-48h", badge: "Fast Dispatch", desc: "NCR & northern industrial hubs", icon: Clock },
      { name: "Palletized FTL", badge: "Full Truckload", desc: "Damage-free transit loading", icon: Layers },
    ],
  },
];

export default function BrandsLogisticsStageSection({
  onOpenEnquiry,
}: BrandsLogisticsStageSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(2); // Default to Stage 2: Payment

  const currentStage =
    STAGES_DATA.find((s) => s.step === activeStep) || STAGES_DATA[1];

  // Calculate percentage along the 3 steps
  const progressPercentage = ((activeStep - 1) / (STAGES_DATA.length - 1)) * 100;

  return (
    <section className="py-20 bg-[#F8FAFC] text-slate-900 relative overflow-hidden font-sans border-b border-slate-200">
      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(12,53,106,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(12,53,106,0.035) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block text-xs font-black tracking-[0.25em] uppercase mb-2 text-[#C86218]">
            OPERATIONAL EXCELLENCE & DISPATCH
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0C356A]">
            PACKAGING, PAYMENT & SHIPPING
          </h2>

          <p className="mt-2 text-base sm:text-lg font-bold text-[#C86218]">
            Flexible Business & Delivery Support
          </p>

          <p className="mt-1 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We coordinate product dispatch and transportation according to customer order
            requirements and delivery locations.
          </p>
        </div>

        {/* ── STAGE TIMELINE CONTAINER (THEME-ALIGNED LIGHT-PREMIUM SHELL) ── */}
        <div className="rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Radial Glow in Project Theme */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[240px] pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(ellipse at center, rgba(200,98,24,0.3) 0%, transparent 70%)",
            }}
          />

          {/* ── STEPPER TRACK ACROSS THE TOP (Exact Match to User Reference Layout) ── */}
          <div className="relative mb-10 sm:mb-12 max-w-3xl mx-auto px-4 sm:px-8">
            {/* Background Connecting Line */}
            <div className="absolute top-6 sm:top-7 left-12 right-12 sm:left-16 sm:right-16 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full" />

            {/* Active Connected Progress Line in Project Theme Orange (#C86218) */}
            <motion.div
              className="absolute top-6 sm:top-7 left-12 sm:left-16 h-1 bg-[#C86218] -translate-y-1/2 z-0 origin-left rounded-full"
              initial={false}
              animate={{
                width: `calc(${progressPercentage}% * 0.85)`,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />

            {/* Step Nodes (1, 2, 3) */}
            <div className="relative z-10 flex items-center justify-between">
              {STAGES_DATA.map((item) => {
                const isActive = item.step === activeStep;
                const isPassed = item.step < activeStep;

                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveStep(item.step)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    {/* Circle Node matching screenshot structure */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-black text-sm sm:text-base transition-all duration-300 ${
                        isActive
                          ? "bg-[#C86218] text-white scale-110 shadow-[0_0_22px_rgba(200,98,24,0.5)] ring-4 ring-[#C86218]/20"
                          : isPassed
                          ? "bg-[#0C356A] text-white shadow-sm hover:scale-105"
                          : "bg-slate-100 text-slate-500 border-2 border-slate-200 hover:border-[#0C356A]/40 hover:text-[#0C356A]"
                      }`}
                    >
                      {item.step}
                    </div>

                    {/* Step Label directly below */}
                    <span
                      className={`mt-2.5 text-[11px] sm:text-xs font-black tracking-widest uppercase transition-colors text-center ${
                        isActive
                          ? "text-[#C86218]"
                          : isPassed
                          ? "text-[#0C356A]"
                          : "text-slate-400 group-hover:text-slate-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── ACTIVE STAGE CONTENT CARD (MATCHING REFERENCE TWO-COLUMN LAYOUT) ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                {/* ── Left Column (Stage Tag, Title, Description, Modes & Action) ── */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    {/* Stage Eyebrow Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C86218]/10 border border-[#C86218]/25 text-[#C86218] text-xs font-black uppercase tracking-wider mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C86218]" />
                      <span>{currentStage.stageTag}</span>
                    </div>

                    {/* Big Bold Headline in Brand Navy (#0C356A) */}
                    <h3 className="text-2xl sm:text-3xl font-black text-[#0C356A] tracking-tight mb-3">
                      {currentStage.title}
                    </h3>

                    {/* Stage Description */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                      {currentStage.description}
                    </p>

                    {/* Interactive Mode Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                      {currentStage.interactivePills.map((pill, pIdx) => {
                        const PillIcon = pill.icon;
                        return (
                          <div
                            key={pIdx}
                            className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#C86218]/40 hover:shadow-xs transition-all"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#0C356A]/5 text-[#0C356A] flex items-center justify-center mb-1.5">
                              <PillIcon size={14} />
                            </div>
                            <div className="text-xs font-black text-slate-800">
                              {pill.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium truncate">
                              {pill.desc}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Divider & Metadata Row (Matching Reference "Equipment in Action" row) */}
                  <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-600 mr-2">
                        {currentStage.equipmentOrModeLabel}:
                      </span>
                      <strong className="text-[#0C356A] font-bold">
                        {currentStage.equipmentOrModeValue}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenEnquiry &&
                        onOpenEnquiry(`Logistics & Commercial Inquiry: ${currentStage.label}`)
                      }
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer shrink-0"
                    >
                      <span>Inquire {currentStage.label}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* ── Right Column (Quality Threshold / Spec Card matching reference) ── */}
                <div className="lg:col-span-4 flex">
                  <div className="w-full rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-md relative overflow-hidden">
                    <div>
                      {/* Top Label */}
                      <div className="text-[11px] font-black uppercase tracking-widest text-[#C86218] mb-4">
                        {currentStage.specCardTitle}
                      </div>

                      {/* Icon + Spec Headline */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0C356A]/10 text-[#0C356A] flex items-center justify-center shrink-0 mt-0.5">
                          <currentStage.icon size={20} />
                        </div>

                        <div>
                          <div className="text-base sm:text-lg font-black text-[#0C356A] leading-snug">
                            {currentStage.specHeadline}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed mt-2">
                        {currentStage.specSubtext}
                      </p>
                    </div>

                    {/* Status Pill at Bottom (Matching "Passed Inspection" in reference screenshot) */}
                    <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200/80">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        <span>{currentStage.specStatus}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
