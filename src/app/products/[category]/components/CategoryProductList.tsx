"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useCMSStore, CMSProduct } from "@/store/useCMSStore";
import { CategoryEmptyState } from "./CategoryEmptyState";
import { CategoryProductSection } from "./CategoryProductSection";

interface CategoryProductListProps {
  onOpenEnquiry: (productName?: string) => void;
}

export function CategoryProductList({ onOpenEnquiry }: CategoryProductListProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySlug = params?.category as string;
  const searchQuery = (searchParams?.get("search") || "").trim();

  const { products, productCategories } = useCMSStore();
  const category = productCategories?.find((c) => c.slug === categorySlug);

  const subCategoryGroups = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const catProducts = (products || []).filter((p) => {
      if (categorySlug && p.categorySlug !== categorySlug) return false;
      if (!q) return true;
      return (
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.specsText?.toLowerCase().includes(q) ||
        p.subCategoryTitle?.toLowerCase().includes(q)
      );
    });

    const groupMap = new Map<
      string,
      { title: string; coverImage?: string; products: CMSProduct[] }
    >();

    catProducts.forEach((p) => {
      const title = p.subCategoryTitle || "Featured Products";
      const key = title.toLowerCase();
      if (!groupMap.has(key)) {
        groupMap.set(key, {
          title,
          coverImage: p.containerImage || category?.coverImage,
          products: [],
        });
      }
      groupMap.get(key)!.products.push(p);
    });

    return Array.from(groupMap.values());
  }, [products, categorySlug, category, searchQuery]);

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-8">
      {searchQuery && (
        <div className="p-4 sm:p-5 bg-blue-50/80 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#002b5c] bg-white px-2.5 py-0.5 rounded-full border border-blue-100">
              Filtered By Search Keyword
            </span>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              Showing matching results for{" "}
              <span className="font-extrabold text-[#C86218]">&ldquo;{searchQuery}&rdquo;</span> in{" "}
              {category?.name}
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

      {subCategoryGroups.length === 0 ? (
        <CategoryEmptyState searchQuery={searchQuery} categorySlug={categorySlug} />
      ) : (
        subCategoryGroups.map((group, idx) => (
          <CategoryProductSection
            key={idx}
            group={group}
            index={idx}
            categorySlug={categorySlug}
            onOpenEnquiry={onOpenEnquiry}
          />
        ))
      )}
    </div>
  );
}
