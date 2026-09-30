"use client";

import React from "react";
import Link from "next/link";
import { Droplet } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface CategoryEmptyStateProps {
  searchQuery?: string;
  categorySlug: string;
}

export function CategoryEmptyState({
  searchQuery,
  categorySlug,
}: CategoryEmptyStateProps) {
  const { productCategories } = useCMSStore();
  const category = productCategories?.find((c) => c.slug === categorySlug);
  const categoryName = category?.name || "products";

  if (searchQuery) {
    return (
      <div className="py-16 px-6 bg-white rounded-2xl border border-gray-200 text-center max-w-md mx-auto my-8 w-full shadow-sm">
        <h3 className="text-base font-bold text-[#002b5c] uppercase">
          No matching products found
        </h3>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          We couldn&apos;t find any {categoryName} matching &ldquo;{searchQuery}&rdquo;.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link
            href={`/products/${categorySlug}`}
            className="px-4 py-2 bg-[#C86218] hover:bg-[#a74f10] text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
          >
            Clear Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-5">
        <Droplet size={28} className="text-gray-400" />
      </div>
      <p className="text-gray-500 text-sm">
        No products found in this category.
      </p>
    </div>
  );
}
