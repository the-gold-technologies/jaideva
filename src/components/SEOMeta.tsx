"use client";

import React, { useEffect, useMemo } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCMSStore, PageSEO } from "@/store/useCMSStore";
import { useAnalyticsConsent } from "@/components/CookieConsent";

interface SEOMetaProps {
  pageSlug: string;
  customSEO?: PageSEO | null;
}

// Stable empty object so effects/memos don't re-run on every render when a page has no SEO record
const EMPTY_SEO: PageSEO = {};

// Last path a page view was sent for (module-level so remounts on the same path don't double count)
let lastTrackedPath = "";

export default function SEOMeta({ pageSlug, customSEO }: SEOMetaProps) {
  const { globalSEO, fetchGlobalSEO, pageSEO } = useCMSStore();
  const pathname = usePathname();
  const analyticsAllowed = useAnalyticsConsent();

  const isHome = pageSlug === "home";
  const storedSEO = pageSEO?.[pageSlug];
  const activeSEO: PageSEO = useMemo(
    () => (customSEO?.metaTitle ? customSEO : storedSEO || EMPTY_SEO),
    [customSEO, storedSEO],
  );

  // Auto fetch global SEO if not loaded yet
  useEffect(() => {
    if (!globalSEO) {
      fetchGlobalSEO().catch(console.error);
    }
  }, [globalSEO, fetchGlobalSEO]);

  let title = activeSEO.metaTitle || "";
  if (isHome && !title) {
    title = globalSEO?.siteTitle || "";
  }

  let description = activeSEO.metaDescription || "";
  if (isHome && !description) {
    description = globalSEO?.siteDescription || "";
  }

  const keywords = activeSEO.targetKeywords || "";
  const currentUrl = (activeSEO.canonicalUrl || "").trim();

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    // 2. Helper to set or create meta tags
    const setMetaTag = (
      attr: "name" | "property",
      key: string,
      content: string | null | undefined,
    ) => {
      if (!content) return;
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Helper to set or create link tags
    const setLinkTag = (rel: string, href: string | null | undefined) => {
      if (!href) return;
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    if (description) {
      setMetaTag("name", "description", description);
    }
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }
    if (typeof activeSEO?.noIndex === "boolean") {
      setMetaTag("name", "robots", activeSEO.noIndex ? "noindex, nofollow" : "index, follow");
    }

    if (currentUrl) {
      setLinkTag("canonical", currentUrl);
      setMetaTag("property", "og:url", currentUrl);
    }

    // 4. OpenGraph & Twitter Tags
    if (title) {
      setMetaTag("property", "og:title", title);
      setMetaTag("name", "twitter:title", title);
    }
    if (description) {
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    }
    setMetaTag("property", "og:type", pageSlug?.startsWith("blogs/") ? "article" : "website");
    setMetaTag("name", "twitter:card", "summary_large_image");

    if (globalSEO?.siteTitle) {
      setMetaTag("property", "og:site_name", globalSEO.siteTitle);
    }
    if (globalSEO?.logo) {
      setMetaTag("property", "og:image", globalSEO.logo);
      setMetaTag("name", "twitter:image", globalSEO.logo);
    }

    // 5. Google Search Console Verification
    if (globalSEO?.searchConsoleId) {
      let token = globalSEO.searchConsoleId.trim();
      const contentMatch = token.match(/content=["']([^"']+)["']/i);
      if (contentMatch) {
        token = contentMatch[1];
      }
      if (token) {
        setMetaTag("name", "google-site-verification", token);
      }
    }

    // 6. Favicon Dynamic Update from CMS Global Settings
    if (globalSEO?.favicon) {
      const fav = globalSEO.favicon.trim();
      if (fav) {
        setLinkTag("icon", fav);
        setLinkTag("shortcut icon", fav);
        setLinkTag("apple-touch-icon", fav);
      }
    }

    // 9. Custom Header Scripts
    if (globalSEO?.customHeaderScripts && typeof window !== "undefined") {
      const headerScriptId = "cms-custom-header-scripts";
      let container = document.getElementById(headerScriptId);
      if (!container) {
        container = document.createElement("div");
        container.id = headerScriptId;
        document.head.appendChild(container);
        injectHtmlWithScripts(container, globalSEO.customHeaderScripts);
      }
    }

    // 10. Custom Footer Scripts
    if (globalSEO?.customFooterScripts && typeof window !== "undefined") {
      const footerScriptId = "cms-custom-footer-scripts";
      let container = document.getElementById(footerScriptId);
      if (!container) {
        container = document.createElement("div");
        container.id = footerScriptId;
        document.body.appendChild(container);
        injectHtmlWithScripts(container, globalSEO.customFooterScripts);
      }
    }
  }, [activeSEO, globalSEO, isHome, pageSlug]);

  const rawGtmId = globalSEO?.gtmId?.trim();
  const gtmId = rawGtmId ? rawGtmId.match(/GTM-[A-Z0-9]+/i)?.[0] || rawGtmId : null;

  const rawGaId = globalSEO?.googleAnalyticsId?.trim();
  const gaId = rawGaId ? rawGaId.match(/(G-[A-Z0-9]+|UA-[0-9-]+)/i)?.[0] || rawGaId : null;

  // Page-view tracking: only with cookie consent, and exactly once per path
  useEffect(() => {
    if (!analyticsAllowed || (!gaId && !gtmId)) return;
    if (lastTrackedPath === pathname) return;
    lastTrackedPath = pathname;

    const w = window as any;
    w.dataLayer = w.dataLayer || [];

    if (gaId) {
      if (!w.gtag) {
        w.gtag = function () {
          w.dataLayer.push(arguments);
        };
        w.gtag("js", new Date());
      }
      w.gtag("config", gaId, { page_path: pathname });
    }

    if (gtmId) {
      w.dataLayer.push({ event: "pageview", page: pathname });
    }
  }, [analyticsAllowed, gaId, gtmId, pathname]);

  // Title/meta/canonical are rendered server-side via generateMetadata (see src/lib/serverSEO.ts) and
  // JSON-LD by <StructuredData> in each page.tsx; the effect above keeps meta tags in sync on
  // client-side navigation.
  return (
    <>
      {/* Google Tag Manager — loaded only after the visitor accepts cookies */}
      {analyticsAllowed && gtmId && (
        <Script
          id="google-tag-manager-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      {/* Google Analytics (GA4) — loaded only after consent; config is sent by the tracking effect */}
      {analyticsAllowed && gaId && (
        <Script
          id="google-analytics-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
      )}
    </>
  );
}

/**
 * Safely injects HTML containing script tags by transforming them into executable DOM Script elements
 */
function injectHtmlWithScripts(container: HTMLElement, rawHtml: string) {
  if (!rawHtml || !container) return;
  const trimmed = rawHtml.trim();
  if (!trimmed) return;
  if (container.dataset.renderedContent === trimmed) return;
  container.dataset.renderedContent = trimmed;
  container.innerHTML = trimmed;
  const scripts = Array.from(container.querySelectorAll("script"));
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });
    if (oldScript.innerHTML) {
      newScript.innerHTML = oldScript.innerHTML;
    }
    oldScript.parentNode?.replaceChild(newScript, oldScript);
  });
}
