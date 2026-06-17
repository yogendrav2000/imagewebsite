import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Image Enhancer Pro - Free Online Upscaler & Photo Enhancer",
  description: "Upscale, restore, and enhance your photos 100% free with no watermarks. Reconstruct faces, remove backgrounds, and clean vintage archival photos using advanced AI models.",
  keywords: "ai upscaler, image enhancer, face restoration, background remover, old photo restoration, gfpgan, real-esrgan, codeformer, free image tools",
  openGraph: {
    title: "AI Image Enhancer Pro - Free Online Upscaler & Photo Enhancer",
    description: "Upscale, restore, and enhance your photos 100% free with no watermarks. Reconstruct faces, remove backgrounds, and clean vintage archival photos using advanced AI models.",
    type: "website",
    locale: "en_US",
    siteName: "AI Image Enhancer Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Enhancer Pro - Free Online Upscaler & Photo Enhancer",
    description: "Upscale, restore, and enhance your photos 100% free with no watermarks. Reconstruct faces, remove backgrounds, and clean vintage archival photos using advanced AI models.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
