import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import StructuredData from "@/components/StructuredData";
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

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <StructuredData
        pageSlug={`blogs/${params.slug}`}
        endpoint={`/api/blogs?slug=${encodeURIComponent(params.slug)}`}
      />
      <BlogDetailPageClient />
    </>
  );
}
