"use client";

import React from "react";
import { useCMSStore } from "@/store/useCMSStore";

export default function AboutHero() {
  const { pages } = useCMSStore();
  const cmsHero = pages["about-us"]?.AboutHero;

  if (!cmsHero?.bannerImage) {
    return null;
  }

  return (
    <section className="w-full relative overflow-hidden leading-none">
      <img
        src={cmsHero.bannerImage}
        alt={cmsHero.altText || "About Jai Deva Oil Co."}
        className="w-full h-auto object-cover block"
      />
    </section>
  );
}
