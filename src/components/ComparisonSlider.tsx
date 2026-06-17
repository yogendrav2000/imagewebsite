'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeFilter?: string;
  afterFilter?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeFilter = '',
  afterFilter = '',
  beforeLabel = 'Before',
  afterLabel = 'Enhanced',
  className = '',
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl border border-zinc-800/80 shadow-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After (Enhanced) Image - Full width underneath */}
      <div className="absolute inset-0 w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
          style={{ filter: afterFilter }}
          draggable={false}
        />
        <span className="absolute bottom-4 right-4 z-10 px-3 py-1 text-xs font-semibold text-white bg-zinc-950/80 rounded-md border border-zinc-800 backdrop-blur-sm">
          {afterLabel}
        </span>
      </div>

      {/* Before (Original) Image - Overlayed, width restricted by slider */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || '100vw' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
            style={{ filter: beforeFilter }}
            draggable={false}
          />
        </div>
        <span className="absolute bottom-4 left-4 z-10 px-3 py-1 text-xs font-semibold text-white bg-zinc-950/80 rounded-md border border-zinc-800 backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>

      {/* Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[2px] bg-gradient-to-b from-violet-500 via-pink-500 to-violet-500 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700/80 shadow-xl flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-all text-white hover:border-violet-500 hover:text-violet-400">
          <ChevronLeft className="w-4 h-4 -mr-1" />
          <ChevronRight className="w-4 h-4 -ml-1" />
        </div>
      </div>
    </div>
  );
}
