import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import StructuredData from "@/components/StructuredData";
import BrandsPageClient from "./BrandsPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/brands");
}

export default function Page() {
  return (
    <>
      <StructuredData pageSlug="brands" endpoint="/api/brands" />
      <BrandsPageClient />
    </>
  );
}
