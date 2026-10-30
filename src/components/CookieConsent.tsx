"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Check if consent has already been given or declined
    try {
      const consent = localStorage.getItem("cookie_consent");
      const dismissed = sessionStorage.getItem("cookie_consent_dismissed");

      if (!consent && !dismissed) {
        const timer = setTimeout(() => {
          setIsRendered(true);
          requestAnimationFrame(() => setIsVisible(true));
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // safe fallback if storage is restricted
    }

    // Listen for custom event if user wants to change preferences later
    const handleOpen = () => {
      setIsRendered(true);
      requestAnimationFrame(() => setIsVisible(true));
    };

    window.addEventListener("open-cookie-preferences", handleOpen);
    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpen);
    };
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookie_consent", "accepted");
      document.cookie = "cookie_consent=accepted; path=/; max-age=31536000; SameSite=Lax";
    } catch {}
    closeBanner();
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("cookie_consent", "declined");
      document.cookie = "cookie_consent=declined; path=/; max-age=31536000; SameSite=Lax";
    } catch {}
    closeBanner();
  };

  const handleDismiss = () => {
    try {
      sessionStorage.setItem("cookie_consent_dismissed", "true");
    } catch {}
    closeBanner();
  };

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsRendered(false);
    }, 300);
  };

  if (!isRendered) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Preferences"
      className={`fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-[9990] max-w-[480px] w-[calc(100%-2rem)] sm:w-full transition-all duration-300 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white border border-slate-200/90 rounded-[28px] p-5 sm:p-6 shadow-2xl shadow-slate-900/15">
        {/* Header: Icon + Title + Close Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-300/80 flex items-center justify-center shrink-0">
              <Cookie className="w-6 h-6 text-amber-500" strokeWidth={2.2} />
            </div>
            <h3 className="text-slate-900 font-bold text-[17px] sm:text-[18px] tracking-tight">
              Cookie Preferences
            </h3>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close cookie preferences"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>

        {/* Content Body */}
        <p className="text-slate-600 text-[13.5px] sm:text-[14px] leading-relaxed mt-4 font-normal">
          We use cookies to improve your browsing experience, optimize site performance, and
          analyze traffic. Read our{" "}
          <Link
            href="/privacy-policy"
            className="text-amber-600 underline underline-offset-2 decoration-amber-500 hover:text-amber-700 transition-colors font-medium"
          >
            Privacy Policy
          </Link>{" "}
          to learn more.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-5">
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 py-3 px-5 rounded-full text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 active:scale-[0.98] transition-all text-center cursor-pointer"
          >
            Decline
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 py-3 px-5 rounded-full text-sm font-bold text-neutral-950 bg-[#FACC15] hover:bg-[#fde047] active:scale-[0.98] shadow-md shadow-amber-500/20 transition-all text-center cursor-pointer"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
