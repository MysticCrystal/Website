'use client';

import { useEffect, useState } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Lane turned what could have been a stressful home sale into a smooth and well-organized experience. Their attention to detail and understanding of the market made a meaningful difference in the final result.",
      name: "The Harrison Family",
      location: "Winston-Salem"
    },
    {
      quote: "Lane is the best realtor that I have ever worked with. Having bought and sold over 20 houses in my life, Lane is by far the most professional, client centric and attentive person that I've met in residential real estate. He is both transactional and relational, which is very rare these days. His attention to the pre-listing details assured a quick sale at a price point that exceeded my expectations.",
      name: "Pat Weaver",
      location: ""
    },
    {
      quote: "Working with Lane was truly a pleasure. He worked with us to help us sell our townhouse and buy our new home. As both seller and buyer, we felt he negotiated great deals on both properties, and we couldn't be more pleased. We appreciated his communication, knowledge and professionalism to make both transactions seamless and stress free!",
      name: "Nancy Jones",
      location: ""
    },
    {
      quote: "I worked with Lane Banner to sell my rental property single family home in Winston Salem... The entire experience from start to finish was pleasant and extremely easy... After listing the property and having several buyers visit right away, Lane called me on the first day with an offer for the exact price we listed it for.",
      name: "Peter Perlegas",
      location: "Winston-Salem"
    },
    {
      quote: "I was an out-of-state buyer and he took care of me like I was a family member of his own. He was extremely responsive every time I reached out to him... He went to a home that was just put on the market and took a thorough video and shared it with me 2 hours after I told him I was interested in it.",
      name: "Jeff Hoffman",
      location: "Out-of-State Buyer"
    },
    {
      quote: "If you want results, efficiency and top-notch representation for your home sell or search... Lane Banner of Banner Real Estate is the best!! We couldn’t have picked a better realtor.",
      name: "TK Fraz",
      location: ""
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused, testimonials.length]);

  return (
    <section className="w-full py-24 md:py-32 bg-brand-primary flex justify-center">
      <div className="max-w-4xl px-6 text-center w-full">
        <div className="text-brand-accent mb-8">
          {/* Elegant Quotation Mark SVG */}
          <svg className="w-12 h-12 mx-auto fill-current opacity-60" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        
        <div className="relative min-h-[280px] md:min-h-[200px] flex flex-col items-center justify-center fade-in">
          <blockquote className="text-xl md:text-3xl font-sans font-light text-brand-dark leading-relaxed mb-10 w-full transition-opacity duration-500">
            &quot;{testimonials[currentIndex].quote}&quot;
          </blockquote>
          
          <cite className="block text-brand-muted font-sans uppercase tracking-[0.1em] text-sm not-italic">
            — {testimonials[currentIndex].name}
            {testimonials[currentIndex].location && (
              <>
                , <span className="text-brand-dark">{testimonials[currentIndex].location}</span>
              </>
            )}
          </cite>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-12">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-neutral-400"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentIndex ? 'w-6 bg-black' : 'w-2 bg-neutral-300 hover:bg-neutral-400'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-3 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-neutral-400"
            aria-label={isPaused ? 'Play testimonial slider' : 'Pause testimonial slider'}
          >
            {isPaused ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M8 5.14v14l11-7-11-7Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            )}
          </button>
          
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-neutral-400"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://g.page/r/CcrIoqk59Pb4EBM/review"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-xl px-10 py-4 border border-black/20 bg-white/70 text-brand-dark font-sans tracking-widest text-sm uppercase font-semibold hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
            aria-label="Open Google reviews in a new tab"
          >
            <span className="w-7 h-7 rounded-full border border-black/15 bg-white flex items-center justify-center text-[12px] font-semibold">
              G
            </span>
            Google Reviews
          </a>
        </div>

      </div>
    </section>
  );
}
