import type { Metadata } from "next";
import { getApiBaseUrl, type GlobalSEO, type PageSEO } from "@/store/useCMSStore";

/**
 * Server-side SEO helpers. These run inside `generateMetadata` so the page <title>,
 * description, canonical and robots tags are present in the initial HTML that
 * search engines receive (the page bodies themselves are still client-rendered).
 */

async function fetchCMS(path: string): Promise<any | null> {
  try {
    const res = await fetch(`${getApiBaseUrl()}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.success ? json : null;
  } catch (err) {
    console.error(`SEO metadata fetch failed for ${path}:`, err);
    return null;
  }
}

export async function getGlobalSEO(): Promise<GlobalSEO | null> {
  const json = await fetchCMS("/api/seo");
  return json?.data || null;
}

function extractVerificationToken(raw?: string | null): string {
  const token = (raw || "").trim();
  return token.match(/content=["']([^"']+)["']/i)?.[1] || token;
}

/** Site-wide metadata used by the root layout. */
export async function buildRootMetadata(): Promise<Metadata> {
  const global = await getGlobalSEO();
  const metadata: Metadata = {};
  if (!global) return metadata;

  if (global.siteTitle) {
    metadata.title = global.siteTitle;
    metadata.openGraph = { siteName: global.siteTitle };
  }
  if (global.siteDescription) metadata.description = global.siteDescription;
  if (global.favicon) {
    metadata.icons = { icon: global.favicon, shortcut: global.favicon, apple: global.favicon };
  }
  const verification = extractVerificationToken(global.searchConsoleId);
  if (verification) metadata.verification = { google: verification };

  return metadata;
}

function seoToMetadata(
  seo: PageSEO | null,
  global: GlobalSEO | null,
  options: { isHome?: boolean; ogType?: "website" | "article" } = {},
): Metadata {
  const title = seo?.metaTitle || (options.isHome ? global?.siteTitle || "" : "");
  const description = seo?.metaDescription || (options.isHome ? global?.siteDescription || "" : "");
  const canonical = (seo?.canonicalUrl || "").trim();
  const image = global?.logo || "";

  const metadata: Metadata = {};
  if (title) metadata.title = title;
  if (description) metadata.description = description;
  if (seo?.targetKeywords) metadata.keywords = seo.targetKeywords;
  if (canonical) metadata.alternates = { canonical };
  if (typeof seo?.noIndex === "boolean") {
    metadata.robots = { index: !seo.noIndex, follow: !seo.noIndex };
  }

  metadata.openGraph = {
    type: options.ogType || "website",
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(canonical ? { url: canonical } : {}),
    ...(global?.siteTitle ? { siteName: global.siteTitle } : {}),
    ...(image ? { images: [image] } : {}),
  };
  metadata.twitter = {
    card: "summary_large_image",
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(image ? { images: [image] } : {}),
  };

  return metadata;
}

/**
 * Builds metadata for a CMS endpoint that returns `{ success, data, seo }`
 * (e.g. `/api/about-us`, `/api/products?slug=x`, `/api/blogs?slug=x`).
 */
export async function buildPageMetadata(
  endpoint: string,
  options: { isHome?: boolean; ogType?: "website" | "article" } = {},
): Promise<Metadata> {
  const [json, global] = await Promise.all([fetchCMS(endpoint), getGlobalSEO()]);
  return seoToMetadata(json?.seo || null, global, options);
}
