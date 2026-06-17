import Link from 'next/link';
import { Sparkles, Github, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Enhance<span className="text-violet-500">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Professional-grade AI image upscaling and photo enhancement. Restore, upscale, and beautify your assets 100% free with no watermarks.
            </p>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">AI Tools</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/upscaler" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  AI Image Upscaler
                </Link>
              </li>
              <li>
                <Link href="/enhancer" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  AI Photo Enhancer
                </Link>
              </li>
              <li>
                <Link href="/face-restoration" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Face Restoration
                </Link>
              </li>
              <li>
                <Link href="/bg-remover" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Background Remover
                </Link>
              </li>
              <li>
                <Link href="/old-photo" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Old Photo Restoration
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/api-docs" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/privacy" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-zinc-500 text-center md:text-left">
            &copy; {currentYear} EnhancePro Inc. All rights reserved. Made with love for photographers & designers worldwide.
          </p>
          <p className="text-xs text-zinc-600 flex items-center space-x-1">
            <span>Server Status: Online</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1"></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
