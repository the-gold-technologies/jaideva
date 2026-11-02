import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import ContactUsPageClient from "./ContactUsPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/contact-us");
}

export default function Page() {
  return <ContactUsPageClient />;
}
