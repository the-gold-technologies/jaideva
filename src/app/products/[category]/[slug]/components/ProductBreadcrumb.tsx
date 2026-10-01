"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCMSStore } from "@/store/useCMSStore";

export function ProductBreadcrumb() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const productSlug = params?.slug as string;

  const { productDetails, products, productCategories } = useCMSStore();
  const product = productDetails[productSlug] || products?.find((p) => p.slug === productSlug);

  const activeCategorySlug = product?.categorySlug || categorySlug;
  const category = productCategories?.find((c) => c.slug === activeCategorySlug);

  if (!product) return null;

  return (
    <section className="bg-white py-4 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-xs md:text-sm text-gray-600 flex items-center gap-2 font-medium flex-wrap">
        <Link href="/" className="text-[#337ab7] hover:underline">
          Home
        </Link>
        {category && (
          <>
            <span className="text-gray-400">/</span>
            <Link href={`/products/${category.slug}`} className="text-[#337ab7] hover:underline">
              {category.name}
            </Link>
          </>
        )}
        <span className="text-gray-400">/</span>
        <span className="text-[#C86218] font-semibold">{product.name}</span>
      </div>
    </section>
  );
}
