'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, Loader2, Sparkles, Wand2 } from 'lucide-react';

interface ProcessingScreenProps {
  progress: number; // 0 to 100
}

export default function ProcessingScreen({ progress }: ProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Uploading image', desc: 'Securely uploading your file' },
    { label: 'Analyzing structural data', desc: 'Scanning facial details and texture noise' },
    { label: 'Enhancing with Neural Networks', desc: 'Injecting high-frequency details' },
    { label: 'Finalizing and exporting', desc: 'Synthesizing output image resolution' },
  ];

  useEffect(() => {
    if (progress < 25) {
      setCurrentStep(0);
    } else if (progress < 60) {
      setCurrentStep(1);
    } else if (progress < 90) {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  }, [progress]);

  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-3xl glass-panel relative overflow-hidden border border-zinc-800/60 shadow-2xl">
      {/* Decorative backdrop glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[80px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-pink-500/10 blur-[80px]" />

      <div className="flex flex-col items-center text-center space-y-6 relative z-10">
        {/* Core Animated Processing Ring */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-violet-500/10" />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-violet-500 border-r-pink-500 border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
          <div className="flex items-center justify-center w-18 h-18 rounded-full bg-zinc-950 border border-zinc-900 shadow-inner">
            <Cpu className="w-8 h-8 text-violet-400 animate-pulse" />
          </div>
          {/* Sparkles */}
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-5 h-5 text-pink-400 animate-bounce" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white tracking-tight">AI Enhancement in Progress</h3>
          <p className="text-sm text-zinc-400">Please wait while our algorithms process your image.</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-violet-400 font-mono flex items-center">
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
              {steps[currentStep].label}...
            </span>
            <span className="text-zinc-300 font-mono">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900 p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Step checklist */}
        <div className="w-full text-left space-y-3.5 pt-4 border-t border-zinc-900">
          {steps.map((step, idx) => {
            const isCompleted = currentStep > idx;
            const isActive = currentStep === idx;
            return (
              <div
                key={step.label}
                className={`flex items-start space-x-3 transition-opacity duration-300 ${
                  isCompleted || isActive ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-zinc-600 font-bold font-mono">
                    {idx + 1}
                  </div>
                )}
                <div>
                  <p className={`text-sm font-semibold ${isActive ? 'text-violet-400' : isCompleted ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {step.label}
                  </p>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-zinc-500 mt-0.5"
                    >
                      {step.desc}
                    </motion.p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
