import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-optimized.jpg" 
          alt="Luxury Real Estate Front Elevation" 
          fill 
          priority 
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for text readability */}
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl fade-in pt-12">
        {/* Brand Logo */}
        <div className="mb-12 w-56 md:w-72 h-auto relative drop-shadow-md">
           <Image src="/logo-white.svg" alt="Lane Banner White Logo" width={256} height={100} priority className="object-contain" />
        </div>
        <h1 className="text-4xl md:text-6xl font-sans font-thin text-white mb-6 tracking-[0.4em] drop-shadow-md uppercase ml-[0.4em]">
          LANE BANNER
        </h1>
        <p className="text-lg md:text-xl text-brand-secondary font-sans font-light mb-12 max-w-2xl drop-shadow-sm slide-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Helping clients buy and sell homes in Winston-Salem and the Triad with clarity, strategy, and trusted execution
        </p>
        
        <div className="flex justify-center slide-up w-full sm:w-auto" style={{ animationDelay: '0.4s' }}>
          <a 
            href="#achievements" 
            className="inline-block rounded-xl px-12 py-4 bg-white text-brand-dark font-sans tracking-[0.2em] text-sm uppercase font-light hover:bg-neutral-200 transition-colors duration-300 transform hover:-translate-y-1"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
