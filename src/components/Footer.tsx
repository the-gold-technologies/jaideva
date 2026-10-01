"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Facebook, Instagram, Mail, Linkedin, MapPin, Phone } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface FooterProps {
  onOpenEnquiry: (productName?: string) => void;
}

export default function Footer({ onOpenEnquiry }: FooterProps) {
  const { globalSEO, fetchGlobalSEO } = useCMSStore();

  useEffect(() => {
    fetchGlobalSEO().catch(console.error);
  }, [fetchGlobalSEO]);

  const socialLinks: any = globalSEO?.socialLinks || {};
  const copyrightText = socialLinks.copyrightText || "";
  const companyPhone = globalSEO?.phone || "";
  const companyEmail = globalSEO?.email || "";
  const companyAddress = globalSEO?.address || "";
  const logoSrc = socialLinks.footerLogo || globalSEO?.logo || "";

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
              {logoSrc && (
                <Link href="/" className="inline-block">
                  <div className="bg-white rounded-xl p-2.5 inline-flex items-center shadow-md">
                    <img
                      src={logoSrc}
                      alt={globalSEO?.siteTitle || "Jai Deva Oil Co."}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                </Link>
              )}

              {/* Social Media */}
              {(socialLinks.facebook || socialLinks.linkedin || socialLinks.instagram) && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Social Media
                  </div>
                  <div className="flex items-center gap-2">
                    {socialLinks.facebook && (
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#3b5998] flex items-center justify-center text-white transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook size={16} />
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0077b5] flex items-center justify-center text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#e4405f] flex items-center justify-center text-white transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={16} />
                      </a>
                    )}
                  </div>
                </div>
              )}
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
            {(companyAddress || companyPhone || companyEmail) && (
              <div className="md:col-span-4 space-y-3">
                <h4 className="text-sm font-black text-white uppercase tracking-wider border-l-2 border-[#C86218] pl-2.5">
                  Contact Details
                </h4>
                <div className="space-y-2.5 text-sm text-slate-300">
                  {companyAddress && (
                    <div className="flex items-start gap-2.5">
                      <MapPin size={16} className="text-[#C86218] shrink-0 mt-0.5" />
                      <span className="leading-snug text-xs sm:text-sm">{companyAddress}</span>
                    </div>
                  )}

                  {companyPhone && (
                    <div className="flex items-center gap-2.5">
                      <Phone size={16} className="text-[#C86218] shrink-0" />
                      <a
                        href={`tel:${companyPhone.replace(/\s+/g, "")}`}
                        className="hover:text-white font-medium transition-colors text-xs sm:text-sm"
                      >
                        {companyPhone}
                      </a>
                    </div>
                  )}

                  {companyEmail && (
                    <div className="flex items-center gap-2.5">
                      <Mail size={16} className="text-[#C86218] shrink-0" />
                      <a
                        href={`mailto:${companyEmail}`}
                        className="hover:text-white transition-colors text-xs sm:text-sm"
                      >
                        {companyEmail}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            {copyrightText && <p>{copyrightText}</p>}
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
        onClick={() => onOpenEnquiry("")}
        className="fixed bottom-1 right-0 z-50 bg-[#C86218] text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-tl-md shadow-2xl flex items-center gap-1.5 hover:bg-[#A74D0E] transition-all cursor-pointer"
      >
        <Mail size={14} />
        <span>ENQUIRY</span>
      </button>
    </>
  );
}
