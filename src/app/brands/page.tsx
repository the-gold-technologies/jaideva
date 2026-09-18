"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";
import {
  BrandsHero,
  BrandsStatsBand,
  BrandsPillarsSection,
  BrandsProductCategoriesSection,
  BrandsCtaSection,
} from "./components";

export default function BrandsPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const { fetchPage } = useCMSStore();

  useEffect(() => {
    fetchPage("brands").catch(console.error);
  }, [fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  return (
    <main
      className="min-h-screen bg-white text-slate-800"
      style={{ fontSize: `${16 * fontSizeMultiplier}px` }}
    >
      <SEOMeta pageSlug="brands" />

      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 1. Hero Section */}
      <BrandsHero onOpenEnquiry={handleOpenEnquiry} />

      {/* 2. Key Industry Statistics Band */}
      <BrandsStatsBand />

      {/* 4. Brand Value Pillars */}
      <BrandsPillarsSection />

      {/* 5. Product Categories Spectrum */}
      <BrandsProductCategoriesSection />

      {/* 7. Consultation & Contact CTA */}
      <BrandsCtaSection onOpenEnquiry={handleOpenEnquiry} />

      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />
    </main>
  );
}
