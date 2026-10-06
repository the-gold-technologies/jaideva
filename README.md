# Jai Deva Oil Co. — Official Enterprise Web Platform

A modern, high-performance web platform and headless CMS built for **Jai Deva Oil Co.** (Authorized Lubricant Distributor). This repository contains the public-facing Next.js web application engineered for high-availability, responsive corporate branding, product catalog discovery, and enterprise lead capture.

---

## 🚀 Key Highlights & Architecture

- **Next.js 14 App Router:** Fully optimized server and client rendering utilizing the Next.js App Router paradigm.
- **Headless CMS Integration:** Consumes real-time structured content, hero carousels, dynamic banners, product specifications, and blog articles from the companion CMS backend.
- **Dynamic Product & Category Showcase:** Hierarchical browsing of lubricant brands (HP Lubricants, Castrol, Valvoline, etc.), industrial machinery oils, TDS/MSDS technical specification downloads, and direct product quote requests.
- **Sitewide First-Time Visitor Engagement Modal:**
  - High-converting 50/50 split modal featuring customizable flyer graphics alongside an interactive quotation request form.
  - Built-in visual canvas wave CAPTCHA (`CaptchaInput`) and mandatory company identification to deter spam and streamline high-intent B2B leads.
  - Seamlessly toggleable between banner-only mode and form-integrated mode directly from CMS.
- **Multi-Brand Lubricant Guidance:** Structured 4-phase recommendation engine (`Understand → Recommend → Supply → Support`).
- **Interactive Sector Lubrication Deep-Dive:** Targeted application workflows across diverse industrial verticals (Power Plants, Automotive, Mining, Steel Manufacturing, and Precision Engineering).
- **Accessibility & Internationalization:**
  - Dynamic bilingual translation (English & Hindi) powered by Google Language integration.
  - Client-side persistent font scaling controls (12px to 26px) for inclusive readability across devices.
- **Interactive Distributor & Network Map:** Real-time visual locator for regional distribution hubs and commercial sales points powered by Leaflet.

---

## 🛠️ Technology Stack

| Layer                   | Technologies                                          |
| :---------------------- | :---------------------------------------------------- |
| **Framework**           | Next.js 14 (App Router)                               |
| **Language**            | TypeScript                                            |
| **Styling & Design**    | Tailwind CSS, PostCSS, Lucide React Icons             |
| **State & Store**       | Zustand (CMS state caching & page prefetching)        |
| **Animations**          | Framer Motion                                         |
| **Maps & Geospatial**   | Leaflet, React Leaflet                                |
| **Security & Forms**    | Custom Canvas Visual CAPTCHA, Strict Input Validation |
| **Backend Integration** | RESTful JSON API endpoints from Headless CMS          |

---

## 📂 Project Structure

```text
Jai-deva/
├── public/                 # Static assets, branding logos, icons, fallbacks
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   │   ├── about-us/       # Company history, leadership, and timeline
│   │   ├── blogs/          # Technical lubricant insights and news articles
│   │   ├── brands/         # Brand value pillars and portfolio showcase
│   │   ├── contact-us/     # Contact channels, headquarters, and enquiry forms
│   │   ├── events/         # Activities, photos, and stakeholder gallery
│   │   ├── industries/     # Industrial sectors, equipment lubrication, workflows
│   │   ├── privacy-policy/ # Regulatory and compliance information
│   │   ├── products/       # Category catalogs, subcategories, TDS/MSDS specs
│   │   ├── layout.tsx      # Root layout, global providers, sitewide popup
│   │   └── page.tsx        # Homepage layout & interactive sections
│   ├── components/         # Reusable application components
│   │   ├── sections/       # Sitewide FirstTimePopupModal, InstagramRibbon, etc.
│   │   ├── CaptchaWidget.tsx # Anti-bot visual verification module
│   │   ├── DistributorModal.tsx # Distributor application popup
│   │   ├── DownloadModal.tsx # TDS / MSDS technical document download modal
│   │   ├── EnquiryModal.tsx  # Product and commercial quote enquiry modal
│   │   ├── FormattedText.tsx # Rich inline markdown & markup renderer
│   │   ├── GoogleTranslator.tsx # Bilingual switcher utility
│   │   ├── Navbar.tsx      # Multi-level mega-menu navigation & controls
│   │   ├── Footer.tsx      # Comprehensive footer with quick links & badges
│   │   └── SEOMeta.tsx     # Dynamic OpenGraph, title, and meta injection
│   ├── lib/                # Shared utilities and helper functions
│   └── store/              # Zustand state store (`useCMSStore.ts`)
├── .env.example            # Environment variables template
├── next.config.mjs         # Next.js configuration and remote image domains
├── package.json            # Dependencies and npm build scripts
├── tailwind.config.ts      # Tailwind design system configuration
└── tsconfig.json           # TypeScript configuration
```

---

## ⚙️ Getting Started & Local Development

### 1. Prerequisites

- **Node.js:** `v18.17.0` or higher (Node 20+ recommended)
- **Package Manager:** `npm`, `pnpm`, or `yarn`

### 2. Installation

Clone the repository and install project dependencies:

```bash
# Clone the repository
git clone <repository-url>
cd Jai-deva

# Install dependencies
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root based on `.env.example`:

```bash
cp .env.example .env.local
```

Configure the environment variables:

```env
# URL of the Headless CMS API (Development default: http://localhost:3001)
NEXT_PUBLIC_CMS_API_URL=http://localhost:3001
```

> **Note:** Never commit production API keys, database credentials, or secret tokens to version control. Keep all local secrets in `.env.local`.

### 4. Running the Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Available Scripts

| Command                | Description                                          |
| :--------------------- | :--------------------------------------------------- |
| `npm run dev`          | Starts the Next.js development server on port 3000   |
| `npm run dev:turbo`    | Starts the Next.js development server with Turbopack |
| `npm run build`        | Compiles and builds the production-ready bundle      |
| `npm run start`        | Boots the built production application               |
| `npm run lint`         | Runs Next.js ESLint checks                           |
| `npm run format`       | Runs Prettier to automatically format code           |
| `npm run format:check` | Verifies code formatting across the repository       |

---

## 🛡️ Coding Standards & Guidelines

- **Canonical Data Access:** Access CMS and page data directly through canonical paths without multi-tier fallback chains.
- **Empty Fallbacks:** Always use clean empty containers (`|| ""` or `|| []`) for unpopulated fields to prevent mock text leaking into production.
- **Sitewide Modals:** Global user modals (e.g., `FirstTimePopupModal`) reside exclusively in `src/app/layout.tsx` to maintain unified entry state across all URLs.
- **Lead Integrity:** Commercial enquiries require mandatory `companyName` validation and verification through the canvas CAPTCHA system.

---

## 🚢 Deployment

The application is optimized for deployment on modern cloud platforms such as **Vercel**, **AWS Amplify**, or custom containerized environments (Docker/Kubernetes).

1. Set `NEXT_PUBLIC_CMS_API_URL` in your hosting provider's Environment Variables dashboard.
2. Build command: `npm run build`
3. Output directory: `.next`

---

## 📄 License & Confidentiality

© **Jai Deva Oil Co.** All rights reserved.  
This software and documentation are proprietary and confidential. Unauthorized duplication, distribution, or reverse engineering is strictly prohibited.
