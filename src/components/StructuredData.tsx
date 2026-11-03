import { buildPageJsonLd } from "@/lib/serverSEO";

interface StructuredDataProps {
  /** Same key as the page's <SEOMeta pageSlug> ("home", "blogs/<slug>", "product:<slug>", …) */
  pageSlug: string;
  /** CMS endpoint that returns `{ success, data, seo }` for this page */
  endpoint: string;
}

/** Server component: renders the page's JSON-LD into the initial HTML. */
export default async function StructuredData({ pageSlug, endpoint }: StructuredDataProps) {
  const jsonLd = await buildPageJsonLd(pageSlug, endpoint);
  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      // Escape "<" so CMS text can never close the script tag early
      dangerouslySetInnerHTML={{ __html: jsonLd.replace(/</g, "\\u003c") }}
    />
  );
}
