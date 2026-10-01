import { redirect } from "next/navigation";

interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
}

interface ProductRecord {
  name: string;
  slug: string;
  categorySlug: string;
  subCategoryTitle?: string;
  specsText?: string;
  description?: string;
}

async function resolveProductRedirect(searchQuery?: string): Promise<string> {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

  try {
    // 1. Fetch categories from CMS
    const catRes = await fetch(`${cmsUrl}/api/products/categories`, {
      next: { revalidate: 60 },
    });
    const catJson = await catRes.json();
    const categories: CategoryRecord[] =
      catJson.success && Array.isArray(catJson.data) ? catJson.data : [];

    const defaultSlug = categories[0]?.slug || "hp-lubricants";

    if (!searchQuery) {
      return `/products/${defaultSlug}`;
    }

    const q = searchQuery.toLowerCase().trim();

    // 2. If a search query is provided, find the matching brand catalog
    const prodRes = await fetch(`${cmsUrl}/api/products`, {
      next: { revalidate: 60 },
    });
    const prodJson = await prodRes.json();
    const products: ProductRecord[] =
      prodJson.success && Array.isArray(prodJson.data?.products)
        ? prodJson.data.products
        : Array.isArray(prodJson.data)
          ? prodJson.data
          : [];

    const matchedProduct = products.find((p) => {
      const name = (p.name || "").toLowerCase();
      const sub = (p.subCategoryTitle || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const specs = (p.specsText || "").toLowerCase();
      return name.includes(q) || sub.includes(q) || desc.includes(q) || specs.includes(q);
    });

    const targetBrandSlug = matchedProduct?.categorySlug || defaultSlug;
    return `/products/${targetBrandSlug}?search=${encodeURIComponent(searchQuery)}`;
  } catch (err) {
    console.error("Error resolving product redirect from CMS:", err);
    if (searchQuery) {
      return `/products/hp-lubricants?search=${encodeURIComponent(searchQuery)}`;
    }
    return "/products/hp-lubricants";
  }
}

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams?.search === "string" ? searchParams.search : undefined;

  const destination = await resolveProductRedirect(query);
  redirect(destination);
}
