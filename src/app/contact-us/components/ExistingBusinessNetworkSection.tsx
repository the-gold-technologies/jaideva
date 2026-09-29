"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import {
  Navigation,
  Warehouse,
  Building2,
  MapPin,
  ExternalLink,
  Layers,
  Map as MapIcon,
  Maximize2,
} from "lucide-react";

export type PinType = "warehouse" | "office" | "field";

export interface NetworkLocation {
  id: string;
  name: string;
  state: string;
  region: "Delhi NCR" | "Western U.P." | "Uttarakhand" | "Haryana";
  type: PinType[];
  lat: number;
  lng: number;
  description: string;
  address?: string;
}

export const NETWORK_LOCATIONS: NetworkLocation[] = [
  // 1. Warehouses + Offices (Key Hubs)
  {
    id: "mandoli",
    name: "Delhi / Mandoli",
    state: "Delhi",
    region: "Delhi NCR",
    type: ["warehouse", "office"],
    lat: 28.709,
    lng: 77.311,
    description: "Central Warehouse Hub & Corporate Operations Office",
    address: "Mandoli Industrial Area, Delhi 110093",
  },
  {
    id: "baghpat",
    name: "Baghpat",
    state: "Uttar Pradesh",
    region: "Western U.P.",
    type: ["warehouse"],
    lat: 28.948,
    lng: 77.228,
    description: "Regional Bulk Storage Warehouse & Rapid Distribution Depot",
    address: "Industrial Corridor, Baghpat, Uttar Pradesh",
  },
  {
    id: "haridwar",
    name: "Haridwar",
    state: "Uttarakhand",
    region: "Uttarakhand",
    type: ["warehouse", "office"],
    lat: 29.938,
    lng: 78.145,
    description: "Uttarakhand Regional Warehouse & Branch Operations Office",
    address: "SIDCUL Industrial Area, Haridwar, Uttarakhand",
  },

  // 2. Field Presence - Delhi NCR & UP
  {
    id: "ghaziabad",
    name: "Ghaziabad",
    state: "Uttar Pradesh",
    region: "Delhi NCR",
    type: ["field"],
    lat: 28.669,
    lng: 77.438,
    description: "Engineering & Heavy Industrial Unit Coverage",
  },
  {
    id: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    region: "Delhi NCR",
    type: ["field"],
    lat: 28.535,
    lng: 77.391,
    description: "Industrial Machine & Automotive Component Cluster",
  },
  {
    id: "greater-noida",
    name: "Greater Noida",
    state: "Uttar Pradesh",
    region: "Delhi NCR",
    type: ["field"],
    lat: 28.474,
    lng: 77.503,
    description: "Automotive OEM & Heavy Manufacturing Belt",
  },

  // 3. Field Presence - Western U.P.
  {
    id: "meerut",
    name: "Meerut",
    state: "Uttar Pradesh",
    region: "Western U.P.",
    type: ["field"],
    lat: 28.984,
    lng: 77.706,
    description: "Industrial Engineering, Sports & Transformers Industry",
  },
  {
    id: "muzaffarnagar",
    name: "Muzaffarnagar",
    state: "Uttar Pradesh",
    region: "Western U.P.",
    type: ["field"],
    lat: 29.472,
    lng: 77.708,
    description: "Steel Rolling Mills & Paper Mills Lubrication Supply",
  },
  {
    id: "saharanpur",
    name: "Saharanpur",
    state: "Uttar Pradesh",
    region: "Western U.P.",
    type: ["field"],
    lat: 29.967,
    lng: 77.551,
    description: "Agro, Wood Processing & Paper Machinery Lubricants",
  },
  {
    id: "hapur",
    name: "Hapur",
    state: "Uttar Pradesh",
    region: "Western U.P.",
    type: ["field"],
    lat: 28.73,
    lng: 77.78,
    description: "Industrial Processing & Heavy Machinery Support",
  },
  {
    id: "sikandrabad",
    name: "Sikandrabad",
    state: "Uttar Pradesh",
    region: "Western U.P.",
    type: ["field"],
    lat: 28.45,
    lng: 77.694,
    description: "Ceramics, Cables & Metallurgy Industrial Area",
  },
  {
    id: "aligarh",
    name: "Aligarh",
    state: "Uttar Pradesh",
    region: "Western U.P.",
    type: ["field"],
    lat: 27.897,
    lng: 78.088,
    description: "Hardware, Metal Die-Casting & Auto Components",
  },

  // 4. Field Presence - Uttarakhand
  {
    id: "roorkee",
    name: "Roorkee",
    state: "Uttarakhand",
    region: "Uttarakhand",
    type: ["field"],
    lat: 29.854,
    lng: 77.888,
    description: "Manufacturing & Precision Instrumentation Corridor",
  },
  {
    id: "dehradun",
    name: "Dehradun",
    state: "Uttarakhand",
    region: "Uttarakhand",
    type: ["field"],
    lat: 30.316,
    lng: 78.032,
    description: "Pharma, Light Engineering & Transport Fleet Lubrication",
  },

  // 5. Field Presence - Haryana
  {
    id: "sonipat",
    name: "Sonipat",
    state: "Haryana",
    region: "Haryana",
    type: ["field"],
    lat: 28.993,
    lng: 77.015,
    description: "Kundli/Rai Industrial Zones & Automotive Suppliers",
  },
  {
    id: "bahadurgarh",
    name: "Bahadurgarh",
    state: "Haryana",
    region: "Haryana",
    type: ["field"],
    lat: 28.692,
    lng: 76.924,
    description: "Heavy Industrial Machinery & Footwear Manufacturing",
  },
  {
    id: "rohtak",
    name: "Rohtak",
    state: "Haryana",
    region: "Haryana",
    type: ["field"],
    lat: 28.895,
    lng: 76.606,
    description: "Fast-Growing Automotive Hub & Engineering Plants",
  },
];

