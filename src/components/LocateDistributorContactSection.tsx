"use client";

import React, { useState } from "react";
import {
  Home as HomeIcon,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  Building,
  User,
  Truck,
  MessageSquare,
} from "lucide-react";
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
  const { pages, submitEnquiry } = useCMSStore();
  const cmsSection = pages["home"]?.LocateDistributorSection;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "Industrial Lubricant Enquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!cmsSection) {
    return null;
  }

  // Dynamic CMS fields
  const heading =
    cmsSection.heading || "FIND THE RIGHT LUBRICANT FOR YOUR APPLICATION";
  const subheading =
    cmsSection.subheading || "Looking for the Right Lubrication Solution?";
  const paragraph1 =
    cmsSection.paragraph1 ||
    "Every machine and application has different lubrication requirements. Our team can help you identify suitable products based on your equipment, application and operating conditions.";
  const paragraph2 =
    cmsSection.paragraph2 ||
    "Whether you require Hydraulic Oil, Gear Oil, Engine Oil, Industrial Grease, Cutting Oil or other specialty lubricants, Jai Deva Oil Co. is ready to assist.";
  const companyName = cmsSection.companyName || "Jai Deva Oil Co.";
  const contactTitle = cmsSection.contactTitle || "JAI DEVA OIL CO.";
  const address =
    cmsSection.address || "Industrial Area & Distribution Hub, India";
  const phone = cmsSection.phone || "+91 98120 22340";
  const email = cmsSection.email || "sales@jaideva.com";
  const workingHours =
    cmsSection.workingHours || "Working Hours: Mon - Sat: 9:00 AM - 6:30 PM";
  const btn1Text = cmsSection.btn1Text || cmsSection.primaryBtnLabel || "Send Enquiry";
  const btn2Text =
    cmsSection.btn2Text || cmsSection.secondaryBtnLabel || "Become a Distributor";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        product: formData.product,
        message: formData.message,
      });

      if (res && res.error) {
        setErrorMessage(res.error);
      } else {
        setIsSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          product: "Industrial Lubricant Enquiry",
          message: "",
        });
      }
    } catch (err: any) {
      console.error("Direct enquiry submission error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFC] font-sans border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header from CMS */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {subheading && (
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#C86218] bg-orange-50 border border-orange-200 px-3.5 py-1 rounded-full mb-3 shadow-2xs">
              <FormattedText text={subheading} />
            </div>
          )}

          {heading && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0C356A] uppercase tracking-tight leading-tight">
              <FormattedText text={heading} />
            </h2>
          )}

          {paragraph1 && (
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              <FormattedText text={paragraph1} />
            </p>
          )}
        </div>

        {/* 2-Column Responsive Layout: Contact Info & Inline Quick Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Hub & Contact Channels */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div>
              {/* Brand Logo & Name */}
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                <img
                  src="/jaideva-logo.png"
                  alt={companyName || contactTitle}
                  className="h-12 sm:h-14 w-auto object-contain"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0C356A] leading-tight">
                    {contactTitle}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Authorized Lubricant Distribution
                  </span>
                </div>
              </div>

              {/* Explanatory Paragraph 2 from CMS */}
              {paragraph2 && (
                <p className="py-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-b border-slate-100">
                  <FormattedText text={paragraph2} />
                </p>
              )}

              {/* Contact Information Points */}
              <div className="pt-4 space-y-4 text-xs sm:text-sm text-slate-700">
                {address && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0C356A] flex items-center justify-center shrink-0 mt-0.5">
                      <HomeIcon size={16} />
                    </div>
                    <div>
                      <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Facility & Hub
                      </span>
                      <p className="font-medium text-slate-800 leading-snug">
                        <FormattedText text={address} />
                      </p>
                    </div>
                  </div>
                )}

                {phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#C86218] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Direct Lines
                      </span>
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="font-bold text-[#0C356A] hover:text-[#C86218] transition-colors"
                      >
                        {phone}
                      </a>
                      {workingHours && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          <FormattedText text={workingHours} />
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {email && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Sales & Technical Support
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="font-bold text-[#0C356A] hover:text-[#C86218] transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Become a Partner Button */}
            {btn2Text && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    onOpenDistributor &&
                    onOpenDistributor("Industrial Lube Distributor (ILD)")
                  }
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Truck size={16} />
                  <span>{btn2Text}</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Direct CMS-Connected Quick Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="mb-6">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#C86218] block mb-1">
                Direct Inquiry Channel
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0C356A] tracking-tight">
                Request a Lubrication Quote or Callback
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Submissions route directly into our central order & logistics dispatch management system.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 px-6 text-center bg-emerald-50/60 rounded-xl border border-emerald-200/80 animate-in fade-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-lg font-black text-emerald-950 uppercase tracking-tight">
                  Enquiry Successfully Received!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1.5 max-w-md mx-auto">
                  Thank you for contacting Jai Deva Oil Co. Our application engineer will review your machinery requirements and reach out promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-5 text-xs font-bold text-emerald-700 underline hover:text-emerald-900 cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. procurement@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Lubricant Category
                    </label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:bg-white transition-colors"
                    >
                      <option value="Industrial Lubricant Enquiry">Industrial Oils & Lubricants</option>
                      <option value="Hydraulic Oil">Hydraulic Oils (ISO VG 32/46/68)</option>
                      <option value="Industrial Gear Oil">Industrial Gear Oils (EP Series)</option>
                      <option value="Commercial Vehicle Engine Oil">Commercial Engine Oils (15W-40 / 10W-30)</option>
                      <option value="High Temperature Grease">Specialty & High-Temp Greases</option>
                      <option value="Cutting & Metalworking Fluid">Cutting & Water-Soluble Fluids</option>
                      <option value="Plant Lubrication Audit">Complete Plant TCO Audit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Requirements & Operating Conditions
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Specify equipment type, machinery make, operating temperature, or required brand/volume..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#C86218] hover:bg-[#A74D0E] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending to CMS...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>{btn1Text}</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    * Directly submitted to Jai Deva Oil Co. authorized sales dispatch desk.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
