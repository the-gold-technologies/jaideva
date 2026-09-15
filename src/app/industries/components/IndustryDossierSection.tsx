"use client";

import React, { useState } from "react";
import {
  Factory,
  Building2,
  Zap,
  Shirt,
  Car,
  FileText,
  Package,
  Pill,
  UtensilsCrossed,
  Wrench,
  SlidersHorizontal,
  ArrowRight,
  Flame,
  Droplet,
  CheckCircle2,
  Shield,
} from "lucide-react";

interface IndustryDossierProps {
  onOpenEnquiry: (productName?: string) => void;
  selectedIndustryId?: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  category: "heavy" | "manufacturing" | "specialty";
  icon: React.ElementType;
  image: string;
  tagline: string;
  challenges: string[];
  machinery: string[];
  solutions: string[];
  impact: string;
}

export const INDUSTRY_DATA: IndustryItem[] = [
  {
    id: "steel",
    name: "Steel & Metallurgy",
    category: "heavy",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    tagline: "High-heat and severe shock-load wear protection for continuous casting and hot rolling mills.",
    challenges: [
      "Radiant temperatures up to 650°C near furnaces and ladles",
      "Severe water ingress and mill scale contamination",
      "High shock loads on roughing stands and pinions",
    ],
    machinery: [
      "Hot & Cold Rolling Mills",
      "Continuous Casters (Concast)",
      "Heavy Reduction Gearboxes",
      "Sinter & Pelletizing Plants",
    ],
    solutions: [
      "Heavy Industrial Gear Oils (ISO VG 220, 320, 460)",
      "High-Temp Lithium Complex & Polyurea Greases with MoS2",
      "Fire-Resistant Hydraulic Fluids (HFDU / HFC)",
    ],
    impact: "Reduces unscheduled bearing freeze & extends gearbox oil life under extreme thermal cycle.",
  },
  {
    id: "cement",
    name: "Cement & Mining",
    category: "heavy",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80",
    tagline: "Resisting extreme abrasive dust, kiln heat, and continuous shock loads across crushing lines.",
    challenges: [
      "Fine abrasive cement clinker dust invading sealings",
      "Extreme kiln drive temperatures and vibration",
      "Massive torque on ball mills and vertical roller mills (VRM)",
    ],
    machinery: [
      "Kiln Girth Gears & Pinions",
      "Ball Mills & Vertical Roller Mills (VRM)",
      "Primary Jaw & Cone Crushers",
      "Bucket Elevators & Clinker Conveyors",
    ],
    solutions: [
      "Asphaltic & Synthetic Open Gear Compounds",
      "Extreme-Pressure Heavy Gear Oils (ISO VG 680, 1000)",
      "Water & Dust Resistant Heavy Calcium Sulfonate Greases",
    ],
    impact: "Prevents girth gear micro-pitting and extends bearing lubrication cycles in dust-heavy zones.",
  },
  {
    id: "power",
    name: "Power Generation & Turbines",
    category: "heavy",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    tagline: "Ultra-clean, varnish-resistant turbine oils and dielectric fluids for uninterrupted power transmission.",
    challenges: [
      "Thermal stress leading to varnish deposits on servo valves",
      "Steam condensation demanding high demulsibility (water separation)",
      "Requirement for 20,000+ operating hours oxidation stability",
    ],
    machinery: [
      "Gas & Steam Turbines",
      "Hydro-Electric Turbines",
      "Power Transformers & Switchgear",
      "High-Capacity Boiler Feed Pumps",
    ],
    solutions: [
      "Non-Zinc Premium Turbine Oils (ISO VG 32, 46, 68)",
      "Inhibited Electrical Insulating Transformer Oils",
      "Synthetic Air Compressor Lubricants",
    ],
    impact: "Eliminates servo valve sticking and maintains dielectric strength across seasonal temperature swings.",
  },
  {
    id: "automotive",
    name: "Automotive Assembly & Fleets",
    category: "manufacturing",
    icon: Car,
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80",
    tagline: "Engine oils, driveline fluids, and metal stamping lubricants engineered for peak automotive productivity.",
    challenges: [
      "Stringent OEM specifications (API CK-4/SP, ACEA, JASO)",
      "High-speed stamping heat and paint-shop compatibility",
      "Fleet fuel efficiency and long drain interval mandates",
    ],
    machinery: [
      "Commercial Fleet Engines & Transmissions",
      "Hydraulic Metal Press Lines",
      "Automated Paint & Robotic Conveyors",
      "CNC Machining Centers for Powertrain Parts",
    ],
    solutions: [
      "Heavy-Duty Diesel Engine Oils (15W-40, 10W-40, 5W-30)",
      "EP Stamping Oils & Neat Metal Cutting Fluids",
      "Automatic Transmission Fluids (ATF) & Differential Gear Oils",
    ],
    impact: "Lowers fleet cost-per-kilometer while boosting die life in automotive sheet stamping.",
  },
  {
    id: "engineering",
    name: "General & Precision Engineering",
    category: "heavy",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    tagline: "Neat & water-soluble metalworking fluids, slideway oils, and hydraulic lubricants for machine shops.",
    challenges: [
      "Bacterial growth and foul sump odors in soluble coolants",
      "Stick-slip friction on precision lathe and CNC slideways",
      "Surface finish imperfections on tough aerospace alloys",
    ],
    machinery: [
      "CNC Turning & Vertical Machining Centers (VMC)",
      "High-Pressure Hydraulic Systems",
      "Surface & Cylindrical Grinding Machines",
      "Industrial Air Compressors",
    ],
    solutions: [
      "Semi-Synthetic & Soluble Cutting Coolants (Bio-Stable)",
      "Tacky Anti-Stick Slideway Oils (ISO VG 68, 220)",
      "Anti-Wear Hydraulic Oils (DIN 51524 Part 2 HLP)",
    ],
    impact: "Extends tool insert life by up to 30% and keeps coolant sumps fresh for longer machining intervals.",
  },
  {
    id: "food",
    name: "Food, Dairy & Beverage",
    category: "specialty",
    icon: UtensilsCrossed,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80",
    tagline: "NSF H1 registered, Halal and Kosher compliant food-grade lubricants for safe, zero-contamination processing.",
    challenges: [
      "Incidental food contact compliance without compromising wear protection",
      "High-pressure washdown chemicals and boiling water rinses",
      "Freezer cold-chain environments (-30°C) to baking ovens (+260°C)",
    ],
    machinery: [
      "High-Speed Bottling & Canning Lines",
      "Bakery Ovens & Industrial Fryers",
      "Freezer Conveyor Chains",
      "Food Packaging & Blister Pack Equipment",
    ],
    solutions: [
      "NSF H1 Synthetic Food-Grade Gear & Hydraulic Fluids",
      "High-Temp Food-Safe Aluminum Complex Greases",
      "USP / Food Grade White Mineral Oils",
    ],
    impact: "100% audit-ready food safety compliance with zero sacrifice in gearbox wear performance.",
  },
  {
    id: "pharma",
    name: "Pharmaceuticals & Cleanrooms",
    category: "specialty",
    icon: Pill,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    tagline: "Ultra-pure, white mineral oils and food-grade synthetic fluids certified for hygienic sterile formulations.",
    challenges: [
      "Zero permissible particulate shedding or oil drip",
      "Strict compliance with US-FDA / IP / BP / USP purity standards",
      "Chemical cleaning agent and solvent washdown compatibility",
    ],
    machinery: [
      "Tablet Compression & Coating Machines",
      "Liquid Filling & Ampoule Sealers",
      "HVAC & Cleanroom Clean Air Compressors",
      "Centrifuges & Capsule Fillers",
    ],
    solutions: [
      "High-Purity Light & Heavy Liquid Paraffin (IP/BP/USP)",
      "Synthetic Cleanroom Gear & Bearing Lubricants",
      "Specialty Non-Toxic Aerosol Food Greases",
    ],
    impact: "Guarantees batch sterility and compliance with FDA and WHO cGMP standards.",
  },
  {
    id: "textile",
    name: "Textiles & Synthetic Fibers",
    category: "specialty",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80",
    tagline: "Non-staining, easily scourable needle and loom lubricants engineered for ultra-high spindle speeds.",
    challenges: [
      "Oil mist staining expensive yarns and greige fabrics",
      "High spindle speeds generating friction heat up to 25,000 RPM",
      "Lint, fiber dust accumulation on sliding knit cams",
    ],
    machinery: [
      "Circular & Flat Knitting Machines",
      "High-Speed Spindles & Twisters",
      "Stenter Frames & Fabric Drying Chambers",
      "Shuttleless Rapier & Air-Jet Weaving Looms",
    ],
    solutions: [
      "Scourable Circular Knitting Machine Needle Oils",
      "Ultra-Light High-Speed Spindle Oils (ISO VG 10, 15, 22)",
      "High-Temp Synthetic Stenter Chain Lubricants",
    ],
    impact: "Zero permanent fabric staining with easy washability and significantly reduced needle wear.",
  },
  {
    id: "plastic",
    name: "Plastics & Polymer Processing",
    category: "manufacturing",
    icon: Package,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
    tagline: "Thermal stability and varnish prevention for 24/7 hydraulic injection molding and blow extrusion plants.",
    challenges: [
      "Continuous 24/7 hydraulic cycle times without thermal breakdown",
      "Degradation of hydraulic servo valves caused by varnish",
      "High barrel thrust load on plasticizing extruder screw drives",
    ],
    machinery: [
      "Hydraulic Injection Molding Machines",
      "Twin-Screw Polymer Extruders",
      "Blow Molding & Thermoforming Units",
      "Granulators & Polymer Shredders",
    ],
    solutions: [
      "Long-Drain High VI Hydraulic Fluids (ISO VG 46, 68)",
      "Heavy Synthetic Extruder Gearbox Oils",
      "High-Temperature Mold Ejector Pin Greases",
    ],
    impact: "Ensures precise shot-weight repeatability by maintaining consistent hydraulic fluid viscosity.",
  },
  {
    id: "paper",
    name: "Paper, Pulp & Packaging",
    category: "manufacturing",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80",
    tagline: "Water-separating circulating oils and high-temp bearing greases for wet-end and dryer-section machinery.",
    challenges: [
      "Continuous moisture and steam in paper machine wet end",
      "Bearing temperatures exceeding 150°C in dryer rolls",
      "Acidic water contamination from pulping chemicals",
    ],
    machinery: [
      "Dryer Cylinder Bearings & Felt Rolls",
      "Pulp Digesters & Stock Washers",
      "Calendar & Supercalendar Rolls",
      "Corrugator Heating Fluting Rolls",
    ],
    solutions: [
      "Advanced Paper Machine Circulating Oils (PMO)",
      "High-Temp Synthetic Fluorinated & Polyurea Greases",
      "Synthetic Heavy-Duty Gear Oils for Corrugators",
    ],
    impact: "Prevents bearing seizure in steam-heated dryer rolls and allows quick water draining from sumps.",
  },
  {
    id: "manufacturing",
    name: "Heavy Manufacturing & Workshops",
    category: "manufacturing",
    icon: SlidersHorizontal,
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80",
    tagline: "Complete multi-grade lubrication for manufacturing drives, automated lines, overhead cranes, and compressors.",
    challenges: [
      "Fragmented inventory with dozens of overlapping oil grades",
      "Mixed machinery vintages from legacy presses to modern robotics",
      "Overfilling, contamination, and missed preventative maintenance",
    ],
    machinery: [
      "Factory Overhead Cranes & Hoists",
      "Air Compressors (Screw, Reciprocating)",
      "Conveyor Transfer Lines & Electric Drives",
      "Central Utility Hydraulic Power Packs",
    ],
    solutions: [
      "Multi-Purpose Extreme-Pressure Lithium EP-2 Greases",
      "Synthetic Rotary Screw Compressor Lubricants (8,000 hrs)",
      "Universal Anti-Wear Hydraulic & Circulating Fluids",
    ],
    impact: "Consolidates factory lube inventory by up to 40% while lowering risk of cross-contamination.",
  },
];

