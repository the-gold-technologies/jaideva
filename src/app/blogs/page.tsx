import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import BlogsPageClient from "./BlogsPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/blogs");
}

export default function Page() {
  return <BlogsPageClient />;
}
