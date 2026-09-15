"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Factory, Truck } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface HomeHeroProps {
  onOpenEnquiry: (productName?: string) => void;
  onOpenDistributor: (type?: string) => void;
}

const heroPoints = [
  "Engine, hydraulic and gear oils",
  "Grease and specialty lubricants",
  "Reliable supply and guidance",
];

export default function HomeHero({
  onOpenEnquiry,
  onOpenDistributor,
}: HomeHeroProps) {
  const { products, fetchProducts } = useCMSStore();

  React.useEffect(() => {
    fetchProducts().catch(console.error);
  }, [fetchProducts]);

  const featuredProduct = products?.[0];
  const productImage = featuredProduct
    ? (featuredProduct as any).containerImage ||
      featuredProduct.coverImage ||
      featuredProduct.productImages?.[0]
    : null;

  return (
    <section className="relative isolate overflow-hidden bg-[#071f3b] text-white">
      <img
        src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=2200&q=85"
        alt="Oil industry processing plant with industrial pipes and equipment"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[#071f3b]/65" />
      <div className="absolute inset-y-0 right-0 -z-10 w-full bg-[#071f3b]/20 lg:w-3/5" />

      <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:min-h-[610px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-12 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 border-l-4 border-[#F4B24D] pl-3 text-xs font-bold uppercase tracking-[0.2em] text-[#F4B24D]">
            <Factory size={15} />
            Multi-brand lubricant solutions
          </div>

          <h1 className="text-3xl font-black uppercase leading-[1.05] tracking-[-0.04em] sm:text-[2.75rem] lg:text-[3.6rem]">
            Reliable lubrication for every industry and application.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
            Jai Deva Oil Co. is a trusted multi-brand industrial and automotive
            lubricant distributor, helping businesses choose quality products
            from leading brands with confidence.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onOpenEnquiry("Lubricant product recommendation")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#C86218] px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A74D0E]"
            >
              Explore products <ArrowRight size={17} />
            </button>
            <button
              type="button"
              onClick={() =>
                onOpenDistributor("Industrial Lube Distributor (ILD)")
              }
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
            >
              <Truck size={17} /> Become a partner
            </button>
          </div>

          <div className="mt-10 grid gap-3 border-t border-white/20 pt-5 sm:grid-cols-3">
            {heroPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-2 text-xs leading-5 text-slate-200"
              >
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-[#F4B24D]"
                />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          {productImage && (
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <img
                src={productImage}
                alt="Featured lubricant product"
                className="max-h-[460px] w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
