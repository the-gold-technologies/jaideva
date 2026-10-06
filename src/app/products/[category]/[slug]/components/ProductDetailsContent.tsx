"use client";

import React from "react";
import { useParams } from "next/navigation";
import { FileText } from "lucide-react";
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
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-base sm:text-lg font-bold text-[#002b5c] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C86218]" />{" "}
            {product.descriptionTitle || "Description"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-normal">
            <FormattedText text={product.description} />
          </p>
        </div>
      )}

      {/* Application Areas & Performance Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Application Areas */}
        {product.applicationAreas && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-[#C86218] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#002b5c]" />{" "}
              {product.applicationAreasTitle || "Application Areas"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              <FormattedText text={product.applicationAreas} />
            </p>
          </div>
        )}

        {/* Performance Benefits */}
        {product.performanceBenefits && product.performanceBenefits.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
            <h3 className="text-base sm:text-lg font-bold text-[#C86218] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#002b5c]" />{" "}
              {product.performanceBenefitsTitle || "Performance Benefits"}
            </h3>
            <ul className="space-y-2.5">
              {product.performanceBenefits.map((benefit, bIdx) => (
                <li
                  key={bIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <span className="text-[#C86218] font-bold text-sm leading-none mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Special Features */}
      {product.specialFeatures && product.specialFeatures.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="text-base sm:text-lg font-bold text-[#002b5c] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C86218]" />{" "}
            {product.specialFeaturesTitle || "Special Features"}
          </h3>
          <ul className="space-y-2">
            {product.specialFeatures.map((feat, fIdx) => (
              <li key={fIdx} className="text-xs sm:text-sm text-slate-700">
                {feat}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Physico-Chemical Properties Table */}
      {product.propertiesTable && product.propertiesTable.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs pt-4">
          <div className="px-6 pb-3">
            <h3 className="text-base sm:text-lg font-bold text-[#002b5c] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C86218]" />{" "}
              {product.propertiesTableTitle || "Physico-Chemical Properties"}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="bg-[#002b5c] text-white">
                  <th
                    colSpan={hasMultiCols ? colCount + 1 : 2}
                    className="py-3 px-4 text-center font-extrabold uppercase border-b border-[#002b5c]"
                  >
                    {product.name}
                  </th>
                </tr>
                {hasMultiCols && (
                  <tr className="bg-[#002b5c] text-white border-t border-white/20">
                    <th className="py-2 px-4 border-r border-white/20"></th>
                    {product.tableHeaders!.map((hdr, hIdx) => (
                      <th
                        key={hIdx}
                        className="py-2 px-4 text-center font-bold border-r border-white/20 last:border-r-0"
                      >
                        {hdr}
                      </th>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody>
                {product.propertiesTable.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="py-2.5 px-4 font-semibold text-slate-700 border-b border-r border-slate-200">
                      {row.property}
                    </td>

                    {hasMultiCols ? (
                      row.values ? (
                        row.values.map((v, vIdx) => (
                          <td
                            key={vIdx}
                            className="py-2.5 px-4 text-slate-900 font-bold border-b border-r border-slate-200 last:border-r-0 text-center"
                          >
                            {v}
                          </td>
                        ))
                      ) : (
                        <td
                          colSpan={colCount}
                          className="py-2.5 px-4 text-slate-900 font-bold border-b border-slate-200 text-center"
                        >
                          {row.value}
                        </td>
                      )
                    ) : (
                      <td className="py-2.5 px-4 text-slate-900 font-bold border-b border-slate-200 text-center">
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
      <div className="pt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onOpenDownload("TDS")}
          className="bg-[#C86218] hover:bg-[#A74D0E] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-xs transition cursor-pointer"
        >
          <FileText size={15} /> Download PDF (TDS)
        </button>

        <button
          type="button"
          onClick={() => onOpenDownload("MSDS")}
          className="bg-[#002b5c] hover:bg-[#001f42] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-xs transition cursor-pointer"
        >
          <FileText size={15} /> Download MSDS PDF
        </button>

        <button
          type="button"
          onClick={() => onOpenEnquiry(product.name)}
          className="bg-slate-800 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg transition cursor-pointer"
        >
          Inquire Product
        </button>
      </div>
    </div>
  );
}
