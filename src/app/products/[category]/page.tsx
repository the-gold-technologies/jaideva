"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
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
  Layers,
} from "lucide-react";
import { useCMSStore, CMSProduct, getHeadingTag } from "@/store/useCMSStore";
import SEOMeta from "@/components/SEOMeta";
import { BRAND_PRODUCTS, BrandData } from "@/data/brandProductsData";

export default function CategoryProductsPage() {
  const params = useParams();
  const [activeSection, setActiveSection] = useState<number>(0);
  const categorySlug = (params?.category as string) || "hp-lubricants";

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

  // Handle URL hash anchor navigation (e.g., #subcat-2)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHash = () => {
        const hash = window.location.hash;
        if (hash) {
          const match = hash.match(/#subcat-(\d+)/);
          if (match) {
            const idx = parseInt(match[1], 10);
            setActiveSection(idx);
            setTimeout(() => {
              const el = document.getElementById(`subcat-${idx}`);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }, 150);
          }
        }
      };

      handleHash();
      window.addEventListener("hashchange", handleHash);
      return () => window.removeEventListener("hashchange", handleHash);
    }
  }, [categorySlug]);

  // Match brand from BRAND_PRODUCTS data when categorySlug is a brand ID
  const matchedBrand: BrandData | undefined = useMemo(() => {
    return BRAND_PRODUCTS.find((b) => b.id === categorySlug);
  }, [categorySlug]);

  // Current category from CMS store (fallback)
  const category = useMemo(() => {
    if (matchedBrand) {
      return {
        id: matchedBrand.id,
        name: matchedBrand.name,
        slug: matchedBrand.id,
        description: matchedBrand.about,
      };
    }
    if (!productCategories) return null;
    return productCategories.find((c) => c.slug === categorySlug) || null;
  }, [productCategories, categorySlug, matchedBrand]);

  const searchParams = useSearchParams();
  const searchQuery = (searchParams?.get("search") || "").trim();

  // Filter and group products dynamically (from brand if matched, else CMS)
  const subCategoryGroups = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const matchFilter = (item: {
      name?: string;
      description?: string;
      specs?: string;
      subCategoryTitle?: string;
    }) => {
      if (!q) return true;
      const n = (item.name || "").toLowerCase();
      const d = (item.description || "").toLowerCase();
      const s = (item.specs || "").toLowerCase();
      const sub = (item.subCategoryTitle || "").toLowerCase();
      return n.includes(q) || d.includes(q) || s.includes(q) || sub.includes(q);
    };

    if (matchedBrand) {
      return matchedBrand.categories
        .map((cat) => {
          const filteredProds = cat.products.filter((p) =>
            matchFilter({
              name: p.name,
              description: p.description,
              specs: p.specs,
              subCategoryTitle: cat.name,
            }),
          );
          return {
            title: cat.name,
            coverImage: cat.coverImage,
            products: filteredProds.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              categorySlug: categorySlug,
              subCategoryTitle: cat.name,
              coverImage: p.coverImage,
              containerImage: p.coverImage,
              description: p.description,
            })) as unknown as CMSProduct[],
          };
        })
        .filter((group) => group.products.length > 0);
    }

    if (!products || products.length === 0) return [];

    const categoryProducts = products.filter(
      (p) =>
        (!categorySlug || p.categorySlug === categorySlug) &&
        matchFilter({
          name: p.name,
          description: p.description,
          subCategoryTitle:
            (p as any).subCategoryTitle || (p as any).subtitle || "",
        }),
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
        "/engine-oil-bottles.jpg";

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
  }, [products, categorySlug, category, matchedBrand, searchQuery]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  const categoryName =
    category?.name ||
    categorySlug?.replace(/-/g, " ").toUpperCase() ||
    "Products";
  const currentSEO =
    pageSEO?.[`products/${categorySlug}`] || pageSEO?.["products"];
  const categoryTitle = currentSEO?.title || categoryName;
  const categoryDesc = currentSEO?.metaDescription || category?.description;
  const HeadingTag = getHeadingTag(currentSEO?.headingOptions, "h1");
  const heroImage = matchedBrand?.heroImage || "/oil-drums-warehouse.jpg";
  const heroProduct =
    matchedBrand?.categories[0]?.products[0] ||
    subCategoryGroups[0]?.products[0];
  const heroProductImage =
    heroProduct?.coverImage ||
    matchedBrand?.categories[0]?.coverImage ||
    subCategoryGroups[0]?.coverImage ||
    "/engine-oil-bottles.jpg";
  const heroProductName = heroProduct?.name || categoryName;
  const heroDescription = matchedBrand?.about || categoryDesc;

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

      <section className="relative isolate overflow-hidden bg-[#071f3b] text-white">
        <img
          src={heroImage}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#071f3b]/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071f3b]/90 via-[#071f3b]/80 to-[#071f3b]/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12 md:pt-10 md:pb-16">
          <nav className="flex items-center gap-1.5 text-[11px] text-blue-200/80 mb-8 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="opacity-50" />
            <Link
              href="/products"
              className="hover:text-white transition-colors"
            >
              Products
            </Link>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-[#F4B24D] font-semibold">{categoryName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <HeadingTag className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-[1.08] text-white">
                {matchedBrand?.name || categoryTitle}
              </HeadingTag>

              {matchedBrand?.tagline && (
                <p className="mt-3 text-base md:text-lg font-semibold text-[#F4B24D]">
                  {matchedBrand.tagline}
                </p>
              )}

              {heroDescription && (
                <p className="mt-4 text-sm md:text-base leading-7 text-slate-200 max-w-2xl">
                  {heroDescription}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenEnquiry()}
                  className="inline-flex items-center gap-2 rounded-md bg-[#C86218] px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-[#C86218]/25 transition hover:bg-[#A74D0E]"
                >
                  <Phone size={13} />
                  Request a Quote
                </button>
                {subCategoryGroups.length > 0 && (
                  <a
                    href="#subcat-0"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("subcat-0")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-widest text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#071f3b]"
                  >
                    Browse range <ArrowRight size={12} />
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 shadow-2xl">
                  <img
                    src={heroProductImage}
                    alt={heroProductName}
                    className="w-full h-56 md:h-72 object-cover object-center"
                  />
                  <div className="px-4 py-3 bg-[#071f3b]/80 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#F4B24D]">
                      Featured product
                    </p>
                    <p className="mt-0.5 text-sm font-extrabold uppercase tracking-wide text-white truncate">
                      {heroProductName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          {/* Search Results Filter Alert Banner */}
          {searchQuery && (
            <div className="p-4 sm:p-5 bg-blue-50/80 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#002b5c] bg-white px-2.5 py-0.5 rounded-full border border-blue-100">
                  Filtered By Search Keyword
                </span>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  Showing matching results for{" "}
                  <span className="font-extrabold text-[#C86218]">
                    &ldquo;{searchQuery}&rdquo;
                  </span>{" "}
                  in {categoryName}
                </p>
              </div>
              <Link
                href={`/products/${categorySlug}`}
                className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-orange-300 text-xs font-bold text-[#C86218] hover:bg-orange-50 transition-all uppercase tracking-wider self-start sm:self-auto cursor-pointer"
              >
                Clear Search ×
              </Link>
            </div>
          )}

          {/* Empty State if No Products Match Search */}
          {searchQuery && subCategoryGroups.length === 0 ? (
            <div className="py-16 px-6 bg-white rounded-2xl border border-gray-200 text-center max-w-md mx-auto my-8 w-full shadow-sm">
              <h3 className="text-base font-bold text-[#002b5c] uppercase">
                No matching products found
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                We couldn&apos;t find any {categoryName} matching &ldquo;
                {searchQuery}&rdquo;.
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <Link
                  href={`/products/${categorySlug}`}
                  className="px-4 py-2 bg-[#C86218] hover:bg-[#a74f10] text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors"
                >
                  Clear Search
                </Link>
              </div>
            </div>
          ) : subCategoryGroups.length === 0 ? (
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
