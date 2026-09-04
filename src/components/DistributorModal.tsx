'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Loader2, Building, MapPin, Phone, Mail, User } from 'lucide-react';
import { useCMSStore } from '@/store/useCMSStore';

interface DistributorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh"
];

const LUBE_TYPES = [
  "Industrial Lube Distributor (ILD)",
  "Bazaar Lube Distributor (BLD)",
  "CFA Distributor",
  "Caltex Distributor",
  "Multi-Brand Dealership",
  "Other Partnership"
];

export default function DistributorModal({
  isOpen,
  onClose,
  initialType = 'Industrial Lube Distributor (ILD)'
}: DistributorModalProps) {
  const [name, setName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [city, setCity] = useState('');
  const [lubeType, setLubeType] = useState(initialType);
  const [currentBusiness, setCurrentBusiness] = useState('');
  const [experienceYears, setExperienceYears] = useState('5-10 Years');
  const [investmentCapacity, setInvestmentCapacity] = useState('₹10 - 25 Lakhs');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { submitDistributorLead } = useCMSStore();

  useEffect(() => {
    if (initialType) {
      setLubeType(initialType);
    }
  }, [initialType]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitDistributorLead({
        name,
        firmName,
        phone,
        email: email || undefined,
        state,
        city,
        lubeType,
        currentBusiness,
        experienceYears,
        investmentCapacity,
        message: message || undefined,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Distributor submission error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setFirmName('');
    setPhone('');
    setEmail('');
    setCity('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="text-[11px] font-extrabold text-[#C86218] uppercase tracking-wider block mb-1">
                JAI DEVA OIL CO. DISTRIBUTION NETWORK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0C356A]">
                Apply for Dealership / Distributorship
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Partner with Jai Deva Oil Co. — Authorized Multi-Brand Industrial &amp; Automotive Lubricants Distributor.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Contact Person Name <span className="text-[#C86218]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Firm / Company Name <span className="text-[#C86218]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kumar Auto Spares & Lubes"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Phone / Mobile Number <span className="text-[#C86218]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Distributorship Interest Type <span className="text-[#C86218]">*</span>
                  </label>
                  <select
                    value={lubeType}
                    onChange={(e) => setLubeType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] bg-white transition-colors"
                  >
                    {LUBE_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Current Business Field <span className="text-[#C86218]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Auto Parts / Industrial Supplies"
                    value={currentBusiness}
                    onChange={(e) => setCurrentBusiness(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    State <span className="text-[#C86218]">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] bg-white transition-colors"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    City / Target District <span className="text-[#C86218]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Baghpat / Meerut / Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Years of Distribution Experience
                  </label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] bg-white transition-colors"
                  >
                    <option value="New Entrant">New Entrant / Startup</option>
                    <option value="1-3 Years">1 - 3 Years</option>
                    <option value="3-5 Years">3 - 5 Years</option>
                    <option value="5-10 Years">5 - 10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Investment Capacity
                  </label>
                  <select
                    value={investmentCapacity}
                    onChange={(e) => setInvestmentCapacity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] bg-white transition-colors"
                  >
                    <option value="₹5 - 10 Lakhs">₹5 - 10 Lakhs</option>
                    <option value="₹10 - 25 Lakhs">₹10 - 25 Lakhs</option>
                    <option value="₹25 - 50 Lakhs">₹25 - 50 Lakhs</option>
                    <option value="₹50 Lakhs - 1 Crore">₹50 Lakhs - 1 Crore</option>
                    <option value="Above ₹1 Crore">Above ₹1 Crore</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Territory Coverage / Proposal Note
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your current distribution network, target territory, or warehouse facilities..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#0C356A] focus:ring-1 focus:ring-[#0C356A] transition-colors"
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 font-semibold">{errorMessage}</p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C86218] hover:bg-[#A74D0E] disabled:opacity-70 text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Distributorship Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 size={50} className="mx-auto text-green-500 mb-3" />
            <h3 className="text-2xl font-black text-[#0C356A] mb-2">
              Application Received!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
              Thank you <strong>{name}</strong> from <strong>{firmName}</strong>. Your distributorship application for <strong>{city}, {state}</strong> has been registered with Jai Deva Oil Co. Our channel development team will get in touch with you shortly at <strong>{phone}</strong>.
            </p>
            <button
              onClick={handleResetAndClose}
              className="bg-[#0C356A] hover:bg-[#082142] text-white text-xs sm:text-sm font-bold px-8 py-3 rounded-lg transition-colors cursor-pointer"
            >
              Done &amp; Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
