import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import CategoryPageClient from "./CategoryPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  return buildPageMetadata(`/api/products?category=${encodeURIComponent(params.category)}`);
}

export default function Page() {
  return <CategoryPageClient />;
}
