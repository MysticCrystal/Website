import Hero from '@/components/Hero';
import ProofSlider from '@/components/ProofSlider';
import BrandIntro from '@/components/BrandIntro';
import Testimonials from '@/components/Testimonials';
import Portfolio from '@/components/Portfolio';
import GlobalReach from '@/components/GlobalReach';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  const achievements = [
    { number: "1st & Only", text: "North Carolina recipient inducted into the international Billionaire's Club." },
    { number: "Highest", text: 'Average closed price in the Triad region and five-time recipient of the "Significant Sale Award".' },
    { number: "5.0 Stars", text: 'Flawless rating across 54 reviews, with clients praising "professionalism without pressure" and seamless transactions.' },
    { number: "$9M", text: "Record-setting luxury sale of Château Demain on 335 acres, setting a new benchmark for the local ultra-high-end market." },
    { number: "$1.42M", text: "Secured the highest-priced market sale in the Weatherford region." }
  ];

  const portfolioVideoUrl =
    "https://youtube.com/playlist?list=PL_xjjWhvxttrU8Hzbe93otHzSO9H54gSo";

  return (
    <main className="min-h-screen w-full flex flex-col bg-white">
      {/* 1. Hero */}
      <Hero />
      
      {/* 2. Proof / Achievements Slider */}
      <ProofSlider stats={achievements} />

      {/* 3. About Lane (BrandIntro) */}
      <BrandIntro />
      
      {/* 4. Forbes / Global Reach Infographics */}
      <GlobalReach />
      
      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. Portfolio */}
      <Portfolio videoUrl={portfolioVideoUrl} />
      
      {/* 7. CTA / Contact */}
      <ContactForm />
      
      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
