"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Plus,
  Minus,
  Layers,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { changeLanguage, useLanguage } from "@/components/GoogleTranslator";
import { BRAND_PRODUCTS } from "@/data/brandProductsData";

interface NavbarProps {
  fontSizeMultiplier?: number;
  setFontSizeMultiplier?: React.Dispatch<React.SetStateAction<number>>;
  language?: "EN" | "HI";
  setLanguage?: (lang: "EN" | "HI") => void;
}

export default function Navbar({
  fontSizeMultiplier,
  setFontSizeMultiplier,
  language,
  setLanguage,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSelectedBrand, setMobileSelectedBrand] = useState<string | null>(
    "hp-lubricants",
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeBrandId, setActiveBrandId] = useState<string>("hp-lubricants");
  const [activeTab, setActiveTab] = useState<string>("");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const mobileSearchDropdownRef = useRef<HTMLDivElement>(null);

  const {
    products,
    fetchProducts,
    globalSEO,
    fetchGlobalSEO,
  } = useCMSStore();

  useEffect(() => {
    fetchGlobalSEO().catch(console.error);
    fetchProducts().catch(console.error);
  }, [fetchGlobalSEO, fetchProducts]);

  // Click outside search dropdown listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideDesktop = !searchDropdownRef.current || !searchDropdownRef.current.contains(target);
      const isOutsideMobile = !mobileSearchDropdownRef.current || !mobileSearchDropdownRef.current.contains(target);
      if (isOutsideDesktop && isOutsideMobile) {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Consolidate searchable products from BRAND_PRODUCTS & CMS
  const allSearchableProducts = useMemo(() => {
    const list: Array<{
      id: string;
      name: string;
      slug: string;
      categorySlug: string;
      subCategoryTitle: string;
      description: string;
    }> = [];

    // 1. From BRAND_PRODUCTS
    BRAND_PRODUCTS.forEach((b) => {
      b.categories.forEach((cat) => {
        cat.products.forEach((p) => {
          list.push({
            id: p.id,
            name: p.name,
            slug: p.slug,
            categorySlug: b.id,
            subCategoryTitle: `${b.name} • ${cat.name}`,
            description: p.description || p.specs || "",
          });
        });
      });
    });

    // 2. From CMS Store
    if (products && products.length > 0) {
      products.forEach((p) => {
        if (!list.some((existing) => existing.slug === p.slug)) {
          list.push({
            id: p.id,
            name: p.name,
            slug: p.slug,
            categorySlug: p.categorySlug || "hp-lubricants",
            subCategoryTitle:
              (p as any).subCategoryTitle ||
              (p as any).subtitle ||
              p.categorySlug ||
              "Products",
            description: p.description || "",
          });
        }
      });
    }

    return list;
  }, [products]);

  // Live filter results for search dropdown
  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allSearchableProducts
      .filter((p) => {
        const name = (p.name || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const sub = (p.subCategoryTitle || "").toLowerCase();
        return name.includes(q) || desc.includes(q) || sub.includes(q);
      })
      .slice(0, 6);
  }, [allSearchableProducts, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchDropdownOpen(false);
    const q = searchQuery.toLowerCase().trim();

    const matched = allSearchableProducts.find((p) => {
      const name = (p.name || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const sub = (p.subCategoryTitle || "").toLowerCase();
      return name.includes(q) || desc.includes(q) || sub.includes(q);
    });

    const targetCat = matched ? matched.categorySlug : "hp-lubricants";
    router.push(`/products/${targetCat}?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Font sizing with local storage persistence and root style scaling
  const [currentFontSize, setCurrentFontSize] = useState<number>(16);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jaideva_font_size") || localStorage.getItem("mahalaxmi_font_size");
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 12 && parsed <= 26) {
          setCurrentFontSize(parsed);
          document.documentElement.style.fontSize = `${parsed}px`;
          if (setFontSizeMultiplier) {
            setFontSizeMultiplier(parsed / 16);
          }
          return;
        }
      }
      const computed =
        Math.round(
          parseFloat(getComputedStyle(document.documentElement).fontSize),
        ) || 16;
      setCurrentFontSize(computed);
    } catch {
      setCurrentFontSize(16);
    }
  }, [setFontSizeMultiplier]);

  const increaseFont = () => {
    setCurrentFontSize((prev) => {
      const next = Math.min(26, prev + 1);
      document.documentElement.style.fontSize = `${next}px`;
      try {
        localStorage.setItem("jaideva_font_size", String(next));
      } catch {}
      if (setFontSizeMultiplier) {
        setFontSizeMultiplier(next / 16);
      }
      return next;
    });
  };

  const decreaseFont = () => {
    setCurrentFontSize((prev) => {
      const next = Math.max(12, prev - 1);
      document.documentElement.style.fontSize = `${next}px`;
      try {
        localStorage.setItem("jaideva_font_size", String(next));
      } catch {}
      if (setFontSizeMultiplier) {
        setFontSizeMultiplier(next / 16);
      }
      return next;
    });
  };

  // Google Translator language integration
  const detectedLanguage = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<"EN" | "HI">(
    language || detectedLanguage || "EN",
  );

  useEffect(() => {
    setCurrentLanguage(detectedLanguage);
  }, [detectedLanguage]);

  const handleLanguageChange = (lang: "EN" | "HI") => {
    setCurrentLanguage(lang);
    if (setLanguage) setLanguage(lang);
    changeLanguage(lang);
  };

  const currentBrand =
    BRAND_PRODUCTS.find((b) => b.id === activeBrandId) || BRAND_PRODUCTS[0];

  const logoSrc = globalSEO?.logo || "/jaideva-logo.png";

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

  useEffect(() => {
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
              onClick={() => handleLanguageChange("EN")}
              className={`hover:underline cursor-pointer notranslate ${currentLanguage === "EN" ? "font-bold text-[#C86218]" : ""}`}
              translate="no"
              type="button"
              title="Translate to English"
            >
              English
            </button>
            <span className="text-gray-400 notranslate" translate="no">|</span>
            <button
              onClick={() => handleLanguageChange("HI")}
              className={`hover:underline cursor-pointer notranslate ${currentLanguage === "HI" ? "font-bold text-[#C86218]" : ""}`}
              translate="no"
              type="button"
              title="Translate to Hindi (हिन्दी)"
            >
              हिन्दी
            </button>
          </div>

          {/* Desktop Search */}
          <div className="relative" ref={searchDropdownRef}>
            <form onSubmit={handleSearchSubmit} className="flex items-center font-sans">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onFocus={() => setIsSearchDropdownOpen(true)}
                className="h-[30px] w-[120px] rounded-l-lg border border-[#d7dee8] border-r-0 bg-white px-2.5 py-1 font-sans text-[12px] outline-none transition-all focus:w-[170px] sm:w-[150px] sm:text-[13px]"
              />
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="flex h-[30px] items-center justify-center rounded-r-lg border border-[#C86218] bg-[#C86218] px-2 text-white transition-colors hover:bg-[#A74D0E] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Search"
              >
                <Search size={14} className="font-bold stroke-[2.5]" />
              </button>
            </form>

            {/* Instant Search Results Dropdown */}
            {isSearchDropdownOpen && searchQuery.trim().length >= 1 && (
              <div className="absolute right-0 mt-1 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 text-left">
                <div className="px-3 py-2 bg-[#f8fafc] border-b border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Matching Products ({liveSearchResults.length})</span>
                  <span className="text-[#C86218] truncate max-w-[120px]">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </div>
                {liveSearchResults.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                    {liveSearchResults.map((p) => (
                      <Link
                        key={`${p.categorySlug}-${p.slug}`}
                        href={`/products/${p.categorySlug}/${p.slug}`}
                        onClick={() => setIsSearchDropdownOpen(false)}
                        className="p-2.5 hover:bg-orange-50/60 flex flex-col transition-colors group/item block text-left"
                      >
                        <span className="text-xs font-bold text-[#0C356A] group-hover/item:text-[#C86218] leading-snug">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase mt-0.5 font-medium">
                          {p.subCategoryTitle}
                        </span>
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full p-2.5 bg-gray-50 hover:bg-[#0C356A] hover:text-white text-xs font-bold text-center text-[#0C356A] transition-colors uppercase tracking-wider cursor-pointer block border-t border-gray-100"
                    >
                      View All Search Results →
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-gray-400">
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Font Sizing Controls */}
          <div
            className="flex items-center gap-1"
            title={`Text Size: ${currentFontSize}px`}
          >
            <span className="text-gray-600 text-xs font-sans select-none">Text</span>
            <button
              onClick={increaseFont}
              disabled={currentFontSize >= 26}
              className="bg-[#0C356A] text-white p-0.5 flex items-center justify-center hover:bg-opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all rounded-xs"
              title={`Increase Font Size (+1px) - Current: ${currentFontSize}px`}
              type="button"
              aria-label="Increase font size"
            >
              <Plus size={12} strokeWidth={3} />
            </button>
            <button
              onClick={decreaseFont}
              disabled={currentFontSize <= 12}
              className="bg-[#0C356A] text-white p-0.5 flex items-center justify-center hover:bg-opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all rounded-xs"
              title={`Decrease Font Size (-1px) - Current: ${currentFontSize}px`}
              type="button"
              aria-label="Decrease font size"
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
            onClick={() => handleLanguageChange("EN")}
            className={`cursor-pointer notranslate ${currentLanguage === "EN" ? "font-bold text-[#C86218]" : ""}`}
            translate="no"
            type="button"
            title="Translate to English"
          >
            English
          </button>
          <span className="text-gray-300 notranslate" translate="no">|</span>
          <button
            onClick={() => handleLanguageChange("HI")}
            className={`cursor-pointer notranslate ${currentLanguage === "HI" ? "font-bold text-[#C86218]" : ""}`}
            translate="no"
            type="button"
            title="Translate to Hindi (हिन्दी)"
          >
            हिन्दी
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <div className="relative" ref={mobileSearchDropdownRef}>
            <form onSubmit={handleSearchSubmit} className="flex items-center font-sans">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onFocus={() => setIsSearchDropdownOpen(true)}
                className="outline-none border border-[#CCCCCC] border-r-0 px-2 text-[11px] h-[26px] w-[90px] rounded-l"
              />
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="bg-[#C86218] text-white h-[26px] px-1.5 border border-[#C86218] rounded-r flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Search"
              >
                <Search size={12} />
              </button>
            </form>

            {/* Mobile Search Dropdown */}
            {isSearchDropdownOpen && searchQuery.trim().length >= 1 && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 text-left">
                <div className="px-2.5 py-1.5 bg-[#f8fafc] border-b border-gray-100 flex items-center justify-between text-[9px] font-bold text-gray-500 uppercase">
                  <span>Products ({liveSearchResults.length})</span>
                  <span className="text-[#C86218] truncate max-w-[80px]">&ldquo;{searchQuery}&rdquo;</span>
                </div>
                {liveSearchResults.length > 0 ? (
                  <div className="max-h-48 overflow-y-auto divide-y divide-gray-50">
                    {liveSearchResults.map((p) => (
                      <Link
                        key={`m-${p.categorySlug}-${p.slug}`}
                        href={`/products/${p.categorySlug}/${p.slug}`}
                        onClick={() => setIsSearchDropdownOpen(false)}
                        className="p-2 hover:bg-orange-50/60 flex flex-col transition-colors block text-left"
                      >
                        <span className="text-[11px] font-bold text-[#0C356A] truncate">
                          {p.name}
                        </span>
                        <span className="text-[9px] text-gray-400 uppercase truncate">
                          {p.subCategoryTitle}
                        </span>
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full p-2 bg-gray-50 hover:bg-[#0C356A] hover:text-white text-[10px] font-bold text-center text-[#0C356A] transition-colors uppercase cursor-pointer block border-t border-gray-100"
                    >
                      View All Results →
                    </button>
                  </div>
                ) : (
                  <div className="p-3 text-center text-[10px] text-gray-400">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Font Sizing Controls */}
          <div
            className="flex items-center gap-1"
            title={`Text Size: ${currentFontSize}px`}
          >
            <span className="text-gray-500 text-[11px] select-none">Text</span>
            <button
              onClick={increaseFont}
              disabled={currentFontSize >= 26}
              className="bg-[#0C356A] text-white p-0.5 rounded-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              title={`Increase Font Size (+1px) - Current: ${currentFontSize}px`}
              type="button"
              aria-label="Increase font size"
            >
              <Plus size={10} strokeWidth={3} />
            </button>
            <button
              onClick={decreaseFont}
              disabled={currentFontSize <= 12}
              className="bg-[#0C356A] text-white p-0.5 rounded-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
              title={`Decrease Font Size (-1px) - Current: ${currentFontSize}px`}
              type="button"
              aria-label="Decrease font size"
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
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[min(700px,calc(100vw-32px))] pt-2">
                    <div className="overflow-hidden rounded-xl border border-[#dce5ef] bg-white shadow-[0_18px_45px_rgba(12,53,106,0.16)] animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between gap-4 bg-[#0C356A] px-4 py-3 text-white">
                        <div>
                          <div className="mb-0.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F4B24D]">
                            <Layers size={12} /> Products
                          </div>
                          <p className="text-xs font-semibold text-white/90">
                            Our Brands | Quality Products | Trusted Solutions
                          </p>
                        </div>
                        <Link
                          href={`/products/${currentBrand.id}`}
                          onClick={() => setOpenDropdown(null)}
                          className="shrink-0 rounded-full border border-white/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white transition hover:border-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#0C356A]"
                        >
                          View all
                        </Link>
                      </div>

                      <div className="border-b border-gray-100 bg-[#fbfcfe] px-4 py-2.5">
                        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-visible">
                          {BRAND_PRODUCTS.map((brand, bIdx) => {
                            const isBrandActive = activeBrandId === brand.id;
                            return (
                              <Link
                                key={brand.id}
                                href={`/products/${brand.id}`}
                                onMouseEnter={() => setActiveBrandId(brand.id)}
                                onClick={() => {
                                  setActiveBrandId(brand.id);
                                  setOpenDropdown(null);
                                }}
                                className={`shrink-0 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all cursor-pointer ${
                                  isBrandActive
                                    ? "border-[#0C356A] bg-[#0C356A] text-white shadow-xs"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-[#C86218] hover:text-[#C86218]"
                                }`}
                              >
                                <span
                                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-extrabold ${
                                    isBrandActive
                                      ? "bg-[#F4B24D] text-[#0C356A]"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {bIdx + 1}
                                </span>
                                <span>{brand.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="px-5 py-4">
                        <div className="mb-2.5 flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#C86218]">
                              Featured Brand
                            </p>
                            <Link
                              href={`/products/${currentBrand.id}`}
                              onClick={() => setOpenDropdown(null)}
                              className="group/bname flex items-center gap-1.5 hover:text-[#C86218] transition-colors"
                            >
                              <h3 className="text-base font-black text-[#0C356A] group-hover/bname:text-[#C86218] transition-colors">
                                {currentBrand.name}
                              </h3>
                              <ArrowRight size={14} className="text-gray-400 group-hover/bname:text-[#C86218] transition-colors" />
                            </Link>
                          </div>
                          <Link
                            href={`/products/${currentBrand.id}`}
                            onClick={() => setOpenDropdown(null)}
                            className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold text-[#C86218] hover:bg-orange-100 transition-colors"
                          >
                            {currentBrand.categories.length} categories →
                          </Link>
                        </div>

                        <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto pr-1 scrollbar-visible">
                          {currentBrand.categories.map((cat, cIdx) => (
                            <Link
                              key={cIdx}
                              href={`/products/${currentBrand.id}#subcat-${cIdx}`}
                              onClick={() => setOpenDropdown(null)}
                              className="group flex items-center justify-between rounded-lg border border-gray-100 bg-[#f8fafc] px-3.5 py-2.5 transition hover:border-[#F4B24D] hover:bg-orange-50"
                            >
                              <div className="min-w-0 pr-2">
                                <span className="block truncate text-[11.5px] font-extrabold leading-snug text-[#0C356A] group-hover:text-[#C86218] transition-colors">
                                  {cat.name}
                                </span>
                                <span className="block text-[9px] text-gray-400 font-medium">
                                  {currentBrand.name}
                                </span>
                              </div>
                              <ChevronRight
                                size={13}
                                className="mt-0.5 shrink-0 text-gray-300 group-hover:text-[#C86218] group-hover:translate-x-0.5 transition-all"
                              />
                            </Link>
                          ))}
                        </div>
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
                          <div className="pl-2 mt-1 flex flex-col gap-2 border-l-2 border-[#C86218]/70 bg-orange-50/40 p-2.5 rounded-r-lg animate-in fade-in duration-150">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase text-[#C86218] tracking-wider">
                                Our Brands &amp; Categories
                              </span>
                              <Link
                                href="/products"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileProductsOpen(false);
                                }}
                                className="text-[10px] font-bold text-[#0C356A] underline"
                              >
                                View All
                              </Link>
                            </div>
                            <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto pr-1">
                              {BRAND_PRODUCTS.map((brand, bIdx) => {
                                const isBrandOpen =
                                  mobileSelectedBrand === brand.id;
                                return (
                                  <div
                                    key={brand.id}
                                    className="overflow-hidden rounded-md border border-gray-200/80 bg-white"
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setMobileSelectedBrand(
                                          isBrandOpen ? null : brand.id,
                                        )
                                      }
                                      className="flex w-full items-center justify-between px-2.5 py-2 text-left text-xs font-bold text-[#0C356A] hover:text-[#C86218]"
                                    >
                                      <div className="flex items-center gap-1.5">
                                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-100 text-[8px] font-extrabold text-[#C86218]">
                                          {bIdx + 1}
                                        </span>
                                        <span>{brand.name}</span>
                                      </div>
                                      <ChevronDown
                                        size={14}
                                        className={`text-gray-400 transition-transform ${
                                          isBrandOpen
                                            ? "rotate-180 text-[#C86218]"
                                            : ""
                                        }`}
                                      />
                                    </button>
                                    {isBrandOpen && (
                                      <div className="flex flex-col gap-1 border-t border-gray-100 bg-gray-50/70 px-2.5 py-1.5">
                                        <Link
                                          href={`/products/${brand.id}`}
                                          onClick={() => {
                                            setMobileMenuOpen(false);
                                            setMobileProductsOpen(false);
                                          }}
                                          className="flex items-center justify-between py-1 text-[11px] font-bold text-[#C86218] hover:underline border-b border-gray-200/60 pb-1.5 mb-1"
                                        >
                                          <span>View all {brand.name}</span>
                                          <ArrowRight size={11} />
                                        </Link>
                                        {brand.categories.map((cat, cIdx) => (
                                          <Link
                                            key={cIdx}
                                            href={`/products/${brand.id}#subcat-${cIdx}`}
                                            onClick={() => {
                                              setMobileMenuOpen(false);
                                              setMobileProductsOpen(false);
                                            }}
                                            className="flex items-center justify-between py-1 text-[11px] font-medium text-gray-600 hover:text-[#C86218]"
                                          >
                                            <span>{cat.name}</span>
                                            <ChevronRight
                                              size={12}
                                              className="text-gray-400"
                                            />
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
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
