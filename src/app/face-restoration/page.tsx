'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Smile, Trash2, Download, ArrowLeft, 
  Info, Cpu, Sliders, Check, RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import ProcessingScreen from '@/components/ProcessingScreen';
import ComparisonSlider from '@/components/ComparisonSlider';
import { useImageProcessor } from '@/hooks/useImageProcessor';

export default function FaceRestorationPage() {
  const {
    file,
    originalPreview,
    enhancedPreview,
    isLoading,
    progress,
    error,
    processingTime,
    handleFileChange,
    processImage,
    downloadResult,
    reset,
  } = useImageProcessor();

  const [engine, setEngine] = useState<'gfpgan' | 'codeformer'>('gfpgan');
  const [fidelity, setFidelity] = useState<number>(75);

  const handleProcess = () => {
    processImage('restore-face', {
      faceRestoreModel: engine,
      faceRestoreFidelity: fidelity / 100,
    });
  };

  return (
    <>
      <Navbar />

      <main className="animated-bg min-h-screen relative overflow-hidden flex flex-col justify-start py-12">
        <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Header breadcrumb */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <Link href="/" className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-white transition-colors mb-3">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Back to Tools
              </Link>
              <h1 className="text-3xl font-extrabold text-white flex items-center space-x-2">
                <Smile className="w-8 h-8 text-blue-400" />
                <span>Face Restoration AI</span>
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Restore blurry, pixelated, or compressed facial details in vintage or low-quality portraits.
              </p>
            </div>

            {originalPreview && !isLoading && (
              <button
                onClick={reset}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold border border-zinc-800 rounded-lg hover:border-zinc-700 bg-zinc-900/30 text-zinc-300 hover:text-white transition-all"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Upload Different Image
              </button>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-900/40 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Workspace Area - 8 Columns */}
            <div className="lg:col-span-8 flex flex-col items-center">
              {!originalPreview && (
                <div className="w-full glass-panel p-10 rounded-3xl border border-zinc-860 flex items-center justify-center min-h-[450px]">
                  <div className="w-full max-w-lg">
                    <div className="text-center space-y-2 mb-8">
                      <h3 className="text-xl font-bold text-white">Select portrait photo</h3>
                      <p className="text-sm text-zinc-400">Works best on group shots, grainy selfies, or compressed avatars.</p>
                    </div>
                    <ImageUploader onFileSelected={handleFileChange} />
                  </div>
                </div>
              )}

              {originalPreview && isLoading && (
                <div className="w-full glass-panel p-10 rounded-3xl border border-zinc-860 flex items-center justify-center min-h-[450px]">
                  <ProcessingScreen progress={progress} />
                </div>
              )}

              {originalPreview && !isLoading && !enhancedPreview && (
                <div className="w-full glass-panel p-6 rounded-3xl border border-zinc-860 flex flex-col items-center justify-center min-h-[450px]">
                  <div className="relative max-w-full max-h-[450px] overflow-hidden rounded-2xl border border-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={originalPreview}
                      alt="Original Preview"
                      className="max-w-full max-h-[450px] object-contain"
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-4 font-mono">
                    Original File Size: {file ? (file.size / 1024 / 1024).toFixed(2) : '0'} MB
                  </p>
                </div>
              )}

              {originalPreview && !isLoading && enhancedPreview && (
                <div className="w-full glass-panel p-6 rounded-3xl border border-zinc-860 flex flex-col items-center justify-center">
                  <div className="w-full aspect-[4/3] max-h-[480px]">
                    <ComparisonSlider
                      beforeImage={originalPreview}
                      afterImage={enhancedPreview}
                      beforeFilter="blur(3.5px) saturate(0.9)"
                      className="w-full h-full"
                    />
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between w-full p-4 rounded-xl bg-zinc-950/60 border border-zinc-900 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Processing Success</span>
                      <p className="text-xs text-zinc-400 font-mono">
                        Model: {engine.toUpperCase()} • Fidelity: {fidelity}% • Time: {(processingTime ? processingTime / 1000 : 0).toFixed(2)}s
                      </p>
                    </div>
                    <button
                      onClick={downloadResult}
                      className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 transition-all shadow-lg hover:scale-[1.02]"
                    >
                      <Download className="w-4.5 h-4.5 mr-2" />
                      Download Restored Portrait
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Controls - 4 Columns */}
            <div className="lg:col-span-4 space-y-6">
              {/* Settings Card */}
              <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60">
                <div className="flex items-center space-x-2 text-white font-semibold pb-4 border-b border-zinc-900">
                  <Sliders className="w-5 h-5 text-blue-400" />
                  <h2>Restoration Settings</h2>
                </div>

                <div className="space-y-6 pt-6">
                  {/* Engine Choice */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Neural Engine Model
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setEngine('gfpgan')}
                        disabled={isLoading}
                        className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                          engine === 'gfpgan'
                            ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                            : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-800'
                        }`}
                      >
                        GFPGAN (Natural)
                      </button>
                      <button
                        onClick={() => setEngine('codeformer')}
                        disabled={isLoading}
                        className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                          engine === 'codeformer'
                            ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                            : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-800'
                        }`}
                      >
                        CodeFormer (Structured)
                      </button>
                    </div>
                  </div>

                  {/* Fidelity Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                      <span>Restoration Fidelity</span>
                      <span className="text-blue-400">{fidelity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={fidelity}
                      onChange={(e) => setFidelity(Number(e.target.value))}
                      disabled={isLoading}
                      className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <p className="text-[10px] text-zinc-500 leading-normal">
                      Higher values focus on restoring original structures; lower values allow generative additions for heavily damaged inputs.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleProcess}
                    disabled={isLoading || !originalPreview}
                    className="w-full inline-flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 shadow-xl shadow-blue-500/10 hover:scale-[1.01]"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isLoading ? 'Reconstructing Face Details...' : 'Restore Face Details Now'}
                  </button>
                </div>
              </div>

              {/* Info Card */}
              <div className="glass-panel p-5 rounded-2xl border border-zinc-800/60 bg-zinc-950/20 text-xs text-zinc-400 space-y-3">
                <div className="flex items-center space-x-1.5 text-zinc-300 font-bold uppercase tracking-wider">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>Technical Info</span>
                </div>
                <p className="leading-relaxed">
                  GFPGAN uses blind face restoration algorithms to extract face priors and map realistic geometries (eyes, teeth, ears) even in blurred inputs. CodeFormer improves codebooks for structured accuracy.
                </p>
                <div className="flex items-center space-x-2 pt-1.5 font-semibold text-zinc-300 border-t border-zinc-900">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No watermarks</span>
                </div>
                <div className="flex items-center space-x-2 font-semibold text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fully secure HTTPS encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
