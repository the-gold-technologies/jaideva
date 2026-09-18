"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/HomeHero";
// import AboutSection from "@/components/AboutSection";
import ProductsServicesSection from "@/components/ProductsServicesSection";
import MultiBrandSolutionsSection from "@/components/MultiBrandSolutionsSection";
import IndustriesWeServeSection from "@/components/IndustriesWeServeSection";
import WhyJaiDevaSection from "@/components/WhyJaiDevaSection";
import BrandClosingBanner from "@/components/BrandClosingBanner";
import TrustedClientsSection from "@/components/TrustedClientsSection";
import LocateDistributorContactSection from "@/components/LocateDistributorContactSection";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DistributorModal from "@/components/DistributorModal";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore } from "@/store/useCMSStore";

export default function Home() {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const [isDistributorOpen, setIsDistributorOpen] = useState(false);
  const [distributorType, setDistributorType] = useState(
    "Industrial Lube Distributor (ILD)",
  );

  const { fetchPage } = useCMSStore();

  useEffect(() => {
    fetchPage("home").catch(console.error);
  }, [fetchPage]);

  const handleOpenEnquiry = (productName?: string) => {
    if (productName) setEnquiryProduct(productName);
    else setEnquiryProduct("");
    setIsEnquiryOpen(true);
  };

  const handleOpenDistributor = (type?: string) => {
    if (type) setDistributorType(type);
    setIsDistributorOpen(true);
  };

  return (
    <main
      className="min-h-screen bg-white text-gray-800"
      style={{
        fontSize: `${16 * fontSizeMultiplier}px`,
      }}
    >
      <SEOMeta pageSlug="home" isLandingPage={true} />

      {/* 1. Header Utility & Navigation Bar */}
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 2. Homepage Hero */}
      <HomeHero
        onOpenEnquiry={handleOpenEnquiry}
        onOpenDistributor={handleOpenDistributor}
      />

      {/* 3. About Section - content moved into the homepage hero */}
      {/* <AboutSection /> */}

      {/* 4. OUR PRODUCT RANGE (Original Circular Icon UI Design) */}
      <ProductsServicesSection />

      {/* 5. MULTI-BRAND LUBRICANT SOLUTIONS (Understand -> Recommend -> Supply -> Support) */}
      <MultiBrandSolutionsSection />

      {/* 6. INDUSTRIES WE SERVE */}
      <IndustriesWeServeSection onOpenEnquiry={handleOpenEnquiry} />

      {/* 7. WHY JAI DEVA OIL CO.? (6 Value Cards) */}
      <WhyJaiDevaSection />

      {/* 11. Trusted Clients Infinite Marquee Section */}
      <TrustedClientsSection />

      {/* 13. Brand Summary Closing Banner */}
      <BrandClosingBanner onOpenEnquiry={handleOpenEnquiry} />

      {/* 14. Locate Distributor & Contact Details Grid */}
      <LocateDistributorContactSection
        onOpenEnquiry={handleOpenEnquiry}
        onOpenDistributor={handleOpenDistributor}
      />

      {/* 15. Dark Navy Footer & Sticky Enquiry Button */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />

      {/* Distributor Leaders Modal */}
      <DistributorModal
        isOpen={isDistributorOpen}
        onClose={() => setIsDistributorOpen(false)}
        initialType={distributorType}
      />
    </main>
  );
}
