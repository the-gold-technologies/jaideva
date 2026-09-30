"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Droplet } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

export function ProductSubCategoryNav() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const productSlug = params?.slug as string;

  const { productDetails, products, productCategories } = useCMSStore();
  const product =
    productDetails[productSlug] ||
    products?.find((p) => p.slug === productSlug);

  const activeCategorySlug = product?.categorySlug || categorySlug;
  const category = productCategories?.find(
    (c) => c.slug === activeCategorySlug,
  );

  const subCategoryList = useMemo(() => {
    if (!products) return [];
    const catProducts = products.filter(
      (p) => !activeCategorySlug || p.categorySlug === activeCategorySlug,
    );
    const titles = Array.from(
      new Set(
        catProducts
          .map((p) => p.subCategoryTitle)
          .filter((t): t is string => Boolean(t)),
      ),
    );
    return titles.map((title, idx) => ({
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      index: idx,
    }));
  }, [products, activeCategorySlug]);

  if (!subCategoryList || subCategoryList.length === 0) return null;

  const currentGroupTitle =
    product?.subCategoryTitle || product?.subtitle || category?.name;

  return (
    <div className="mt-8 pt-2">
      <div className="border-t border-gray-200">
        {Array.from({
          length: Math.ceil(subCategoryList.length / 4),
        }).map((_, rIdx) => {
          const rowItems = subCategoryList.slice(rIdx * 4, rIdx * 4 + 4);
          return (
            <div
              key={rIdx}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 items-center py-5 border-b border-gray-200"
            >
              {rowItems.map((subGroup, cIdx) => {
                const isCurrentGroup = Boolean(
                  currentGroupTitle &&
                  subGroup.title.trim().toLowerCase() ===
                    currentGroupTitle.trim().toLowerCase(),
                );
                return (
                  <Link
                    key={cIdx}
                    href={`/products/${category?.slug || activeCategorySlug}#subcat-${subGroup.index !== undefined ? subGroup.index : rIdx * 4 + cIdx}`}
                    className="flex items-center gap-3.5 group transition-colors py-1.5"
                  >
                    <Droplet
                      size={21}
                      className={`shrink-0 transition-colors ${
                        isCurrentGroup
                          ? "text-[#C86218] fill-[#C86218]"
                          : "text-[#475569] fill-[#475569] group-hover:text-[#C86218] group-hover:fill-[#C86218]"
                      }`}
                    />
                    <span
                      className={`text-sm md:text-[15px] font-normal uppercase tracking-normal leading-relaxed transition-colors ${
                        isCurrentGroup
                          ? "text-[#C86218] font-semibold"
                          : "text-[#334155] group-hover:text-[#C86218]"
                      }`}
                    >
                      {subGroup.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
