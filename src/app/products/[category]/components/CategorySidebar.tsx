"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Layers, Droplet, Phone, ChevronRight } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface CategorySidebarProps {
  activeSection: number;
  onSelectSection: (index: number) => void;
  onOpenEnquiry?: () => void;
}

export function CategorySidebar({
  activeSection,
  onSelectSection,
  onOpenEnquiry,
}: CategorySidebarProps) {
  const params = useParams();
  const categorySlug = params?.category as string;
  const { productCategories, products } = useCMSStore();

  const category = productCategories?.find((c) => c.slug === categorySlug);

  const subCategoryGroups = useMemo(() => {
    if (!products) return [];
    const catProducts = products.filter((p) => !categorySlug || p.categorySlug === categorySlug);
    const groupMap = new Map<string, { title: string; count: number }>();
    catProducts.forEach((p) => {
      const title = p.subCategoryTitle || "Featured Products";
      const key = title.toLowerCase();
      if (!groupMap.has(key)) {
        groupMap.set(key, { title, count: 0 });
      }
      groupMap.get(key)!.count += 1;
    });
    return Array.from(groupMap.values());
  }, [products, categorySlug]);

  return (
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
            {category?.name}
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
              onClick={() => onSelectSection(idx)}
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
                {group.count}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* CTA Quote Button */}
      <button
        type="button"
        onClick={onOpenEnquiry}
        className="w-full bg-[#C86218] hover:bg-[#a74f10] text-white text-[11px] font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-orange-900/20 cursor-pointer"
      >
        <Phone size={13} />
        Request a Quote
      </button>

      {/* Need Help Card */}
      <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
          Need help?
        </p>
        <p className="text-xs text-gray-600 leading-relaxed">
          Our technical team is available to help you select the right lubricant for your
          application.
        </p>
        <Link
          href="/contact-us"
          className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#002b5c] hover:text-[#C86218] transition-colors uppercase tracking-wide"
        >
          Contact Us <ChevronRight size={11} />
        </Link>
      </div>
    </aside>
  );
}
