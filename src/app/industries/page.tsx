import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import IndustriesPageClient from "./IndustriesPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/industries");
}

export default function Page() {
  return <IndustriesPageClient />;
}
