import type { GlobalSEO, PageSEO } from "@/store/useCMSStore";

/**
 * JSON-LD structured data, built on the server from the same CMS responses that drive the page
 * metadata, so search engines receive it in the initial HTML.
 */

/**
 * Safely parses custom schema string provided by the user in the CMS
 */
function parseCustomSchema(rawSchema: string | null | undefined): any | null {
  if (!rawSchema) return null;
  const trimmed = rawSchema.trim();
  if (!trimmed) return null;

  const cleaned = trimmed
    .replace(/^<script[^>]*>/i, "")
    .replace(/<\/script>$/i, "")
    .trim();

  if (!cleaned) return null;

  try {
    return JSON.parse(cleaned);
  } catch {
    return cleaned;
  }
}

/**
 * Formats a schema object or string into a valid JSON-LD string
 */
function formatSchemaString(schema: any): string {
  if (!schema) return "";
  if (typeof schema === "string") {
    try {
      const parsed = JSON.parse(schema);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return schema;
    }
  }
  try {
    return JSON.stringify(schema, null, 2);
  } catch {
    return "";
  }
}

/**
 * Converts CMS date strings (e.g. "October 14, 2025" or ISO timestamps) to ISO 8601 dates,
 * which is what schema.org / Google require. Unparseable values are dropped.
 */
function toIsoDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
}

/**
 * Removes empty strings, null/undefined, and empty arrays/objects from generated schema so that
 * fields the CMS has not filled in are omitted instead of being emitted as invalid empty values.
 */
function compactSchema(value: any): any {
  if (Array.isArray(value)) {
    const items = value.map(compactSchema).filter((v) => v !== undefined);
    return items.length ? items : undefined;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([k, v]) => [k, compactSchema(v)] as const)
      .filter(([, v]) => v !== undefined);
    const meaningful = entries.filter(([k]) => k !== "@type" && k !== "@context");
    return meaningful.length ? Object.fromEntries(entries) : undefined;
  }
  if (value === "" || value === null || value === undefined) return undefined;
  return value;
}

/**
 * Builds standard Google-compliant Schema.org JSON-LD structured data for each page
 */
