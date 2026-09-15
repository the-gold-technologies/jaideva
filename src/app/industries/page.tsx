"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";
import {
  IndustriesHero,
  IndustryDossierSection,
  MachinerySystemsSection,
  PlantServicesSection,
  MultiBrandAdvantageSection,
  IndustryMarketsExportSection,
  IndustriesConsultationCTA,
} from "./components";

export default function IndustriesPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>("steel");

  const { fetchPage } = useCMSStore();

  useEffect(() => {
    fetchPage("industries").catch(console.error);
  }, [fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  const handleSelectIndustry = (industryId: string) => {
    setSelectedIndustryId(industryId);
    const el = document.getElementById("sector-explorer");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      className="min-h-screen bg-white text-slate-800"
      style={{ fontSize: `${16 * fontSizeMultiplier}px` }}
    >
      <SEOMeta pageSlug="industries" />

      {/* 1. Navigation */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 2. Hero – Interactive Sector Telemetry Panel */}
      <IndustriesHero
        onOpenEnquiry={handleOpenEnquiry}
        onSelectIndustry={handleSelectIndustry}
      />

      {/* 3. Interactive Industry Dossier Explorer */}
      <IndustryDossierSection
        key={selectedIndustryId}
        onOpenEnquiry={handleOpenEnquiry}
        selectedIndustryId={selectedIndustryId}
      />

      {/* 4. Critical Plant Machinery Systems */}
      <MachinerySystemsSection onOpenEnquiry={handleOpenEnquiry} />

      {/* 5. Plant Technical Services */}
      <PlantServicesSection onOpenEnquiry={handleOpenEnquiry} />

      {/* 6. Multi-Brand Procurement Advantage */}
      <MultiBrandAdvantageSection />

      {/* 7. Major Domestic & International Export Markets */}
      <IndustryMarketsExportSection />

      {/* 8. Interactive Consultation CTA with Sector Dropdown */}
      <IndustriesConsultationCTA onOpenEnquiry={handleOpenEnquiry} />

      {/* 9. Footer */}
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
