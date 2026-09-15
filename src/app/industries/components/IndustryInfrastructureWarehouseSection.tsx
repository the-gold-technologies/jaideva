"use client";

import React from "react";
import {
  Warehouse,
  Boxes,
  Truck,
  CheckCircle2,
  CreditCard,
  Building2,
  Package,
  Users,
  MapPin,
} from "lucide-react";

const INFRA_FACILITIES = [
  {
    icon: Building2,
    name: "Corporate Office",
    desc: "Modern office supporting customer communication, order coordination, and account management.",
  },
  {
    icon: Warehouse,
    name: "Warehouse / Depot",
    desc: "High-capacity covered depot for heavy drum, pail, and tanker storage with systematic batch control.",
  },
  {
    icon: Package,
    name: "Product Storage Facilities",
    desc: "Temperature-controlled segregation zones preventing contamination between product grades.",
  },
  {
    icon: Truck,
    name: "Distribution Support",
    desc: "Dedicated logistics routing for rapid pan-India regional dispatch and urgent plant delivery.",
  },
  {
    icon: Users,
    name: "Organized Workplace",
    desc: "Professional operational hub managing daily order fulfilment, invoicing, and customer support.",
  },
  {
    icon: CheckCircle2,
    name: "Product Handling & Dispatch",
    desc: "Safe forklift handling, spill-containment protocols, and tamper-evident packaging verification.",
  },
];

const GALLERY_ITEMS = [
  {
    title: "Our Signboard",
    desc: "Jai Deva Oil Co. business premises and corporate identity.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Office Exterior",
    desc: "Our office facility supporting operations and customer coordination.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Our Workplace",
    desc: "Professional workspace where our team manages orders and operations.",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Our Warehouse",
    desc: "High-capacity storage with efficient product handling and dispatch.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
];

export default function IndustryInfrastructureWarehouseSection() {
  return (
    <section className="py-24 bg-[#f8fafc] text-slate-800 relative overflow-hidden">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0C356A]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end mb-16">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218] mb-5">
              Operational Infrastructure
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0C356A] leading-[1.05]">
              Infrastructure Built For{" "}
              <span className="text-[#C86218]">Reliable Operations</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Our infrastructure supports the efficient handling, storage, and
              distribution of lubricant products — with dedicated office,
              warehouse, and logistics capabilities to deliver dependable supply.
            </p>
          </div>

          {/* Headline stat card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-[#071f3b] text-white p-6 shadow-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={20} className="text-[#F4B24D]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#F4B24D]">
                  Depot Capability
                </span>
              </div>
              <p className="text-3xl font-black text-white">210L Drums</p>
              <p className="text-xs text-slate-300 mt-1">
                Barrels, Pails (20L / 26L) & Bulk Tankers — all stocked at
                depot for immediate plant dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Infrastructure Facility Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {INFRA_FACILITIES.map((fac) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.name}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-[#0C356A] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0C356A]/5 group-hover:bg-[#0C356A] text-[#0C356A] group-hover:text-[#F4B24D] flex items-center justify-center shrink-0 transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                      {fac.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Infrastructure Gallery */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#C86218]">
                Explore Our Facilities
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#0C356A] mt-1">
                Infrastructure Gallery
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f3b]/80 via-[#071f3b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                    <p className="text-white text-xs font-bold leading-relaxed translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="p-4 border-t border-slate-100">
                  <h4 className="text-sm font-black text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packaging, Payment & Shipping Bar */}
        <div className="rounded-2xl bg-[#071f3b] text-white p-8 sm:p-10 shadow-xl border border-white/10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B24D] mb-8">
            Commercial & Logistics Details
          </p>
          <div className="grid gap-8 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Payment Modes */}
            <div className="pt-6 md:pt-0 md:pr-8">
              <div className="flex items-center gap-2 text-[#F4B24D] font-black text-xs uppercase tracking-wider mb-4">
                <CreditCard size={18} />
                <span>Accepted Payment Modes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Cash", "Cheque", "Demand Draft", "Credit Card / RTGS"].map(
                  (m) => (
                    <span
                      key={m}
                      className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 hover:bg-white/10 transition-colors"
                    >
                      {m}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Shipment Mode */}
            <div className="pt-6 md:pt-0 md:px-8">
              <div className="flex items-center gap-2 text-[#F4B24D] font-black text-xs uppercase tracking-wider mb-4">
                <Truck size={18} />
                <span>Shipment & Logistics</span>
              </div>
              <p className="text-base font-black text-white">
                By Road (Pan-India Transit)
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                We coordinate product dispatch and transportation according to
                customer order requirements and delivery locations across India.
              </p>
            </div>

            {/* Packaging Support */}
            <div className="pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-2 text-[#F4B24D] font-black text-xs uppercase tracking-wider mb-4">
                <Boxes size={18} />
                <span>Standard Packaging Formats</span>
              </div>
              <p className="text-base font-black text-white">
                Barrels (210L), Pails (20L / 26L) & Tankers
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Refinery-sealed tamper-proof containers with manufacturer batch
                identification labels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
