import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import ProductDetailPageClient from "./ProductDetailPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return buildPageMetadata(`/api/products?slug=${encodeURIComponent(params.slug)}`);
}

export default function Page() {
  return <ProductDetailPageClient />;
}
