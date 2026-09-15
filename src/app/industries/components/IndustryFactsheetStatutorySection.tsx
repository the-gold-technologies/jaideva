"use client";

import React from "react";
import { FileText, ShieldCheck, Building, Landmark, Calendar, Users, Banknote, TrendingUp } from "lucide-react";

export default function IndustryFactsheetStatutorySection() {
  const FACTSHEET_DATA = [
    { label: "Year of Establishment", value: "2008", icon: Calendar },
    { label: "Nature of Business", value: "Trader – Wholesaler / Distributor", icon: Building },
    { label: "Additional Business", value: "Wholesale, Retail, Warehouse / Depot", icon: TrendingUp },
    { label: "Company CEO / Mentor", value: "Mr. Mayank Goyal", icon: Users },
    { label: "Legal Status", value: "Proprietorship", icon: FileText },
    { label: "Total Employees", value: "26–50 People", icon: Users },
    { label: "GST Registration Date", value: "01 July 2017", icon: Calendar },
    { label: "Annual Turnover", value: "₹25–100 Crore*", icon: Banknote },
    { label: "Shipment Mode", value: "By Road", icon: FileText },
    { label: "Customized Packaging", value: "No (Factory Sealed — Refinery Standard)", icon: ShieldCheck },
  ];

  const STATUTORY_DATA = [
    { label: "Import Export Code (IEC)", value: "0515052311" },
    { label: "GST Registration No.", value: "07AJLPG5662J1ZW" },
    { label: "Tax Deduction Account (TAN)", value: "DELM2*****" },
    { label: "Legal Entity Type", value: "Proprietorship" },
    { label: "Primary Banking Partners", value: "Axis Bank · SBI · IDFC FIRST Bank" },
  ];

  return (
    <section className="py-24 bg-[#071f3b] text-white relative overflow-hidden">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(12,53,106,0.4),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#F4B24D]/30 bg-[#F4B24D]/10 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#F4B24D] mb-5">
            <ShieldCheck size={14} />
            Corporate Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
            Company Factsheet &{" "}
            <span className="bg-gradient-to-r from-[#F4B24D] to-[#C86218] bg-clip-text text-transparent">
              Statutory Profile
            </span>
          </h2>
          <p className="mt-5 text-base text-slate-300 leading-relaxed">
            Transparent corporate disclosures, registration certifications, and
            business parameters demonstrating our track record of reliability
            since 2008.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Company Factsheet (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#0C356A] text-[#F4B24D] flex items-center justify-center shadow-md">
                <Building size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-white">
                  Company Factsheet
                </h3>
                <p className="text-xs text-slate-400">
                  Core operational & organizational details
                </p>
              </div>
            </div>

            <div className="space-y-1">
              {FACTSHEET_DATA.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors ${
                      idx % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    } hover:bg-white/10`}
                  >
                    <div className="flex items-center gap-3 text-slate-400 text-xs font-bold w-2/5 shrink-0">
                      <Icon size={14} className="text-[#C86218] shrink-0" />
                      <span>{row.label}</span>
                    </div>
                    <span className="text-sm font-bold text-white text-right">
                      {row.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 text-[11px] text-slate-500 italic px-4">
              * Turnover figures reflect verified operations and audited
              distribution volumes.
            </p>
          </div>

          {/* Statutory Profile (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-5 mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#C86218]/20 text-[#F4B24D] flex items-center justify-center shadow-md">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase text-white">
                    Statutory Profile
                  </h3>
                  <p className="text-xs text-slate-400">
                    Legal registrations & compliance
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {STATUTORY_DATA.map((row) => (
                  <div
                    key={row.label}
                    className="rounded-xl bg-white/5 border border-white/8 p-4 hover:bg-white/10 transition-colors"
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      {row.label}
                    </p>
                    <p className="text-sm font-bold text-white">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Transparency card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0C356A] to-[#071f3b] border border-[#F4B24D]/20 p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Landmark size={18} className="text-[#F4B24D]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#F4B24D]">
                  Financial Transparency
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All commercial billing and tax invoices comply with GSTN
                standards and include genuine manufacturer batch test
                certificates for complete audit readiness.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <ShieldCheck size={14} />
                GST Compliant Since 01 July 2017
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
