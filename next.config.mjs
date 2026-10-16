/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  transpilePackages: ["zustand"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.hplubricants.in",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "leaflet"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = {
        type: "filesystem",
      };
    }
    return config;
  },

  // ── HTTP Security & Cache Headers ──────────────────────────────────────────
  async headers() {
    return [
      // Security headers applied globally to all pages
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Stop MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Legacy XSS filter (belt-and-suspenders)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Only send origin in referrer, not full URL
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restrict browser APIs not used by this site
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), payment=(), geolocation=(self)",
          },
          // Force HTTPS for 2 years (enable once SSL is confirmed in prod)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      // Immutable cache for hashed JS/CSS bundles — browsers never re-request these
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Optimised images served by Next.js image API — 24 h cache
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // Public assets in /public — 7-day cache
      {
        source: "/favicon.ico",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/how-to-choose-the-right-diesel-engine-oil-for-your-vehicle",
        destination: "/blogs/how-to-choose-the-right-diesel-engine-oil-for-your-vehicle",
      },
      {
        source: "/how-often-should-you-change-your-automotive-engine-oil",
        destination: "/blogs/how-often-should-you-change-your-automotive-engine-oil",
      },
      {
        source: "/15w-40-oil-and-types",
        destination: "/blogs/15w-40-oil-and-types",
      },
      {
        source: "/transformer-oil-types-properties-and-uses",
        destination: "/blogs/transformer-oil-types-properties-and-uses",
      },
      {
        source: "/bike-engine-oil",
        destination: "/blogs/bike-engine-oil",
      },
      {
        source: "/synthetic-engine-oil-types-properties-and-uses",
        destination: "/blogs/synthetic-engine-oil-types-properties-and-uses",
      },
      {
        source: "/the-best-engine-oil-for-your-bike",
        destination: "/blogs/the-best-engine-oil-for-your-bike",
      },
    ];
  },
};

export default nextConfig;
