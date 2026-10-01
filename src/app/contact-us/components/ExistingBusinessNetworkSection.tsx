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
import { useCMSStore } from "@/store/useCMSStore";

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

export default function ExistingBusinessNetworkSection() {
  const { pages } = useCMSStore();
  const cmsNetwork = pages["contact-us"]?.ExistingBusinessNetwork;

  const badge = cmsNetwork?.badge;
  const heading = cmsNetwork?.heading;
  const description = cmsNetwork?.description;
  const regionalMapImage = cmsNetwork?.regionalMapImage;

  const quickJumpWarehouses = cmsNetwork?.quickJumpWarehouses;
  const quickJumpOffices = cmsNetwork?.quickJumpOffices;
  const quickJumpFieldHubs = cmsNetwork?.quickJumpFieldHubs;

  const summaryWarehouses = cmsNetwork?.summaryWarehouses;
  const summaryOffices = cmsNetwork?.summaryOffices;
  const summaryFieldHubs = cmsNetwork?.summaryFieldHubs;

  const locations: NetworkLocation[] = Array.isArray(cmsNetwork?.locations)
    ? cmsNetwork.locations
    : [];

  const [viewMode, setViewMode] = useState<"regional" | "google">("regional");
  const [selectedLocation, setSelectedLocation] = useState<NetworkLocation | null>(null);

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
      const satelliteUrl = "https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";

      const layer = L.tileLayer(mapType === "roadmap" ? roadmapUrl : satelliteUrl, {
        subdomains: ["0", "1", "2", "3"],
        maxZoom: 20,
      }).addTo(map);

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

      markersRef.current = locations.map((loc) => {
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

      if (locations.length > 0) {
        // Calculate bounds for all locations so every pin fits on screen
        const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
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
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode, mapType, locations]);

  // Quick summary counts
  const warehouses = locations.filter((l) => l.type.includes("warehouse"));
  const offices = locations.filter((l) => l.type.includes("office"));
  const fieldHubs = locations.filter((l) => l.type.includes("field"));

  if (!cmsNetwork && locations.length === 0) {
    return null;
  }

  return (
    <section
      id="business-network"
      className="py-8 sm:py-10 bg-[#F8FAFC] font-sans border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 sm:mb-6">
          <div>
            {badge && (
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#C86218] bg-orange-50 border border-orange-200/80 px-3 py-0.5 rounded-full mb-2 shadow-2xs">
                <Navigation className="w-3.5 h-3.5 text-[#C86218]" />
                <span>{badge}</span>
              </div>
            )}

            {heading && (
              <h2 className="text-2xl sm:text-3xl font-black text-[#0C356A] uppercase tracking-tight leading-tight">
                {heading}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal">{description}</p>
            )}
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
            /* VIEW 1: Clean Regional Network Map Graphic */
            <div className="relative p-2 sm:p-4 bg-white flex flex-col items-center justify-center">
              {/* Image Container with spacious height */}
              {regionalMapImage && (
                <div className="relative w-full max-w-[820px] mx-auto rounded-xl overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src={regionalMapImage}
                    alt={heading || "Operating Region Map"}
                    className="w-full h-auto max-h-[460px] sm:max-h-[500px] object-contain"
                  />
                </div>
              )}

              {/* Bottom Quick-Action Info Bar */}
              {(quickJumpWarehouses || quickJumpOffices || quickJumpFieldHubs) && (
                <div className="w-full mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs px-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-700">Quick Jump:</span>
                    {quickJumpWarehouses && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-bold">
                        {quickJumpWarehouses}
                      </span>
                    )}
                    {quickJumpOffices && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0C356A] border border-blue-200 text-[11px] font-bold">
                        {quickJumpOffices}
                      </span>
                    )}
                    {quickJumpFieldHubs && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold">
                        {quickJumpFieldHubs}
                      </span>
                    )}
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
              )}
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
                        const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
                        mapInstanceRef.current.fitBounds(bounds, {
                          padding: [45, 45],
                          maxZoom: 9,
                        });
                      });
                    }
                  }}
                  className="px-2 py-1 text-[11px] font-bold rounded cursor-pointer transition-colors text-slate-700 hover:bg-slate-100 flex items-center gap-1 border-l border-slate-200 ml-0.5"
                  title="Fit all locations on screen"
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
        {(summaryWarehouses || summaryOffices || summaryFieldHubs) && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {summaryWarehouses && (
              <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                  <span className="text-xs font-black uppercase tracking-wider text-rose-900">
                    Warehouses ({warehouses.length > 0 ? `${warehouses.length} Hubs` : "Hubs"})
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-700 leading-relaxed">
                  {summaryWarehouses}
                </div>
              </div>
            )}

            {summaryOffices && (
              <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0C356A]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#0C356A]">
                    Offices ({offices.length > 0 ? `${offices.length} Locations` : "Locations"})
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-700 leading-relaxed">
                  {summaryOffices}
                </div>
              </div>
            )}

            {summaryFieldHubs && (
              <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                    Field Presence (
                    {fieldHubs.length > 0 ? `${fieldHubs.length}+ Clusters` : "Clusters"})
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-700 leading-relaxed truncate">
                  {summaryFieldHubs}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
