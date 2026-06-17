'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Sparkles, Zap, Shield, Image as ImageIcon, Smile, Eye, 
  Trash2, Layers, Cpu, Download, ArrowRight, UserCheck, 
  Clock, ShieldAlert, Award, ChevronDown, MessageSquare
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComparisonSlider from '@/components/ComparisonSlider';
import ImageUploader from '@/components/ImageUploader';

// FAQ items
const faqs = [
  {
    q: 'How does the AI image upscaling work?',
    a: 'Our AI upscaler uses deep convolutional neural networks (specifically Real-ESRGAN and GFPGAN models) to predict and reconstruct missing details in low-resolution images, producing sharp, high-quality, high-resolution results up to 8x.',
  },
  {
    q: 'Is this service completely free to use?',
    a: 'Yes! All of our AI image tools are 100% free with no hidden fees, no credit card required, and no subscription plans. You can process as many images as you like.',
  },
  {
    q: 'Will my uploaded images have watermarks?',
    a: 'Absolutely not. We believe your images belong to you. We do not inject watermarks or signatures into any of your enhanced or restored photos.',
  },
  {
    q: 'Are my uploaded photos secure?',
    a: 'Yes, security is a priority. All uploaded images are processed securely using temporary memory buffers and are automatically deleted from our servers immediately after your download or within 1 hour. We never store or train on your private data.',
  },
  {
    q: 'What image formats do you support?',
    a: 'We support JPG, PNG, and WEBP formats. The maximum file size limit is 10MB per image to ensure rapid processing speeds.',
  },
];

// Testimonials
const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Freelance Photographer',
    quote: 'The Face Restoration tool is magic! I restored a client\'s blurry childhood photo, and they were in tears. It\'s hard to believe this is free and has no watermarks.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    name: 'Marcus Chen',
    role: 'E-commerce UI Designer',
    quote: 'I use the Background Remover daily for product assets. The edge detection is cleaner than many paid tools I\'ve tried. Saves me hours of manual clipping.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    name: 'Elena Rostova',
    role: 'Digital Archivist',
    quote: 'The 4x upscale quality is fantastic. Textures and hair look organic rather than plastic. This has become a staple in my image enhancement workflow.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
  },
];

// Demo presets for Before/After
const demos = [
  {
    id: 'upscale',
    label: 'AI Upscaler',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    beforeFilter: 'blur(3px) contrast(0.9) saturate(0.8)',
    desc: 'Breathe details into landscapes and product designs.',
  },
  {
    id: 'face',
    label: 'Face Fixer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    beforeFilter: 'blur(4px) contrast(0.85)',
    desc: 'Restore clarity, fix blur, and reconstruct eyes and skin.',
  },
  {
    id: 'old',
    label: 'Vintage Restore',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    beforeFilter: 'sepia(0.8) contrast(0.8) blur(1px) brightness(0.95)',
    desc: 'Colorize, repair textures, and undo aging effects.',
  },
];

