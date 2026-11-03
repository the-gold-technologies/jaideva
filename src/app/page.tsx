import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import StructuredData from "@/components/StructuredData";
import HomePageClient from "./HomePageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/home", { isHome: true });
}

export default function Page() {
  return (
    <>
      <StructuredData pageSlug="home" endpoint="/api/home" />
      <HomePageClient />
    </>
  );
}
