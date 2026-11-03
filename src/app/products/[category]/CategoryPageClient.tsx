"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DownloadModal from "@/components/DownloadModal";
import { useCMSStore } from "@/store/useCMSStore";
import SEOMeta from "@/components/SEOMeta";
import { CategoryHero, CategorySidebar, CategoryProductList } from "./components";

function CategoryProductsPageContent() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const [activeSection, setActiveSection] = useState("");
  const pendingAnchorRef = useRef("");

  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadProductName, setDownloadProductName] = useState("");
  const [downloadPdfUrl, setDownloadPdfUrl] = useState("");

  const { fetchProducts, products } = useCMSStore();

  useEffect(() => {
    if (categorySlug) {
      fetchProducts(categorySlug).catch(console.error);
    }
  }, [categorySlug, fetchProducts]);

  // Scroll to a pending #subcat-<name> anchor once its section has rendered
  const scrollToPendingAnchor = useCallback(() => {
    const anchorId = pendingAnchorRef.current;
    if (!anchorId) return;
    const el = document.getElementById(anchorId);
    if (el) {
      pendingAnchorRef.current = "";
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Handle URL hash anchor navigation (e.g., #subcat-gear-oils)
  useEffect(() => {
    const handleHash = () => {
      const anchorId = window.location.hash.slice(1);
      if (!anchorId.startsWith("subcat-")) return;
      setActiveSection(anchorId);
      pendingAnchorRef.current = anchorId;
      scrollToPendingAnchor();
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [categorySlug, scrollToPendingAnchor]);

  // Products arrive asynchronously; retry the pending scroll after they render
  useEffect(() => {
    const frame = requestAnimationFrame(scrollToPendingAnchor);
    return () => cancelAnimationFrame(frame);
  }, [products, scrollToPendingAnchor]);

  const handleOpenEnquiry = (productName?: string) => {
    setEnquiryProduct(productName || "");
    setIsEnquiryOpen(true);
  };

  const handleOpenDownload = (productName: string, pdfUrl: string) => {
    setDownloadProductName(productName);
    setDownloadPdfUrl(pdfUrl);
    setIsDownloadOpen(true);
  };

  return (
    <main
      className="min-h-screen bg-[#f5f7fa] text-gray-800 font-sans flex flex-col"
      style={{ fontSize: `${16 * fontSizeMultiplier}px` }}
    >
      <SEOMeta pageSlug={`products/${categorySlug}`} />

      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      <CategoryHero onOpenEnquiry={() => handleOpenEnquiry()} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 w-full flex-1 flex gap-8 items-start">
        <CategorySidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onOpenEnquiry={() => handleOpenEnquiry()}
        />

        <CategoryProductList onOpenEnquiry={handleOpenEnquiry} />
      </div>

      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProduct={enquiryProduct}
      />

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        productName={downloadProductName}
        pdfType="TDS"
        pdfUrl={downloadPdfUrl}
      />
    </main>
  );
}

export default function CategoryProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#002b5c] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#002b5c]">
              Loading Products...
            </p>
          </div>
        </div>
      }
    >
      <CategoryProductsPageContent />
    </Suspense>
  );
}
