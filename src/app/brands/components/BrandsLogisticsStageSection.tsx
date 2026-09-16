"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  CreditCard,
  Truck,
  CheckCircle2,
  Banknote,
  FileCheck,
  Building2,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
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
  interactivePills: { name: string; icon: React.ElementType }[];
}

const STAGES_DATA: LogisticsStageItem[] = [
  {
    step: 1,
    stageCode: "PACKAGING",
    label: "PACKAGING",
    stageTag: "STAGE 1: PACKAGING",
    title: "Factory Packaging & Sealing",
    description:
      "All lubricants are supplied in factory-sealed containers with tamper-evident bung seals to prevent moisture and contamination.",
    equipmentOrModeLabel: "Pack Formats",
    equipmentOrModeValue: "210L Barrels • 20L Pails • 50L Kegs • Bulk Tankers",
    specCardTitle: "QUALITY THRESHOLD",
    specHeadline: "100% Tamper-Evident Bung Seals",
    specSubtext:
      "Refinery dispatch verification ensures contaminant-free fluid delivery.",
    specStatus: "Passed Inspection",
    icon: Package,
    interactivePills: [
      { name: "210L Barrels", icon: Layers },
      { name: "20L Pails", icon: Package },
      { name: "50L Kegs", icon: Package },
      { name: "Bulk Tankers", icon: Truck },
    ],
  },
  {
    step: 2,
    stageCode: "PAYMENT",
    label: "PAYMENT",
    stageTag: "STAGE 2: PAYMENT",
    title: "Flexible Payment Modes",
    description:
      "Flexible commercial settlement and instant GST-compliant tax invoicing across standard payment channels.",
    equipmentOrModeLabel: "Payment Modes",
    equipmentOrModeValue: "Cash • Cheque • Demand Draft (DD) • Credit Card",
    specCardTitle: "COMMERCIAL TERMS",
    specHeadline: "Instant GST Invoicing & ITC",
    specSubtext:
      "100% verified tax receipts for seamless accounting and corporate auditing.",
    specStatus: "Multi-Mode Verified",
    icon: CreditCard,
    interactivePills: [
      { name: "Cash", icon: Banknote },
      { name: "Cheque", icon: FileCheck },
      { name: "Demand Draft", icon: Building2 },
      { name: "Credit Card", icon: CreditCard },
    ],
  },
  {
    step: 3,
    stageCode: "SHIPPING",
    label: "SHIPPING",
    stageTag: "STAGE 3: SHIPPING",
    title: "Shipment Mode: By Road",
    description:
      "We coordinate product dispatch and transportation according to customer order requirements and delivery locations.",
    equipmentOrModeLabel: "Shipment Mode",
    equipmentOrModeValue: "By Road (Dedicated Freight & Express Transit)",
    specCardTitle: "DISPATCH LOGISTICS",
    specHeadline: "Coordinated Plant Gate Delivery",
    specSubtext:
      "Scheduled delivery timing aligned with factory receiving and shift hours.",
    specStatus: "Dispatched By Road",
    icon: Truck,
    interactivePills: [
      { name: "By Road Transit", icon: Truck },
      { name: "Customer Site", icon: MapPin },
      { name: "Express 24-48h", icon: Clock },
      { name: "Bulk Freight", icon: Layers },
    ],
  },
];

const AUTO_ADVANCE_MS = 2000;