export default function IndustryDossierSection({
  onOpenEnquiry,
  selectedIndustryId,
}: IndustryDossierProps) {
  const [filter, setFilter] = useState<"all" | "heavy" | "manufacturing" | "specialty">("all");
  const [activeIndustryId, setActiveIndustryId] = useState<string>(
    selectedIndustryId || "steel",
  );

  const filteredIndustries = INDUSTRY_DATA.filter((ind) =>
    filter === "all" ? true : ind.category === filter,
  );

  const activeIndustry =
    INDUSTRY_DATA.find((item) => item.id === activeIndustryId) ||
    INDUSTRY_DATA[0];

  return (
    <section id="sector-explorer" className="py-20 bg-[#f8fafc] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218]">
            Sector Operations Matrix
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A]">
            Technical Lubrication Dossiers By Industry
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Click into any sector to review operational operating challenges,
            covered machinery, engineered fluid chemistries, and performance impact.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5 border-b border-slate-200 pb-4">
          {[
            { id: "all", label: "All Sectors (11)" },
            { id: "heavy", label: "Heavy & Core Infrastructure (4)" },
            { id: "manufacturing", label: "Manufacturing & Automotive (4)" },
            { id: "specialty", label: "Hygienic & Specialty (3)" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filter === cat.id
                  ? "bg-[#0C356A] text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-[#C86218] hover:text-[#C86218]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sector Quick Pills Selector */}
        <div className="mt-6 flex flex-wrap gap-2">
          {filteredIndustries.map((ind) => {
            const Icon = ind.icon;
            const isSelected = ind.id === activeIndustry.id;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActiveIndustryId(ind.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#C86218] text-white shadow-md scale-[1.02]"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-[#0C356A]"
                }`}
              >
                <Icon size={16} className={isSelected ? "text-white" : "text-[#C86218]"} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Dossier Presentation Card */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden transition-all duration-300">
          {/* Top Banner with Image and Title */}
          <div className="relative isolate overflow-hidden bg-[#071f3b] text-white min-h-[220px] sm:min-h-[260px] flex items-end p-6 sm:p-10">
            <img
              src={activeIndustry.image}
              alt={activeIndustry.name}
              className="absolute inset-0 -z-20 h-full w-full object-cover object-center brightness-60"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071f3b] via-[#071f3b]/70 to-transparent" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D] px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#071f3b] mb-3">
                <Shield size={13} />
                <span>Plant Operational Profile</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                {activeIndustry.name}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
                {activeIndustry.tagline}
              </p>
            </div>
          </div>

          {/* Dossier Content Breakdown Matrix: 3 Columns */}
          <div className="p-6 sm:p-10 grid gap-8 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Col 1: Operational Challenges */}
            <div className="pt-6 lg:pt-0 lg:pr-6">
              <div className="flex items-center gap-2.5 text-[#C86218] font-black text-xs uppercase tracking-wider mb-4">
                <Flame size={18} />
                <span>Operational Stressors</span>
              </div>
              <ul className="space-y-3">
                {activeIndustry.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C86218] shrink-0 mt-2" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Machinery Covered */}
            <div className="pt-6 lg:pt-0 lg:px-6">
              <div className="flex items-center gap-2.5 text-[#0C356A] font-black text-xs uppercase tracking-wider mb-4">
                <Factory size={18} />
                <span>Core Equipment Covered</span>
              </div>
              <ul className="space-y-3">
                {activeIndustry.machinery.map((m, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Recommended Lubricant Chemistries */}
            <div className="pt-6 lg:pt-0 lg:pl-6">
              <div className="flex items-center gap-2.5 text-[#0C356A] font-black text-xs uppercase tracking-wider mb-4">
                <Droplet size={18} className="text-[#F4B24D]" />
                <span>Engineered Formulations</span>
              </div>
              <ul className="space-y-3">
                {activeIndustry.solutions.map((s, i) => (
                  <li key={i} className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs sm:text-sm font-semibold text-slate-800">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Performance Impact & Action CTA */}
          <div className="bg-slate-50 border-t border-slate-200 p-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Verified Plant Impact:
              </span>
              <p className="text-sm font-bold text-[#0C356A]">
                {activeIndustry.impact}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenEnquiry(`${activeIndustry.name} - Plant Recommendation & Quote`)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C86218] hover:bg-[#a94e0e] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-colors cursor-pointer shrink-0 shadow-md"
            >
              <span>Request {activeIndustry.name} Quote</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