export default function Home() {
  const router = useRouter();
  const [activeDemo, setActiveDemo] = useState(demos[0]);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // When homepage receives a file drop, route to Upscaler and store temporary reference
  const handleFileDrop = (file: File) => {
    // Save file locally to session storage if possible or pass via state
    // For a cleaner UX in Next app, we can just navigate to the upscaler page
    router.push('/upscaler');
  };

  return (
    <>
      {/* Structured SEO Data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'AI Image Enhancer Pro',
            'url': 'https://enhancepro.ai',
            'description': 'Free web app to upscale, enhance, restore, and edit photos using cutting edge neural networks.',
            'applicationCategory': 'MultimediaApplication',
            'operatingSystem': 'All',
            'browserRequirements': 'Requires JavaScript. Requires HTML5.',
            'offers': {
              '@type': 'Offer',
              'price': '0.00',
              'priceCurrency': 'USD',
            },
          }),
        }}
      />

      <Navbar />

      <main className="animated-bg min-h-screen relative overflow-hidden flex flex-col justify-start">
        {/* Glow Effects */}
        <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Neural Enhancement</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Upscale and Restore Images <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                With Free AI Power
              </span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
              Transform low-resolution photos into stunning high-definition masterpieces. Enhance details, restore faces, remove backgrounds, and revitalize old memories instantly.
            </p>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12"
          >
            <ImageUploader onFileSelected={handleFileDrop} />
            
            <div className="mt-4 flex items-center justify-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-xs text-zinc-500">100% Free • No watermarks • No signup needed</p>
            </div>

            <div className="mt-6">
              <Link
                href="/upscaler"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 transition-all duration-300 shadow-xl shadow-violet-500/15 hover:scale-[1.02]"
              >
                <span>Enhance Image Free</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Before/After Demo Section */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 border-t border-zinc-900/50">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl font-extrabold text-white">Witness The AI Clarity</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Drag the interactive slider to compare original low-res images with enhanced AI outputs.
            </p>

            {/* Presets buttons */}
            <div className="flex justify-center space-x-2.5 pt-4">
              {demos.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                    activeDemo.id === demo.id
                      ? 'bg-violet-600/10 border-violet-500/50 text-violet-400 shadow-lg'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            <div className="lg:col-span-3">
              <ComparisonSlider
                beforeImage={activeDemo.image}
                afterImage={activeDemo.image}
                beforeFilter={activeDemo.beforeFilter}
                className="aspect-[4/3] w-full"
              />
            </div>
            <div className="space-y-4 text-left lg:col-span-1">
              <div className="flex items-center space-x-2 text-violet-400">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">{activeDemo.label}</span>
              </div>
              <h3 className="text-xl font-bold text-white">Precision Restructuring</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{activeDemo.desc}</p>
              <div className="pt-2">
                <Link
                  href={activeDemo.id === 'upscale' ? '/upscaler' : activeDemo.id === 'face' ? '/face-restoration' : '/old-photo'}
                  className="text-sm font-semibold text-pink-400 hover:text-pink-300 inline-flex items-center space-x-1"
                >
                  <span>Try this tool</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section className="bg-zinc-950/60 py-24 border-t border-zinc-900/50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl font-extrabold text-white">AI Processing Tools Suite</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                Explore our purpose-built neural network engines ready to process your files in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tool 1 */}
              <Link href="/upscaler" className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Image Upscaler</h3>
                  <p className="text-sm text-zinc-400">
                    Enlarge photos up to 8x resolution. Infuses high-frequency details, sharpens borders, and extracts crisp organic textures.
                  </p>
                </div>
                <div className="flex items-center text-xs text-violet-400 font-bold uppercase tracking-wider pt-6">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>

              {/* Tool 2 */}
              <Link href="/enhancer" className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Photo Enhancer</h3>
                  <p className="text-sm text-zinc-400">
                    Smart auto-hdr balancing, high-fidelity denoise and color corrections to make underexposed images pop with natural vibrance.
                  </p>
                </div>
                <div className="flex items-center text-xs text-pink-400 font-bold uppercase tracking-wider pt-6">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>

              {/* Tool 3 */}
              <Link href="/face-restoration" className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Smile className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Face Restoration</h3>
                  <p className="text-sm text-zinc-400">
                    Specifically repairs blurred, pixelated, or compressed human faces using advanced GFPGAN & CodeFormer generative systems.
                  </p>
                </div>
                <div className="flex items-center text-xs text-blue-400 font-bold uppercase tracking-wider pt-6">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>

              {/* Tool 4 */}
              <Link href="/bg-remover" className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Background Remover</h3>
                  <p className="text-sm text-zinc-400">
                    Instantly isolates subjects. Removes backgrounds cleanly with high-contrast hair and edge detection, exporting as transparent PNGs.
                  </p>
                </div>
                <div className="flex items-center text-xs text-emerald-400 font-bold uppercase tracking-wider pt-6">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>

              {/* Tool 5 */}
              <Link href="/old-photo" className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Old Photo Restoration</h3>
                  <p className="text-sm text-zinc-400">
                    Fix scratches, tears, and mold marks on vintage photos. Re-inject organic colors into monochrome archival assets.
                  </p>
                </div>
                <div className="flex items-center text-xs text-amber-400 font-bold uppercase tracking-wider pt-6">
                  <span>Open Tool</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>

              {/* Tool 6 - API Docs */}
              <Link href="/api-docs" className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Developer API</h3>
                  <p className="text-sm text-zinc-400">
                    Integrate our AI models into your application. Low latency, robust REST endpoints, and complete documentation.
                  </p>
                </div>
                <div className="flex items-center text-xs text-purple-400 font-bold uppercase tracking-wider pt-6">
                  <span>Read API Docs</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-zinc-900/50">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-white">Simple 3-Step Process</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Our automated system processes everything in your browser tab and server containers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl font-bold text-violet-400 font-mono shadow-xl shadow-black/40">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Upload Image</h3>
              <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                Drag-and-drop your JPG, PNG, or WEBP photo. Up to 10MB file limit supported securely.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl font-bold text-pink-400 font-mono shadow-xl shadow-black/40">
                2
              </div>
              <h3 className="text-lg font-bold text-white">AI Processing</h3>
              <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                Our neural models remove noise, reconstruct features, and upscale resolution in a few seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl font-bold text-emerald-400 font-mono shadow-xl shadow-black/40">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Download Result</h3>
              <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                Inspect your before/after comparisons and save the clean enhanced photo in original high quality.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-zinc-950/60 py-24 border-t border-zinc-900/50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl font-extrabold text-white">Why Choose EnhancePro?</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                No subscription models, no visual compromises. Professional AI, democratized for all.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="glass-card p-6 rounded-2xl text-center space-y-3">
                <div className="w-10 h-10 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mx-auto">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">100% Free</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">No pricing tiers, no usage restrictions. Keep your wallet in your pocket.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center space-y-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mx-auto">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">No Watermarks</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Your output photos are completely clean and yours to distribute anywhere.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Fast Processing</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Powered by high-speed server clusters to render results in under 5 seconds.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Secure Uploads</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Images run inside temporary buffers. No permanent logs of your assets are kept.</p>
              </div>

              <div className="glass-card p-6 rounded-2xl text-center space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Elite Quality</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">Leverages advanced models like GFPGAN and Real-ESRGAN for sharp results.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-zinc-900/50">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-white">Loved by Creators</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Read how developers, designers, and photo hobbyists use our services daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex text-amber-400 text-lg">★★★★★</div>
                  <p className="text-sm text-zinc-300 leading-relaxed italic">"{test.quote}"</p>
                </div>
                <div className="flex items-center space-x-3.5 pt-4 border-t border-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-white">{test.name}</h5>
                    <p className="text-xs text-zinc-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 border-t border-zinc-900/50">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-zinc-400">
              Got questions? We have answers. If you need more help, feel free to contact us.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div key={idx} className="glass-card rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left text-white font-semibold transition-colors duration-150 hover:bg-white/5"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-violet-400' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-900/50 pt-3 bg-zinc-950/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
