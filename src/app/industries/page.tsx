"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";
import {
  IndustriesHero,
  IndustryStageSection,
  LessYouBurnImpactSection,
  MachineryFeatureSection,
  PlantProcessSection,
  IndustriesConsultationCTA,
} from "./components";

export default function IndustriesPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const { fetchPage } = useCMSStore();

  useEffect(() => {
    fetchPage("industries").catch(console.error);
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
      <SEOMeta pageSlug="industries" />

      {/* 1. Header Navigation */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 2. Hero: Jai Deva Oil Co. • Less You Burn, the More You Earn */}
      <IndustriesHero onOpenEnquiry={handleOpenEnquiry} />

      {/* 3. Interactive Split-Screen Industry Stage (No card grids!) */}
      <IndustryStageSection onOpenEnquiry={handleOpenEnquiry} />

      {/* 4. "Less You Burn, the More You Earn" Full-Width Impact & Metrics Strip */}
      <LessYouBurnImpactSection onOpenEnquiry={handleOpenEnquiry} />

      {/* 5. Critical Plant Machinery Deep-Dive (Tabbed split-view with large photography) */}
      <MachineryFeatureSection onOpenEnquiry={handleOpenEnquiry} />

      {/* 6. Plant Lubrication Engineering Journey (Connected 01-04 Process Timeline) */}
      <PlantProcessSection onOpenEnquiry={handleOpenEnquiry} />

      {/* 7. Clean Light-Themed Consultation CTA */}
      <IndustriesConsultationCTA onOpenEnquiry={handleOpenEnquiry} />

      {/* 8. Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />
    </main>
  );
}
