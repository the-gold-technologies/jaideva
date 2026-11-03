import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import StructuredData from "@/components/StructuredData";
import ProductDetailPageClient from "./ProductDetailPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return buildPageMetadata(`/api/products?slug=${encodeURIComponent(params.slug)}`);
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <StructuredData
        pageSlug={`product:${params.slug}`}
        endpoint={`/api/products?slug=${encodeURIComponent(params.slug)}`}
      />
      <ProductDetailPageClient />
    </>
  );
}
