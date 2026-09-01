import React from 'react';
import { Sparkles, Award, ShieldCheck, Flame, Compass, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-16 bg-[#07080b] relative border-t border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Storytelling Grid */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-black group">
              <img
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80"
                alt="MelodyCraft Master Luthier Crafting"
                className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-black/40 to-transparent" />

              {/* Floating Story Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0a0a0d]/90 backdrop-blur-md border border-zinc-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Handcrafted Heritage</span>
                </div>
                <h4 className="text-white text-sm font-bold">
                  Every fret polished, every intonation calibrated.
                </h4>
                <p className="text-xs text-zinc-300">
                  Our Varanasi showroom workshop combines traditional tonewood curing with high-precision modern electronics.
                </p>
              </div>
            </div>

            {/* Small Floating Stat Pill */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2.5 p-3 rounded-xl bg-[#0a0a0d] border border-[#d4af37]/40 shadow-xl font-mono">
              <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center font-bold text-xs">
                100%
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Luthier Inspected</p>
                <p className="text-[10px] text-zinc-400">Zero Defects</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story & Core Pillars */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#fef08a] text-[10px] font-bold uppercase tracking-widest font-mono">
              <Compass className="w-3 h-3 text-[#d4af37]" />
              <span>Our Story</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Crafting Tone for the Next Generation of Artists
            </h2>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              {STORE_INFO.mission}
            </p>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              From our flagship showroom at 123 Harmony Avenue in Varanasi's Music District, MelodyCraft Instruments is driven by a passionate obsession with musical resonance. We believe that an inspiring instrument removes every obstacle between your imagination and the sonic reality.
            </p>

            {/* 3 Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-zinc-800">
              <div className="space-y-1 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-[#d4af37] font-mono font-bold text-sm">01.</span>
                <h4 className="text-white text-xs font-bold">Resonant Tonewoods</h4>
                <p className="text-[10px] text-zinc-400">Alder, Sitka spruce & roasted maple.</p>
              </div>

              <div className="space-y-1 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-sky-400 font-mono font-bold text-sm">02.</span>
                <h4 className="text-white text-xs font-bold">WhatsApp Care</h4>
                <p className="text-[10px] text-zinc-400">Direct guidance without algorithms.</p>
              </div>

              <div className="space-y-1 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <span className="text-emerald-400 font-mono font-bold text-sm">03.</span>
                <h4 className="text-white text-xs font-bold">Secure Delivery</h4>
                <p className="text-[10px] text-zinc-400">Insured shockproof crate packing.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