function generatePageSchema({
  pageSlug,
  activeSEO,
  globalSEO,
  pageData,
  origin,
}: {
  pageSlug: string;
  activeSEO: PageSEO | null;
  globalSEO: GlobalSEO | null;
  /** `data` from the page's CMS endpoint (product, blog post, product list, blog list…) */
  pageData: any;
  /** Absolute site origin without trailing slash, e.g. https://jaidevaoil.com */
  origin: string;
}) {
  const companyName = globalSEO?.siteTitle || "";
  const companyPhone = globalSEO?.phone || "";
  const companyEmail = globalSEO?.email || "";
  const companyAddress = globalSEO?.address || "";
  const companyLogo = globalSEO?.logo || "";

  // Base Organization Schema Node
  const organizationNode: any = {
    "@type": ["LocalBusiness", "AutoPartsStore"],
    "@id": `${origin}/#organization`,
    name: companyName,
    alternateName: "Authorized Multi-Brand Lubricants Distributor Jai Deva Oil Co.",
    url: origin,
    logo: companyLogo,
    image: companyLogo,
    priceRange: "₹₹",
    description: globalSEO?.siteDescription || "",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };

  if (companyPhone) {
    organizationNode.telephone = companyPhone;
  }
  if (companyEmail) {
    organizationNode.email = companyEmail;
  }
  const socialLinks = globalSEO?.socialLinks || {};
  organizationNode.sameAs = [socialLinks.facebook, socialLinks.linkedin, socialLinks.instagram]
    .map((link) => (link || "").trim())
    .filter(Boolean);
  if (companyAddress) {
    organizationNode.address = {
      "@type": "PostalAddress",
      streetAddress: companyAddress,
      addressCountry: "IN",
    };
  }

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
      name: activeSEO?.metaTitle || "",
      description: activeSEO?.metaDescription || "",
      url: `${origin}/about-us`,
      mainEntity: organizationNode,
    };
  }

  // 3. Contact Us Page Schema
  if (pageSlug === "contact-us") {
    return {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: activeSEO?.metaTitle || "",
      description: activeSEO?.metaDescription || "",
      url: `${origin}/contact-us`,
      mainEntity: organizationNode,
    };
  }

  // 4. Privacy Policy Page Schema
  if (pageSlug === "privacy-policy") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: activeSEO?.metaTitle || "",
      description: activeSEO?.metaDescription || "",
      url: `${origin}/privacy-policy`,
    };
  }

  // 5. Events & Gallery Page Schema
  if (pageSlug === "events") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: activeSEO?.metaTitle || "",
      description: activeSEO?.metaDescription || "",
      url: `${origin}/events`,
    };
  }

  // Brands Overview Page Schema
  if (pageSlug === "brands") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: activeSEO?.metaTitle || "",
      description: activeSEO?.metaDescription || "",
      url: `${origin}/brands`,
      mainEntity: organizationNode,
    };
  }

  // Industries Overview Page Schema
  if (pageSlug === "industries") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: activeSEO?.metaTitle || "",
      description: activeSEO?.metaDescription || "",
      url: `${origin}/industries`,
      mainEntity: organizationNode,
    };
  }

  // 6. Blogs Main Index Page Schema
  if (pageSlug === "blogs") {
    const blogList = (Array.isArray(pageData?.blogs) ? pageData.blogs : [])
      .filter((b: any) => b.isPublished !== false)
      .slice(0, 10);
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: activeSEO?.metaTitle || "",
      description: activeSEO?.metaDescription || "",
      url: `${origin}/blogs`,
      blogPost: blogList.map((b: any) => ({
        "@type": "BlogPosting",
        headline: b.title || "",
        url: `${origin}/blogs/${b.slug || ""}`,
        datePublished: toIsoDate(b.publishDate),
        image: b.coverImage || companyLogo,
      })),
    };
  }

  // 7. Individual Blog Post Article Schema (`blogs/[slug]`)
  if (pageSlug.startsWith("blogs/")) {
    const blogSlug = pageSlug.replace("blogs/", "").trim();
    const post = pageData || {};

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${origin}/blogs/${blogSlug}`,
      },
      headline: post.title || "",
      description: post.excerpt || "",
      image: post.coverImage || companyLogo,
      datePublished: toIsoDate(post.publishDate),
      dateModified: toIsoDate(post.updatedAt),
      author: {
        "@type": "Person",
        name: post.author || "",
      },
      publisher: organizationNode,
    };
  }

  // 8. Individual Product Detail Page Schema (`product:[slug]`)
  if (pageSlug.startsWith("product:")) {
    const prodSlug = pageSlug.replace("product:", "").trim();
    const product = pageData || {};
    const productUrl = product.categorySlug
      ? `${origin}/products/${product.categorySlug}/${prodSlug}`
      : "";

    // No `offers`: the CMS holds no price/stock data, and a fake "price: 0 / InStock" offer
    // misrepresents the product to search engines.
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name || "",
      url: productUrl,
      image: product.containerImage || "",
      description: product.description || "",
      brand: {
        "@type": "Brand",
        name: product.categoryName || "",
      },
      category: product.subCategoryTitle || "",
    };
  }

  // 9. Products Catalog / Category Listing Schema
  if (pageSlug === "products" || pageSlug.startsWith("products/")) {
    const prodList = (Array.isArray(pageData?.products) ? pageData.products : []).slice(0, 20);
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: activeSEO?.metaTitle || "",
      description: activeSEO?.metaDescription || "",
      url: `${origin}/${pageSlug}`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: prodList.map((p: any, idx: number) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: p.name || "",
          url: `${origin}/products/${p.categorySlug || ""}/${p.slug || ""}`,
          image: p.containerImage || "",
        })),
      },
    };
  }

  // Generic WebPage Schema Fallback
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: activeSEO?.metaTitle || companyName,
    description: activeSEO?.metaDescription || "",
    url: `${origin}/${pageSlug}`,
  };
}

/**
 * Returns the JSON-LD string for a page: the CMS custom schema when one is set (page schema, or the
 * global schema on the home page), otherwise the generated default for that page type.
 */
export function buildJsonLd({
  pageSlug,
  seo,
  globalSEO,
  pageData,
  origin,
}: {
  pageSlug: string;
  seo: PageSEO | null;
  globalSEO: GlobalSEO | null;
  pageData: any;
  origin: string;
}): string {
  let customSchema = (seo?.schema || "").trim();
  if (pageSlug === "home" && !customSchema) {
    customSchema = (globalSEO?.schema || "").trim();
  }

  if (customSchema) {
    const parsed = parseCustomSchema(customSchema);
    if (parsed) return formatSchemaString(parsed);
  }

  return formatSchemaString(
    compactSchema(generatePageSchema({ pageSlug, activeSEO: seo, globalSEO, pageData, origin })),
  );
}
