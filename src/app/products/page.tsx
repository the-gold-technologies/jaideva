import { redirect } from "next/navigation";

export default function AllProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams?.search === "string" ? searchParams.search : "";
  if (query) {
    redirect(`/products/hp-lubricants?search=${encodeURIComponent(query)}`);
  }
  redirect("/products/hp-lubricants");
}
