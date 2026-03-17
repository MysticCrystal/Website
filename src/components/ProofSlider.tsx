'use client';

import { useEffect, useState } from 'react';

export default function ProofSlider({ stats }: { stats: { number: string; text: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % stats.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length);
  };

  if (!stats || stats.length === 0) return null;

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused, stats.length]);

  return (
    <section id="achievements" className="w-full py-24 bg-white border-t border-neutral-100 flex justify-center overflow-hidden">
      <div className="max-w-5xl w-full px-6 flex flex-col items-center relative">
        <h3 className="text-sm font-sans tracking-widest uppercase text-neutral-400 font-semibold mb-16">
          Notable Achievements
        </h3>

        <div className="relative w-full max-w-2xl text-center fade-in">
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <h2 className="text-6xl md:text-8xl font-sans font-light text-black mb-6">
              {stats[currentIndex].number}
            </h2>
            <p className="text-lg md:text-xl font-light text-neutral-600 max-w-lg">
              {stats[currentIndex].text}
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-6 mt-12">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Previous stat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {stats.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 transition-all duration-500 rounded-full ${idx === currentIndex ? 'w-8 bg-black' : 'w-2 bg-neutral-200'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-3 rounded-full border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              aria-label={isPaused ? 'Play stat slider' : 'Pause stat slider'}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M8 5.14v14l11-7-11-7Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              )}
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full border border-neutral-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Next stat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
