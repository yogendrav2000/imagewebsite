# AI Image Enhancer Pro

A production-ready, highly responsive, dark-themed AI image upscaling and photo enhancement web application built with **Next.js 15/16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Framer Motion**.

## Key Features

- **Modern SaaS Aesthetics**: Premium dark mode design utilizing glassmorphism cards, smooth animations, and clean layouts.
- **AI Tools Suite**:
  - **AI Image Upscaler**: Scale image resolutions (2x, 4x, 8x) with texture details reconstruction.
  - **AI Photo Enhancer**: Balance exposure levels, auto contrast adjustments, and denoise filters.
  - **Face Restoration**: Rebuild pixelated portraits using GFPGAN or CodeFormer models.
  - **Background Remover**: Isolate subjects with transparency mask cutouts, returning clean PNG files.
  - **Old Photo Restoration**: Repair cracks/scratches and colorize vintage monochrome records.
- **Interactive Before/After Presets Slider**: Dynamic side-by-side sliding inspection workspace.
- **Admin Dashboard Console**: Real-time logging of upload statistics, tool usage distribution charts, and resource health graphs.
- **Developer REST API Documentation**: Clear instructions with copy-pasteable cURL and JS code snippets.
- **Next.js 16 Proxy Engine**: Edge rate-limiting and security headers (CSP, HSTS, XSS protection).
- **SEO Optimization**: Dynamic sitemaps, crawlers instructions (`robots.txt`), Open Graph tags, and structured JSON-LD schema.

---

## Local Development

### 1. Installation

Install all required packages:
```bash
npm install
```

### 2. Environment Configurations

Copy the env template file:
```bash
cp .env.example .env
```

Open `.env` and fill in your credentials:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REPLICATE_API_TOKEN=your_replicate_api_token_here
ADMIN_PASSWORD=admin_secure_password_123
```
*Note: If `REPLICATE_API_TOKEN` is unset or left as default, the backend falls back to high-fidelity mock processing delays and adjustments so the interface remains immediately testable.*

### 3. Run Development Server

Launch the hot-reloading dev environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Docker Deployment

To build and launch the production container using Docker:

### 1. Build and Run Container
```bash
docker-compose up --build -d
```

### 2. Stop Containers
```bash
docker-compose down
```

---

## Production Compilation

To compile the standalone build assets manually:
```bash
npm run build
npm run start
```
The application will start on port `3000`.

---

## Codebase Layout

```
├── src/
│   ├── app/                      # App Router Nodes
│   │   ├── admin/                # Admin Panel Interface
│   │   ├── api-docs/             # API Reference Documentation
│   │   ├── bg-remover/           # Background Removal Tool
│   │   ├── blog/                 # Articles Stream
│   │   ├── contact/              # Support Ticket Submittals
│   │   ├── enhancer/             # HDR Exposure Adjuster
│   │   ├── face-restoration/     # Portrait Reconstruction
│   │   ├── old-photo/            # Archival crease healer
│   │   ├── upscaler/             # Super-Resolution multiplier
│   │   ├── api/                  # REST Endpoint routes
│   │   ├── favicon.ico           # Site Icon
│   │   ├── globals.css           # Custom CSS utilities & checkerboard styles
│   │   ├── layout.tsx            # Global metadata & font structures
│   │   ├── page.tsx              # Landing page dashboard
│   │   ├── robots.ts             # Crawlers configuration
│   │   └── sitemap.ts            # Site mapping indices
│   ├── components/               # Shareable UI Panels
│   │   ├── Navbar.tsx            # Nav header & drop drawer
│   │   ├── Footer.tsx            # Footer directories
│   │   ├── ImageUploader.tsx     # Drag-and-drop dropzones
│   │   ├── ComparisonSlider.tsx  # Before/After divider sliders
│   │   └── ProcessingScreen.tsx  # Glass loading status checks
│   ├── hooks/
│   │   └── useImageProcessor.ts  # Client files coordination hook
│   ├── services/
│   │   ├── ai.ts                 # AI Integration wrappers
│   │   └── db.ts                 # Analytics logging cache
│   └── proxy.ts                  # Security Proxy
├── Dockerfile                    # Container builds multi-stage files
├── docker-compose.yml            # Compose deployments parameters
├── next.config.ts                # Standalone compilation settings
└── tsconfig.json                 # Strict TypeScript types configs
```