export default function ExistingBusinessNetworkSection() {
  const [viewMode, setViewMode] = useState<"regional" | "google">("regional");
  const [selectedLocation, setSelectedLocation] =
    useState<NetworkLocation | null>(null);

  // Google Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  const tileLayerRef = useRef<any>(null);

  // Initialize Leaflet Google Map only when Google view is selected
  useEffect(() => {
    if (viewMode !== "google") {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      return;
    }

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [29.15, 77.45],
        zoom: 8,
        minZoom: 7,
        maxZoom: 14,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      const roadmapUrl = "https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
      const satelliteUrl =
        "https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";

      const layer = L.tileLayer(
        mapType === "roadmap" ? roadmapUrl : satelliteUrl,
        {
          subdomains: ["0", "1", "2", "3"],
          maxZoom: 20,
        },
      ).addTo(map);

      tileLayerRef.current = layer;

      // Sleek, compact SVG teardrop pin marker
      const createLocationIcon = (loc: NetworkLocation) => {
        const isWarehouse = loc.type.includes("warehouse");
        const isOffice = loc.type.includes("office");

        let pinColor = "#F59E0B"; // Yellow for Field
        let innerDotColor = "#78350F";

        if (isWarehouse) {
          pinColor = "#EF4444"; // Red for Warehouse
          innerDotColor = "#991B1B";
        } else if (isOffice) {
          pinColor = "#0C356A"; // Deep Blue for Office
          innerDotColor = "#FFFFFF";
        }

        const html = `
          <div style="display:flex; flex-direction:column; align-items:center; cursor:pointer;">
            <svg width="22" height="28" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.32));">
              <path d="M12 0C5.37258 0 0 5.37258 0 12c0 8.8 12 20 12 20s12-11.2 12-20c0-6.62742-5.37258-12-12-12z" fill="${pinColor}"/>
              <circle cx="12" cy="11.5" r="4.2" fill="#FFFFFF"/>
              <circle cx="12" cy="11.5" r="2.2" fill="${innerDotColor}"/>
            </svg>
            <span style="
              margin-top: 1px;
              font-size: 9px;
              font-weight: 700;
              color: #0F172A;
              background: rgba(255, 255, 255, 0.94);
              padding: 1px 5px;
              border-radius: 4px;
              border: 1px solid rgba(203, 213, 225, 0.9);
              box-shadow: 0 1px 2px rgba(0,0,0,0.12);
              white-space: nowrap;
              letter-spacing: -0.01em;
              line-height: 1.15;
            ">
              ${loc.name}
            </span>
          </div>
        `;

        return L.divIcon({
          html,
          className: "custom-sleek-pin",
          iconSize: [60, 44],
          iconAnchor: [30, 28],
          popupAnchor: [0, -28],
        });
      };

      markersRef.current = NETWORK_LOCATIONS.map((loc) => {
        const marker = L.marker([loc.lat, loc.lng], {
          icon: createLocationIcon(loc),
        });

        const isWarehouse = loc.type.includes("warehouse");
        const isOffice = loc.type.includes("office");

        let badgeText = "Field Presence";
        let badgeBg = "#FEF3C7";
        let badgeColor = "#92400E";

        if (isWarehouse) {
          badgeText = "Warehouse (WH)";
          badgeBg = "#FFE4E6";
          badgeColor = "#9F1239";
        } else if (isOffice) {
          badgeText = "Branch Office";
          badgeBg = "#DBEAFE";
          badgeColor = "#1E40AF";
        }

        const popupContent = `
          <div style="font-family: system-ui, sans-serif; min-width: 190px; padding: 2px;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 4px;">
              <h4 style="margin:0; font-size:13px; font-weight:900; color:#0C356A;">${loc.name}</h4>
              <span style="font-size:10px; font-weight:700; color:#64748B;">${loc.state}</span>
            </div>
            <div style="margin-bottom: 6px;">
              <span style="background-color:${badgeBg}; color:${badgeColor}; padding:2px 8px; border-radius:9999px; font-size:9px; font-weight:800; text-transform:uppercase;">
                ${badgeText}
              </span>
            </div>
            <p style="margin:0 0 6px 0; font-size:11px; color:#334155; line-height:1.35;">${loc.description}</p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}" 
              target="_blank" 
              rel="noopener noreferrer"
              style="display:inline-flex; align-items:center; gap:3px; font-size:10px; font-weight:800; color:#1A73E8; text-decoration:none; padding-top:4px; border-top:1px solid #E2E8F0;"
            >
              Open in Google Maps ↗
            </a>
          </div>
        `;

        marker.bindPopup(popupContent, {
          closeButton: false,
        });

        marker.on("mouseover", () => marker.openPopup());
        marker.addTo(map);

        return marker;
      });

      // Calculate bounds for all locations so every pin fits on screen
      const bounds = L.latLngBounds(
        NETWORK_LOCATIONS.map((loc) => [loc.lat, loc.lng]),
      );
      map.fitBounds(bounds, {
        padding: [40, 40],
        maxZoom: 9,
      });

      // Recalculate size & refit on switch
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          mapInstanceRef.current.fitBounds(bounds, {
            padding: [40, 40],
            maxZoom: 9,
          });
        }
      }, 120);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode, mapType]);

  // Quick summary counts
  const warehouses = NETWORK_LOCATIONS.filter((l) =>
    l.type.includes("warehouse"),
  );
  const offices = NETWORK_LOCATIONS.filter((l) => l.type.includes("office"));
  const fieldHubs = NETWORK_LOCATIONS.filter((l) => l.type.includes("field"));

  return (
    <section
      id="business-network"
      className="py-8 sm:py-10 bg-[#F8FAFC] font-sans border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#C86218] bg-orange-50 border border-orange-200/80 px-3 py-0.5 rounded-full mb-2 shadow-2xs">
              <Navigation className="w-3.5 h-3.5 text-[#C86218]" />
              <span>North India Network</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0C356A] uppercase tracking-tight leading-tight">
              Existing Business Network
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal">
              Direct distribution hubs, administrative branches, and field teams
              across the northern industrial corridor.
            </p>
          </div>

          {/* View Mode Switcher: Regional Graphic vs Live Google Map */}
          <div className="inline-flex items-center p-1 bg-white rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("regional")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "regional"
                  ? "bg-[#0C356A] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Regional Map</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("google")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "google"
                  ? "bg-[#0C356A] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Live Google Map</span>
            </button>
          </div>
        </div>

        {/* Main Display Container */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          {viewMode === "regional" ? (
            /* VIEW 1: Clean Regional Network Map Graphic (User Reference) */
            <div className="relative p-2 sm:p-4 bg-white flex flex-col items-center justify-center">
              {/* Image Container with previous spacious height */}
              <div className="relative w-full max-w-[820px] mx-auto rounded-xl overflow-hidden flex items-center justify-center bg-white">
                <Image
                  src="/operating-region-map.png"
                  alt="Jaideva Existing Business Network Operating Region Map"
                  width={996}
                  height={782}
                  className="w-full h-auto max-h-[460px] sm:max-h-[500px] object-contain"
                  priority
                />
              </div>

              {/* Bottom Quick-Action Info Bar */}
              <div className="w-full mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs px-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-700">Quick Jump:</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-bold">
                    🔴 Mandoli, Baghpat, Haridwar
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0C356A] border border-blue-200 text-[11px] font-bold">
                    🔵 Delhi HQ & Haridwar
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold">
                    🟡 14 Field Presence Hubs
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setViewMode("google")}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0C356A] hover:text-blue-700 cursor-pointer ml-auto"
                >
                  <span>Explore on Live Google Map</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ) : (
            /* VIEW 2: Interactive Google Map */
            <div className="relative">
              {/* Map Type Controls & Fit All */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-xs p-1 rounded-lg shadow-md border border-slate-200">
                <button
                  type="button"
                  onClick={() => setMapType("roadmap")}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                    mapType === "roadmap"
                      ? "bg-[#0C356A] text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Map
                </button>
                <button
                  type="button"
                  onClick={() => setMapType("satellite")}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded cursor-pointer transition-colors ${
                    mapType === "satellite"
                      ? "bg-[#0C356A] text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Satellite
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (mapInstanceRef.current) {
                      import("leaflet").then((L) => {
                        const bounds = L.latLngBounds(
                          NETWORK_LOCATIONS.map((loc) => [loc.lat, loc.lng]),
                        );
                        mapInstanceRef.current.fitBounds(bounds, {
                          padding: [45, 45],
                          maxZoom: 9,
                        });
                      });
                    }
                  }}
                  className="px-2 py-1 text-[11px] font-bold rounded cursor-pointer transition-colors text-slate-700 hover:bg-slate-100 flex items-center gap-1 border-l border-slate-200 ml-0.5"
                  title="Fit all 17+ locations on screen"
                >
                  <Maximize2 className="w-3 h-3 text-slate-600" />
                  <span>Fit All</span>
                </button>
              </div>

              {/* Map Canvas with increased height so all locations fit cleanly */}
              <div
                ref={mapContainerRef}
                className="w-full h-[520px] sm:h-[580px] lg:h-[620px] z-10"
                style={{ backgroundColor: "#F1F5F9" }}
              />

              {/* Authentic Google Watermark */}
              <div className="absolute bottom-2 left-3 z-20 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-black text-slate-700 shadow-xs border border-slate-200">
                Google
              </div>
            </div>
          )}
        </div>

        {/* Compact Hub Directory Pills below map */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {/* Warehouses Card */}
          <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
              <span className="text-xs font-black uppercase tracking-wider text-rose-900">
                Warehouses (3 Hubs)
              </span>
            </div>
            <div className="text-xs font-medium text-slate-700 leading-relaxed">
              Mandoli (Delhi), Baghpat (U.P.), Haridwar (Uttarakhand)
            </div>
          </div>

          {/* Offices Card */}
          <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0C356A]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#0C356A]">
                Offices (2 Locations)
              </span>
            </div>
            <div className="text-xs font-medium text-slate-700 leading-relaxed">
              Delhi HQ (Corporate), Haridwar (Regional Operations)
            </div>
          </div>

          {/* Field Presence Card */}
          <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                Field Presence (14+ Clusters)
              </span>
            </div>
            <div className="text-xs font-medium text-slate-700 leading-relaxed truncate">
              Noida, Ghaziabad, Meerut, Sonipat, Rohtak, Dehradun +
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
