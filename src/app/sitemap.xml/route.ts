import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/store/useCMSStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Dynamically determine origin from request host or environment variable
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto =
    request.headers.get("x-forwarded-proto") ||
    (host && host.includes("localhost") ? "http" : "https");
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || (host ? `${proto}://${host}` : "")).replace(
    /\/$/,
    "",
  );

  try {
    const apiUrl = getApiBaseUrl();

    // 1. Fetch Global SEO & Sitemap Directives from CMS
    const seoRes = await fetch(`${apiUrl}/api/seo`, {
      cache: "no-store",
    });
    const seoJson = seoRes.ok ? await seoRes.json() : null;
    const globalSEO = seoJson?.data;

    // Check if sitemap is disabled in CMS
    if (globalSEO && globalSEO.sitemapEnabled === false) {
      return new NextResponse("Sitemap generation is disabled in CMS", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // Check if custom uploaded XML file is provided in CMS
    // (only a real sitemap — <urlset> or <sitemapindex> — is served; any other XML is ignored)
    const customSitemap = (globalSEO?.sitemapCustomContent || "").trim();
    if (/<(urlset|sitemapindex)[\s>]/i.test(customSitemap)) {
      return new NextResponse(customSitemap, {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }

    // 2. Dynamic XML compilation
    type SitemapEntry = { loc: string; lastmod: string; changefreq: string; priority: string };
    const urlMap = new Map<string, SitemapEntry>();

    const toDate = (value?: string) => (value ? String(value).split("T")[0] : "");
    const toUrl = (path: string) => {
      const cleanPath = path.startsWith("/") ? path : `/${path}`;
      return cleanPath === "/" ? origin : `${origin}${cleanPath}`;
    };

    // CMS Page records keyed by slug — used for noIndex / draft exclusion and lastmod only.
    // (Page rows are never added as URLs on their own: a Page slug without a website route would 404.)
    const pageBySlug = new Map<string, any>();
    try {
      const pagesRes = await fetch(`${apiUrl}/api/seo?type=pages`, { cache: "no-store" });
      if (pagesRes.ok) {
        const pagesJson = await pagesRes.json();
        const cmsPages = Array.isArray(pagesJson?.data) ? pagesJson.data : [];
        for (const page of cmsPages) {
          if (page?.slug) pageBySlug.set(page.slug, page);
        }
      }
    } catch (e) {
      console.error("Error fetching CMS pages for sitemap:", e);
    }

    const isExcluded = (cmsSlug: string) => {
      const page = pageBySlug.get(cmsSlug);
      return Boolean(
        page && (page.noIndex === true || (page.visibility && page.visibility !== "published")),
      );
    };

    const addUrl = (
      path: string,
      cmsSlug: string,
      lastmod: string,
      changefreq: string,
      priority: string,
    ) => {
      if (isExcluded(cmsSlug)) return;
      const page = pageBySlug.get(cmsSlug);
      const loc = toUrl(path);
      urlMap.set(loc, {
        loc,
        lastmod: lastmod || toDate(page?.updatedAt),
        changefreq,
        priority,
      });
    };

    // Static website routes (CMS slug -> path). `/products` is omitted: it only redirects to a category.
    addUrl("/", "home", "", "daily", "1.0");
    addUrl("/about-us", "about-us", "", "weekly", "0.8");
    addUrl("/brands", "brands", "", "weekly", "0.9");
    addUrl("/industries", "industries", "", "weekly", "0.9");
    addUrl("/events", "events", "", "weekly", "0.7");
    addUrl("/blogs", "blogs", "", "daily", "0.8");
    addUrl("/contact-us", "contact-us", "", "weekly", "0.8");
    addUrl("/privacy-policy", "privacy-policy", "", "monthly", "0.5");

    // 3. Dynamic Products & Categories from CMS
    try {
      const prodRes = await fetch(`${apiUrl}/api/products`, {
        cache: "no-store",
      });
      if (prodRes.ok) {
        const prodJson = await prodRes.json();
        const categories = prodJson?.data?.categories || [];
        const products = prodJson?.data?.products || [];

        categories.forEach((cat: any) => {
          if (cat?.slug) {
            const slug = `products/${cat.slug}`;
            addUrl(`/${slug}`, slug, toDate(cat.updatedAt), "weekly", "0.8");
          }
        });

        products.forEach((prod: any) => {
          if (prod?.categorySlug && prod?.slug) {
            // Product-level noIndex lives on the Product record
            if (prod.noIndex === true) return;
            const slug = `products/${prod.categorySlug}/${prod.slug}`;
            addUrl(`/${slug}`, slug, toDate(prod.updatedAt), "weekly", "0.7");
          }
        });
      }
    } catch (e) {
      console.error("Error fetching products for sitemap:", e);
    }

    // 4. Dynamic Blog Articles from CMS
    try {
      const blogRes = await fetch(`${apiUrl}/api/blogs`, {
        cache: "no-store",
      });
      if (blogRes.ok) {
        const blogJson = await blogRes.json();
        const blogList = Array.isArray(blogJson?.data?.blogs) ? blogJson.data.blogs : [];

        blogList.forEach((b: any) => {
          if (b?.slug && b.isPublished !== false) {
            const slug = `blogs/${b.slug}`;
            addUrl(`/${slug}`, slug, toDate(b.updatedAt), "weekly", "0.7");
          }
        });
      }
    } catch (e) {
      console.error("Error fetching blogs for sitemap:", e);
    }

    const escapeXml = (value: string) =>
      value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

    const urlList = Array.from(urlMap.values());
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlList
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>${
      u.lastmod
        ? `
    <lastmod>${u.lastmod}</lastmod>`
        : ""
    }
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (err: any) {
    console.error("Sitemap generation error:", err);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
