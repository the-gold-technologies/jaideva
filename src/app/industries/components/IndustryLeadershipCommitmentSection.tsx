"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  ExternalLink,
  Video,
  MessageSquareQuote,
  Phone,
  ShieldCheck,
  Quote,
  Star,
} from "lucide-react";

const TEAM_COMMITMENTS = [
  {
    title: "Responsive Customer Service",
    desc: "Dedicated account managers responding promptly to plant requirements.",
    color: "from-[#0C356A]/10 to-[#0C356A]/5",
    border: "border-[#0C356A]/20",
  },
  {
    title: "Product Coordination",
    desc: "Coordinating multi-brand viscosity grades from central refinery depots.",
    color: "from-[#C86218]/10 to-[#C86218]/5",
    border: "border-[#C86218]/20",
  },
  {
    title: "Order Support",
    desc: "Accurate order processing, batch tracking, and logistics updates.",
    color: "from-[#0C356A]/10 to-[#0C356A]/5",
    border: "border-[#0C356A]/20",
  },
  {
    title: "Reliable Communication",
    desc: "Transparent inventory availability and consistent delivery timelines.",
    color: "from-[#C86218]/10 to-[#C86218]/5",
    border: "border-[#C86218]/20",
  },
  {
    title: "Application-Focused Assistance",
    desc: "Technical guidance on viscosity, synthetic upgrades, and drain intervals.",
    color: "from-[#0C356A]/10 to-[#0C356A]/5",
    border: "border-[#0C356A]/20",
  },
  {
    title: "Long-Term Customer Relationships",
    desc: "Committed to enduring partnership and consistent commercial pricing.",
    color: "from-emerald-50 to-emerald-50/50",
    border: "border-emerald-200",
  },
];

