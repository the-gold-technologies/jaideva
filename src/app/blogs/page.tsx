import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import StructuredData from "@/components/StructuredData";
import BlogsPageClient from "./BlogsPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/blogs");
}

export default function Page() {
  return (
    <>
      <StructuredData pageSlug="blogs" endpoint="/api/blogs" />
      <BlogsPageClient />
    </>
  );
}
