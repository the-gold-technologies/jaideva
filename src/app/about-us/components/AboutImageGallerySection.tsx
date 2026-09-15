"use client";

import React from "react";
import {
  Building2,
  Warehouse,
  ShieldCheck,
  Truck,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";

interface AboutImageGalleryProps {
  onOpenEnquiry?: (subject?: string) => void;
}

const GALLERY_FACILITIES = [
  {
    id: "depot",
    title: "Central Logistics & Drum Staging Depot",
    subtitle: "High-Capacity Heavy Lubricant Storage",
    category: "Warehousing & Inventory",
    desc: "Covered, temperature-regulated depot equipped for high-density storage of 210L barrels, 20L pails, and IBC intermediate bulk containers.",
    badges: ["Batch Segregation", "Spill Containment System"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    icon: Warehouse,
  },
  {
    id: "hq",
    title: "Corporate Operations & Account Advisory",
    subtitle: "Central Commercial & Customer Coordination",
    category: "Corporate Facility",
    desc: "Our business operations desk coordinating customer procurement, supplier relations, invoicing, and pan-India industrial contracts.",
    badges: ["Dedicated Account Managers", "Real-Time Order Tracking"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    icon: Building2,
  },
  {
    id: "inspection",
    title: "Quality Verification & Spec Assurance Desk",
    subtitle: "Laboratory & Viscosity Verification",
    category: "Quality Control",
    desc: "Verification protocols ensuring every supplied barrel matches OEM specifications, viscosity standards, and valid refinery test certificates.",
    badges: ["OEM Specification Checks", "Sealed Batch Integrity"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    icon: ShieldCheck,
  },
  {
    id: "fleet",
    title: "Regional Dispatch & Transit Network",
    subtitle: "Rapid Pan-India Manufacturing Supply",
    category: "Distribution Logistics",
    desc: "Logistics infrastructure ensuring on-schedule delivery across manufacturing clusters, power plants, and automotive workshops in 40+ cities.",
    badges: ["Fast Dispatch Routes", "Zero In-Transit Contamination"],
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80",
    icon: Truck,
  },
];

export default function AboutImageGallerySection({ onOpenEnquiry }: AboutImageGalleryProps) {
  return (
    <section className="py-20 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218]">
              Infrastructure & Operations
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
              Our Facilities & Operational Hubs
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Take a visual tour inside Jai Deva Oil Co.'s modern logistics infrastructure,
              warehousing depots, and quality-controlled product staging centers.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
            <Package size={16} className="text-[#C86218]" />
            <span>Over 500+ SKUs Stocked & Ready for Dispatch</span>
          </div>
        </div>

        {/* 4-Card Image Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {GALLERY_FACILITIES.map((facility) => {
            const Icon = facility.icon;
            return (
              <div
                key={facility.id}
                className="group flex flex-col rounded-3xl border border-slate-200 bg-[#f8fafc] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C86218] transition-all duration-300"
              >
                {/* Visual Image Banner with Subtle Gradient and Icon */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b] via-[#071f3b]/40 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-lg bg-[#0C356A]/90 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
                      {facility.category}
                    </span>
                  </div>

                  {/* Icon Tile */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[#F4B24D] flex items-center justify-center">
                    <Icon size={18} />
                  </div>

                  {/* Overlay Title */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <p className="text-[11px] font-bold text-[#F4B24D] uppercase tracking-wide">
                      {facility.subtitle}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                      {facility.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {facility.desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {facility.badges.map((badge) => (
                        <span
                          key={badge}
                          className="inline-flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-700"
                        >
                          <Layers size={10} className="text-[#C86218]" />
                          {badge}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenEnquiry && onOpenEnquiry(`Facility & Supply Query: ${facility.title}`)}
                      className="text-[11px] font-black uppercase tracking-wider text-[#C86218] hover:text-[#0C356A] inline-flex items-center gap-1 transition-colors ml-auto"
                    >
                      <span>Inquire Facility Support</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Logistics Guarantee Banner */}
        <div className="mt-14 rounded-3xl bg-[#071f3b] text-white p-8 sm:p-10 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B24D] mb-2 inline-block">
                Pan-India Supply Reliability
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Equipped for Bulk Industrial Deliveries & Emergency Plant Stoppages
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Whether you need a single 210-liter barrel of turbine oil or recurring monthly tanker dispatches of ISO VG 68 hydraulic oil,
                our infrastructure ensures consistent stock, factory test reports, and prompt handling.
              </p>
            </div>

            <div className="flex shrink-0">
              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry("Bulk Industrial Supply Consultation")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C86218] hover:bg-[#a94e0e] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-colors shadow-lg"
              >
                <span>Schedule a Supply Consultation</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
