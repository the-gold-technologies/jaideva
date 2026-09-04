"use client";

import React from "react";
import { Home as HomeIcon, Phone, Mail, Send, PhoneCall } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

interface ContactSectionProps {
  onOpenEnquiry?: (productName?: string) => void;
  onOpenDistributor?: (type?: string) => void;
}

export default function LocateDistributorContactSection({
  onOpenEnquiry,
  onOpenDistributor,
}: ContactSectionProps) {
  const { globalSEO } = useCMSStore();

  const phone = globalSEO?.phone || "+91 98765 43210";
  const email = globalSEO?.email || "sales@jaidevaoil.com";
  const address =
    globalSEO?.address || "Industrial Area & Distribution Hub, India";

  return (
    <section id="contact" className="py-10 sm:py-14 lg:py-18 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Left Column: FIND THE RIGHT LUBRICANT FOR YOUR APPLICATION */}
          <div className="bg-[#ECEEF2] w-full lg:w-[68%] border-[#D1D1D1] border p-6 sm:p-8 lg:p-10 rounded-xl flex flex-col justify-between shadow-2xs">
            <div>
              {/* Category Tag / Title */}
              <h2 className="text-[#0C356A] font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase leading-tight tracking-tight">
                FIND THE RIGHT LUBRICANT FOR YOUR APPLICATION
              </h2>
              <div className="w-20 h-1 bg-[#C86218] mt-3 mb-5 rounded-full" />

              {/* Subheading */}
              <h3 className="text-lg sm:text-xl font-bold text-[#C86218] mb-4">
                Looking for the Right Lubrication Solution?
              </h3>

              {/* Body Text */}
              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  Every machine and application has different lubrication
                  requirements. Our team can help you identify suitable products
                  based on your equipment, application and operating conditions.
                </p>
                <p>
                  Whether you require Hydraulic Oil, Gear Oil, Engine Oil,
                  Industrial Grease, Cutting Oil or other specialty lubricants,{" "}
                  <strong className="text-[#0C356A] font-bold">
                    Jai Deva Oil Co.
                  </strong>{" "}
                  is ready to assist.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-300/80 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  onOpenEnquiry &&
                  onOpenEnquiry("Custom Lubrication Application Assistance")
                }
                className="inline-flex items-center justify-center gap-2 bg-[#C86218] hover:bg-[#A74D0E] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <Send size={16} />
                <span>Send Your Enquiry</span>
              </button>

              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0C356A] hover:bg-[#082142] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <PhoneCall size={16} />
                <span>Talk to Our Team</span>
              </a>
            </div>
          </div>

          {/* Right Column: JAI DEVA OIL CO. CONTACT DETAILS */}
          <div className="bg-[#ECEEF2] w-full lg:w-[32%] border-[#D1D1D1] border p-6 sm:p-8 rounded-xl flex flex-col justify-between shadow-2xs">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C356A] uppercase leading-tight tracking-tight">
                JAI DEVA OIL CO.
              </h2>
              <div className="w-16 h-1 bg-[#C86218] mt-3 mb-6 rounded-full" />

              {/* Brand Logo */}
              <div className="my-5 flex justify-start">
                <img
                  src="/jaideva-logo.png"
                  alt="Jai Deva Oil Co."
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              </div>

              {/* Contact Information List */}
              <div className="mt-6 flex flex-col gap-5 text-sm text-[#333333] leading-relaxed font-sans">
                {/* Address Item */}
                <div className="flex gap-3.5 items-start">
                  <HomeIcon
                    className="text-[#0C356A] w-5 h-5 shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div>
                    <strong className="font-bold text-[#0C356A]">
                      Jai Deva Oil Co.
                    </strong>
                    <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
                      {address}
                    </p>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex gap-3.5 items-start">
                  <Phone
                    className="text-[#0C356A] w-5 h-5 shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-xs sm:text-sm">
                      Direct Contact:{" "}
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="font-bold text-[#0C356A] hover:text-[#C86218] transition-colors"
                      >
                        {phone}
                      </a>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Working Hours: Mon - Sat: 9:00 AM - 6:30 PM
                    </p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex gap-3.5 items-center">
                  <Mail
                    className="text-[#0C356A] w-5 h-5 shrink-0"
                    strokeWidth={2}
                  />
                  <p className="text-xs sm:text-sm">
                    Email:{" "}
                    <a
                      href={`mailto:${email}`}
                      className="font-bold text-[#0C356A] hover:text-[#C86218] transition-colors"
                    >
                      {email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 w-full">
              <button
                type="button"
                onClick={() =>
                  onOpenEnquiry && onOpenEnquiry("Jai Deva Oil Co. Direct Contact")
                }
                className="w-full bg-[#C86218] hover:bg-[#A74D0E] text-white font-bold py-3 px-4 rounded text-xs uppercase tracking-wider shadow-sm transition-all text-center cursor-pointer"
              >
                Send Enquiry
              </button>
              <button
                type="button"
                onClick={() =>
                  onOpenDistributor &&
                  onOpenDistributor("Industrial Lube Distributor (ILD)")
                }
                className="w-full bg-[#0C356A] hover:bg-[#082142] text-white font-bold py-3 px-4 rounded text-xs uppercase tracking-wider shadow-sm transition-all text-center cursor-pointer"
              >
                Become a Distributor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
