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

  let robotsContent = "User-agent: *\nAllow: /";
  let sitemapEnabled = true;

  try {
    const apiUrl = getApiBaseUrl();
    const res = await fetch(`${apiUrl}/api/seo`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      const globalConfig = json?.data;
      sitemapEnabled = globalConfig?.sitemapEnabled !== false;
      const customRobots = (globalConfig?.robotsTxt || "").trim();
      // Only use the CMS text if it is an actual robots file (has a User-agent rule)
      if (/^\s*user-agent\s*:/im.test(customRobots)) robotsContent = customRobots;
    }
  } catch (err) {
    console.error("Error fetching robots.txt from CMS:", err);
  }

  // Sitemap directives are always generated here so they point at this site's own /sitemap.xml
  // (the CMS default text contains a hardcoded domain) and disappear when the sitemap is disabled.
  robotsContent = robotsContent
    .split("\n")
    .filter((line) => !line.trim().toLowerCase().startsWith("sitemap:"))
    .join("\n")
    .trim();
  if (sitemapEnabled && origin) {
    robotsContent += `\n\nSitemap: ${origin}/sitemap.xml`;
  }

  return new NextResponse(robotsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
