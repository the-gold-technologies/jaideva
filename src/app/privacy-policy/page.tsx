import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import StructuredData from "@/components/StructuredData";
import PrivacyPolicyPageClient from "./PrivacyPolicyPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/privacy-policy");
}

export default function Page() {
  return (
    <>
      <StructuredData pageSlug="privacy-policy" endpoint="/api/privacy-policy" />
      <PrivacyPolicyPageClient />
    </>
  );
}
