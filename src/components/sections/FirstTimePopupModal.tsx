"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Send, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { CaptchaInput, useCaptcha } from "@/components/CaptchaWidget";

export default function FirstTimePopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const { fetchPage, pages, submitEnquiry } = useCMSStore();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    product: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    code,
    input: captchaInput,
    setInput: setCaptchaInput,
    refresh: refreshCaptcha,
    isValid: captchaValid,
  } = useCaptcha();

  // Check first visit and fetch page data
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenFirstTimePopup");

    fetchPage("home")
      .then((data) => {
        const popupConfig = data?.FirstTimePopup || {};
        const isEnabled = popupConfig.isEnabled ?? true;

        if (isEnabled && !hasSeenPopup) {
          const timer = setTimeout(() => {
            setIsOpen(true);
            refreshCaptcha();
          }, 1200);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => console.error("Error fetching popup config:", err));
  }, [fetchPage, refreshCaptcha]);

  // Disable background scrolling and manage focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }
      }, 60);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle keydown for escape and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("disabled"));

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      sessionStorage.setItem("hasSeenFirstTimePopup", "true");
    }, 220);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your mobile number.");
      return;
    }

    if (!formData.companyName.trim()) {
      setErrorMessage("Company / Business Name is required.");
      return;
    }

    if (!captchaValid) {
      setErrorMessage("Please enter the security verification code correctly.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await submitEnquiry({
        name: formData.name,
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email || "",
        product: formData.product || "",
        message: formData.message || "",
      });

      if (res && res.error) {
        setErrorMessage(res.error);
      } else {
        setIsSubmitted(true);
      }
    } catch (err: any) {
      console.error("Popup enquiry submission error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const popupConfig = pages["home"]?.FirstTimePopup || {};
  const isEnabled = popupConfig.isEnabled ?? true;
  const showForm = popupConfig.showForm ?? true;
  const popupImage = popupConfig.image || "";
  const formTitle = popupConfig.formTitle || "";

  if (!isOpen || !isEnabled) return null;

  // Banner-Only Mode (When showForm is disabled in CMS)
  if (!showForm) {
    if (!popupImage) return null;

    return (
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs transition-opacity duration-300 font-sans ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome announcement"
          className={`relative w-full max-w-2xl md:max-w-3xl bg-transparent rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {/* Floating Close Button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3.5 right-3.5 z-40 p-2 sm:p-2.5 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur-md transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95 border border-white/20 group"
            aria-label="Close popup"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>

          {/* Banner Graphic with increased height */}
          <div className="relative w-full overflow-hidden rounded-3xl bg-slate-900 border border-slate-700/60 shadow-2xl flex items-center justify-center">
            <img
              src={popupImage}
              alt="Announcement banner"
              className="w-full h-auto min-h-[380px] sm:min-h-[440px] md:min-h-[500px] max-h-[85vh] object-cover rounded-3xl select-none block"
            />
          </div>
        </div>
      </div>
    );
  }

  // Combined 50-50 Mode (Banner + Contact Form)
  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs transition-opacity duration-300 font-sans ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Welcome enquiry popup"
        className={`relative w-full ${
          popupImage ? "max-w-[840px]" : "max-w-[490px]"
        } max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all duration-300 grid grid-cols-1 ${
          popupImage ? "md:grid-cols-2" : ""
        } ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
      >
        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-3 right-3 z-40 p-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          aria-label="Close popup"
        >
          <X size={16} />
        </button>

        {/* 50% Left Column: Graphic Banner Image */}
        {popupImage && (
          <div className="relative bg-slate-900 overflow-hidden h-[180px] md:h-auto min-h-[180px] md:min-h-full">
            <img
              src={popupImage}
              alt="Promotional banner"
              className="w-full h-full object-cover object-center block"
            />
          </div>
        )}

        {/* 50% Right Column: Enquiry Form (Contact Us Matching Style) */}
        <div className="p-5 sm:p-6 md:p-6.5 flex flex-col justify-center overflow-y-auto max-h-[90vh]">
          {!isSubmitted ? (
            <>
              {/* Header */}
              {formTitle && (
                <div className="mb-3 pr-6">
                  <h2 className="text-xl font-extrabold text-[#002b5c] tracking-tight">
                    {formTitle}
                  </h2>
                </div>
              )}

              {errorMessage && (
                <div className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Form matching Contact Us Form styling */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Row 1: Full Name & Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Full Name <span className="text-[#C86218]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Mobile Number <span className="text-[#C86218]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="10-digit mobile"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Company Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Company Name <span className="text-[#C86218]">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="Your company / business name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Product Requirement */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Product Requirement
                  </label>
                  <input
                    type="text"
                    name="product"
                    placeholder="e.g. HP Lubricants"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all"
                  />
                </div>

                {/* Row 4: Message / Requirement Details */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Your Message / Requirement Details
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    placeholder="Provide details about your inquiry or product requirement..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10 transition-all resize-none"
                  />
                </div>

                {/* Row 5: Visual Security Verification */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Security Verification <span className="text-[#C86218]">*</span>
                  </label>
                  <CaptchaInput
                    code={code}
                    value={captchaInput}
                    onChange={setCaptchaInput}
                    isValid={captchaValid}
                    onRefresh={refreshCaptcha}
                  />
                </div>

                {/* Row 6: Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C86218] hover:bg-[#A74D0E] active:scale-[0.99] text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3 px-5 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Success Confirmation View */
            <div className="text-center py-8 px-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3.5 text-green-600 shadow-inner">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1.5">
                Enquiry Submitted Successfully!
              </h3>
              <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong> from{" "}
                <strong>{formData.companyName}</strong>. We will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer"
              >
                <span>Done</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
