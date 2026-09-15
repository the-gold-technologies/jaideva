"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Droplets,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

export interface BrandItem {
  id: string;
  name: string;
  badge: string;
  category: "Industrial" | "Automotive" | "Metalworking" | "Specialty";
  desc: string;
  highlights: string[];
  image: string;
  application: string;
}

export const BRAND_SHOWCASE: BrandItem[] = [
  {
    id: "hp-lubricants",
    name: "HP Lubricants",
    badge: "Authorized Industrial Partner",
    category: "Industrial",
    desc: "Complete public sector refinery backing with extensive ISO VG hydraulic, turbine, compressor, and machinery lubricants.",
    highlights: ["Enklo Hydraulic Oils", "Parthan Gear Fluids", "Turbinol Turbine Oils"],
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    application: "Heavy Manufacturing, Power Plants & Steel Mills",
  },
  {
    id: "valvoline",
    name: "Valvoline",
    badge: "Automotive & Heavy Duty",
    category: "Automotive",
    desc: "World-renowned engine oils, gear fluids, and coolants engineered for long drain intervals, fleet durability, and severe duty cycles.",
    highlights: ["All-Fleet Premium Engine Oils", "Heavy-Duty Gear Oils", "Long-Life Coolants"],
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
    application: "Commercial Fleets, Heavy Earthmoving & Transport",
  },
  {
    id: "gs-caltex",
    name: "GS Caltex",
    badge: "Kixx Synthetic Range",
    category: "Automotive",
    desc: "Advanced Group II/III base oil formulations delivering peak thermal oxidation resistance and fuel efficiency for modern engines.",
    highlights: ["Kixx HDX CK-4 Engine Oils", "Hydro HD Hydraulic", "Thermic Heat Transfer"],
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    application: "Modern Logistics, Construction & Turbocharged Fleets",
  },
  {
    id: "idemitsu",
    name: "Idemitsu",
    badge: "Precision Japanese OEM Tech",
    category: "Specialty",
    desc: "Engineered to demanding Japanese OEM tolerances, delivering ultra-low viscosity performance and friction reduction.",
    highlights: ["Daphne Precision Series", "High-Speed Spindle Oils", "Low-Ash Engine Formulations"],
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    application: "Japanese Machinery, High-Speed Spindles & Precision Automation",
  },
  {
    id: "molygraph",
    name: "Molygraph",
    badge: "Specialty Greases & Compounds",
    category: "Specialty",
    desc: "High-temperature, extreme-pressure, and water-resistant synthetic greases designed for zero unscheduled plant stoppage.",
    highlights: ["Molylube Ultra High Temp", "Open Gear Compounds", "Anti-Seize Pastes"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    application: "Cement Kilns, Steel Mill Bearings & Mining Machinery",
  },
  {
    id: "motultech",
    name: "MotulTech",
    badge: "High-Performance Fluids",
    category: "Industrial",
    desc: "Specialized French industrial division delivering high-performance metal transformation, dielectric fluids, and quench oils.",
    highlights: ["Thermocool Heat Transfer", "Supracool CNC Emulsions", "Safco Clean Degreasers"],
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80",
    application: "Automotive Component Die-Casting & Heat Treatment",
  },
  {
    id: "deep-pneumatics",
    name: "Deep Pneumatics",
    badge: "Compressor & Air Line Oils",
    category: "Industrial",
    desc: "Formulated specifically for rotary screw, reciprocating, and vane air compressors ensuring carbon-free valve performance.",
    highlights: ["Screw Compressor Oils 46/68", "Pneumatic Tool Lubes", "Synthetic 8000h Drain Fluids"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    application: "Compressed Air Plants, Textile Looms & Packaging Lines",
  },
  {
    id: "lubricon",
    name: "Lubricon",
    badge: "Custom Industrial Formulations",
    category: "Industrial",
    desc: "Tailored industrial blends meeting custom viscosity and anti-wear standards across manufacturing and processing plants.",
    highlights: ["Custom Blend Hydraulics", "Slideway ISO 68/220", "Heavy Circulating Oils"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    application: "Custom Factory Equipment & Secondary Processing Mills",
  },
  {
    id: "tw-chemie",
    name: "TW Chemie",
    badge: "Advanced Metalworking Solutions",
    category: "Metalworking",
    desc: "State-of-the-art semi-synthetic and neat cutting oils delivering extended tool life, superior surface finish, and biostability.",
    highlights: ["Bio-Stable Soluble Coolants", "Neat Honing & Broaching Oils", "Rust Preventives (Dewatering)"],
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80",
    application: "CNC Machining Centers, Lathes, Grinding & Tooling",
  },
  {
    id: "filtermist",
    name: "Filtermist",
    badge: "Mist Extraction & Plant Care",
    category: "Metalworking",
    desc: "Clean plant air solutions capturing oil mist at source to protect machine electronics, operators, and workplace safety.",
    highlights: ["Oil Mist Extraction Units", "After-Filters & Ducting", "Spindle Cooling Accessories"],
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    application: "Enclosed CNC Cabinets, Machine Shops & Clean Workshops",
  },
];

interface BrandsShowcaseProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function BrandsShowcaseSection({ onOpenEnquiry }: BrandsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredBrands = useMemo(() => {
    if (selectedCategory === "All") return BRAND_SHOWCASE;
    return BRAND_SHOWCASE.filter((b) => b.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="brand-showcase" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218]">
              Authentic Brand Portfolio
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
              Leading Industrial & Automotive Brands
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore our curated portfolio of 10 industry-defining lubrication and workshop brands.
              Every brand is backed by technical documentation, direct refinery channels, and stock availability.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Industrial", "Automotive", "Metalworking", "Specialty"].map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#0C356A] text-white shadow-md shadow-[#0C356A]/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-[#C86218] hover:text-[#0C356A]"
                  }`}
                >
                  {cat === "All" ? `All Brands (${BRAND_SHOWCASE.length})` : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brands Grid with Images */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#C86218] transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Brand Visual Header with Curated Industrial Image */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={brand.image}
                  alt={`${brand.name} lubricants and industrial application`}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b] via-[#071f3b]/50 to-transparent" />

                {/* Brand Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="rounded-lg bg-[#0C356A]/90 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
                    {brand.category}
                  </span>
                </div>

                {/* Brand Name Overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                    {brand.name}
                  </h3>
                  <p className="text-xs font-bold text-[#F4B24D] tracking-wide">
                    {brand.badge}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  {/* Primary Application */}
                  <div className="mb-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    <span className="text-[#C86218]">Ideal For:</span> {brand.application}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {brand.desc}
                  </p>

                  {/* Key Highlights / Formulations */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                      Key Formulations & SKUs:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {brand.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-700"
                        >
                          <CheckCircle2 size={11} className="text-[#C86218]" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenEnquiry && onOpenEnquiry(`${brand.name} Supply Enquiry`)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0C356A] group-hover:bg-[#C86218] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white transition-colors duration-200"
                  >
                    <span>Enquire For {brand.name}</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Guarantee Card */}
        <div className="mt-14 rounded-3xl bg-[#071f3b] text-white p-8 sm:p-10 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#F4B24D] mb-2">
                <ShieldCheck size={16} /> 100% Guaranteed Genuine Formulations
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Looking for a Specific Brand or Custom Viscosity Grade?
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Jai Deva Oil Co. holds supply agreements and procurement credentials with major oil marketing companies.
                We provide original factory batch test certificates, MSDS sheets, and technical data sheets for all supplied products.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenEnquiry && onOpenEnquiry("Technical Data Sheet & Quotation")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C86218] hover:bg-[#a94e0e] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-colors shadow-lg"
              >
                <Droplets size={15} />
                <span>Request TDS / MSDS</span>
              </button>
              <a
                href="tel:+919810000000"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/15 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-colors"
              >
                <PhoneCall size={15} />
                <span>Direct Sales Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
