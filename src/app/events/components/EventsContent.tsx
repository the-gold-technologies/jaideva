"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Tag,
  Sparkles,
  Camera,
} from "lucide-react";
import { useCMSStore, getHeadingTag } from "@/store/useCMSStore";

// Helper to determine contextual badge tag for each event photo
function getEventBadge(item: any): string {
  if (item.category) return item.category;
  if (item.badge) return item.badge;
  const title = (item.title || item.altText || "").toLowerCase();
  if (title.includes("award")) return "Awards";
  if (title.includes("launch")) return "Product Launch";
  if (
    title.includes("excon") ||
    title.includes("conmac") ||
    title.includes("stall") ||
    title.includes("exhibition")
  )
    return "Exhibition";
  if (title.includes("meet") || title.includes("discussion") || title.includes("oem"))
    return "Stakeholders";
  if (
    title.includes("army") ||
    title.includes("laboratory") ||
    title.includes("inauguration")
  )
    return "Defence Lab";
  if (title.includes("road safety") || title.includes("safety"))
    return "CSR & Safety";
  if (title.includes("world road")) return "Global Summit";
  return "Corporate";
}

export default function EventsContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { pages, pageSEO } = useCMSStore();

  const cmsContent = pages["events"]?.EventsContent;
  const cmsGallery = pages["events"]?.EventsGallery;

  const title = cmsContent?.title || "";
  const intro = cmsContent?.introText || "";
  const rawItems = cmsGallery?.galleryItems || [];
  const HeadingTag = getHeadingTag(pageSEO["events"]?.headingOptions, "h1");

  // Enrich items with computed badge and index
  const enrichedItems = useMemo(() => {
    return rawItems.map((item: any, idx: number) => ({
      ...item,
      badge: getEventBadge(item),
      originalIdx: idx,
    }));
  }, [rawItems]);

  // Available filter categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    enrichedItems.forEach((i: any) => set.add(i.badge));
    return ["All", ...Array.from(set)];
  }, [enrichedItems]);

  // Filtered items
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return enrichedItems;
    return enrichedItems.filter((i: any) => i.badge === activeCategory);
  }, [enrichedItems, activeCategory]);

  // Items to display: initial 7 collage items or all if expanded / count <= 7
  const displayedItems = useMemo(() => {
    if (isExpanded || filteredItems.length <= 7) {
      return filteredItems;
    }
    return filteredItems.slice(0, 7);
  }, [filteredItems, isExpanded]);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, showNext, showPrev]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex]);

  // Render a single photo card inside desktop balanced flex containers
  const renderCard = (item: any, globalIndex: number) => {
    return (
      <div
        key={item.id || globalIndex}
        onClick={() => openLightbox(globalIndex)}
        className="w-full h-full relative group rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-black/5 bg-gray-100"
      >
        {/* Top-Left Category Pill Badge (exact look of INDOOR pill in reference) */}
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase border border-white/20 shadow-sm">
            {item.badge}
          </span>
        </div>

        {/* Full coverage image */}
        <img
          src={item.image}
          alt={item.altText || item.title || "Event Image"}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient hover overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-5">
          <p className="text-white text-xs sm:text-sm font-semibold line-clamp-2 drop-shadow-md">
            {item.title}
          </p>
          <div className="mt-2 flex items-center text-white/85 text-xs gap-1.5">
            <Maximize2 size={13} className="text-[#F4B24D]" />
            <span className="text-[11px] font-medium tracking-wide">View in Lightbox</span>
          </div>
        </div>
      </div>
    );
  };

  // Render cards for mobile / tablet with balanced aspect ratios
  const renderResponsiveCard = (item: any, globalIndex: number, isSpan2: boolean = false) => {
    return (
      <div
        key={item.id || globalIndex}
        onClick={() => openLightbox(globalIndex)}
        className={`w-full relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 border border-black/5 bg-gray-100 ${
          isSpan2 ? "sm:col-span-2" : ""
        }`}
      >
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase border border-white/20">
            {item.badge}
          </span>
        </div>
        <div
          className={`w-full ${
            isSpan2 ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3]"
          } overflow-hidden bg-gray-100 relative`}
        >
          <img
            src={item.image}
            alt={item.altText || item.title || "Event Image"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
            <p className="text-white text-xs font-semibold line-clamp-2">{item.title}</p>
          </div>
        </div>
      </div>
    );
  };

  // Partition all displayed items into 3-column blocks where EVERY block has a 100% FLAT BOTTOM
  const renderDesktopCollage = () => {
    const blocks: React.ReactNode[] = [];
    const total = displayedItems.length;

    // Case 1: Standard 25 items or >= 7 items
    if (total >= 7) {
      // Block 1: Signature 7-Photo Collage (Exact match to Reference Screenshot 2)
      // 2 in Col 1 | 3 in Col 2 | 2 in Col 3 -> Total height is uniform across all 3 columns!
      const block1Items = displayedItems.slice(0, 7);
      blocks.push(
        <div
          key="desktop-block-1"
          className="grid grid-cols-3 gap-5 md:gap-6 md:h-[660px] lg:h-[700px] mb-6"
        >
          {/* Column 1: 2 items (landscape top, portrait bottom) */}
          <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
            <div className="flex-[4.2] min-h-0">{renderCard(block1Items[0], 0)}</div>
            <div className="flex-[5.8] min-h-0">{renderCard(block1Items[1], 1)}</div>
          </div>

          {/* Column 2: 3 items (stacked photos) */}
          <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
            <div className="flex-[3.5] min-h-0">{renderCard(block1Items[2], 2)}</div>
            <div className="flex-[3.5] min-h-0">{renderCard(block1Items[3], 3)}</div>
            <div className="flex-[3.0] min-h-0">{renderCard(block1Items[4], 4)}</div>
          </div>

          {/* Column 3: 2 items (tall portrait with badge on top, landscape bottom) */}
          <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
            <div className="flex-[5.8] min-h-0">{renderCard(block1Items[5], 5)}</div>
            <div className="flex-[4.2] min-h-0">{renderCard(block1Items[6], 6)}</div>
          </div>
        </div>
      );

      // Remaining items after Block 1 (items 7 to total)
      // 25 - 7 = 18 items -> exactly three 6-item blocks (2 | 2 | 2)!
      // In each 6-item block: Col 1 has 2, Col 2 has 2, Col 3 has 2 -> PERFECTLY BALANCED FLAT BOTTOM!
      let currentIdx = 7;
      let blockNum = 2;

      while (currentIdx < total) {
        const remaining = total - currentIdx;

        if (remaining >= 6) {
          const chunk = displayedItems.slice(currentIdx, currentIdx + 6);
          const start = currentIdx;
          blocks.push(
            <div
              key={`desktop-block-${blockNum}`}
              className="grid grid-cols-3 gap-5 md:gap-6 md:h-[580px] lg:h-[620px] mb-6"
            >
              {/* Column 1: 2 items */}
              <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
                <div className="flex-[5.4] min-h-0">{renderCard(chunk[0], start)}</div>
                <div className="flex-[4.6] min-h-0">{renderCard(chunk[1], start + 1)}</div>
              </div>

              {/* Column 2: 2 items */}
              <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
                <div className="flex-[4.6] min-h-0">{renderCard(chunk[2], start + 2)}</div>
                <div className="flex-[5.4] min-h-0">{renderCard(chunk[3], start + 3)}</div>
              </div>

              {/* Column 3: 2 items */}
              <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
                <div className="flex-[5.0] min-h-0">{renderCard(chunk[4], start + 4)}</div>
                <div className="flex-[5.0] min-h-0">{renderCard(chunk[5], start + 5)}</div>
              </div>
            </div>
          );
          currentIdx += 6;
          blockNum += 1;
        } else if (remaining === 5) {
          const chunk = displayedItems.slice(currentIdx, currentIdx + 5);
          const start = currentIdx;
          blocks.push(
            <div
              key={`desktop-block-${blockNum}`}
              className="grid grid-cols-3 gap-5 md:gap-6 md:h-[520px] mb-6"
            >
              <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
                <div className="flex-1 min-h-0">{renderCard(chunk[0], start)}</div>
                <div className="flex-1 min-h-0">{renderCard(chunk[1], start + 1)}</div>
              </div>
              <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
                <div className="flex-1 min-h-0">{renderCard(chunk[2], start + 2)}</div>
                <div className="flex-1 min-h-0">{renderCard(chunk[3], start + 3)}</div>
              </div>
              <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
                <div className="flex-1 min-h-0">{renderCard(chunk[4], start + 4)}</div>
              </div>
            </div>
          );
          currentIdx += 5;
        } else if (remaining === 4) {
          // 4 items in a 2x2 grid (flat bottom!)
          const chunk = displayedItems.slice(currentIdx, currentIdx + 4);
          const start = currentIdx;
          blocks.push(
            <div key={`desktop-block-${blockNum}`} className="grid grid-cols-2 gap-5 md:gap-6 mb-6">
              {chunk.map((item: any, i: number) => (
                <div key={item.id || i} className="aspect-[16/10]">
                  {renderCard(item, start + i)}
                </div>
              ))}
            </div>
          );
          currentIdx += 4;
        } else if (remaining === 3) {
          // 3 items in 3 equal columns (flat bottom!)
          const chunk = displayedItems.slice(currentIdx, currentIdx + 3);
          const start = currentIdx;
          blocks.push(
            <div key={`desktop-block-${blockNum}`} className="grid grid-cols-3 gap-5 md:gap-6 mb-6">
              {chunk.map((item: any, i: number) => (
                <div key={item.id || i} className="aspect-[4/3]">
                  {renderCard(item, start + i)}
                </div>
              ))}
            </div>
          );
          currentIdx += 3;
        } else if (remaining === 2) {
          // 2 items in 2 equal columns (flat bottom!)
          const chunk = displayedItems.slice(currentIdx, currentIdx + 2);
          const start = currentIdx;
          blocks.push(
            <div key={`desktop-block-${blockNum}`} className="grid grid-cols-2 gap-5 md:gap-6 mb-6">
              {chunk.map((item: any, i: number) => (
                <div key={item.id || i} className="aspect-[16/10]">
                  {renderCard(item, start + i)}
                </div>
              ))}
            </div>
          );
          currentIdx += 2;
        } else if (remaining === 1) {
          // 1 final item spans 100% full width (col-span-3) - NO empty spaces!
          const item = displayedItems[currentIdx];
          const start = currentIdx;
          blocks.push(
            <div key={`desktop-block-${blockNum}`} className="w-full mb-6">
              <div className="aspect-[21/9] w-full">{renderCard(item, start)}</div>
            </div>
          );
          currentIdx += 1;
        }
      }
    } else {
      // Total < 7 (for filtered categories with small item counts)
      if (total === 6) {
        blocks.push(
          <div key="dt-small-6" className="grid grid-cols-3 gap-5 md:gap-6 md:h-[580px] mb-6">
            <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
              <div className="flex-1 min-h-0">{renderCard(displayedItems[0], 0)}</div>
              <div className="flex-1 min-h-0">{renderCard(displayedItems[1], 1)}</div>
            </div>
            <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
              <div className="flex-1 min-h-0">{renderCard(displayedItems[2], 2)}</div>
              <div className="flex-1 min-h-0">{renderCard(displayedItems[3], 3)}</div>
            </div>
            <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
              <div className="flex-1 min-h-0">{renderCard(displayedItems[4], 4)}</div>
              <div className="flex-1 min-h-0">{renderCard(displayedItems[5], 5)}</div>
            </div>
          </div>
        );
      } else if (total === 5) {
        blocks.push(
          <div key="dt-small-5" className="grid grid-cols-3 gap-5 md:gap-6 md:h-[520px] mb-6">
            <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
              <div className="flex-1 min-h-0">{renderCard(displayedItems[0], 0)}</div>
              <div className="flex-1 min-h-0">{renderCard(displayedItems[1], 1)}</div>
            </div>
            <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
              <div className="flex-1 min-h-0">{renderCard(displayedItems[2], 2)}</div>
              <div className="flex-1 min-h-0">{renderCard(displayedItems[3], 3)}</div>
            </div>
            <div className="flex flex-col gap-5 md:gap-6 h-full min-h-0">
              <div className="flex-1 min-h-0">{renderCard(displayedItems[4], 4)}</div>
            </div>
          </div>
        );
      } else if (total === 4) {
        blocks.push(
          <div key="dt-small-4" className="grid grid-cols-2 gap-5 md:gap-6 mb-6">
            {displayedItems.map((item: any, i: number) => (
              <div key={item.id || i} className="aspect-[16/10]">
                {renderCard(item, i)}
              </div>
            ))}
          </div>
        );
      } else if (total === 3) {
        blocks.push(
          <div key="dt-small-3" className="grid grid-cols-3 gap-5 md:gap-6 mb-6">
            {displayedItems.map((item: any, i: number) => (
              <div key={item.id || i} className="aspect-[4/3]">
                {renderCard(item, i)}
              </div>
            ))}
          </div>
        );
      } else if (total === 2) {
        blocks.push(
          <div key="dt-small-2" className="grid grid-cols-2 gap-5 md:gap-6 mb-6">
            {displayedItems.map((item: any, i: number) => (
              <div key={item.id || i} className="aspect-[16/10]">
                {renderCard(item, i)}
              </div>
            ))}
          </div>
        );
      } else if (total === 1) {
        blocks.push(
          <div key="dt-small-1" className="w-full mb-6">
            <div className="aspect-[21/9] w-full">{renderCard(displayedItems[0], 0)}</div>
          </div>
        );
      }
    }

    return blocks;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 pt-10 md:pt-14 pb-16 md:pb-24">
      {/* Main Section Header */}
      {title && (
        <div className="mb-6">
          <HeadingTag className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight uppercase">
            {title}
          </HeadingTag>
          <div className="w-20 h-1 bg-[#002b5c] mt-2"></div>
        </div>
      )}

      {/* Intro Description */}
      {intro && (
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-8 max-w-5xl font-sans">
          {intro}
        </p>
      )}

      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setIsExpanded(false);
                }}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#002b5c] text-white shadow-md shadow-[#002b5c]/20 font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
                {cat === "All" && ` (${enrichedItems.length})`}
              </button>
            );
          })}
        </div>
      )}

      {/* Photo Gallery Collage Layout */}
      {displayedItems.length > 0 ? (
        <>
          {/* Desktop Layout (Strictly balanced 3-column blocks with 100% FLAT bottom line) */}
          <div className="hidden md:block w-full">{renderDesktopCollage()}</div>

          {/* Mobile & Tablet Layout (Balanced 2-column or 1-column grid with full span on odd trailing item) */}
          <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-4">
            {displayedItems.map((item: any, idx: number) => {
              const isLastOdd =
                displayedItems.length % 2 !== 0 && idx === displayedItems.length - 1;
              return renderResponsiveCard(item, idx, isLastOdd);
            })}
          </div>

          {/* Bottom Controls Bar: Explore All / Show Less Toggle & Counter */}
          {filteredItems.length > 7 && (
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-medium">
                <Sparkles size={16} className="text-[#C86218]" />
                <span>
                  Showing{" "}
                  <strong className="text-[#002b5c]">{displayedItems.length}</strong> of{" "}
                  <strong className="text-[#002b5c]">{filteredItems.length}</strong> event moments
                </span>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#002b5c] text-white text-xs sm:text-sm font-semibold hover:bg-[#003d82] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{isExpanded ? "Show Less" : `Explore All (${filteredItems.length})`}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
          <Tag className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No events found in this category.</p>
          <button
            onClick={() => setActiveCategory("All")}
            className="mt-3 text-sm font-semibold text-[#002b5c] underline cursor-pointer"
          >
            Show all photos
          </button>
        </div>
      )}

      {/* Fullscreen Lightbox Modal with Slideshow Controls */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#F4B24D] text-xs font-semibold uppercase tracking-wider">
                  {filteredItems[lightboxIndex].badge}
                </span>
                <span className="text-gray-400 text-xs font-medium">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Image Area with Previous / Next Arrows */}
            <div className="relative max-h-[75vh] min-h-[300px] md:min-h-[480px] bg-black flex items-center justify-center overflow-hidden select-none">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={
                  filteredItems[lightboxIndex].altText ||
                  filteredItems[lightboxIndex].title ||
                  "Event Photo"
                }
                className="w-full h-auto max-h-[75vh] object-contain select-none pointer-events-none"
              />

              {/* Prev Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={showPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 cursor-pointer z-10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* Next Button */}
              {filteredItems.length > 1 && (
                <button
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition hover:scale-110 cursor-pointer z-10"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Modal Bottom Caption */}
            {filteredItems[lightboxIndex].title && (
              <div className="px-6 py-4 bg-black/70 border-t border-white/10">
                <p className="text-white text-sm md:text-base font-medium">
                  {filteredItems[lightboxIndex].title}
                </p>
                {filteredItems[lightboxIndex].altText &&
                  filteredItems[lightboxIndex].altText !==
                    filteredItems[lightboxIndex].title && (
                    <p className="text-gray-400 text-xs mt-1">
                      {filteredItems[lightboxIndex].altText}
                    </p>
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
