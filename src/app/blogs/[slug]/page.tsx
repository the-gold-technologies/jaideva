import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import BlogDetailPageClient from "./BlogDetailPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return buildPageMetadata(`/api/blogs?slug=${encodeURIComponent(params.slug)}`, {
    ogType: "article",
  });
}

export default function Page() {
  return <BlogDetailPageClient />;
}
