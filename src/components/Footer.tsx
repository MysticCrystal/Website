import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-black text-white pt-24 pb-12  flex flex-col items-center">
      
      {/* 1. Main Logo Section */}
      <div className="mb-14">
        <Image 
          src="/mitchell-forbes-logo.png"
          alt="Mitchell Forbes Global Properties"
          width={280}
          height={75}
          className="object-contain"
        />
      </div>

      {/* 2. Contact & Address Dual Column */}
      <div className="w-full max-w-2xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-center text-xs font-sans tracking-[0.15em] mb-12">
        
        {/* Contact Details */}
        <div className="flex flex-col space-y-2">
          <h3 className="uppercase text-neutral-500 font-semibold mb-2">Contact Details</h3>
          <a href="tel:3366088920" className="hover:text-neutral-400 transition-colors duration-300 border-b border-transparent hover:border-neutral-400 pb-0.5 inline-block mx-auto">
            (336) 608-8920
          </a>
          <a href="https://lanebanner.com" className="hover:text-neutral-400 transition-colors duration-300 border-b border-white hover:border-neutral-400 pb-0.5 inline-block mx-auto uppercase">
            LANEBANNER.COM
          </a>
          <a href="mailto:lane@gomitch.com" className="hover:text-neutral-400 transition-colors duration-300 border-b border-white hover:border-neutral-400 pb-0.5 inline-block mx-auto uppercase">
            LANE@GOMITCH.COM
          </a>
        </div>

        {/* Office Address */}
        <div className="flex flex-col items-center space-y-4 uppercase">
          <h3 className="text-neutral-500 font-semibold mb-2">Office Address</h3>
          <div className="flex flex-col items-center gap-5">
            <a
              href="https://www.google.com/maps/place/Banner+Real+Estate+at+Mitchell+Forbes+Global+Properties/@36.0841662,-80.3040135,17z/data=!3m1!4b1!4m6!3m5!1s0x8853ae27ef56855d:0xf8f6f439a9a2c8ca!8m2!3d36.0841662!4d-80.3040135!16s%2Fg%2F11bvvzpq2s?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-col items-center space-y-2 text-center tracking-[0.1em] leading-[1.6] hover:text-neutral-300 transition-colors duration-300"
              aria-label="Open office address in Google Maps"
            >
              <span>The Mitchell Building</span>
              <span>190 Charlois Blvd</span>
              <span>Winston-Salem NC 27103</span>
            </a>

            <a
              href="https://www.google.com/maps/place/Banner+Real+Estate+at+Mitchell+Forbes+Global+Properties/@36.0841662,-80.3040135,17z/data=!3m1!4b1!4m6!3m5!1s0x8853ae27ef56855d:0xf8f6f439a9a2c8ca!8m2!3d36.0841662!4d-80.3040135!16s%2Fg%2F11bvvzpq2s?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="block w-[190px]"
              aria-label="Open map preview in Google Maps"
            >
              <div className="relative w-[190px] h-[122px] rounded-xl overflow-hidden border border-white/10 bg-black">
                <iframe
                  title="Office location map preview"
                  src="https://www.google.com/maps?q=Banner%20Real%20Estate%20at%20Mitchell%20Forbes%20Global%20Properties&output=embed"
                  className="absolute inset-0 w-full h-full opacity-90 saturate-125 contrast-110 brightness-95 hover:opacity-100 hover:brightness-100 transition-all duration-300 pointer-events-none"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Social Icons */}
      <div className="flex justify-center gap-4 mb-16">
        <a href="https://www.facebook.com/bannerestate" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-neutral-300 transition-colors duration-300" aria-label="Facebook">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5v-3.5C17.14 1.87 15.69 1.5 14.5 1.5c-3 0-5 2.1-5 5.5v3H7v4h2.5v11h4.5v-11z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/lanebanner" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-neutral-300 transition-colors duration-300" aria-label="LinkedIn">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73A1.73 1.73 0 118.23 5a1.73 1.73 0 01-1.73 1.73zM20 19h-3v-5.6c0-3.37-4-3.12-4 0V19h-3V8h3v1.77c1.39-2.58 7-2.78 7 3.65V19z"/></svg>
        </a>
      </div>

      {/* Primary Divider */}
      <div className="w-full max-w-[1200px] h-px bg-neutral-800 mb-10" />

      {/* 4. Disclaimer & Lion Logo */}
      <div className="w-full max-w-[1200px] px-6 flex flex-col items-center mb-10">
        <Image
          src="/lion-disclaimer-logo.png"
          alt="Mitchell Lion Crest"
          width={62}
          height={74}
          className="opacity-70 object-contain mb-6"
        />

        <p className="text-[10.5px] text-neutral-400 font-sans tracking-[0.05em] leading-relaxed max-w-[720px] text-center">
          All information is deemed reliable but not guaranteed and should be independently reviewed and verified.
        </p>

        <div className="mt-6 flex items-center justify-center opacity-90">
          <Image
            src="/realtor-equal.webp"
            alt="Realtor and Equal Housing Opportunity"
            width={86}
            height={28}
            className="object-contain opacity-80"
          />
        </div>
      </div>

      {/* Secondary Divider */}
      <div className="w-full max-w-[1200px] h-px bg-neutral-800 mb-8" />

      {/* 5. Lowest Bar: Luxury Presence & Copyright */}
      <div className="w-full max-w-[1200px] px-6 flex flex-col md:flex-row justify-between items-center text-[10.5px] font-sans text-neutral-400 tracking-wide">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <Image 
            src="/luxury-presence-logo.png" 
            alt="Luxury Presence" 
            width={100} 
            height={20} 
            className="opacity-80 object-contain cursor-pointer transition-opacity hover:opacity-100"
          />
        </div>
        <div className="flex items-center opacity-70">
          <span>Copyright &copy; {currentYear}</span>
          <span className="mx-2">|</span>
          <a href="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
        </div>
      </div>

    </footer>
  );
}
