import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import StructuredData from "@/components/StructuredData";
import CategoryPageClient from "./CategoryPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  return buildPageMetadata(`/api/products?category=${encodeURIComponent(params.category)}`);
}

export default function Page({ params }: { params: { category: string } }) {
  return (
    <>
      <StructuredData
        pageSlug={`products/${params.category}`}
        endpoint={`/api/products?category=${encodeURIComponent(params.category)}`}
      />
      <CategoryPageClient />
    </>
  );
}
