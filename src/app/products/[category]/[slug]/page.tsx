"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import DownloadModal from "@/components/DownloadModal";
import SEOMeta from "@/components/SEOMeta";
import { useCMSStore, PageSEO } from "@/store/useCMSStore";
import {
  ProductBreadcrumb,
  ProductShowcaseCard,
  ProductDetailsContent,
  ProductSubCategoryNav,
  ProductNotFound,
} from "./components";

export default function ProductDetailPage() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const productSlug = params?.slug as string;

  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadProductName, setDownloadProductName] = useState("");
  const [downloadPdfType, setDownloadPdfType] = useState<"TDS" | "MSDS">("TDS");
  const [downloadPdfUrl, setDownloadPdfUrl] = useState("");

  const { productDetails, products, fetchProductBySlug, fetchProducts } =
    useCMSStore();

  useEffect(() => {
    if (productSlug) {
      fetchProductBySlug(productSlug).catch(console.error);
    }
    if (categorySlug) {
      fetchProducts(categorySlug).catch(console.error);
    }
  }, [productSlug, categorySlug, fetchProductBySlug, fetchProducts]);

  const product =
    productDetails[productSlug] ||
    products?.find((p) => p.slug === productSlug);

  const handleOpenEnquiry = (prodName?: string) => {
    setEnquiryProduct(prodName || product?.name || "");
    setIsEnquiryOpen(true);
  };

  const handleOpenDownload = (pdfType: "TDS" | "MSDS") => {
    if (!product) return;
    setDownloadProductName(product.name);
    setDownloadPdfType(pdfType);
    setDownloadPdfUrl(
      pdfType === "TDS"
        ? product.tdsPdfUrl || product.pdfUrl || ""
        : product.msdsPdfUrl || product.msdsUrl || "",
    );
    setIsDownloadOpen(true);
  };

  if (!product) {
    return (
      <ProductNotFound
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />
    );
  }

  const productSEO: PageSEO = {
    title: product.metaTitle || product.name,
    metaTitle: product.metaTitle || product.name,
    metaDescription: product.metaDescription || product.description,
    targetKeywords: product.targetKeywords,
    canonicalUrl: product.canonicalUrl,
    schema: (product as any).schema || null,
  };

  return (
    <main
      className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between"
      style={{
        fontSize: `${16 * fontSizeMultiplier}px`,
      }}
    >
      <SEOMeta pageSlug={`product:${productSlug}`} customSEO={productSEO} />

      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Breadcrumbs matching exact HP Lubricants style */}
      <ProductBreadcrumb />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
        {/* Top Product Showcase Card */}
        <ProductShowcaseCard
          onOpenEnquiry={handleOpenEnquiry}
          onOpenDownload={handleOpenDownload}
        />

        {/* Lower Main Sections: Description, Applications, Benefits, Properties Table */}
        <ProductDetailsContent
          onOpenEnquiry={handleOpenEnquiry}
          onOpenDownload={handleOpenDownload}
        />

        {/* Sub-Category Teardrop Navigation Grid */}
        <ProductSubCategoryNav />
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
        pdfType={downloadPdfType}
        pdfUrl={downloadPdfUrl}
      />
    </main>
  );
}
