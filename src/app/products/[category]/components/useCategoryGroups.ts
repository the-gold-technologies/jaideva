"use client";

import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useCMSStore } from "@/store/useCMSStore";
import { groupProductsBySubCategory, matchesProductSearch } from "@/lib/productGroups";

/**
 * Sub-category groups for the current category page, honouring the `?search=` filter.
 * Shared by the sidebar and the product list so both always show the same groups.
 */
export function useCategoryGroups() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categorySlug = params?.category as string;
  const searchQuery = (searchParams?.get("search") || "").trim();
  const { products } = useCMSStore();

  const groups = useMemo(() => {
    const catProducts = (products || []).filter(
      (p) => p.categorySlug === categorySlug && matchesProductSearch(p, searchQuery),
    );
    return groupProductsBySubCategory(catProducts);
  }, [products, categorySlug, searchQuery]);

  return { categorySlug, searchQuery, groups };
}
