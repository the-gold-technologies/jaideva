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
      next: { revalidate: 60 },
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
    if (
      globalSEO?.sitemapCustomContent &&
      (globalSEO.sitemapCustomContent.trim().startsWith("<?xml") ||
        globalSEO.sitemapCustomContent.includes("<urlset"))
    ) {
      return new NextResponse(globalSEO.sitemapCustomContent.trim(), {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
        },
      });
    }

    // 2. Dynamic XML compilation
    const urlMap = new Map<
      string,
      {
        loc: string;
        lastmod: string;
        changefreq: string;
        priority: string;
      }
    >();

    const addUrl = (
      path: string,
      lastmod?: string,
      changefreq: string = "weekly",
      priority: string = "0.8",
    ) => {
      const cleanPath = path.startsWith("/") ? path : `/${path}`;
      const fullUrl = cleanPath === "/" ? origin : `${origin}${cleanPath}`;
      urlMap.set(fullUrl, {
        loc: fullUrl,
        lastmod: lastmod ? lastmod.split("T")[0] : new Date().toISOString().split("T")[0],
        changefreq,
        priority,
      });
    };

    // Standard core pages
    addUrl("/", undefined, "daily", "1.0");
    addUrl("/about-us", undefined, "weekly", "0.8");
    addUrl("/brands", undefined, "weekly", "0.9");
    addUrl("/industries", undefined, "weekly", "0.9");
    addUrl("/products", undefined, "daily", "0.9");
    addUrl("/events", undefined, "weekly", "0.7");
    addUrl("/blogs", undefined, "daily", "0.8");
    addUrl("/contact-us", undefined, "weekly", "0.8");
    addUrl("/privacy-policy", undefined, "monthly", "0.5");

    // 3. Fetch CMS Pages (checking visibility & noIndex)
    try {
      const pagesRes = await fetch(`${apiUrl}/api/seo?type=pages`, {
        next: { revalidate: 60 },
      });
      if (pagesRes.ok) {
        const pagesJson = await pagesRes.json();
        const cmsPages = Array.isArray(pagesJson?.data) ? pagesJson.data : [];

        for (const page of cmsPages) {
          if (page?.slug) {
            const pageSlug = page.slug === "home" ? "/" : `/${page.slug}`;
            const fullUrl = pageSlug === "/" ? origin : `${origin}${pageSlug}`;

            // Exclude if marked as noIndex or not published
            if (page.noIndex === true || (page.visibility && page.visibility !== "published")) {
              urlMap.delete(fullUrl);
              continue;
            }

            // Update or add page
            const lastmod = page.updatedAt || page.createdAt;
            const priority = pageSlug === "/" ? "1.0" : "0.8";
            const changefreq = pageSlug === "/" ? "daily" : "weekly";
            addUrl(pageSlug, lastmod, changefreq, priority);
          }
        }
      }
    } catch (e) {
      console.error("Error fetching CMS pages for sitemap:", e);
    }

    // 4. Dynamic Products & Categories from CMS
    try {
      const prodRes = await fetch(`${apiUrl}/api/products`, {
        next: { revalidate: 60 },
      });
      if (prodRes.ok) {
        const prodJson = await prodRes.json();
        const categories = prodJson?.data?.categories || [];
        const products = prodJson?.data?.products || [];

        categories.forEach((cat: any) => {
          if (cat?.slug) {
            addUrl(`/products/${cat.slug}`, undefined, "weekly", "0.8");
          }
        });

        products.forEach((prod: any) => {
          if (prod?.categorySlug && prod?.slug) {
            // Respect product-level noIndex
            if (prod.noIndex === true) return;

            addUrl(`/products/${prod.categorySlug}/${prod.slug}`, prod.updatedAt, "weekly", "0.7");
          }
        });
      }
    } catch (e) {
      console.error("Error fetching products for sitemap:", e);
    }

    // 5. Dynamic Blog Articles from CMS
    try {
      const blogRes = await fetch(`${apiUrl}/api/blogs`, {
        next: { revalidate: 60 },
      });
      if (blogRes.ok) {
        const blogJson = await blogRes.json();
        const blogList = Array.isArray(blogJson?.data?.blogs)
          ? blogJson.data.blogs
          : Array.isArray(blogJson?.data)
            ? blogJson.data
            : [];

        blogList.forEach((b: any) => {
          if (b?.slug) {
            // Respect unpublished blogs
            if (b.isPublished === false) return;

            addUrl(`/blogs/${b.slug}`, b.updatedAt || b.createdAt, "weekly", "0.7");
          }
        });
      }
    } catch (e) {
      console.error("Error fetching blogs for sitemap:", e);
    }

    const urlList = Array.from(urlMap.values());
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlList
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err: any) {
    console.error("Sitemap generation error:", err);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
