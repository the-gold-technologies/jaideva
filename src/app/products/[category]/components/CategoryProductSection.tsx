"use client";

import React from "react";
import Link from "next/link";
import { Package, ArrowRight, ChevronRight, Phone } from "lucide-react";
import { CMSProduct } from "@/store/useCMSStore";

interface CategoryProductSectionProps {
  group: {
    title: string;
    coverImage?: string;
    products: CMSProduct[];
  };
  index: number;
  categorySlug: string;
  onOpenEnquiry: (productName?: string) => void;
}

export function CategoryProductSection({
  group,
  index,
  categorySlug,
  onOpenEnquiry,
}: CategoryProductSectionProps) {
  const firstProductSlug = group.products[0]?.slug || "";

  return (
    <section
      id={`subcat-${index}`}
      className="scroll-mt-28 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group/card hover:shadow-md hover:border-gray-200 transition-all duration-300"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 px-5 md:px-7 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        {/* Index badge */}
        <div className="w-8 h-8 rounded-xl bg-[#002b5c] text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm md:text-[15px] font-extrabold text-[#002b5c] uppercase tracking-wide truncate">
            {group.title}
          </h2>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 bg-[#002b5c]/8 text-[#002b5c] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            <Package size={9} />
            {group.products.length} Products
          </span>
          {firstProductSlug && (
            <Link
              href={`/products/${categorySlug}/${firstProductSlug}`}
              className="hidden sm:inline-flex items-center gap-1 bg-[#C86218] hover:bg-[#a74f10] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all"
            >
              View All <ArrowRight size={10} />
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left: Cover Image Panel with overlay label */}
        <div className="md:w-56 lg:w-64 shrink-0 relative bg-gradient-to-br from-[#001e42] via-[#002b5c] to-[#0a4080] flex items-center justify-center p-5 min-h-[200px] overflow-hidden">
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-xl border border-white/10">
            {group.coverImage ? (
              <img
                src={group.coverImage}
                alt={group.title}
                className="w-full h-full object-cover transition-transform duration-700 group/card-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-[#071f3b] flex items-center justify-center">
                <Package size={32} className="text-white/30" />
              </div>
            )}
            {/* Bottom label overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3">
              <p className="text-white text-[10px] font-bold uppercase tracking-widest truncate">
                {group.title}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Product Grid */}
        <div className="flex-1 p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
            {group.products.map((prod, pIdx) => (
              <Link
                key={prod.id}
                href={`/products/${categorySlug}/${prod.slug}`}
                className="group/prod relative flex items-center gap-2.5 bg-[#f8f9fb] hover:bg-[#002b5c] text-gray-700 hover:text-white px-3.5 py-2.5 rounded-xl border border-gray-200/80 hover:border-[#002b5c] transition-all duration-200 text-[11px] font-semibold uppercase tracking-tight overflow-hidden"
              >
                {/* Subtle index number */}
                <span className="text-[9px] font-black text-gray-300 group-hover/prod:text-white/30 w-4 shrink-0 transition-colors">
                  {String(pIdx + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate leading-snug">{prod.name}</span>
                <ChevronRight
                  size={11}
                  className="shrink-0 text-gray-300 group-hover/prod:text-[#C86218] transition-colors"
                />
              </Link>
            ))}
          </div>

          {/* Bottom Bar: Mobile View All & Enquiry */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between sm:justify-end gap-4">
            {firstProductSlug && (
              <Link
                href={`/products/${categorySlug}/${firstProductSlug}`}
                className="sm:hidden inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C86218] hover:text-[#a74f10] transition-colors"
              >
                View All <ArrowRight size={11} />
              </Link>
            )}
            <button
              type="button"
              onClick={() => onOpenEnquiry(group.products[0]?.name)}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-[#002b5c] transition-colors cursor-pointer"
            >
              <Phone size={11} /> Enquire
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
