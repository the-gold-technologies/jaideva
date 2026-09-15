import React from "react";

export const supportAreas = [
  "Application-specific product recommendations",
  "Reduction in wear, friction, and maintenance downtime",
  "Efficient supply support for industrial operations",
  "Compatibility guidance for varied equipment and process needs",
  "Trusted service for repeat orders and plant reliability",
];

export default function WhyIndustriesChooseUs() {
  return (
    <section className="bg-[#f6f9fc] py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#C86218]">
              Why industries choose us
            </p>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-[#0C356A] sm:text-4xl">
              Reliable products. Practical support. Better uptime.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {supportAreas.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium leading-7 text-slate-700 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
