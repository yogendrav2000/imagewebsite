'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Maximize2, Trash2, Download, ArrowLeft, 
  Info, Cpu, Sliders, Check, RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import ProcessingScreen from '@/components/ProcessingScreen';
import ComparisonSlider from '@/components/ComparisonSlider';
import { useImageProcessor } from '@/hooks/useImageProcessor';

export default function UpscalerPage() {
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

  const [scale, setScale] = useState<number>(4);
  const [faceEnhance, setFaceEnhance] = useState<boolean>(true);

  const handleProcess = () => {
    processImage('upscale', {
      upscale: scale,
      faceRestore: faceEnhance,
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
                <Maximize2 className="w-8 h-8 text-violet-400" />
                <span>AI Image Upscaler</span>
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Increase resolution up to 8x using advanced super-resolution neural networks.
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
                <div className="w-full glass-panel p-10 rounded-3xl border border-zinc-850 flex items-center justify-center min-h-[450px]">
                  <div className="w-full max-w-lg">
                    <div className="text-center space-y-2 mb-8">
                      <h3 className="text-xl font-bold text-white">Select image to upscale</h3>
                      <p className="text-sm text-zinc-400">Upload a photograph, digital artwork, or graphic resource.</p>
                    </div>
                    <ImageUploader onFileSelected={handleFileChange} />
                  </div>
                </div>
              )}

              {originalPreview && isLoading && (
                <div className="w-full glass-panel p-10 rounded-3xl border border-zinc-850 flex items-center justify-center min-h-[450px]">
                  <ProcessingScreen progress={progress} />
                </div>
              )}

              {originalPreview && !isLoading && !enhancedPreview && (
                <div className="w-full glass-panel p-6 rounded-3xl border border-zinc-850 flex flex-col items-center justify-center min-h-[450px]">
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
                <div className="w-full glass-panel p-6 rounded-3xl border border-zinc-850 flex flex-col items-center justify-center">
                  <div className="w-full aspect-[4/3] max-h-[480px]">
                    <ComparisonSlider
                      beforeImage={originalPreview}
                      afterImage={enhancedPreview}
                      beforeFilter="blur(2.5px)"
                      className="w-full h-full"
                    />
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between w-full p-4 rounded-xl bg-zinc-950/60 border border-zinc-900 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Processing Success</span>
                      <p className="text-xs text-zinc-400 font-mono">
                        Scale Factor: {scale}x • Engine: Real-ESRGAN • Time: {(processingTime ? processingTime / 1000 : 0).toFixed(2)}s
                      </p>
                    </div>
                    <button
                      onClick={downloadResult}
                      className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 transition-all shadow-lg hover:scale-[1.02]"
                    >
                      <Download className="w-4.5 h-4.5 mr-2" />
                      Download High-Res Output
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
                  <Sliders className="w-5 h-5 text-violet-400" />
                  <h2>Upscaler Settings</h2>
                </div>

                <div className="space-y-6 pt-6">
                  {/* Scaling Factor */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Upscaling Factor
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[2, 4, 8].map((factor) => (
                        <button
                          key={factor}
                          onClick={() => setScale(factor)}
                          disabled={isLoading}
                          className={`py-2 px-3 text-sm font-bold rounded-lg border transition-all ${
                            scale === factor
                              ? 'bg-violet-600/10 border-violet-500 text-violet-400'
                              : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-800'
                          }`}
                        >
                          {factor}x
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-normal mt-1.5">
                      8x upscale might take slightly longer and consumes higher GPU resources.
                    </p>
                  </div>

                  {/* Face Restoration Toggle */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-900">
                    <div className="space-y-0.5">
                      <label className="text-xs font-bold text-white block">
                        Enhance Face Details
                      </label>
                      <span className="text-[10px] text-zinc-500 block">
                        Automatically repairs facial features using GFPGAN.
                      </span>
                    </div>
                    <button
                      onClick={() => setFaceEnhance(!faceEnhance)}
                      disabled={isLoading}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        faceEnhance ? 'bg-violet-500' : 'bg-zinc-800'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          faceEnhance ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleProcess}
                    disabled={isLoading || !originalPreview}
                    className="w-full inline-flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 shadow-xl shadow-violet-500/10 hover:scale-[1.01]"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isLoading ? 'Processing Neural Network...' : 'Upscale Image Now'}
                  </button>
                </div>
              </div>

              {/* Info Card */}
              <div className="glass-panel p-5 rounded-2xl border border-zinc-800/60 bg-zinc-950/20 text-xs text-zinc-400 space-y-3">
                <div className="flex items-center space-x-1.5 text-zinc-300 font-bold uppercase tracking-wider">
                  <Info className="w-4 h-4 text-violet-400" />
                  <span>Technical Info</span>
                </div>
                <p className="leading-relaxed">
                  Real-ESRGAN (Enhanced Super-Resolution Generative Adversarial Networks) reconstructs edges and textures from low-res inputs via deep convolutional layers.
                </p>
                <div className="flex items-center space-x-2 pt-1.5 font-semibold text-zinc-300 border-t border-zinc-900">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No account required</span>
                </div>
                <div className="flex items-center space-x-2 font-semibold text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No visual watermarks injected</span>
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
