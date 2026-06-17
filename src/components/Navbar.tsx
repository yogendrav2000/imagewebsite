'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Menu, X, Image, Cpu, Laptop, FileText, Mail, Info, FileSpreadsheet } from 'lucide-react';

const tools = [
  { name: 'AI Image Upscaler', href: '/upscaler', desc: 'Enlarge images up to 8x without quality loss' },
  { name: 'AI Photo Enhancer', href: '/enhancer', desc: 'Fix exposure, color, contrast automatically' },
  { name: 'Face Restoration', href: '/face-restoration', desc: 'Repair blurred faces with GFPGAN & CodeFormer' },
  { name: 'Background Remover', href: '/bg-remover', desc: 'Extract objects instantly with RemBG' },
  { name: 'Old Photo Restoration', href: '/old-photo', desc: 'Repair scratches and colorize vintage photos' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when path changes
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass-navbar py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Enhance<span className="text-violet-500 font-extrabold">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white ${
                  tools.some((t) => pathname === t.href)
                    ? 'text-violet-400 bg-white/5'
                    : 'text-zinc-300'
                }`}
              >
                <span>AI Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute left-0 mt-2 w-80 rounded-xl glass-panel p-2 shadow-2xl z-50"
                  >
                    <div className="space-y-1">
                      {tools.map((tool) => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className={`flex flex-col p-3 rounded-lg transition-colors hover:bg-white/5 ${
                            pathname === tool.href ? 'bg-white/5 text-violet-400' : 'text-zinc-300'
                          }`}
                        >
                          <span className="text-sm font-semibold text-white">{tool.name}</span>
                          <span className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{tool.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/api-docs"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white ${
                pathname === '/api-docs' ? 'text-violet-400 bg-white/5' : 'text-zinc-300'
              }`}
            >
              API Docs
            </Link>

            <Link
              href="/blog"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white ${
                pathname === '/blog' ? 'text-violet-400 bg-white/5' : 'text-zinc-300'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white ${
                pathname === '/contact' ? 'text-violet-400 bg-white/5' : 'text-zinc-300'
              }`}
            >
              Contact
            </Link>

            <Link
              href="/admin"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white flex items-center space-x-1 ${
                pathname === '/admin' ? 'text-violet-400 bg-white/5' : 'text-zinc-300'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Link
              href="/upscaler"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/25 hover:scale-[1.02]"
            >
              Enhance Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-navbar border-t border-zinc-800 bg-zinc-950/95 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <div>
                <p className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-2">AI Image Tools</p>
                <div className="grid gap-2 pl-2 border-l border-zinc-800">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className={`block py-1.5 text-sm transition-colors ${
                        pathname === tool.href ? 'text-violet-400 font-semibold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-900 pt-2 space-y-2">
                <Link
                  href="/api-docs"
                  className={`block py-1.5 text-sm ${
                    pathname === '/api-docs' ? 'text-violet-400 font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  API Documentation
                </Link>
                <Link
                  href="/blog"
                  className={`block py-1.5 text-sm ${
                    pathname === '/blog' ? 'text-violet-400 font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className={`block py-1.5 text-sm ${
                    pathname === '/contact' ? 'text-violet-400 font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Contact Us
                </Link>
                <Link
                  href="/admin"
                  className={`py-1.5 text-sm flex items-center space-x-1 ${
                    pathname === '/admin' ? 'text-violet-400 font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Laptop className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              </div>

              <div className="pt-2">
                <Link
                  href="/upscaler"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-pink-500"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
