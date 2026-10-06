"use client";

import React from "react";
import { useParams } from "next/navigation";
import { FileText, CheckCircle2, Zap, Layers, FlaskConical, MessageSquareDot } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";
import { FormattedText } from "@/components/FormattedText";

interface ProductDetailsContentProps {
  onOpenEnquiry: (productName?: string) => void;
  onOpenDownload: (pdfType: "TDS" | "MSDS") => void;
}

export function ProductDetailsContent({
  onOpenEnquiry,
  onOpenDownload,
}: ProductDetailsContentProps) {
  const params = useParams();
  const productSlug = params?.slug as string;

  const { productDetails, products } = useCMSStore();
  const product = productDetails[productSlug] || products?.find((p) => p.slug === productSlug);

  if (!product) return null;

  const hasMultiCols = Boolean(
    product.tableHeaders &&
    product.tableHeaders.length > 0 &&
    !product.tableHeaders.includes("Property"),
  );
  const colCount = hasMultiCols ? product.tableHeaders!.length : 1;

  return (
    <div className="space-y-6 mb-12">
      {/* Description */}
      {product.description && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-[#002b5c]/10 flex items-center justify-center shrink-0">
              <Layers size={16} className="text-[#002b5c]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#002b5c] tracking-tight">
              {product.descriptionTitle || "Product Description"}
            </h3>
          </div>
          <div className="px-6 py-5">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-normal">
              <FormattedText text={product.description} />
            </p>
          </div>
        </div>
      )}

      {/* Application Areas & Performance Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Areas */}
        {product.applicationAreas && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-[#C86218]/10 flex items-center justify-center shrink-0">
                <Zap size={16} className="text-[#C86218]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#002b5c] tracking-tight">
                {product.applicationAreasTitle || "Application Areas"}
              </h3>
            </div>
            <div className="px-6 py-5 flex-1">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                <FormattedText text={product.applicationAreas} />
              </p>
            </div>
          </div>
        )}

        {/* Performance Benefits */}
        {product.performanceBenefits && product.performanceBenefits.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#002b5c] tracking-tight">
                {product.performanceBenefitsTitle || "Performance Benefits"}
              </h3>
            </div>
            <ul className="px-6 py-5 space-y-2.5 flex-1">
              {product.performanceBenefits.map((benefit, bIdx) => (
                <li
                  key={bIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className="leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Special Features */}
      {product.specialFeatures && product.specialFeatures.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
              <FlaskConical size={16} className="text-amber-600" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#002b5c] tracking-tight">
              {product.specialFeaturesTitle || "Special Features"}
            </h3>
          </div>
          <div className="px-6 py-5">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {product.specialFeatures.map((feat, fIdx) => (
                <li
                  key={fIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-[#C86218]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86218]" />
                  </span>
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Physico-Chemical Properties Table */}
      {product.propertiesTable && product.propertiesTable.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-[#002b5c]/10 flex items-center justify-center shrink-0">
              <FlaskConical size={16} className="text-[#002b5c]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#002b5c] tracking-tight">
              {product.propertiesTableTitle || "Physico-Chemical Properties"}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              {/* Column headers (for multi-grade products) */}
              {hasMultiCols && (
                <thead>
                  <tr className="bg-[#002b5c]/5 border-b border-slate-200">
                    <th className="py-2.5 px-5 font-bold text-[#002b5c] border-r border-slate-200 text-[11px] uppercase tracking-wider w-[220px]">
                      Property
                    </th>
                    {product.tableHeaders!.map((hdr, hIdx) => (
                      <th
                        key={hIdx}
                        className="py-2.5 px-5 text-center font-bold text-[#002b5c] border-r border-slate-200 last:border-r-0 text-[11px] uppercase tracking-wider"
                      >
                        {hdr}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {product.propertiesTable.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`border-b border-slate-100 last:border-b-0 transition-colors ${
                      rIdx % 2 === 0
                        ? "bg-white hover:bg-slate-50/70"
                        : "bg-slate-50/60 hover:bg-slate-50"
                    }`}
                  >
                    <td className="py-2.5 px-5 font-semibold text-slate-700 border-r border-slate-200 text-[12px] w-[220px]">
                      {row.property}
                    </td>

                    {hasMultiCols ? (
                      row.values ? (
                        row.values.map((v, vIdx) => (
                          <td
                            key={vIdx}
                            className="py-2.5 px-5 text-slate-800 font-bold border-r border-slate-100 last:border-r-0 text-center text-[12px]"
                          >
                            {v}
                          </td>
                        ))
                      ) : (
                        <td
                          colSpan={colCount}
                          className="py-2.5 px-5 text-slate-800 font-bold border-slate-100 text-center text-[12px]"
                        >
                          {row.value}
                        </td>
                      )
                    ) : (
                      <td className="py-2.5 px-5 text-slate-800 font-bold text-[12px]">
                        {row.value}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Buttons: TDS, MSDS, & Inquire */}
      <div className="bg-gradient-to-r from-[#002b5c]/5 via-slate-50 to-[#C86218]/5 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <MessageSquareDot size={18} className="text-[#C86218]" />
          <div>
            <p className="text-xs font-bold text-[#002b5c] uppercase tracking-wide">
              Need More Info?
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              Download technical sheets or reach out directly.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenDownload("TDS")}
            className="bg-[#C86218] hover:bg-[#A74D0E] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <FileText size={14} /> Download TDS
          </button>

          <button
            type="button"
            onClick={() => onOpenDownload("MSDS")}
            className="bg-[#002b5c] hover:bg-[#001f42] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <FileText size={14} /> Download MSDS
          </button>

          <button
            type="button"
            onClick={() => onOpenEnquiry(product.name)}
            className="bg-white hover:bg-slate-50 text-[#002b5c] border border-slate-300 text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            Inquire Product
          </button>
        </div>
      </div>
    </div>
  );
}
