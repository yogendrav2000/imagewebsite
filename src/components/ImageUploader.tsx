'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, FileImage, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onFileSelected: (file: File) => void;
  maxSizeMb?: number;
  allowedTypes?: string[];
  isLoading?: boolean;
}

export default function ImageUploader({
  onFileSelected,
  maxSizeMb = 10,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  isLoading = false,
}: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);

    // Validate type
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Unsupported file format. Please upload JPG, PNG, or WEBP.');
      return;
    }

    // Validate size
    const fileSizeBytes = file.size;
    const maxSize = maxSizeMb * 1024 * 1024;
    if (fileSizeBytes > maxSize) {
      setErrorMessage(`File size exceeds the ${maxSizeMb}MB limit.`);
      return;
    }

    onFileSelected(file);
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className={`relative flex flex-col items-center justify-center w-full min-h-[300px] p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-violet-500 bg-violet-500/5 scale-[1.01]'
            : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/40'
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={allowedTypes.join(',')}
          onChange={handleChange}
          disabled={isLoading}
        />

        {/* Glow decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-pink-500/5 opacity-0 hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />

        <div className="flex flex-col items-center justify-center text-center space-y-4 relative z-10">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors duration-200">
            <Upload className="w-8 h-8 text-violet-400 animate-pulse" />
          </div>

          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">
              Drag & Drop your image here
            </p>
            <p className="text-sm text-zinc-400">
              or <span className="text-violet-400 font-medium hover:underline">browse files</span> from your device
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs text-zinc-500 bg-zinc-950/50 px-4 py-2 rounded-lg border border-zinc-900">
            <span className="flex items-center">
              <FileImage className="w-3.5 h-3.5 mr-1 text-zinc-400" />
              JPG, PNG, WEBP
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span>Max {maxSizeMb}MB</span>
          </div>
        </div>
      </motion.div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 p-3 mt-4 text-sm rounded-xl bg-red-950/30 border border-red-900/50 text-red-400"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </motion.div>
      )}
    </div>
  );
}
