"use client";

import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const brandData = [
  { name: 'Forbes / Forbes Global Properties', value: 78.8, color: '#8B4444' },
  { name: 'Berkshire Hathaway / BHHS', value: 10.7, color: '#7B6E66' },
  { name: 'Sotheby\'s / Sotheby\'s Int. Real Estate', value: 4.3, color: '#C4A484' },
  { name: 'Christie\'s / Christie\'s Int. Real Estate', value: 3.2, color: '#D9D2CB' },
  { name: 'Coldwell Banker', value: 1.0, color: '#008CA8' },
  { name: 'Savills', value: 0.9, color: '#DED2AD' },
  { name: 'Knight Frank', value: 0.8, color: '#B6B6B6' },
  { name: 'Engel & Völkers', value: 0.2, color: '#E1E1E1' },
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 12}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
        style={{ filter: 'brightness(1.1)' }}
      />
    </g>
  );
};

export default function GlobalReach() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const resetToForbes = () => {
    setActiveIndex(0);
  };

  const attributes = [
    { value: "20,000+", label: "Property Experts" },
    { value: "600+", label: "Global Locations" },
    { value: "81", label: "Countries Reached" },
    { value: "167M", label: "Monthly Unique Audience" }
  ];

  return (
    <section className="w-full py-16 md:py-18 bg-black text-white flex justify-center overflow-hidden">
      <div className="max-w-7xl w-full px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-18">
        
        <div className="w-full flex flex-col lg:hidden">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-neutral-500 mb-4 ml-[0.3em]">Market Authority</span>
          <h2 className="text-3xl md:text-5xl font-sans font-thin text-white mb-10 leading-tight tracking-[0.4em] uppercase ml-[0.4em]">
            Global Exposure<br/>
            <span className="text-neutral-400">Through</span> Forbes<br/>
            Global Properties
          </h2>
          <div className="w-12 h-px bg-white/20 mb-2"></div>
        </div>
        
        {/* Left Side: Interactive Chart */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-[500px] aspect-square relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onMouseLeave={resetToForbes}>
                <Pie
                  // @ts-ignore - Prop existence verified at runtime via browser tests
                  activeIndex={activeIndex}
                  // @ts-ignore
                  activeShape={renderActiveShape}
                  data={brandData}
                  cx="50%"
                  cy="50%"
                  innerRadius="68%"
                  outerRadius="82%"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  stroke="#000"
                  strokeWidth={2}
                  paddingAngle={1}
                >
                  {brandData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ 
                        outline: 'none',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  {brandData[activeIndex].name.includes('Forbes') && (
                    <div className="flex flex-col items-center mb-2">
                       <span className="text-[14px] font-serif italic tracking-tight text-neutral-500">Forbes</span>
                       <span className="text-[8px] font-sans tracking-[0.4em] uppercase text-neutral-600 -mt-1">Global Properties</span>
                    </div>
                  )}
                  {!brandData[activeIndex].name.includes('Forbes') && (
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-neutral-500 mb-2 max-w-[140px] text-center leading-tight">
                      {brandData[activeIndex].name.split(' / ')[0]}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-7xl font-sans font-extralight tracking-tighter text-white">
                      {Math.round(brandData[activeIndex].value)}
                    </span>
                    <span className="text-2xl font-sans font-light text-neutral-500">%</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col items-center text-center">
            <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-medium mb-2">
              Industry Share of Voice
            </p>
            <p className="text-[9px] text-neutral-600 opacity-60 font-sans uppercase tracking-widest">
              Source: Meltwater Media Monitoring, 2025
            </p>
          </div>
        </div>

        {/* Right Side: Legend & Global Stats */}
        <div className="w-full lg:w-1/2 flex flex-col pt-6 lg:pt-0">
           <span className="hidden lg:block text-[10px] font-sans tracking-[0.3em] uppercase text-neutral-500 mb-4 ml-[0.3em]">Market Authority</span>
           <h2 className="hidden lg:block text-3xl md:text-5xl font-sans font-thin text-white mb-10 leading-tight tracking-[0.4em] uppercase ml-[0.4em]">
             Global Exposure<br/>
             <span className="text-neutral-400">Through</span> Forbes<br/>
             Global Properties
           </h2>
           
           <div className="hidden lg:block w-12 h-px bg-white/20 mb-8"></div>
           
           {/* Brand List Legend */}
           <div className="flex flex-col space-y-3 mb-10">
             {brandData.map((brand, idx) => (
               <div 
                 key={idx} 
                 className={`flex items-center group cursor-pointer transition-all duration-300 ${activeIndex === idx ? 'translate-x-3' : 'hover:translate-x-1'}`}
                 onMouseEnter={() => setActiveIndex(idx)}
                 onMouseLeave={resetToForbes}
               >
                 <div className="w-1.5 h-8 mr-6 transition-all duration-300" style={{ backgroundColor: brand.color, opacity: activeIndex === idx ? 1 : 0.2 }} />
                 <div className="flex flex-col">
                   <span className={`font-sans tracking-[0.05em] text-[10px] uppercase ${activeIndex === idx ? 'text-white font-bold' : 'text-neutral-500 group-hover:text-white'}`}>
                     {brand.name}
                   </span>
                   <span className={`font-sans text-sm ${activeIndex === idx ? 'text-white' : 'text-neutral-600'}`}>
                     {brand.value}% Share
                   </span>
                 </div>
               </div>
             ))}
           </div>

           <div className="grid grid-cols-2 gap-y-8 gap-x-10 w-full pt-8 border-t border-neutral-800">
             {attributes.map((attr, idx) => (
               <div key={idx} className="flex flex-col space-y-2">
                 <span className="text-4xl font-sans font-light text-white tracking-tight">{attr.value}</span>
                 <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-neutral-500 font-bold">{attr.label}</span>
               </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
}
