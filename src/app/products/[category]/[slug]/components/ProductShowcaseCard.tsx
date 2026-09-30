"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FileText, Search } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface ProductShowcaseCardProps {
  onOpenEnquiry: (productName?: string) => void;
  onOpenDownload: (pdfType: "TDS" | "MSDS") => void;
}

export function ProductShowcaseCard({
  onOpenEnquiry,
  onOpenDownload,
}: ProductShowcaseCardProps) {
  const params = useParams();
  const categorySlug = params?.category as string;
  const productSlug = params?.slug as string;

  const { productDetails, products, productCategories } = useCMSStore();

  const product =
    productDetails[productSlug] ||
    products?.find((p) => p.slug === productSlug);

  const activeCategorySlug = product?.categorySlug || categorySlug;
  const category = productCategories?.find((c) => c.slug === activeCategorySlug);

  const siblingProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products
      .filter(
        (p) =>
          (!activeCategorySlug || p.categorySlug === activeCategorySlug) &&
          p.slug !== productSlug,
      )
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        categorySlug: p.categorySlug || categorySlug,
      }));
  }, [products, activeCategorySlug, productSlug, categorySlug]);

  if (!product) return null;

  const currentGroupTitle =
    product.subCategoryTitle || product.subtitle || category?.name;
  const productImage = product.containerImage || product.coverImage;

  return (
    <>
      {/* Category Title with Dark Blue Underline Bar */}
      <div className="mb-8 border-b border-gray-200 pb-3 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] uppercase tracking-wider inline-block relative">
          <span className="border-b-4 border-[#002b5c] pb-3 inline-block">
            {currentGroupTitle}
          </span>
        </h1>
        <span className="text-xs font-bold uppercase tracking-widest text-[#C86218] bg-red-50 px-3 py-1 rounded-full border border-red-100 hidden sm:inline-block">
          Industrial Grade
        </span>
      </div>

      {/* Top Product Showcase Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Image Frame Container */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-50 via-slate-50/60 to-slate-100/90 border border-slate-200/80 p-6 relative flex items-center justify-center min-h-[320px] group shadow-inner">
            {productImage && (
              <img
                src={productImage}
                alt={product.name}
                className="max-h-72 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute bottom-3.5 right-3.5 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-slate-200 text-slate-500 shadow-xs">
              <Search size={15} />
            </div>
          </div>

          {/* Center Column: Product Name, Subtitle, Specifications & Quick CTAs */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
            <div>
              <span className="text-[11px] font-extrabold text-[#C86218] uppercase tracking-wider block mb-1">
                {product.subtitle || currentGroupTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002b5c] tracking-tight mb-2">
                {product.name}
              </h2>
              <div className="w-12 h-1 bg-[#002b5c] rounded-full mb-4" />

              {/* Specifications or Key Highlights */}
              {product.specsText ? (
                <div className="bg-slate-50 border-l-4 border-[#C86218] rounded-r-xl p-3.5 shadow-xs mb-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#C86218] mb-1">
                    Meets Specifications:
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                    {product.specsText}
                  </p>
                </div>
              ) : product.applicationAreas ? (
                <div className="bg-slate-50 border-l-4 border-[#002b5c] rounded-r-xl p-3.5 shadow-xs mb-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#002b5c] mb-1">
                    Key Application:
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                    {product.applicationAreas}
                  </p>
                </div>
              ) : null}

              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 font-medium">
                <span className="bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  📦 20L / 50L / 210L Barrel
                </span>
                <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
                  ✓ In Stock & Ready to Dispatch
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenEnquiry(product.name)}
                className="bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                Inquire Product
              </button>
              <button
                type="button"
                onClick={() => onOpenDownload("TDS")}
                className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} /> TDS
              </button>
            </div>
          </div>

          {/* Right Column: Sibling Products Sidebar */}
          <div className="lg:col-span-3 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#002b5c] block mb-3 pb-2 border-b border-slate-200">
              In This Series ({siblingProducts.length})
            </span>
            <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-visible">
              {siblingProducts.map((sib) => {
                const isCurrent = sib.slug === product.slug;
                return (
                  <Link
                    key={sib.id}
                    href={`/products/${category?.slug || product.categorySlug}/${sib.slug}`}
                    className={`block px-3.5 py-2 text-xs rounded-xl font-bold uppercase transition-all flex items-center justify-between ${
                      isCurrent
                        ? "bg-[#002b5c] text-white shadow-xs"
                        : "bg-white hover:bg-slate-200 text-slate-700 border border-slate-100"
                    }`}
                  >
                    <span className="truncate">{sib.name}</span>
                    {isCurrent && (
                      <span className="text-xs text-sky-300">●</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
