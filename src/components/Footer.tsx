"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Facebook,
  Youtube,
  Instagram,
  Mail,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
} from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface FooterProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function Footer({ onOpenEnquiry }: FooterProps) {
  const { globalSEO, fetchGlobalSEO, pages, fetchPage } = useCMSStore();

  useEffect(() => {
    fetchGlobalSEO().catch(console.error);
    fetchPage("contact-us").catch(console.error);
  }, [fetchGlobalSEO, fetchPage]);

  const socialLinks: any = globalSEO?.socialLinks || {};
  const copyrightText =
    socialLinks.copyrightText ||
    `© ${new Date().getFullYear()} Jai Deva Oil Co. All rights reserved.`;

  const contactHeadquarter = pages["contact-us"]?.ContactHeadquarter || {};
  const companyPhone =
    contactHeadquarter.phone || globalSEO?.phone || "+91 98120 22340";
  const companyEmail =
    contactHeadquarter.email || globalSEO?.email || "sales@jaideva.com";
  const companyAddress =
    contactHeadquarter.address ||
    globalSEO?.address ||
    "Industrial Area & Regional Distribution Hub, Haryana / Delhi NCR, India";
  const logoSrc = globalSEO?.logo || "/jaideva-logo.png";

  const quickLinks = [
    { name: "Products", href: "/products" },
    { name: "Brands", href: "/brands" },
    { name: "Industries", href: "/industries" },
  ];

  return (
    <>
      <footer className="bg-[#002242] text-white pt-12 pb-6 border-t border-[#003366] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10 items-start">
            {/* 1. LOGO & Social Media */}
            <div className="md:col-span-5 space-y-5">
              <Link href="/" className="inline-block">
                <div className="bg-white rounded-xl p-2.5 inline-flex items-center shadow-md">
                  <img
                    src={logoSrc}
                    alt="Jai Deva Oil Co."
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </Link>

              {/* Social Media */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Social Media
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={socialLinks.facebook || "https://facebook.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#3b5998] flex items-center justify-center text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href={socialLinks.linkedin || "https://linkedin.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0077b5] flex items-center justify-center text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={socialLinks.youtube || "https://youtube.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#ff0000] flex items-center justify-center text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube size={16} />
                  </a>
                  <a
                    href={socialLinks.instagram || "https://instagram.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#e4405f] flex items-center justify-center text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href={socialLinks.twitter || "https://twitter.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#1da1f2] flex items-center justify-center text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Quick Links: Products, Brands, Industries */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider border-l-2 border-[#C86218] pl-2.5">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-sm">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-[#F4B24D] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#C86218] text-xs">›</span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Contact Details */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider border-l-2 border-[#C86218] pl-2.5">
                Contact Details
              </h4>
              <div className="space-y-2.5 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#C86218] shrink-0 mt-0.5" />
                  <span className="leading-snug text-xs sm:text-sm">{companyAddress}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[#C86218] shrink-0" />
                  <a
                    href={`tel:${companyPhone.replace(/\s+/g, "")}`}
                    className="hover:text-white font-medium transition-colors text-xs sm:text-sm"
                  >
                    {companyPhone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail size={16} className="text-[#C86218] shrink-0" />
                  <a
                    href={`mailto:${companyEmail}`}
                    className="hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {companyEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>{copyrightText}</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <a href="/sitemap.xml" className="hover:text-white transition-colors">
                Site Map
              </a>
              <Link href="/contact-us" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent Sticky ENQUIRY Button Fixed on Bottom Right Corner */}
      <button
        onClick={() => onOpenEnquiry("Footer Site Enquiry")}
        className="fixed bottom-1 right-0 z-50 bg-[#C86218] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-tl-md shadow-2xl flex items-center gap-1.5 hover:bg-[#A74D0E] transition-all cursor-pointer"
      >
        <Mail size={14} />
        <span>ENQUIRY</span>
      </button>
    </>
  );
}
