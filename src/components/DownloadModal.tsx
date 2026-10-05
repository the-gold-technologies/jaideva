"use client";

import React, { useState, useEffect } from "react";
import { X, Download, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { CaptchaInput, useCaptcha } from "@/components/CaptchaWidget";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  pdfType: "TDS" | "MSDS";
  pdfUrl?: string;
}

export default function DownloadModal({
  isOpen,
  onClose,
  productName,
  pdfType = "TDS",
  pdfUrl = "",
}: DownloadModalProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const { submitEnquiry } = useCMSStore();
  const {
    code: captchaCode,
    input: captchaInput,
    setInput: setCaptchaInput,
    refresh: refreshCaptcha,
    isValid: captchaValid,
  } = useCaptcha();

  useEffect(() => {
    if (isOpen) {
      setIsDownloaded(false);
      refreshCaptcha();
    }
  }, [isOpen, refreshCaptcha]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValid) {
      return;
    }
    setIsSubmitting(true);

    try {
      await submitEnquiry({
        name,
        company,
        phone: mobile,
        email: email || undefined,
        product: `${productName} (${pdfType} Download)`,
        message: `Requested ${pdfType} document for ${productName}. Company: ${company || "N/A"}`,
      });
    } catch (err) {
      console.error("Download lead capture error:", err);
    } finally {
      setIsSubmitting(false);
      setIsDownloaded(true);
    }

    // Trigger actual PDF download
    if (pdfUrl && pdfUrl !== "#") {
      try {
        const response = await fetch(pdfUrl);
        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = `${productName.replace(/[^a-zA-Z0-9_-]/g, "_")}_${pdfType}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        } else {
          // Direct fallback
          const link = document.createElement("a");
          link.href = pdfUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.download = `${productName.replace(/[^a-zA-Z0-9_-]/g, "_")}_${pdfType}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch {
        // Fallback for CORS or network issues
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.download = `${productName.replace(/[^a-zA-Z0-9_-]/g, "_")}_${pdfType}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {!isDownloaded ? (
          <>
            {/* Header */}
            <div className="mb-5 pr-6">
              <span className="text-[11px] font-extrabold text-[#C86218] uppercase tracking-wider block mb-1">
                TECHNICAL DATASHEET DOWNLOAD
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#002b5c] flex items-center gap-2">
                <FileText size={22} className="text-[#C86218]" /> Download {pdfType} PDF
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Product: <strong className="text-[#002b5c]">{productName}</strong>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Full Name <span className="text-[#C86218]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Mobile Number <span className="text-[#C86218]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Email Address <span className="text-[#C86218]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Company / Organization Name <span className="text-[#C86218]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Industrial Enterprises / Manufacturing Ltd."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#002b5c] focus:ring-1 focus:ring-[#002b5c] transition-colors"
                />
              </div>

              {/* Security CAPTCHA */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Security Verification <span className="text-[#C86218]">*</span>
                </label>
                <CaptchaInput
                  code={captchaCode}
                  value={captchaInput}
                  onChange={setCaptchaInput}
                  isValid={captchaValid}
                  onRefresh={refreshCaptcha}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !captchaValid}
                  className="w-full bg-[#C86218] hover:bg-[#A74D0E] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Download size={16} /> Download {pdfType} PDF Document
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 size={44} className="mx-auto text-green-500 mb-3" />
            <h3 className="text-xl font-extrabold text-[#002b5c] mb-1">Download Started!</h3>
            <p className="text-xs text-gray-600 mb-6 leading-relaxed">
              Thank you <strong>{name}</strong>. The technical document{" "}
              <strong>
                {productName} ({pdfType})
              </strong>{" "}
              is downloading to your device.
            </p>
            {pdfUrl && pdfUrl !== "#" && (
              <div className="mb-5">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`${productName.replace(/[^a-zA-Z0-9_-]/g, "_")}_${pdfType}.pdf`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C86218] hover:text-[#A74D0E] underline transition-colors"
                >
                  <Download size={14} /> Click here if download didn&apos;t start automatically
                </a>
              </div>
            )}
            <button
              onClick={() => {
                setIsDownloaded(false);
                onClose();
              }}
              className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
