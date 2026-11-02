import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import PrivacyPolicyPageClient from "./PrivacyPolicyPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/privacy-policy");
}

export default function Page() {
  return <PrivacyPolicyPageClient />;
}
