'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, MessageSquare, Phone, MapPin, Send, 
  CheckCircle, ArrowLeft, Loader2 
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!name || !email || !subject || !message) {
      setError('Please fill in all the input fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError('Form submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="animated-bg min-h-screen relative overflow-hidden flex flex-col justify-start py-12">
        <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Header */}
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
            <Link href="/" className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Contact Our Team</h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Have questions, feedback, or integration inquiries? Submit a ticket and our support engineers will reply in under 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-6">
            {/* Info Grid - 4 Columns */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct channels */}
              <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60 space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-2">Get in Touch</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Check out our API documentation or FAQ first, as your question might already be answered!
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center space-x-3.5 text-zinc-300">
                      <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Email Support</p>
                        <a href="mailto:support@enhancepro.ai" className="text-sm hover:underline hover:text-white transition-colors">
                          support@enhancepro.ai
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 text-zinc-300">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">General Enquiries</p>
                        <span className="text-sm text-zinc-400">+1 (800) 555-0199</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5 text-zinc-300">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Office Address</p>
                        <span className="text-sm text-zinc-400">100 Pine Street, San Francisco, CA</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-900 pt-6">
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    EnhancePro processes thousands of image assets daily. Rest assured that no uploaded image data is ever shared or stored during email support.
                  </p>
                </div>
              </div>
            </div>

            {/* Form - 7 Columns */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-zinc-800/60 h-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {error && (
                        <div className="p-3 text-xs rounded-xl bg-red-950/20 border border-red-900/40 text-red-400">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/40 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/40 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Subject</label>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="How can we help you?"
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/40 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Message</label>
                        <textarea
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write your message details..."
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/40 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 resize-none"
                          required
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-lg hover:scale-[1.01]"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending message...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Support Ticket
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-4 py-8"
                    >
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                          Thank you for contacting us. We have received your support ticket and will get back to you shortly.
                        </p>
                      </div>
                      <div className="pt-4">
                        <button
                          onClick={() => setSubmitted(false)}
                          className="px-5 py-2 text-xs font-bold border border-zinc-850 rounded-lg text-zinc-400 hover:text-white transition-colors"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
