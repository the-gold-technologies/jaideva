import type { CMSProduct } from "@/store/useCMSStore";

/** Label for products that have no sub-category title in the CMS. */
export const UNGROUPED_TITLE = "Featured Products";

export interface SubCategoryGroup {
  /** Stable DOM id / URL hash, derived from the sub-category title (e.g. "subcat-gear-oils"). */
  anchorId: string;
  title: string;
  /** True when the group holds products without a CMS sub-category title. */
  isUngrouped: boolean;
  products: CMSProduct[];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function subCategoryAnchorId(title: string): string {
  return `subcat-${slugify(title)}`;
}

/**
 * Single source of truth for grouping a category's products by sub-category.
 * Used by the category page list + sidebar, the Navbar mega menu and the product-page
 * sub-category nav, so links like `/products/x#subcat-gear-oils` always land on the right group.
 */
export function groupProductsBySubCategory(products: CMSProduct[]): SubCategoryGroup[] {
  const groups = new Map<string, SubCategoryGroup>();

  products.forEach((product) => {
    const rawTitle = (product.subCategoryTitle || "").trim();
    const title = rawTitle ? rawTitle : UNGROUPED_TITLE;
    const anchorId = subCategoryAnchorId(title);

    if (!groups.has(anchorId)) {
      groups.set(anchorId, { anchorId, title, isUngrouped: !rawTitle, products: [] });
    }
    groups.get(anchorId)!.products.push(product);
  });

  return Array.from(groups.values());
}

export function matchesProductSearch(product: CMSProduct, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [product.name, product.description, product.specsText, product.subCategoryTitle].some(
    (field) => (field || "").toLowerCase().includes(q),
  );
}
