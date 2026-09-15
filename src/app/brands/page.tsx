"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";
import {
  ArrowRight,
  Award,
  Building2,
  Factory,
  Gauge,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

const stats = [
  { value: "6+", label: "Brand partners stocked" },
  { value: "500+", label: "Product SKUs available" },
  { value: "12", label: "Years serving industry" },
  { value: "40+", label: "Cities supplied" },
];

const brandPillars = [
  {
    title: "Industrial trust",
    description:
      "We partner with leading lubricant brands that have proven performance in challenging operating conditions.",
    icon: Factory,
  },
  {
    title: "Application-specific solutions",
    description:
      "Every product category is selected to support the right machinery, operating temperature, and maintenance cycle.",
    icon: Wrench,
  },
  {
    title: "Reliable supply chain",
    description:
      "Our sourcing network is built to keep plants, workshops, and fleets moving without downtime or delay.",
    icon: Truck,
  },
  {
    title: "Quality assurance",
    description:
      "We focus on consistent quality, formulation integrity, and product support from recommendation to after-sales guidance.",
    icon: ShieldCheck,
  },
];

const brandCategories = [
  {
    name: "Automotive Lubricants",
    description: "Engine oils, gear oils, coolants and driveline products.",
  },
  {
    name: "Industrial Oils",
    description: "Hydraulic, compressor, circulating and process lubricants.",
  },
  {
    name: "Greases & Specialty",
    description: "High-performance greases and anti-wear compounds.",
  },
  {
    name: "Metalworking Fluids",
    description: "Cutting fluids and machining support products.",
  },
  {
    name: "Rust Preventives",
    description: "Corrosion protection for storage and transit.",
  },
  {
    name: "Maintenance Products",
    description: "Cleaners, degreasers and workshop consumables.",
  },
];

const partnerBrands = [
  "Valvoline",
  "HP Lubricants",
  "TW Chemie",
  "Filtermist",
  "Lubricon",
  "Deep Pneumatics",
];

const whyChooseUs = [
  {
    title: "Industrial strength",
    text: "Lubricants for heavy equipment, process lines, and performance-critical operations.",
    icon: Factory,
  },
  {
    title: "Automotive care",
    text: "Products designed to support engine life, fuel efficiency, and smoother daily operation.",
    icon: Gauge,
  },
  {
    title: "Dealer support",
    text: "Practical guidance for resale business growth, replacement cycles, and technical recommendations.",
    icon: Building2,
  },
  {
    title: "Quality-first sourcing",
    text: "Consistent product quality and dependable supply that keeps customers confident and operational.",
    icon: ShieldCheck,
  },
];

export default function BrandsPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const { fetchPage } = useCMSStore();

  useEffect(() => {
    fetchPage("brands").catch(console.error);
  }, [fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  return (
    <main
      className="min-h-screen bg-white text-slate-800"
      style={{ fontSize: `${16 * fontSizeMultiplier}px` }}
    >
      <SEOMeta pageSlug="brands" />

      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#071f3b] text-white">
        <img
          src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=2200&q=85"
          alt="Industrial lubricant processing facility"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[#071f3b]/75" />

        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28 text-center">
          <h1 className="text-3xl font-black uppercase leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Brands that power every industrial move.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Jai Deva Oil Co. brings together high-quality lubricant brands,
            application expertise, and reliable supply support for automotive,
            industrial, and heavy-duty needs.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C86218] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A74D0E]"
            >
              Explore our range <ArrowRight size={17} />
            </Link>
            <button
              type="button"
              onClick={() => handleOpenEnquiry("Brand consultation")}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
            >
              Talk to an expert
            </button>
          </div>
        </div>
      </section>

      {/* Stats band — the one bold move on this page */}
      <section className="border-y border-slate-200 bg-[#f8fafc] py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 sm:px-8 md:grid-cols-4 lg:px-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center ${
                idx > 0 ? "border-l border-slate-200" : ""
              }`}
            >
              <p className="text-4xl font-black text-[#0C356A] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why brands matter — alternating feature rows, not a card grid */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-black uppercase tracking-[-0.03em] text-[#0C356A] sm:text-4xl">
          Strong brands. Better operations.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          A trusted brand behind a lubricant isn't a formality — it's the
          difference between predictable maintenance and unplanned downtime.
        </p>

        <div className="mt-10 divide-y divide-slate-200 border-t border-slate-200">
          {brandPillars.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="flex shrink-0 items-center gap-4 sm:w-64">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F4B24D]/15 text-[#C86218]">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-extrabold text-[#0C356A]">
                  {title}
                </h3>
              </div>
              <p className="text-sm leading-6 text-slate-600 sm:flex-1">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Product focus — catalog tiles, consistent with the homepage grid */}
      <section className="bg-[#f8fafc] py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black uppercase tracking-[-0.03em] text-[#0C356A] sm:text-4xl">
              Covering the full lubricant spectrum
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Whatever the machine or industry, there's a formulation matched to
              it.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
            {brandCategories.map((item) => (
              <div
                key={item.name}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex-1 p-5">
                  <h3 className="text-base font-extrabold text-[#0C356A] sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 bg-[#0C356A] px-5 py-3 transition-colors duration-300 group-hover:bg-[#C86218]">
                  <span className="text-xs font-bold uppercase tracking-wide text-white">
                    View products
                  </span>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-[-0.03em] text-[#0C356A] sm:text-4xl">
                Need a product recommendation or brand conversation?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Our team helps you choose the right lubricant formulation for
                your machine, industry, or business needs with practical
                guidance and dependable support.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                type="button"
                onClick={() => handleOpenEnquiry("Brand consultation")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C86218] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A74D0E]"
              >
                Request a consultation <ArrowRight size={17} />
              </button>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#0C356A]/30 bg-white px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0C356A] transition hover:border-[#C86218] hover:bg-[#C86218] hover:text-white"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />
    </main>
  );
}
