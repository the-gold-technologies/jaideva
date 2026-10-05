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
