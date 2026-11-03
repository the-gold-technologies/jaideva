import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import StructuredData from "@/components/StructuredData";
import ContactUsPageClient from "./ContactUsPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/contact-us");
}

export default function Page() {
  return (
    <>
      <StructuredData pageSlug="contact-us" endpoint="/api/contact-us" />
      <ContactUsPageClient />
    </>
  );
}
