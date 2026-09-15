import React from "react";
import {
  ClipboardList,
  FlaskConical,
  Truck,
  HeadphonesIcon,
} from "lucide-react";

export const processSteps = [
  {
    icon: ClipboardList,
    title: "Understand your process",
    description:
      "We start by learning about your equipment, operating conditions, and existing lubrication practices.",
  },
  {
    icon: FlaskConical,
    title: "Recommend the right product",
    description:
      "Based on load, temperature, and application, we match you with the lubricant grade that fits your machinery.",
  },
  {
    icon: Truck,
    title: "Deliver on schedule",
    description:
      "Reliable stock and dispatch mean your lines don't wait on supply, whether it's a one-off order or a standing schedule.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support ongoing operations",
    description:
      "We stay available for re-orders, product questions, and adjustments as your operations and equipment change.",
  },
];

export default function IndustriesProcess() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
      <div className="max-w-3xl">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#C86218]">
          How we support you
        </p>
        <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-[#0C356A] sm:text-4xl">
          From first enquiry to repeat supply
        </h2>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 h-full">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0C356A] text-white">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                    Step {idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0C356A] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
              {idx < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 h-px w-6 border-t-2 border-dashed border-slate-300" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
