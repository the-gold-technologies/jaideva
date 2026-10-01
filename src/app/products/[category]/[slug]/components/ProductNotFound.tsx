"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProductNotFoundProps {
  fontSizeMultiplier: number;
  setFontSizeMultiplier: React.Dispatch<React.SetStateAction<number>>;
  language: "EN" | "HI";
  setLanguage: React.Dispatch<React.SetStateAction<"EN" | "HI">>;
  onOpenEnquiry: (productName?: string) => void;
}

export function ProductNotFound({
  fontSizeMultiplier,
  setFontSizeMultiplier,
  language,
  setLanguage,
  onOpenEnquiry,
}: ProductNotFoundProps) {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans flex flex-col justify-between">
      <Navbar
        fontSizeMultiplier={fontSizeMultiplier}
        setFontSizeMultiplier={setFontSizeMultiplier}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-extrabold text-[#002b5c] mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The requested lubricant product could not be located.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#002b5c] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#C86218] transition"
        >
          <ArrowLeft size={16} /> Return to All Products
        </Link>
      </div>
      <Footer onOpenEnquiry={onOpenEnquiry} />
    </main>
  );
}
