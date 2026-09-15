"use client";

import React from "react";
import { Home as HomeIcon, Phone, Mail } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

interface ContactSectionProps {
  onOpenEnquiry?: (productName?: string) => void;
  onOpenDistributor?: (type?: string) => void;
}

export default function LocateDistributorContactSection({
  onOpenEnquiry,
  onOpenDistributor,
}: ContactSectionProps) {
  const { pages } = useCMSStore();
  const cmsSection = pages["home"]?.LocateDistributorSection;

  if (!cmsSection) {
    return null;
  }

  const contactTitle = cmsSection.contactTitle || "";
  const companyName = cmsSection.companyName || "";
  const address = cmsSection.address || "";
  const phone = cmsSection.phone || "";
  const email = cmsSection.email || "";
  const workingHours = cmsSection.workingHours || "";
  const btn1Text = cmsSection.btn1Text || "";
  const btn2Text = cmsSection.btn2Text || "";

  return (
    <section
      id="contact"
      className="py-10 sm:py-14 lg:py-18 bg-white font-sans"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#ECEEF2] border-l-4 border-[#0C356A] border-y border-r border-[#D1D1D1] rounded-xl shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Brand */}
            <div className="flex shrink-0 items-center">
              <img
                src="/jaideva-logo.png"
                alt={companyName || contactTitle || "Jai Deva Oil Co."}
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>

            {/* Contact Information Row */}
            <div className="flex flex-1 flex-col gap-4 text-sm text-[#333333] sm:flex-row sm:flex-wrap sm:gap-8 lg:border-x lg:border-slate-300/70 lg:px-8">
              {address && (
                <div className="flex items-start gap-3">
                  <HomeIcon
                    className="text-[#0C356A] w-5 h-5 shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                    <FormattedText text={address} />
                  </p>
                </div>
              )}

              {phone && (
                <div className="flex items-start gap-3">
                  <Phone
                    className="text-[#0C356A] w-5 h-5 shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-xs sm:text-sm font-bold text-[#0C356A] hover:text-[#C86218] transition-colors"
                    >
                      {phone}
                    </a>
                    {workingHours && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        <FormattedText text={workingHours} />
                      </p>
                    )}
                  </div>
                </div>
              )}

              {email && (
                <div className="flex items-center gap-3">
                  <Mail
                    className="text-[#0C356A] w-5 h-5 shrink-0"
                    strokeWidth={2}
                  />
                  <a
                    href={`mailto:${email}`}
                    className="text-xs sm:text-sm font-bold text-[#0C356A] hover:text-[#C86218] transition-colors"
                  >
                    {email}
                  </a>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {(btn1Text || btn2Text) && (
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:w-48 lg:shrink-0">
                {btn1Text && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenEnquiry &&
                      onOpenEnquiry("Jai Deva Oil Co. Direct Contact")
                    }
                    className="w-full bg-[#C86218] hover:bg-[#A74D0E] text-white font-bold py-3 px-4 rounded text-xs uppercase tracking-wider shadow-sm transition-all text-center cursor-pointer"
                  >
                    {btn1Text}
                  </button>
                )}
                {btn2Text && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenDistributor &&
                      onOpenDistributor("Industrial Lube Distributor (ILD)")
                    }
                    className="w-full bg-[#0C356A] hover:bg-[#082142] text-white font-bold py-3 px-4 rounded text-xs uppercase tracking-wider shadow-sm transition-all text-center cursor-pointer"
                  >
                    {btn2Text}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
