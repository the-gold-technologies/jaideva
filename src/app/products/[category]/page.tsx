"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DownloadModal from "@/components/DownloadModal";
import {
  Droplet,
  ChevronRight,
  ArrowRight,
  Package,
  Phone,
  Download,
  Layers,
} from "lucide-react";
import {
  useCMSStore,
  CMSProduct,
  PageSEO,
  getHeadingTag,
} from "@/store/useCMSStore";
import SEOMeta from "@/components/SEOMeta";

export default function CategoryProductsPage() {
  const params = useParams();
  const [activeSection, setActiveSection] = useState<number>(0);
  const categorySlug = params?.category as string;

  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadProductName, setDownloadProductName] = useState("");
  const [downloadPdfUrl, setDownloadPdfUrl] = useState("");

  const { fetchProducts, products, productCategories, pageSEO } = useCMSStore();

  useEffect(() => {
    if (categorySlug) {
      fetchProducts(categorySlug).catch(console.error);
    }
  }, [categorySlug, fetchProducts]);

  // Current category from CMS store
  const category = useMemo(() => {
    if (!productCategories) return null;
    return productCategories.find((c) => c.slug === categorySlug) || null;
  }, [productCategories, categorySlug]);

  // Filter and group products dynamically from CMS
  const subCategoryGroups = useMemo(() => {
    if (!products || products.length === 0) return [];

    const categoryProducts = products.filter(
      (p) => !categorySlug || p.categorySlug === categorySlug,
    );

    const groupMap = new Map<
      string,
      { title: string; coverImage: string; products: CMSProduct[] }
    >();

    categoryProducts.forEach((p) => {
      const subTitle =
        (p as any).subCategoryTitle ||
        (p as any).subtitle ||
        (category?.name ? `${category.name} Range` : "Featured Products");
      const cover =
        (p as any).containerImage ||
        p.coverImage ||
        category?.bannerImage ||
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600";

      if (!groupMap.has(subTitle)) {
        groupMap.set(subTitle, {
          title: subTitle,
          coverImage: cover,
          products: [],
        });
      }

      const existing = groupMap.get(subTitle)!;
      if (!existing.coverImage && cover) {
        existing.coverImage = cover;
      }
      existing.products.push(p);
    });

    return Array.from(groupMap.values());
  }, [products, categorySlug, category]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  const categoryName =
    category?.name ||
    categorySlug?.replace(/-/g, " ").toUpperCase() ||
    "Products";
  const currentSEO = pageSEO[`products/${categorySlug}`] || pageSEO["products"];
  const categoryTitle = currentSEO?.title || categoryName;
  const categoryDesc = currentSEO?.metaDescription || category?.description;
  const HeadingTag = getHeadingTag(currentSEO?.headingOptions, "h1");

  return (
    <main
      className="min-h-screen bg-[#f5f7fa] text-gray-800 font-sans flex flex-col"
      style={{ fontSize: `${16 * fontSizeMultiplier}px` }}
    >
      <SEOMeta pageSlug={`products/${categorySlug}`} />

      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* ── Page Header Banner ── */}
      <div className="relative bg-[#F6F7FA] text-gray-800 overflow-hidden border-b border-gray-100">
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-6 font-medium tracking-wide">
            <Link href="/" className="hover:text-[#002b5c] transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="opacity-50" />
            <Link
              href="/products"
              className="hover:text-[#002b5c] transition-colors"
            >
              Products
            </Link>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-[#002b5c] font-semibold">{categoryName}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <div className="flex-1">
              {/* Category label */}
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-[#C86218] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                <Layers size={11} />
                Product Catalogue
              </div>
              <HeadingTag className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-[1.1] text-[#002b5c]">
                {categoryTitle}
              </HeadingTag>
              {categoryDesc && (
                <p className="mt-4 text-sm md:text-[15px] text-gray-500 max-w-xl leading-relaxed">
                  {categoryDesc}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Body: Sidebar + Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 w-full flex-1 flex gap-8 items-start">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 sticky top-28 self-start gap-4">
          {/* Nav card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-[#002b5c] to-[#0a4080] px-5 py-5">
              <div className="flex items-center gap-2 mb-1">
                <Layers size={13} className="text-blue-300" />
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300">
                  Browse Range
                </p>
              </div>
              <p className="text-white font-extrabold text-sm uppercase tracking-wide leading-tight">
                {categoryName}
              </p>
              <p className="text-blue-300 text-[10px] mt-1.5">
                {subCategoryGroups.length} sub-categories
              </p>
            </div>

            <nav className="divide-y divide-gray-50">
              {subCategoryGroups.map((group, idx) => (
                <a
                  key={idx}
                  href={`#subcat-${idx}`}
                  onClick={() => setActiveSection(idx)}
                  className={`flex items-center gap-3 px-4 py-3 transition-all border-l-[3px] group ${
                    activeSection === idx
                      ? "border-[#C86218] bg-orange-50/70 text-[#C86218]"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-[#002b5c] hover:border-gray-200"
                  }`}
                >
                  <Droplet
                    size={12}
                    className={`shrink-0 transition-colors ${
                      activeSection === idx
                        ? "fill-[#C86218] text-[#C86218]"
                        : "fill-gray-300 text-gray-300 group-hover:fill-gray-400"
                    }`}
                  />
                  <span className="flex-1 truncate text-[11px] font-semibold uppercase tracking-wide leading-snug">
                    {group.title}
                  </span>
                  <span
                    className={`text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded ${
                      activeSection === idx
                        ? "bg-[#C86218]/15 text-[#C86218]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {group.products.length}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* CTA cards */}
          <button
            onClick={() => handleOpenEnquiry()}
            className="w-full bg-[#C86218] hover:bg-[#a74f10] text-white text-[11px] font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-orange-900/20"
          >
            <Phone size={13} />
            Request a Quote
          </button>

          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
              Need help?
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our technical team is available to help you select the right
              lubricant for your application.
            </p>
            <Link
              href="/contact-us"
              className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#002b5c] hover:text-[#C86218] transition-colors uppercase tracking-wide"
            >
              Contact Us <ChevronRight size={11} />
            </Link>
          </div>
        </aside>

        {/* ── RIGHT CONTENT AREA ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          {subCategoryGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                <Droplet size={28} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">
                No products found in this category.
              </p>
            </div>
          ) : (
            subCategoryGroups.map((group, idx) => (
              <section
                key={idx}
                id={`subcat-${idx}`}
                className="scroll-mt-28 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group/card hover:shadow-md hover:border-gray-200 transition-all duration-300"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 px-5 md:px-7 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  {/* Index badge */}
                  <div className="w-8 h-8 rounded-xl bg-[#002b5c] text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-sm">
                    {String(idx + 1).padStart(2, "0")}
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
                    <Link
                      href={`/products/${categorySlug}/${group.products[0]?.slug || ""}`}
                      className="hidden sm:inline-flex items-center gap-1 bg-[#C86218] hover:bg-[#a74f10] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all"
                    >
                      View All <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row">
                  {/* Left: Cover Image Panel — richer with overlay label */}
                  <div className="md:w-56 lg:w-64 shrink-0 relative bg-gradient-to-br from-[#001e42] via-[#002b5c] to-[#0a4080] flex items-center justify-center p-5 min-h-[200px] overflow-hidden">
                    {/* Subtle dot pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                      }}
                    />
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-xl border border-white/10">
                      <img
                        src={group.coverImage}
                        alt={group.title}
                        className="w-full h-full object-cover transition-transform duration-700 group/card-hover:scale-105"
                      />
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
                          <span className="flex-1 truncate leading-snug">
                            {prod.name}
                          </span>
                          <ChevronRight
                            size={11}
                            className="shrink-0 text-gray-300 group-hover/prod:text-[#C86218] transition-colors"
                          />
                        </Link>
                      ))}
                    </div>

                    {/* Mobile: View All */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between sm:justify-end gap-4">
                      <Link
                        href={`/products/${categorySlug}/${group.products[0]?.slug || ""}`}
                        className="sm:hidden inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C86218] hover:text-[#a74f10] transition-colors"
                      >
                        View All <ArrowRight size={11} />
                      </Link>
                      <button
                        onClick={() =>
                          handleOpenEnquiry(group.products[0]?.name)
                        }
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-[#002b5c] transition-colors"
                      >
                        <Phone size={11} /> Enquire
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        productName={downloadProductName}
        pdfType="TDS"
        pdfUrl={downloadPdfUrl}
      />
    </main>
  );
}
