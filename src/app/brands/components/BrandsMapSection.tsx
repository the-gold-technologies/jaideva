"use client";

import React, { useCallback, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import {
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const geoUrl = "/countries-110m.json";

export interface MapBrandLocation {
  id: string;
  name: string;
  brandName: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  region: string;
  flag: string;
  authStatus: "Authorized Industrial Partner" | "Certified Multi-Brand Stockist";
  isDirectAuthorized: boolean;
  category: string;
  keyProducts: string[];
  description: string;
  address: string;
  contact: string;
}

// Exactly the 10 brands requested by user
export const BRAND_LOCATIONS: MapBrandLocation[] = [
  {
    id: "hp-lubricants",
    name: "INDIA (HQ)",
    brandName: "HP Lubricants",
    country: "India",
    coordinates: [77.209, 28.613], // New Delhi / India HQ
    region: "CENTRAL REFINERY & INDUSTRIAL DISPATCH HUB",
    flag: "🇮🇳",
    authStatus: "Authorized Industrial Partner",
    isDirectAuthorized: true,
    category: "Industrial, Automotive & Turbine Fluids",
    keyProducts: ["Enklo Hydraulic 32/46/68", "Parthan Industrial Gear", "Turbinol Turbine Oils", "Milcy Turbo Diesel"],
    description: "Official authorized industrial distribution hub with direct refinery pipeline supply, guaranteed batch testing, and bulk tanker dispatch.",
    address: "Jai Deva Oil Co., Central Hub, Sector 10",
    contact: "+91 98120 22340 / sales@jaideva.com",
  },
  {
    id: "valvoline",
    name: "USA",
    brandName: "Valvoline",
    country: "United States",
    coordinates: [-84.503, 38.04], // Lexington, KY, USA
    region: "NORTH AMERICA FLEET & HEAVY DUTY",
    flag: "🇺🇸",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    category: "Commercial Fleet & Long-Drain Engine Oils",
    keyProducts: ["All-Fleet Premium Engine Oils", "Heavy-Duty Gear Oils", "Long-Life Coolants"],
    description: "Over 150 years of heritage in severe-duty engine fluids, heavy fleet maintenance, and extended drain interval chemistry.",
    address: "Lexington, Kentucky, USA",
    contact: "Certified Multi-Brand Supply",
  },
  {
    id: "gs-caltex",
    name: "SOUTH KOREA",
    brandName: "GS Caltex",
    country: "South Korea",
    coordinates: [126.978, 37.566], // Seoul, South Korea
    region: "EAST ASIA AUTOMOTIVE SYNTHETICS",
    flag: "🇰🇷",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    category: "Synthetic Heavy Engine & Hydraulic Fluids",
    keyProducts: ["Kixx HDX CK-4 Engine Oils", "Hydro HD Hydraulic Fluids", "Thermic Heat Transfer"],
    description: "World-class Group II/III synthetic engine oils providing low volatility, fuel economy, and high oxidation stability.",
    address: "GS Tower, Gangnam-gu, Seoul, South Korea",
    contact: "Certified Multi-Brand Stock",
  },
  {
    id: "idemitsu",
    name: "JAPAN",
    brandName: "Idemitsu",
    country: "Japan",
    coordinates: [139.691, 35.689], // Tokyo, Japan
    region: "PRECISION JAPANESE OEM FLUIDS",
    flag: "🇯🇵",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    category: "Precision High-Speed Machine Tool Oils",
    keyProducts: ["Daphne Precision Series", "High-Speed Spindle Fluids", "Low-Ash Engine Formulations"],
    description: "Tight-tolerance Japanese OEM lubricants formulated for high-speed spindles, EDM dielectric machining, and robot joints.",
    address: "Chiyoda-ku, Tokyo, Japan",
    contact: "Factory-Sealed Supply",
  },
  {
    id: "molygraph",
    name: "MOLYGRAPH INDIA",
    brandName: "Molygraph",
    country: "India",
    coordinates: [72.877, 19.076], // Mumbai, India
    region: "SPECIALTY HIGH-TEMP GREASES & PASTES",
    flag: "🇮🇳",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    category: "Extreme Pressure & Kiln Greases",
    keyProducts: ["Molylube Ultra High Temp", "Open Gear Compounds", "Anti-Seize Pastes"],
    description: "Engineered specialty greases for cement kilns, steel mills, continuous casters, and extreme shock-load equipment.",
    address: "Mumbai Special Industrial Zone, India",
    contact: "Refinery Tested Stock",
  },
  {
    id: "motultech",
    name: "FRANCE",
    brandName: "MotulTech",
    country: "France",
    coordinates: [2.352, 48.856], // Paris, France
    region: "WESTERN EUROPE FLUID TECHNOLOGY",
    flag: "🇫🇷",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    category: "Metal Transformation & Severe Quench Fluids",
    keyProducts: ["Thermocool Heat Transfer", "Supracool CNC Emulsions", "Safco Clean Degreasers"],
    description: "Specialized French industrial division delivering high-performance metal transformation fluids and severe heat treatment quench oils.",
    address: "Aubervilliers, Greater Paris, France",
    contact: "Genuine Refinery Import",
  },
  {
    id: "deep-pneumatics",
    name: "DEEP PNEUMATICS",
    brandName: "Deep Pneumatics",
    country: "India",
    coordinates: [72.571, 23.022], // Gujarat, India
    region: "ROTARY COMPRESSOR & AIR SYSTEM FLUIDS",
    flag: "🇮🇳",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    category: "Compressor Systems & Rotary Tool Lubes",
    keyProducts: ["Screw Compressor Oils 46/68", "Pneumatic Airline Oils", "Synthetic 8000h Drain Fluids"],
    description: "Formulated specifically for rotary screw, reciprocating, and vane air compressors ensuring carbon-free valve performance.",
    address: "Ahmedabad Industrial Zone, Gujarat, India",
    contact: "Certified Compressor Stocks",
  },
  {
    id: "lubricon",
    name: "LUBRICON INDIA",
    brandName: "Lubricon",
    country: "India",
    coordinates: [76.851, 28.408], // Gurugram / NCR, India
    region: "CUSTOM INDUSTRIAL BLENDS & PROCESS OILS",
    flag: "🇮🇳",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    category: "Custom Industrial Blends & Machine Lubricants",
    keyProducts: ["Custom Blend Hydraulics", "Slideway ISO 68/220", "Heavy Circulating Oils"],
    description: "Formulated to order for specialized manufacturing lines, custom anti-wear packages, and plant retrofits.",
    address: "Delhi NCR Industrial Corridor, India",
    contact: "Custom Batch Supply",
  },
  {
    id: "tw-chemie",
    name: "GERMANY",
    brandName: "TW Chemie",
    country: "Germany",
    coordinates: [8.682, 50.11], // Frankfurt, Germany
    region: "EUROPEAN PRECISION METALWORKING",
    flag: "🇩🇪",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    category: "High-Performance Metalworking & Coolants",
    keyProducts: ["Bio-Stable CNC Coolants", "Rust Preventatives", "Precision Forming & Stamping Oils"],
    description: "German-engineered formulations tailored for tight-tolerance multi-axis CNC machining, high-pressure spindle cooling, and long sump life.",
    address: "Frankfurt am Main, Hesse, Germany",
    contact: "OEM Certificate of Analysis",
  },
  {
    id: "filtermist",
    name: "UNITED KINGDOM",
    brandName: "Filtermist",
    country: "United Kingdom",
    coordinates: [-2.463, 52.678], // Telford, UK
    region: "OIL MIST EXTRACTION & AIR FILTRATION",
    flag: "🇬🇧",
    authStatus: "Certified Multi-Brand Stockist",
    isDirectAuthorized: false,
    category: "Machining Mist Elimination & Filtration",
    keyProducts: ["Centrifugal Mist Collectors", "High-Efficiency Afterfilters", "Oil Smoke Elimination"],
    description: "World-leading UK manufacturer of oil mist extraction units for machine shops, eliminating hazardous oil smoke and recovering re-usable coolants.",
    address: "Telford, Shropshire, United Kingdom",
    contact: "Genuine Filtration Systems",
  },
];

export const MAP_BRANDS = BRAND_LOCATIONS;

interface BrandsMapSectionProps {
  onOpenEnquiry?: (subject?: string) => void;
}

export default function BrandsMapSection({ onOpenEnquiry }: BrandsMapSectionProps) {
  const hqLocation = BRAND_LOCATIONS[0]; // India (HQ)
  const hqCoords = hqLocation.coordinates;

  // Connecting dashed lines from all origin nodes to India HQ
  const connections = BRAND_LOCATIONS.filter(
    (loc) => loc.id !== hqLocation.id
  ).map((loc) => [loc.coordinates, hqCoords] as [[number, number], [number, number]]);

  const sectionRef = useRef<HTMLElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const [hoveredLocation, setHoveredLocation] = useState<MapBrandLocation | null>(null);
  const [activeBrandId, setActiveBrandId] = useState<string>("hp-lubricants");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const getTooltipStyle = () => {
    if (!mapContainerRef.current) {
      return { left: tooltipPos.x + 16, top: tooltipPos.y - 80 };
    }
    const containerWidth = mapContainerRef.current.clientWidth;
    const containerHeight = mapContainerRef.current.clientHeight;
    const tooltipWidth = 280;
    const tooltipHeight = 170;

    let left = tooltipPos.x + 16;
    if (left + tooltipWidth > containerWidth - 12) {
      left = tooltipPos.x - tooltipWidth - 16;
    }
    if (left < 12) {
      left = 12;
    }

    let top = tooltipPos.y - 80;
    if (top < 12) {
      top = tooltipPos.y + 20;
    } else if (top + tooltipHeight > containerHeight - 12) {
      top = containerHeight - tooltipHeight - 12;
    }

    return { left, top };
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[#F8FAFC] text-slate-900 relative overflow-hidden font-sans border-b border-slate-200"
    >
      {/* Delicate site-wide grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(12,53,106,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(12,53,106,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - EXACT Title, Subtitle, and Description requested by User */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block text-xs font-black tracking-[0.25em] uppercase mb-2 text-[#C86218]"
          >
            OUR BRAND PORTFOLIO
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0C356A]"
          >
            BRANDS WE DEAL IN
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 text-base sm:text-lg font-bold text-[#C86218]"
          >
            Leading Brands for Reliable Lubrication Solutions
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-1 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto"
          >
            Our multi-brand portfolio includes products from leading lubricant and industrial solution brands.
          </motion.p>
        </div>

        {/* 10 Brand Quick Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {BRAND_LOCATIONS.map((item) => {
            const isSelected = activeBrandId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveBrandId(item.id);
                  setHoveredLocation(item);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#0C356A] text-white shadow-md shadow-[#0C356A]/20 scale-105"
                    : "bg-white text-slate-700 hover:text-[#C86218] hover:bg-slate-50 border border-slate-200/90 shadow-2xs"
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.brandName}</span>
                {item.isDirectAuthorized && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                    title="Authorized Industrial Partner"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Generous Increased Height World Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-[#EDF2F7] shadow-md"
        >
          {/* Inner subtle glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl z-0"
            style={{
              boxShadow: "inset 0 0 100px rgba(12,53,106,0.03)",
            }}
          />

          {/* Mouse-tracking wrapper with generous, spacious height */}
          <div
            ref={mapContainerRef}
            className="relative w-full h-[500px] sm:h-[580px] lg:h-[640px] overflow-hidden select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 185,
                center: [28, 30],
              }}
              width={960}
              height={580}
              className="w-full h-full"
            >
              {/* Clean White Continents on Soft Slate-Blue Water */}
              <Geographies geography={geoUrl}>
                {({ geographies }: any) =>
                  geographies.map((geo: any) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#FFFFFF"
                      stroke="#CBD5E1"
                      strokeWidth={0.55}
                      style={{
                        default: {
                          fill: "#FFFFFF",
                          stroke: "#CBD5E1",
                          strokeWidth: 0.55,
                          outline: "none",
                        },
                        hover: {
                          fill: "#E2E8F0",
                          stroke: "#C86218",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#E2E8F0",
                          outline: "none",
                        },
                      } as any}
                    />
                  ))
                }
              </Geographies>

              {/* Connecting Arcs converging directly to India HQ */}
              {connections.map((conn, i) => (
                <Line
                  key={i}
                  from={conn[0]}
                  to={conn[1]}
                  stroke="rgba(200, 98, 24, 0.4)"
                  strokeWidth={0.85}
                  strokeLinecap="round"
                  strokeDasharray="4 5"
                />
              ))}

              {/* The 10 Brand Origin Markers */}
              {BRAND_LOCATIONS.map((loc, i) => {
                const isSelected =
                  hoveredLocation?.id === loc.id || activeBrandId === loc.id;
                const isHQ = loc.id === "hp-lubricants";

                return (
                  <Marker
                    key={loc.id}
                    coordinates={loc.coordinates}
                    onClick={() => {
                      setActiveBrandId(loc.id);
                      setHoveredLocation(loc);
                      if (onOpenEnquiry) {
                        onOpenEnquiry(`${loc.brandName} - Official RFQ & Bulk Pricing`);
                      }
                    }}
                    onMouseEnter={() => {
                      setHoveredLocation(loc);
                      setActiveBrandId(loc.id);
                    }}
                  >
                    {/* Invisible hit area */}
                    <circle
                      r={14}
                      fill="transparent"
                      className="cursor-pointer"
                    />

                    {/* Outer pulse halo */}
                    <motion.circle
                      r={isHQ ? 12 : 8.5}
                      fill="rgba(200, 98, 24, 0.12)"
                      stroke={
                        isSelected
                          ? "rgba(200, 98, 24, 0.9)"
                          : "rgba(12, 53, 106, 0.4)"
                      }
                      strokeWidth={isSelected ? 1.5 : 0.8}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        isInView
                          ? {
                              scale: [1, 1.7, 1],
                              opacity: [0.7, 0, 0.7],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2.5,
                        delay: i * 0.12 + 0.3,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      style={{ pointerEvents: "none" }}
                    />

                    {/* Inner solid dot with glowing shadow */}
                    <motion.circle
                      r={isSelected ? (isHQ ? 6.5 : 5.2) : isHQ ? 4.8 : 3.6}
                      fill={isSelected ? "#C86218" : "#0C356A"}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.12 + 0.2 }}
                      style={{
                        filter: isSelected
                          ? "drop-shadow(0 0 6px rgba(200,98,24,0.9))"
                          : "drop-shadow(0 0 4px rgba(12,53,106,0.6))",
                        pointerEvents: "none",
                        transition: "r 0.2s ease, filter 0.2s ease",
                      }}
                    />

                    {/* White center pip on HQ */}
                    {isHQ && (
                      <circle cx={0} cy={0} r={1.6} fill="#ffffff" pointerEvents="none" />
                    )}

                    {/* Node Text Label */}
                    <motion.text
                      textAnchor="middle"
                      y={-10}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isHQ ? "5.4px" : "4.6px",
                        fill: isSelected ? "#C86218" : "#0C356A",
                        fontWeight: 800,
                        letterSpacing: "0.06em",
                        pointerEvents: "none",
                        transition: "fill 0.2s ease",
                      }}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.12 + 0.4 }}
                    >
                      {loc.name.toUpperCase()}
                    </motion.text>
                  </Marker>
                );
              })}
            </ComposableMap>

            {/* Dark Navy Glassmorphism Tooltip with Instant Inquiry */}
            <AnimatePresence>
              {hoveredLocation && (
                <motion.div
                  key={hoveredLocation.name}
                  initial={{ opacity: 0, scale: 0.92, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute z-50 pointer-events-none"
                  style={getTooltipStyle()}
                >
                  <div className="rounded-xl px-4 py-3.5 min-w-[240px] max-w-[280px] bg-[#0C356A]/95 backdrop-blur-md border border-[#C86218]/40 shadow-2xl text-white">
                    {/* Region Pill */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C86218] shadow-xs" />
                      <span className="text-[10px] font-black tracking-wider uppercase text-[#F4B24D] truncate">
                        {hoveredLocation.region}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="text-sm font-black tracking-tight text-white">
                        {hoveredLocation.brandName}
                      </div>
                      <span className="text-sm">{hoveredLocation.flag}</span>
                    </div>

                    {/* Brand Name & Auth Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-100">
                        {hoveredLocation.name}
                      </span>
                      {hoveredLocation.isDirectAuthorized ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 uppercase">
                          Authorized Partner
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500/25 text-amber-300 border border-amber-400/40 uppercase">
                          Certified Stockist
                        </span>
                      )}
                    </div>

                    <div className="w-full h-px bg-white/10 mb-2" />

                    {/* Address & Contact */}
                    <div className="flex items-start gap-1.5 text-[11px] text-white/80 leading-tight mb-1.5">
                      <MapPin size={12} className="text-[#C86218] shrink-0 mt-0.5" />
                      <span className="truncate">{hoveredLocation.address}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-white/60 font-mono">
                      <Phone size={11} className="text-[#C86218] shrink-0" />
                      <span className="truncate">{hoveredLocation.contact}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Metric Strip inside Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 border-t border-slate-200 bg-white">
            {[
              { value: "10", label: "GLOBAL BRAND PARTNERS" },
              { value: "100%", label: "GENUINE BATCH TESTED" },
              { value: "ISO VG", label: "FULL SPECTRUM FLUIDS" },
              { value: "24-48h", label: "EXPRESS DISPATCH" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl sm:text-2xl font-black tracking-tight text-[#0C356A]">
                  {stat.value}
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
