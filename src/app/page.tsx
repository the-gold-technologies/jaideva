import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import HomePageClient from "./HomePageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/home", { isHome: true });
}

export default function Page() {
  return <HomePageClient />;
}