export default function BrandsLogisticsStageSection({
  onOpenEnquiry,
}: BrandsLogisticsStageSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStage =
    STAGES_DATA.find((s) => s.step === activeStep) || STAGES_DATA[0];

  // Calculate percentage along the 3 steps
  const progressPercentage =
    ((activeStep - 1) / (STAGES_DATA.length - 1)) * 100;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev >= STAGES_DATA.length ? 1 : prev + 1));
    }, AUTO_ADVANCE_MS);
  }, [clearTimer]);

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isPaused, startTimer, clearTimer]);

  // Manual step click resets the auto-advance clock so it doesn't
  // jump right after the user picked a stage themselves.
  const handleStepClick = (step: number) => {
    setActiveStep(step);
    if (!isPaused) {
      startTimer();
    }
  };

  return (
    <section
      className="py-16 bg-[#F8FAFC] text-slate-900 relative overflow-hidden font-sans border-b border-slate-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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
        {/* ── SECTION HEADER (Clean & Compact) ── */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block text-xs font-black tracking-[0.25em] uppercase mb-1.5 text-[#C86218]">
            DELIVERY & COMMERCIAL SUPPORT
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0C356A]">
            PACKAGING, PAYMENT & SHIPPING
          </h2>

          <p className="mt-1.5 text-sm sm:text-base font-bold text-[#C86218]">
            Flexible Business & Delivery Support
          </p>
        </div>

        {/* ── STAGE TIMELINE CONTAINER ── */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
          {/* Subtle Ambient Glow — blurred + earlier fade so no hard edge survives the container's overflow clip */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(200,98,24,0.35) 0%, rgba(200,98,24,0) 55%)",
            }}
          />

          {/* ── STEPPER TRACK ACROSS THE TOP ── */}
          <div className="relative mb-8 sm:mb-10 max-w-2xl mx-auto px-4 sm:px-8">
            {/* Background Connecting Line */}
            <div className="absolute top-5 sm:top-6 left-12 right-12 sm:left-16 sm:right-16 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full" />

            {/* Active Connected Progress Line */}
            <motion.div
              className="absolute top-5 sm:top-6 left-12 sm:left-16 h-1 bg-[#C86218] -translate-y-1/2 z-0 origin-left rounded-full"
              initial={false}
              animate={{
                width: `calc(${progressPercentage}% * 0.85)`,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />

            {/* Per-stage progress bar (shows auto-advance countdown on the active node) */}
            <div className="relative z-10 flex items-center justify-between">
              {STAGES_DATA.map((item) => {
                const isActive = item.step === activeStep;
                const isPassed = item.step < activeStep;

                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => handleStepClick(item.step)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    {/* Circle Node */}
                    <div className="relative">
                      {isActive && !isPaused && (
                        <motion.div
                          key={`ring-${activeStep}`}
                          className="absolute -inset-1 rounded-full border-2 border-[#C86218]/40"
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: 0.15 }}
                          transition={{
                            duration: AUTO_ADVANCE_MS / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                      <div
                        className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 ${
                          isActive
                            ? "bg-[#C86218] text-white scale-110 shadow-[0_0_20px_rgba(200,98,24,0.45)] ring-4 ring-[#C86218]/20"
                            : isPassed
                              ? "bg-[#0C356A] text-white shadow-xs hover:scale-105"
                              : "bg-slate-100 text-slate-500 border-2 border-slate-200 hover:border-[#0C356A]/40 hover:text-[#0C356A]"
                        }`}
                      >
                        {item.step}
                      </div>
                    </div>

                    {/* Step Label */}
                    <span
                      className={`mt-2 text-[11px] sm:text-xs font-black tracking-widest uppercase transition-colors text-center ${
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

          {/* ── ACTIVE STAGE CONTENT CARD ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-6 sm:p-8 shadow-2xs"
            >
              <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                {/* ── Left Column (Concise Content) ── */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    {/* Stage Eyebrow Pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C86218]/10 border border-[#C86218]/25 text-[#C86218] text-[11px] font-black uppercase tracking-wider mb-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C86218]" />
                      <span>{currentStage.stageTag}</span>
                    </div>

                    {/* Concise Headline */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#0C356A] tracking-tight mb-2">
                      {currentStage.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 max-w-2xl">
                      {currentStage.description}
                    </p>

                    {/* Clean Compact Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                      {currentStage.interactivePills.map((pill, pIdx) => {
                        const PillIcon = pill.icon;
                        return (
                          <div
                            key={pIdx}
                            className="px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2 hover:border-[#C86218]/40 transition-colors"
                          >
                            <div className="w-6 h-6 rounded-lg bg-[#0C356A]/5 text-[#0C356A] flex items-center justify-center shrink-0">
                              <PillIcon size={13} />
                            </div>
                            <span className="text-xs font-bold text-slate-800 truncate">
                              {pill.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="pt-3.5 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-600 mr-1.5">
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
                        onOpenEnquiry(
                          `Logistics & Commercial Inquiry: ${currentStage.label}`,
                        )
                      }
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer shrink-0"
                    >
                      <span>Inquire {currentStage.label}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* ── Right Column (Compact Quality Threshold Card) ── */}
                <div className="lg:col-span-4 flex">
                  <div className="w-full rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col justify-between shadow-xs">
                    <div>
                      {/* Top Label */}
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#C86218] mb-3">
                        {currentStage.specCardTitle}
                      </div>

                      {/* Icon + Spec Headline */}
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-[#0C356A]/10 text-[#0C356A] flex items-center justify-center shrink-0 mt-0.5">
                          <currentStage.icon size={18} />
                        </div>

                        <div className="text-sm sm:text-base font-black text-[#0C356A] leading-snug">
                          {currentStage.specHeadline}
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-normal mt-1.5">
                        {currentStage.specSubtext}
                      </p>
                    </div>

                    {/* Status Pill */}
                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-wider border border-emerald-200/80">
                        <CheckCircle2 size={11} className="text-emerald-600" />
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
