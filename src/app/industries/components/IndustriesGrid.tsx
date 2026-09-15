import React from "react";
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
} from "lucide-react";

export const industries = [
  {
    name: "Steel",
    icon: Factory,
    description:
      "Heavy-duty lubricants for rolling mills, furnaces, gearboxes, and high-temperature operations that demand dependable wear protection.",
  },
  {
    name: "Cement",
    icon: Building2,
    description:
      "Performance oils for crushing, grinding, kiln drive systems, and process equipment where dust, heat, and load are constant challenges.",
  },
  {
    name: "Power",
    icon: Zap,
    description:
      "Lubrication support for turbines, transformers, generators, and rotating systems that require long service life and reduced downtime.",
  },
  {
    name: "Textile",
    icon: Shirt,
    description:
      "Precision lubricants for spinning, weaving, dyeing, and finishing lines to minimize friction and keep production continuous.",
  },
  {
    name: "Automobile",
    icon: Car,
    description:
      "Engine oils, gear oils, and specialized automotive lubricants designed to help improve performance, efficiency, and reliability.",
  },
  {
    name: "Paper",
    icon: FileText,
    description:
      "Process lubricants that support drying units, pulping machines, and paper handling systems under demanding operating conditions.",
  },
  {
    name: "Plastic",
    icon: Package,
    description:
      "High-efficiency lubricants for extrusion, molding, and polymer processing equipment where smooth operation and cleanliness matter.",
  },
  {
    name: "Pharma",
    icon: Pill,
    description:
      "Clean, reliable lubrication solutions for hygienic production environments where contamination control and operational precision are critical.",
  },
  {
    name: "Food",
    icon: UtensilsCrossed,
    description:
      "Food-safe lubrication support for processing and packaging lines where consistency, hygiene, and equipment uptime are essential.",
  },
  {
    name: "Engineering",
    icon: Wrench,
    description:
      "Industrial lubricants for machine shops, fabrication units, and engineering operations that depend on robust productivity and maintenance support.",
  },
  {
    name: "Manufacturing",
    icon: SlidersHorizontal,
    description:
      "Comprehensive lubrication solutions for production lines, mechanical drives, conveyors, and workshop equipment across manufacturing units.",
  },
];

export default function IndustriesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
      <div className="max-w-3xl">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#C86218]">
          Industry coverage
        </p>
        <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-[#0C356A] sm:text-4xl">
          Built for performance across key sectors
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Every sector runs its equipment differently, so we treat each enquiry
          as its own case rather than a one-size product fit. Below are the
          industries we actively supply and support today.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {industries.map(({ name, icon: Icon, description }) => (
          <div
            key={name}
            className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C86218] hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
          >
            <div className="mb-5 inline-flex rounded-2xl bg-[#F4B24D]/12 p-3 text-[#C86218]">
              <Icon size={28} />
            </div>
            <h3 className="text-2xl font-black text-[#0C356A]">{name}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
