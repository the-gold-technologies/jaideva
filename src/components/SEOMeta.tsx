"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { useCMSStore, PageSEO } from "@/store/useCMSStore";

interface SEOMetaProps {
  pageSlug: string;
  customSEO?: PageSEO | null;
}

export default function SEOMeta({ pageSlug, customSEO }: SEOMetaProps) {
  const { globalSEO, fetchGlobalSEO, pages, pageSEO, productDetails, blogPosts, products, blogs } =
    useCMSStore();

  const isHome = pageSlug === "home";
  const activeSEO: PageSEO | null =
    customSEO || pages[pageSlug]?.seo || pageSEO?.[pageSlug] || null;

  // Auto fetch global SEO if not loaded yet
  useEffect(() => {
    if (!globalSEO) {
      fetchGlobalSEO().catch(console.error);
    }
  }, [globalSEO, fetchGlobalSEO]);

  useEffect(() => {
    // 1. Determine Title strictly from CMS data
    const title = isHome ? globalSEO?.siteTitle || "" : activeSEO?.metaTitle || "";

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

    // 3. Description & Keywords strictly from CMS
    const description = isHome
      ? globalSEO?.siteDescription || ""
      : activeSEO?.metaDescription || "";

    const keywords = activeSEO?.targetKeywords || "";

    const currentUrl =
      activeSEO?.canonicalUrl || (typeof window !== "undefined" ? window.location.href : "");

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

    // 7. Structured Data (JSON-LD)
    let finalSchema: any = null;
    const rawCustomSchema = (isHome ? globalSEO?.schema : activeSEO?.schema)?.trim();

    if (rawCustomSchema) {
      try {
        const cleaned = rawCustomSchema
          .replace(/<script[^>]*>/gi, "")
          .replace(/<\/script>/gi, "")
          .trim();
        finalSchema = JSON.parse(cleaned);
      } catch {
        finalSchema = rawCustomSchema
          .replace(/<script[^>]*>/gi, "")
          .replace(/<\/script>/gi, "")
          .trim();
      }
    } else {
      // Automatically generate contextual JSON-LD structured data for this page
      finalSchema = generatePageSchema({
        pageSlug,
        activeSEO,
        globalSEO,
        pages,
        productDetails,
        blogPosts,
        products,
        blogs,
      });
    }

    if (finalSchema) {
      let scriptTag = document.getElementById("dynamic-json-ld");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "dynamic-json-ld";
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent =
        typeof finalSchema === "string" ? finalSchema : JSON.stringify(finalSchema, null, 2);
    } else {
      const existingScript = document.getElementById("dynamic-json-ld");
      if (existingScript) {
        existingScript.remove();
      }
    }

    // 8. Execute GA & GTM in window context
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      if (globalSEO?.googleAnalyticsId) {
        if (!(window as any).gtag) {
          (window as any).gtag = function () {
            (window as any).dataLayer.push(arguments);
          };
          (window as any).gtag("js", new Date());
        }
        (window as any).gtag("config", globalSEO.googleAnalyticsId, {
          page_path: window.location.pathname,
          page_title: title,
        });
      }

      if (globalSEO?.gtmId) {
        (window as any).dataLayer.push({
          event: "pageview",
          page: window.location.pathname,
          title: title,
        });
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
  }, [activeSEO, globalSEO, isHome, pageSlug, pages, productDetails, blogPosts, products, blogs]);

  const rawGtmId = globalSEO?.gtmId?.trim();
  const gtmId = rawGtmId ? rawGtmId.match(/GTM-[A-Z0-9]+/i)?.[0] || rawGtmId : null;

  const rawGaId = globalSEO?.googleAnalyticsId?.trim();
  const gaId = rawGaId ? rawGaId.match(/(G-[A-Z0-9]+|UA-[0-9-]+)/i)?.[0] || rawGaId : null;

  return (
    <>
      {/* Google Tag Manager (GTM) Native Scripts */}
      {gtmId && (
        <>
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
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics (GA4) Native Scripts */}
      {gaId && (
        <>
          <Script
            id="google-analytics-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}

/**
 * Builds standard Google-compliant Schema.org JSON-LD structured data for each page
 */
function generatePageSchema({
  pageSlug,
  activeSEO,
  globalSEO,
  pages,
  productDetails,
  blogPosts,
  products,
  blogs,
}: {
  pageSlug: string;
  activeSEO: PageSEO | null;
  globalSEO: any;
  pages: Record<string, any>;
  productDetails: Record<string, any>;
  blogPosts: Record<string, any>;
  products: any[] | null;
  blogs: any[] | null;
}) {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

  const companyName = globalSEO?.siteTitle || "Jai Deva Oil Co.";
  const companyPhone = globalSEO?.phone || "+91 98765 43210";
  const companyEmail = globalSEO?.email || "sales@jaidevaoil.com";
  const companyAddress =
    globalSEO?.address || "Baghpat Region & Surrounding Industrial Belts, Uttar Pradesh, India";
  const companyLogo = globalSEO?.logo || `${origin}/jaideva-logo.png`;

  // Base Organization Schema Node
  const organizationNode = {
    "@type": ["LocalBusiness", "AutoPartsStore"],
    "@id": `${origin}/#organization`,
    name: "Jai Deva Oil Co.",
    alternateName: "Authorized Multi-Brand Lubricants Distributor Jai Deva Oil Co.",
    url: origin,
    logo: companyLogo,
    image: companyLogo,
    telephone: companyPhone,
    email: companyEmail,
    priceRange: "₹₹",
    description:
      globalSEO?.siteDescription ||
      "Authorized Distributors of Multi-Brand Industrial & Automotive Lubricants.",
    address: {
      "@type": "PostalAddress",
      streetAddress: companyAddress,
      addressLocality: "Baghpat",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };

  // 1. Home / Landing Page Schema
  if (pageSlug === "home") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        organizationNode,
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: origin,
          name: companyName,
          description: globalSEO?.siteDescription || "",
          publisher: { "@id": `${origin}/#organization` },
          potentialAction: {
            "@type": "SearchAction",
            target: `${origin}/products?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ],
    };
  }

  // 2. About Us Page Schema
  if (pageSlug === "about-us") {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: activeSEO?.metaTitle || "About Us | Jai Deva Oil Co.",
      description:
        activeSEO?.metaDescription ||
        "Authorized Distributors of Multi-Brand Industrial & Automotive Lubricants.",
      url: `${origin}/about-us`,
      mainEntity: {
        "@type": "Organization",
        name: "Jai Deva Oil Co.",
        url: origin,
        logo: companyLogo,
        description: "Official distributor of multi-brand industrial and automotive lubricants.",
      },
    };
  }

  // 3. Contact Us Page Schema
  if (pageSlug === "contact-us") {
    return {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: activeSEO?.metaTitle || "Contact Us | Jai Deva Oil Co.",
      description:
        activeSEO?.metaDescription ||
        "Get in touch with Jai Deva Oil Co. for bulk industrial oils, greases, and lubricant supply enquiries.",
      url: `${origin}/contact-us`,
      mainEntity: organizationNode,
    };
  }

  // 4. Privacy Policy Page Schema
  if (pageSlug === "privacy-policy") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: activeSEO?.metaTitle || "Privacy Policy | Jai Deva Oil Co.",
      description:
        activeSEO?.metaDescription ||
        "Read the Privacy Policy of Jai Deva Oil Co. lubricants distribution.",
      url: `${origin}/privacy-policy`,
    };
  }

  // 5. Events & Gallery Page Schema
  if (pageSlug === "events") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: activeSEO?.metaTitle || "Events & Gallery | Jai Deva Oil Co.",
      description:
        activeSEO?.metaDescription ||
        "Explore industrial meets, dealer conventions, exhibitions, and technical lubrication seminars.",
      url: `${origin}/events`,
    };
  }

  // Brands Overview Page Schema
  if (pageSlug === "brands") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: activeSEO?.metaTitle || "Multi-Brand Lubricants Portfolio | Jai Deva Oil Co.",
      description:
        activeSEO?.metaDescription ||
        "Explore authorized multi-brand lubricant portfolios covering industrial oils, automotive lubricants, and greases.",
      url: `${origin}/brands`,
      mainEntity: organizationNode,
    };
  }

  // 6. Blogs Main Index Page Schema
  if (pageSlug === "blogs") {
    const blogList = Array.isArray(blogs) ? blogs.slice(0, 10) : [];
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: activeSEO?.metaTitle || "Industrial Lubrication Insights & Blog",
      description:
        activeSEO?.metaDescription ||
        "Technical guides, automotive lubrication tips, and industrial oil insights from Jai Deva Oil Co.",
      url: `${origin}/blogs`,
      blogPost: blogList.map((b: any) => ({
        "@type": "BlogPosting",
        headline: b.title,
        url: `${origin}/blogs/${b.slug}`,
        datePublished: b.publishDate || b.createdAt,
        image: b.coverImage || companyLogo,
      })),
    };
  }

  // 7. Individual Blog Post Article Schema (`blogs/[slug]`)
  if (pageSlug.startsWith("blogs/")) {
    const blogSlug = pageSlug.replace("blogs/", "").trim();
    const post = blogPosts[blogSlug] || {};
    const articleTitle = post.title || activeSEO?.metaTitle || "Technical Article";
    const articleDesc =
      post.excerpt || activeSEO?.metaDescription || `Technical article on ${articleTitle}`;
    const articleImage = post.coverImage || companyLogo;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${origin}/blogs/${blogSlug}`,
      },
      headline: articleTitle,
      description: articleDesc,
      image: articleImage,
      datePublished: post.publishDate || post.createdAt || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: post.author || "Technical Lubricants Team",
      },
      publisher: {
        "@type": "Organization",
        name: "Jai Deva Oil Co.",
        logo: {
          "@type": "ImageObject",
          url: companyLogo,
        },
      },
    };
  }

  // 8. Individual Product Detail Page Schema (`product:[slug]`)
  if (pageSlug.startsWith("product:")) {
    const prodSlug = pageSlug.replace("product:", "").trim();
    const product = productDetails[prodSlug] || {};
    const prodName = product.name || activeSEO?.metaTitle || "Industrial Lubricant";
    const prodDesc =
      product.description ||
      product.tagline ||
      activeSEO?.metaDescription ||
      `Buy genuine ${prodName} lubricants and oils from Jai Deva Oil Co.`;
    const prodImage = product.image || companyLogo;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: prodName,
      image: prodImage,
      description: prodDesc,
      brand: {
        "@type": "Brand",
        name: product.brand || "Industrial Lubricants",
      },
      category: product.categorySlug || "Industrial Lubricants",
      sku: product.slug || prodSlug,
      offers: {
        "@type": "Offer",
        url: `${origin}/products/${product.categorySlug || "industrial-oils"}/${prodSlug}`,
        priceCurrency: "INR",
        price: "0",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Jai Deva Oil Co.",
        },
      },
    };
  }

  // 9. Products Catalog / Category Listing Schema
  if (pageSlug === "products" || pageSlug.startsWith("products/")) {
    const prodList = Array.isArray(products) ? products.slice(0, 20) : [];
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: activeSEO?.metaTitle || "Industrial Lubricants & Oils Catalog",
      description:
        activeSEO?.metaDescription ||
        "Browse the full catalogue of genuine engine oils, gear oils, hydraulic oils, and greases from Jai Deva Oil Co.",
      url: `${origin}/${pageSlug}`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: prodList.map((p: any, idx: number) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: p.name,
          url: `${origin}/products/${p.categorySlug || "industrial-oils"}/${p.slug}`,
          image: p.image || companyLogo,
        })),
      },
    };
  }

  // Generic WebPage Schema Fallback
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: activeSEO?.metaTitle || companyName,
    description: activeSEO?.metaDescription || globalSEO?.siteDescription || "",
    url: `${origin}/${pageSlug}`,
  };
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
