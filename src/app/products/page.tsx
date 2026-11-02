import { notFound, redirect } from "next/navigation";
import { getApiBaseUrl } from "@/store/useCMSStore";

export const dynamic = "force-dynamic";

interface CategoryRecord {
  slug: string;
}

interface ProductRecord {
  name?: string;
  categorySlug?: string;
  subCategoryTitle?: string;
  specsText?: string;
  description?: string;
}

async function loadCatalog(): Promise<{
  categories: CategoryRecord[];
  products: ProductRecord[];
}> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/api/products`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`CMS responded ${res.status}`);
    }
    const json = await res.json();
    const data = json?.success ? json.data || {} : {};
    return {
      categories: Array.isArray(data.categories) ? data.categories : [],
      products: Array.isArray(data.products) ? data.products : [],
    };
  } catch (err) {
    console.error("Error loading product catalog from CMS:", err);
    return { categories: [], products: [] };
  }
}

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = typeof searchParams?.search === "string" ? searchParams.search.trim() : "";

  const { categories, products } = await loadCatalog();
  const defaultSlug = categories[0]?.slug || "";

  if (!searchQuery) {
    if (!defaultSlug) notFound();
    redirect(`/products/${defaultSlug}`);
  }

  const q = searchQuery.toLowerCase();
  const matchedProduct = products.find((p) =>
    [p.name, p.subCategoryTitle, p.description, p.specsText].some((field) =>
      (field || "").toLowerCase().includes(q),
    ),
  );

  const targetSlug = matchedProduct?.categorySlug || defaultSlug;
  if (!targetSlug) notFound();
  redirect(`/products/${targetSlug}?search=${encodeURIComponent(searchQuery)}`);
}
