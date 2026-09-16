"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BRAND_CATEGORIES = [
  {
    name: "Automotive & Engine Oils",
    description: "Synthetic 5W-30, 15W-40 diesel fluids, multi-grade gear lubricants, and coolants.",
    image: "/engine-oil-bottles.jpg",
    badge: "API CK-4 / SN Plus",
  },
  {
    name: "Industrial Gear & Hydraulic Oils",
    description: "ISO VG 32 to 680 heavy anti-wear hydraulic, turbine, and industrial circulating oils.",
    image: "/industrial-gear-oil.jpg",
    badge: "DIN 51524 / ISO 11158",
  },
  {
    name: "Refinery Barrels & Bulk Supply",
    description: "Factory-sealed 210L drums and bulk road tankers for continuous plant consumption.",
    image: "/oil-drums-warehouse.jpg",
    badge: "210L Drums & Tankers",
  },
  {
    name: "Precision Engine Lubrication",
    description: "High thermal stability engine oils engineered for severe load and extended drain life.",
    image: "/engine-oil-hero.jpg",
    badge: "Extended Drain Interval",
  },
  {
    name: "High-Temp Greases & Pastes",
    description: "Lithium complex, polyurea, and synthetic extreme-pressure greases for bearings & kilns.",
    image: "/industrial-gear-oil.jpg",
    badge: "NLGI 00 to 3 / EP Pastes",
  },
  {
    name: "Metalworking & CNC Coolants",
    description: "Bio-stable water-soluble cutting emulsions, grinding fluids, and rust preventives.",
    image: "/oil-lab-quality.jpg",
    badge: "Chlorine-Free Emulsions",
  },
];

export default function BrandsProductCategoriesSection() {
  return (
    <section className="bg-[#f8fafc] py-20 border-t border-slate-200 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-black tracking-[0.25em] uppercase mb-2 text-[#C86218]">
            LUBRICATION PRODUCT PORTFOLIO
          </span>
          <h2 className="text-3xl font-black uppercase tracking-[-0.03em] text-[#0C356A] sm:text-4xl">
            Covering the Full Lubricant Spectrum
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            From precision synthetic motor oils to heavy plant hydraulic barrels, explore our comprehensive refinery-backed distribution catalog.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_CATEGORIES.map((item) => (
            <Link
              key={item.name}
              href="/products"
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image Preview with Engine Oil Photography */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-[#0C356A] shadow-xs">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text Description */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between gap-2 bg-[#0C356A] px-5 py-3 transition-colors duration-300 group-hover:bg-[#C86218]">
                <span className="text-xs font-bold uppercase tracking-wide text-white">
                  Explore Products
                </span>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
