"use client";

import React from "react";
import Link from "next/link";
import { useCMSStore } from "@/store/useCMSStore";
import { CategoryEmptyState } from "./CategoryEmptyState";
import { CategoryProductSection } from "./CategoryProductSection";
import { useCategoryGroups } from "./useCategoryGroups";

interface CategoryProductListProps {
  onOpenEnquiry: (productName?: string) => void;
}

export function CategoryProductList({ onOpenEnquiry }: CategoryProductListProps) {
  const { productCategories } = useCMSStore();
  const { categorySlug, searchQuery, groups } = useCategoryGroups();
  const category = productCategories?.find((c) => c.slug === categorySlug);

  return (
    <div id="category-products" className="flex-1 min-w-0 flex flex-col gap-8 scroll-mt-28">
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

      {groups.length === 0 ? (
        <CategoryEmptyState searchQuery={searchQuery} categorySlug={categorySlug} />
      ) : (
        groups.map((group, idx) => (
          <CategoryProductSection
            key={group.anchorId}
            group={{
              ...group,
              coverImage: group.products[0]?.containerImage || category?.coverImage,
            }}
            index={idx}
            categorySlug={categorySlug}
            onOpenEnquiry={onOpenEnquiry}
          />
        ))
      )}
    </div>
  );
}
