'use client';

import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ProcessOptions {
  upscale?: number;
  denoise?: number;
  faceRestore?: boolean;
  faceRestoreModel?: 'gfpgan' | 'codeformer';
  faceRestoreFidelity?: number;
  removeBackground?: boolean;
  bgColor?: string;
  restoreOldPhoto?: boolean;
  scratchReveal?: boolean;
  colorise?: boolean;
}

export function useImageProcessor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [enhancedPreview, setEnhancedPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState<number | null>(null);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startProgressSimulation = () => {
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 98;
        }
        // Increase slowly as time progresses
        const increment = prev < 30 ? 6 : prev < 70 ? 3 : prev < 90 ? 1 : 0.5;
        return Number((prev + increment).toFixed(1));
      });
    }, 120);
  };

  const stopProgressSimulation = (success = true) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setProgress(success ? 100 : 0);
  };

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setEnhancedPreview(null);
    setProcessingTime(null);

    // Generate local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const processImage = async (
    endpoint: 'upscale' | 'enhance' | 'restore-face' | 'remove-bg' | 'old-photo',
    options: ProcessOptions = {}
  ) => {
    if (!originalPreview) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEnhancedPreview(null);
    startProgressSimulation();

    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: originalPreview,
          options,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Processing failed with status ${response.status}`);
      }

      const data = await response.json();
      
      stopProgressSimulation(true);
      setEnhancedPreview(data.image);
      setProcessingTime(data.duration);
      
      // Wow factor celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#8b5cf6', '#ec4899', '#3b82f6'],
      });
    } catch (err: any) {
      stopProgressSimulation(false);
      setError(err.message || 'An unexpected error occurred during image processing.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadResult = () => {
    if (!enhancedPreview || !file) return;

    const link = document.createElement('a');
    link.href = enhancedPreview;

    // Construct naming: original_enhanced.png
    const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
    const extension = file.name.substring(file.name.lastIndexOf('.'));
    link.download = `${originalName}_enhanced${extension || '.png'}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setFile(null);
    setOriginalPreview(null);
    setEnhancedPreview(null);
    setIsLoading(false);
    setProgress(0);
    setError(null);
    setProcessingTime(null);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  return {
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
  };
}
