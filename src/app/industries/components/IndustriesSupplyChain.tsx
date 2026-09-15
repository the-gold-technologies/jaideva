import React from "react";
import { FlaskConical, Package, Truck, Building2 } from "lucide-react";

const supplyNodes = [
  { icon: FlaskConical, label: "Sourced" },
  { icon: Package, label: "Blended & packed" },
  { icon: Truck, label: "Dispatched" },
  { icon: Building2, label: "Delivered on-site" },
];

export default function IndustriesSupplyChain() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="relative overflow-hidden rounded-[30px] bg-[#071f3b] px-6 py-12 sm:px-12 sm:py-16">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(244,178,77,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(244,178,77,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#F4B24D] text-center">
            On the ground, on schedule
          </p>
          <h3 className="mt-2 text-center text-2xl font-black uppercase tracking-[-0.03em] text-white sm:text-3xl">
            Supply that keeps up with your production line
          </h3>

          <div className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-6">
            {supplyNodes.map((node, idx, arr) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.label}
                  className="relative flex flex-col items-center text-center"
                >
                  {idx < arr.length - 1 && (
                    <div className="absolute left-1/2 top-8 hidden h-px w-full border-t-2 border-dashed border-white/15 sm:block" />
                  )}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#0C356A] text-[#F4B24D] ring-4 ring-[#071f3b]">
                    <Icon size={26} />
                  </div>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.08em] text-white">
                    {node.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