export default function IndustryLeadershipCommitmentSection() {
  return (
    <section className="py-24 bg-white text-slate-800 relative overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C86218]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Leadership & Quality Grid */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch mb-20">
          {/* Left Column: Leadership */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#C86218] pl-3 text-xs font-black uppercase tracking-[0.2em] text-[#C86218] mb-5">
              Executive Vision
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0C356A] mb-2">
              Our Leadership
            </h2>
            <p className="text-lg font-bold text-[#C86218] mb-8">
              Guided by Experience & Vision
            </p>

            {/* CEO Card */}
            <div className="flex-1 rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 shadow-sm relative overflow-hidden">
              {/* Background quote mark */}
              <Quote
                size={80}
                className="absolute -top-4 -right-4 text-[#0C356A]/5"
              />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0C356A] to-[#071f3b] text-[#F4B24D] flex items-center justify-center font-black text-xl shadow-lg">
                  MG
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0C356A]">
                    Mr. Mayank Goyal
                  </h3>
                  <p className="text-xs font-bold text-[#C86218] uppercase tracking-wider mt-0.5">
                    Mentor & Leader, Jai Deva Oil Co.
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-[#F4B24D] fill-[#F4B24D]"
                      />
                    ))}
                    <span className="text-[10px] text-slate-500 ml-1 font-medium">
                      16+ Years Industry Leadership
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                Mr. Mayank Goyal, the mentor and leader of Jai Deva Oil Co.,
                brings extensive knowledge and experience to the lubricant
                distribution industry. His balanced approach to business
                planning, customer relationships, and market development has
                established Jai Deva Oil Co. as a trusted name across industrial
                and automotive sectors.
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Under his leadership, the company continues to focus on business
                growth, product quality, customer satisfaction, and long-term
                partnerships.
              </p>

              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-700">
                <Users size={15} className="text-[#C86218]" />
                Team Size: 26–50 Professionals
              </div>
            </div>
          </div>

          {/* Right Column: Quality & Standards */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-1 rounded-3xl bg-[#071f3b] text-white p-7 sm:p-8 shadow-2xl relative overflow-hidden border border-white/10">
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(244,178,77,0.12),transparent)] pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F4B24D]/15 border border-[#F4B24D]/30 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#F4B24D] mb-5">
                  <ShieldCheck size={14} />
                  Quality & Testing Standards
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
                  Quality-Focused Lubricant Distribution
                </h3>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  Quality is at the core of our business approach. We source and
                  supply products from established brands, maintaining rigorous
                  quality checks as part of our product handling and
                  distribution process.
                </p>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Our objective is to provide customers with reliable, genuine,
                  and application-suitable lubrication products — every time.
                </p>

                {/* Quality Certifications */}
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Batch CoAs",
                      value: "100% Verified",
                      color: "text-emerald-400",
                    },
                    {
                      label: "Counterfeit Rate",
                      value: "Zero Tolerance",
                      color: "text-[#F4B24D]",
                    },
                    {
                      label: "Packaging",
                      value: "Tamper-Evident",
                      color: "text-emerald-400",
                    },
                    {
                      label: "Lab Analysis",
                      value: "Available",
                      color: "text-[#F4B24D]",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-white/5 border border-white/10 p-4"
                    >
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className={`text-sm font-black mt-1 ${item.color}`}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-[#C86218]/15 border border-[#C86218]/30 p-4">
                  <p className="text-xs font-bold text-white">
                    ✓ Every batch supplied is backed by authentic laboratory
                    analysis and tamper-evident packaging from authorized
                    refineries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team Commitments */}
        <div className="pt-14 border-t border-slate-200">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#C86218]">
              Our Professionals
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#0C356A] mt-2">
              Experienced People.{" "}
              <span className="text-[#C86218]">Customer-Focused</span>{" "}
              Approach.
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Our team consists of skilled professionals with experience in
              lubricant distribution, customer service, product coordination,
              and business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM_COMMITMENTS.map((c) => (
              <div
                key={c.title}
                className={`group rounded-2xl border ${c.border} bg-gradient-to-br ${c.color} p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#0C356A]">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#0C356A] via-[#0d3060] to-[#071f3b] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Glow orb */}
          <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#C86218]/10 blur-3xl" />
          <div className="absolute left-1/3 top-0 w-48 h-48 rounded-full bg-[#F4B24D]/5 blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B24D]">
                Our Commitment
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mt-2 leading-tight">
                Building Long-Term Partnerships Through Quality & Trust
              </h3>
              <p className="mt-4 text-sm text-slate-200 leading-relaxed max-w-2xl">
                At Jai Deva Oil Co., our objective is not simply to supply
                lubricants but to build long-term relationships with our
                customers. We continuously work towards understanding customer
                requirements, expanding our product portfolio, and providing
                reliable lubrication solutions across industrial and automotive
                applications.
              </p>
              <p className="mt-5 text-xs font-black uppercase tracking-wider text-[#F4B24D]">
                Quality Products · Multiple Brands · Reliable Supply · Trusted
                Service
              </p>
            </div>

            {/* External Links Buttons */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href="https://www.jaidevaoilco.in/testimonial.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[#F4B24D]/50 px-5 py-4 text-xs font-black uppercase tracking-wider text-white transition-all duration-200"
              >
                <span className="flex items-center gap-2.5">
                  <MessageSquareQuote
                    size={16}
                    className="text-[#F4B24D] group-hover:scale-110 transition-transform"
                  />
                  <span>Client Testimonials</span>
                </span>
                <ExternalLink size={13} className="text-white/40" />
              </a>

              <a
                href="https://www.youtube.com/@JaiDevaOilCo"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[#F4B24D]/50 px-5 py-4 text-xs font-black uppercase tracking-wider text-white transition-all duration-200"
              >
                <span className="flex items-center gap-2.5">
                  <Video
                    size={16}
                    className="text-[#F4B24D] group-hover:scale-110 transition-transform"
                  />
                  <span>Corporate Video</span>
                </span>
                <ExternalLink size={13} className="text-white/40" />
              </a>

              <Link
                href="/contact-us"
                className="group inline-flex items-center justify-between rounded-xl bg-[#C86218] hover:bg-[#a94e0e] px-5 py-4 text-xs font-black uppercase tracking-wider text-white transition-all duration-200 shadow-lg hover:shadow-[0_8px_24px_rgba(200,98,24,0.4)]"
              >
                <span className="flex items-center gap-2.5">
                  <Phone
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>Contact Our Team</span>
                </span>
                <ExternalLink size={13} className="text-white/60" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
