"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Plus,
  Minus,
  Layers,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface NavbarProps {
  fontSizeMultiplier: number;
  setFontSizeMultiplier: React.Dispatch<React.SetStateAction<number>>;
  language: "EN" | "HI";
  setLanguage: (lang: "EN" | "HI") => void;
}

const DEFAULT_CATEGORIES = [
  { slug: "industrial-oils", name: "Industrial Oils" },
  { slug: "industrial-greases", name: "Industrial Greases" },
  { slug: "automotive-oils", name: "Automotive Oils" },
  { slug: "bike-oils", name: "Bike Engine Oils" },
];

export default function Navbar({
  fontSizeMultiplier,
  setFontSizeMultiplier,
  language,
  setLanguage,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeHoverCategory, setActiveHoverCategory] =
    useState<string>("industrial-oils");
  const [activeTab, setActiveTab] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    products,
    productCategories,
    fetchProducts,
    globalSEO,
    fetchGlobalSEO,
  } = useCMSStore();

  React.useEffect(() => {
    fetchProducts().catch(console.error);
    fetchGlobalSEO().catch(console.error);
  }, [fetchProducts, fetchGlobalSEO]);

  const categories =
    productCategories && productCategories.length > 0
      ? productCategories
      : DEFAULT_CATEGORIES;

  const currentCategory =
    categories.find((c) => c.slug === activeHoverCategory) || categories[0];

  const logoSrc = globalSEO?.logo || "/jaideva-logo.png";

  const categoryProducts =
    products?.filter((p) => p.categorySlug === currentCategory.slug) || [];

  const increaseFont = () => {
    if (fontSizeMultiplier < 1.25) setFontSizeMultiplier((prev) => prev + 0.08);
  };

  const decreaseFont = () => {
    if (fontSizeMultiplier > 0.85) setFontSizeMultiplier((prev) => prev - 0.08);
  };

  const navItems = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/about-us" },
    { name: "BRANDS", link: "/brands" },
    {
      name: "PRODUCTS",
      link: "/products",
      isMegaMenu: true,
    },
    { name: "INDUSTRIES", link: "/industries" },
    { name: "GALLERY", link: "/events" },
    { name: "BLOG", link: "/blogs" },
    { name: "CONTACT", link: "/contact-us" },
  ];

  const checkIsActive = (item: { name: string; link: string }) => {
    if (item.link === "/") {
      return pathname === "/" && (!activeTab || activeTab === "HOME");
    }
    if (item.link.startsWith("/") && item.link !== "/") {
      return pathname === item.link || pathname.startsWith(item.link + "/");
    }
    return activeTab === item.name;
  };

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="relative z-50 bg-white shadow-[0_4px_18px_rgba(12,53,106,0.10)]">
      {/* Top Header Utility Bar - Desktop & Tablet */}
      <div className="hidden md:flex justify-end border-b border-[#edf1f5] bg-[#fbfcfe] px-6 py-2 lg:px-12">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#0C356A]">
            <button
              onClick={() => setLanguage("EN")}
              className={`hover:underline cursor-pointer ${language === "EN" ? "font-bold text-[#C86218]" : ""}`}
            >
              English
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => setLanguage("HI")}
              className={`hover:underline cursor-pointer ${language === "HI" ? "font-bold text-[#C86218]" : ""}`}
            >
              हिन्दी
            </button>
          </div>

          <form className="flex items-center font-sans">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[30px] w-[120px] rounded-l-lg border border-[#d7dee8] border-r-0 bg-white px-2.5 py-1 font-sans text-[12px] outline-none transition-all focus:w-[160px] sm:w-[150px] sm:text-[13px]"
            />
            <button
              type="submit"
              className="flex h-[30px] items-center justify-center rounded-r-lg border border-[#C86218] bg-[#C86218] px-2 text-white transition-colors hover:bg-[#A74D0E]"
              aria-label="Search"
            >
              <Search size={14} className="font-bold stroke-[2.5]" />
            </button>
          </form>

          <div className="flex items-center gap-1">
            <span className="text-gray-600 text-xs font-sans">Text</span>
            <button
              onClick={increaseFont}
              className="bg-[#0C356A] text-white p-0.5 flex items-center justify-center hover:bg-opacity-90 cursor-pointer rounded-xs"
              title="Increase Font Size"
              type="button"
            >
              <Plus size={12} strokeWidth={3} />
            </button>
            <button
              onClick={decreaseFont}
              className="bg-[#0C356A] text-white p-0.5 flex items-center justify-center hover:bg-opacity-90 cursor-pointer rounded-xs"
              title="Decrease Font Size"
              type="button"
            >
              <Minus size={12} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top Utility Bar (< md) */}
      <div className="md:hidden flex justify-between items-center px-3 py-1.5 bg-[#f8fafc] border-b border-gray-200/70 text-xs">
        <div className="flex items-center gap-1.5 text-[#0C356A]">
          <button
            onClick={() => setLanguage("EN")}
            className={`cursor-pointer ${language === "EN" ? "font-bold text-[#C86218]" : ""}`}
          >
            English
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setLanguage("HI")}
            className={`cursor-pointer ${language === "HI" ? "font-bold text-[#C86218]" : ""}`}
          >
            हिन्दी
          </button>
        </div>

        <div className="flex items-center gap-2">
          <form className="flex items-center font-sans">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none border border-[#CCCCCC] border-r-0 px-2 text-[11px] h-[26px] w-[90px] rounded-l"
            />
            <button
              type="submit"
              className="bg-[#C86218] text-white h-[26px] px-1.5 border border-[#C86218] rounded-r flex items-center justify-center cursor-pointer"
              aria-label="Search"
            >
              <Search size={12} />
            </button>
          </form>

          <div className="flex items-center gap-1">
            <span className="text-gray-500 text-[11px]">Text</span>
            <button
              onClick={increaseFont}
              className="bg-[#0C356A] text-white p-0.5 rounded-xs"
              title="Increase Font Size"
              type="button"
            >
              <Plus size={10} strokeWidth={3} />
            </button>
            <button
              onClick={decreaseFont}
              className="bg-[#0C356A] text-white p-0.5 rounded-xs"
              title="Decrease Font Size"
              type="button"
            >
              <Minus size={10} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center py-1">
          <img
            src={logoSrc}
            alt="JAI DEVA OIL CO."
            className="h-12 w-auto object-contain sm:h-14 lg:h-[72px]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/jaideva-logo.png";
            }}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item, idx) => {
            const isActive = checkIsActive(item);
            return (
              <div
                key={idx}
                className="relative py-2"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.link}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex items-center gap-1 font-sans text-[14px] font-bold tracking-normal transition ${
                    isActive
                      ? "text-[#C86218] font-bold"
                      : "text-[#0C356A] hover:text-[#C86218]"
                  }`}
                >
                  {item.name}
                  {item.isMegaMenu && (
                    <ChevronDown
                      size={14}
                      className={
                        isActive
                          ? "text-[#C86218]"
                          : "text-gray-500 group-hover:text-[#C86218]"
                      }
                    />
                  )}
                </Link>

                {/* Clean 2-Column Mega Menu */}
                {item.isMegaMenu && openDropdown === item.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[min(640px,calc(100vw-32px))] pt-2">
                    <div className="overflow-hidden rounded-xl border border-[#dce5ef] bg-white shadow-[0_18px_45px_rgba(12,53,106,0.16)] animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between gap-4 bg-[#0C356A] px-4 py-3 text-white">
                        <div>
                          <div className="mb-0.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F4B24D]">
                            <Layers size={12} /> Product range
                          </div>
                          <p className="text-xs font-semibold text-white/90">
                            Find the right lubricant for your application
                          </p>
                        </div>
                        <Link
                          href="/products"
                          className="shrink-0 rounded-full border border-white/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#0C356A]"
                        >
                          View all
                        </Link>
                      </div>

                      <div className="border-b border-gray-100 px-4 py-2.5">
                        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-visible">
                          {categories.map((cat) => {
                            const isCatActive =
                              activeHoverCategory === cat.slug;
                            return (
                              <Link
                                key={cat.slug}
                                href={`/products/${cat.slug}`}
                                onMouseEnter={() =>
                                  setActiveHoverCategory(cat.slug)
                                }
                                className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-colors ${
                                  isCatActive
                                    ? "border-[#0C356A] bg-[#0C356A] text-white"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-[#C86218] hover:text-[#C86218]"
                                }`}
                              >
                                {cat.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="px-4 py-3">
                        <div className="mb-2 flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#C86218]">
                              Featured category
                            </p>
                            <h3 className="text-base font-black text-[#0C356A]">
                              {currentCategory.name}
                            </h3>
                          </div>
                          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold text-[#C86218]">
                            {categoryProducts.length} products
                          </span>
                        </div>

                        {categoryProducts.length > 0 ? (
                          <div className="grid max-h-44 grid-cols-2 gap-1.5 overflow-y-auto pr-1 scrollbar-visible">
                            {categoryProducts.map((prod) => (
                              <Link
                                key={prod.id}
                                href={`/products/${prod.categorySlug}/${prod.slug}`}
                                className="group rounded-lg border border-gray-100 bg-[#f8fafc] px-3 py-2.5 transition hover:border-[#F4B24D] hover:bg-orange-50"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-[11px] font-extrabold leading-snug text-[#0C356A] group-hover:text-[#C86218]">
                                    {prod.name}
                                  </span>
                                  <ChevronRight
                                    size={13}
                                    className="mt-0.5 shrink-0 text-gray-300 group-hover:text-[#C86218]"
                                  />
                                </div>
                                {(prod.subCategoryTitle ||
                                  prod.tagline ||
                                  (prod as any).subtitle) && (
                                  <span className="mt-0.5 block text-[9px] text-gray-500">
                                    {prod.subCategoryTitle ||
                                      prod.tagline ||
                                      (prod as any).subtitle}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            href={`/products/${currentCategory.slug}`}
                            className="block rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-5 text-sm text-gray-500 transition hover:border-[#C86218] hover:text-[#0C356A]"
                          >
                            Explore all products in {currentCategory.name}{" "}
                            <ChevronRight size={15} className="inline" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-[#0C356A] hover:text-[#C86218] focus:outline-none cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col h-full w-full overflow-y-auto animate-in slide-in-from-right duration-200">
          {/* Header Bar inside Mobile Overlay */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-xs">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <img
                src={logoSrc}
                alt="JAI DEVA OIL CO."
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/jaideva-logo.png";
                }}
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-800 hover:text-[#C86218] focus:outline-none cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close Menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Body Content inside Overlay */}
          <div className="flex-1 px-6 py-6 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              {/* Main Navigation Links */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item, idx) => {
                  const isActive = checkIsActive(item);
                  if (item.isMegaMenu) {
                    return (
                      <div key={idx} className="border-b border-gray-100 pb-2">
                        <button
                          type="button"
                          onClick={() =>
                            setMobileProductsOpen(!mobileProductsOpen)
                          }
                          className={`w-full flex items-center justify-between text-base font-extrabold py-2.5 transition-colors text-left cursor-pointer ${
                            isActive || mobileProductsOpen
                              ? "text-[#C86218]"
                              : "text-[#0C356A] hover:text-[#C86218]"
                          }`}
                        >
                          <span>{item.name}</span>
                          {mobileProductsOpen ? (
                            <ChevronDown
                              size={20}
                              className="text-[#C86218] transition-transform"
                            />
                          ) : (
                            <ChevronRight
                              size={20}
                              className="text-gray-400 transition-transform"
                            />
                          )}
                        </button>

                        {/* Collapsible Sub-Categories for PRODUCTS & SERVICES */}
                        {mobileProductsOpen && (
                          <div className="pl-3 mt-1 flex flex-col gap-1.5 border-l-2 border-[#C86218]/70 bg-orange-50/40 p-3 rounded-r-lg animate-in fade-in duration-150">
                            <span className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                              Product Categories
                            </span>
                            {categories.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/products/${cat.slug}`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileProductsOpen(false);
                                }}
                                className="text-xs text-gray-700 hover:text-[#C86218] font-semibold py-1.5 px-2 rounded hover:bg-white flex items-center justify-between transition-colors"
                              >
                                <span>{cat.name}</span>
                                <ChevronRight
                                  size={14}
                                  className="text-gray-400"
                                />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={idx} className="border-b border-gray-100 pb-2">
                      <Link
                        href={item.link}
                        onClick={() => {
                          setActiveTab(item.name);
                          setMobileMenuOpen(false);
                          setMobileProductsOpen(false);
                        }}
                        className={`flex items-center justify-between text-base font-extrabold py-2.5 transition-colors ${
                          isActive
                            ? "text-[#C86218]"
                            : "text-[#0C356A] hover:text-[#C86218]"
                        }`}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions inside Overlay */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#C86218] hover:bg-[#A74D0E] text-white font-extrabold py-3 rounded-lg text-center text-sm uppercase tracking-wider shadow-md transition-colors"
              >
                CONTACT US / LOCATE DEALER
              </Link>
              <div className="text-center text-xs text-gray-500 font-medium">
                Direct Contact:{" "}
                <span className="font-bold text-gray-800">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
