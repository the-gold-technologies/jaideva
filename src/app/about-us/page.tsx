import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import StructuredData from "@/components/StructuredData";
import AboutUsPageClient from "./AboutUsPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/about-us");
}

export default function Page() {
  return (
    <>
      <StructuredData pageSlug="about-us" endpoint="/api/about-us" />
      <AboutUsPageClient />
    </>
  );
}
