"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AboutHero from "@/app/about-us/components/AboutHero";
import AboutBreadcrumb from "@/app/about-us/components/AboutBreadcrumb";
import AboutJaiDevaContent from "@/app/about-us/components/AboutJaiDevaContent";
import OurTeamStructureSection from "@/app/about-us/components/OurTeamStructureSection";
import OurJourneySection from "@/app/about-us/components/OurJourneySection";
import AboutWhyChooseSection from "@/app/about-us/components/AboutWhyChooseSection";
import AboutImageGallerySection from "@/app/about-us/components/AboutImageGallerySection";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";

export default function AboutUsPage() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const { fetchPage } = useCMSStore();

  useEffect(() => {
    fetchPage("about-us").catch(console.error);
  }, [fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  return (
    <main
      className="min-h-screen bg-white text-gray-800 font-sans"
      style={{
        fontSize: `${16 * fontSizeMultiplier}px`,
      }}
    >
      <SEOMeta pageSlug="about-us" />

      {/* Header Navigation Bar */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Top Hero Banner (Full-Width) */}
      <AboutHero onOpenEnquiry={handleOpenEnquiry} />

      {/* Breadcrumb Bar */}
      <AboutBreadcrumb currentPage="About Us" />

      {/* 1. Jai Deva Oil Co. Story & Mentor Profile */}
      <AboutJaiDevaContent />

      {/* 2. Our Team Structure Section (Placed just before Our Journey) */}
      <OurTeamStructureSection onOpenEnquiry={handleOpenEnquiry} />

      {/* 3. Our Journey (Separate Section) */}
      <OurJourneySection />

      {/* 4. Why Choose Jai Deva Oil Co. Section */}
      <AboutWhyChooseSection />

      {/* 5. Infrastructure, Warehousing & Fleet Image Gallery Section */}
      <AboutImageGallerySection onOpenEnquiry={handleOpenEnquiry} />

      {/* Footer & Enquiry Modal */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />
    </main>
  );
}
