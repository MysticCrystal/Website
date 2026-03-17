import Image from 'next/image';

export default function BrandIntro() {
  return (
    <section id="about" className="w-full py-24 md:py-32 px-6 lg:px-12 bg-white flex justify-center border-t border-neutral-100">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="flex flex-col space-y-8 fade-in md:pr-8">
          <h2 className="text-3xl md:text-5xl font-sans font-thin text-black leading-snug tracking-[0.4em] uppercase ml-[0.4em]">
            A Local Perspective With Global Reach
          </h2>
          
          <div className="w-12 h-px bg-black"></div>
          
          <div className="space-y-6 text-neutral-600 font-light text-lg leading-relaxed">
            <p>
              I was raised in the Clemmons area and know the Triad market from a local perspective that only comes with time and experience.
            </p>
            <p>
              Today, I combine that local knowledge with the global reach of Forbes Global Properties helping clients position their homes effectively and make confident decisions in an ever-changing market.
            </p>
            <p>
              My approach is simple: thoughtful strategy, clear communication, and dependable execution from start to finish.
            </p>
          </div>
          
        </div>

        {/* Image & CTA Column */}
        <div className="flex flex-col items-center slide-up pt-4 md:pt-0">
          <div className="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden shadow-lg group mb-8">
               <Image 
                 src="/profile-optimized.jpg" 
                 alt="Lane Banner Profile" 
                 fill 
                 className="object-cover object-center transition-transform duration-700 group-hover:scale-105" 
               />
          </div>
          <a 
            href="#contact" 
            className="inline-block w-full rounded-xl px-12 py-4 bg-black text-white font-sans tracking-widest text-sm uppercase font-semibold hover:bg-neutral-800 transition-colors duration-300 text-center"
          >
            Contact Me
          </a>
        </div>

      </div>
    </section>
  );
}
