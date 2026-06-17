import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="animated-bg min-h-screen relative overflow-hidden flex flex-col justify-start py-16">
        <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-white transition-colors mb-3">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-extrabold text-white flex items-center space-x-2">
              <Shield className="w-8 h-8 text-violet-400" />
              <span>Privacy Policy</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Last Updated: June 15, 2026</p>
          </div>

          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-zinc-850 space-y-6 text-sm text-zinc-350 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">1. Introduction</h2>
              <p>
                At EnhancePro, we prioritize your privacy. This Privacy Policy details how we handle files, graphics, and personal data that pass through our online AI Image Upscaling and Enhancement servers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">2. Image Uploads and Data Processing</h2>
              <p>
                Our core commitment is that <strong>we do not store or claim ownership of your images</strong>. 
              </p>
              <ul className="list-disc list-inside pl-2 space-y-2">
                <li>All uploaded image files are stored in transient, secure server memory buffers during execution.</li>
                <li>Images are automatically purged from our servers immediately after you download the result, or at maximum 1 hour after processing.</li>
                <li>We do not train our machine learning models, neural weights, or algorithmic layers on any user-provided assets.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">3. Information We Collect</h2>
              <p>
                To maintain server health, protect against Denial of Service (DoS) attacks, and populate our admin dashboard analytics, we collect:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-2">
                <li>IP Addresses (for rate limiting, aggregated securely).</li>
                <li>Browser metadata (user-agents for responsive debugging).</li>
                <li>System performance metrics (processing durations, upload sizes, success/fail counts).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">4. Cookies and Analytics</h2>
              <p>
                We use minimal, privacy-focused functional cookies to remember UI preferences (such as dark mode states, recent tool settings, or admin logins). We do not run third-party advertising tracking scripts or behavioral cookies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">5. Third-Party Integrations</h2>
              <p>
                When processing high-fidelity requests, we pass image buffers via HTTPS to upstream AI providers (such as Replicate API nodes running GFPGAN or Real-ESRGAN). These transmissions are encrypted and governed by strict privacy guidelines prohibiting the storage or reuse of client buffers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">6. Changes to this Policy</h2>
              <p>
                We reserve the right to update our privacy workflows to reflect security improvements. Check this page periodically for updates. If you have questions about our privacy infrastructure, please email us at <a href="mailto:privacy@enhancepro.ai" className="text-violet-400 hover:underline">privacy@enhancepro.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
