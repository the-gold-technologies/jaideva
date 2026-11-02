import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/serverSEO";
import EventsPageClient from "./EventsPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/api/events");
}

export default function Page() {
  return <EventsPageClient />;
}
