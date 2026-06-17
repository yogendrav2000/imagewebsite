'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Search, Clock, ArrowRight, BookOpen, 
  Calendar, User, Sparkles 
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categories = ['All', 'AI Technology', 'Guides & Tips', 'Case Studies'];

const articles = [
  {
    title: 'Understanding Super-Resolution: How Real-ESRGAN Upscales Images',
    excerpt: 'Dive deep into the mechanics of Generative Adversarial Networks (GANs) and how they reconstruct pixel details in blurry graphics.',
    category: 'AI Technology',
    author: 'Dr. Evelyn Carter',
    date: 'June 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: '5 Tips to Restore Old Creased Family Photos Like a Pro',
    excerpt: 'Learn the exact settings, filters, and digital archival practices to convert grainy aged photo albums into crystal-clear digital copies.',
    category: 'Guides & Tips',
    author: 'Thomas Sterling',
    date: 'May 28, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Why Transparent PNG Cutouts are Crucial for E-commerce CTR',
    excerpt: 'A comprehensive study on how clean object isolation and background removals increase conversion rates on major e-commerce platforms.',
    category: 'Case Studies',
    author: 'Monica Ramirez',
    date: 'May 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'The Future of Portrait Restorations: GFPGAN vs CodeFormer',
    excerpt: 'Comparing the two leading blind face restoration models on fidelity, detail consistency, and artifact prevention in complex group images.',
    category: 'AI Technology',
    author: 'Dr. Evelyn Carter',
    date: 'April 30, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  }
];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main className="animated-bg min-h-screen relative overflow-hidden flex flex-col justify-start py-12">
        <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Header */}
          <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
            <Link href="/" className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold text-white flex items-center justify-center space-x-2.5">
              <BookOpen className="w-9 h-9 text-violet-400" />
              <span>AI Enhancement Blog</span>
            </h1>
            <p className="text-zinc-455 text-sm sm:text-base leading-relaxed">
              Explore resources, technological deep-dives, and guides written by our research team. Learn how to maximize your graphic workflows.
            </p>
          </div>

          {/* Search & Category Filter bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-zinc-900/60">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                    activeCategory === cat
                      ? 'bg-violet-600/10 border-violet-500 text-violet-400 shadow-md'
                      : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/40 text-sm placeholder-zinc-550 text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Blog Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map((art, index) => (
                <div 
                  key={index}
                  className="glass-panel rounded-2xl overflow-hidden border border-zinc-850 flex flex-col justify-between group hover:border-zinc-800 hover:shadow-xl hover:shadow-violet-600/[0.02] transition-all duration-300"
                >
                  <div className="relative h-56 w-full overflow-hidden border-b border-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={art.image}
                      alt={art.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950/80 text-[10px] font-bold tracking-wider text-violet-400 border border-zinc-800 uppercase backdrop-blur-sm">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center space-x-4 text-[11px] text-zinc-500">
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {art.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {art.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-900/60">
                      <span className="flex items-center text-xs font-semibold text-zinc-450">
                        <User className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
                        {art.author}
                      </span>
                      <span className="text-xs font-bold text-pink-400 group-hover:text-pink-300 inline-flex items-center transition-colors">
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-panel rounded-2xl border border-zinc-900/60">
              <p className="text-zinc-500 text-sm">No articles matched your search query.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
