import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-violet-400" />
              <span>Terms of Service</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Last Updated: June 15, 2026</p>
          </div>

          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-zinc-850 space-y-6 text-sm text-zinc-350 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the EnhancePro platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">2. Acceptable Use</h2>
              <p>
                We provide AI image processing tools free of charge for personal and commercial graphics creation. You agree NOT to use our service to:
              </p>
              <ul className="list-disc list-inside pl-2 space-y-2">
                <li>Upload files containing malicious code, viruses, or Trojan horses.</li>
                <li>Process abusive, defamatory, harassing, or illegal content.</li>
                <li>Attempt to bypass rate limits, probe security endpoints, or scrape code architectures.</li>
                <li>Incorporate our API routes into third-party wrapper bots without acquiring token authorization.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">3. Intellectual Property Rights</h2>
              <p>
                We claim <strong>zero rights or intellectual ownership</strong> over the images you upload, process, or download. The copyright of original files and output AI renders remains fully with the respective user, consistent with applicable regional laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">4. Disclaimer of Warranties</h2>
              <p>
                EnhancePro is provided "as is" and "as available". We do not guarantee uninterrupted server uptime, zero prediction delays, or that the AI results will meet specific aesthetic standards. We are not liable for graphics errors, network timeouts, or loss of transient buffers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">5. Termination</h2>
              <p>
                We reserve the right to suspend or restrict access to IPs or API tokens violating these Terms without prior warning, to secure server allocations for our general community.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white">6. Governing Law</h2>
              <p>
                These terms are governed by the laws of the State of California, without regard to conflict of law principles. Any legal disputes arising shall be handled exclusively in courts located in San Francisco, California.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
