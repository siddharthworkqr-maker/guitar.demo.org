import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  Truck, 
  Music, 
  Volume2,
  Guitar
} from 'lucide-react';
import { getGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';
import { playInstrumentSound } from '../utils/soundEngine';

interface HeroProps {
  onExploreClick: () => void;
  onSelectGuitar: (guitarId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onSelectGuitar }) => {
  return (
    <section 
      id="home" 
      className="relative min-h-[88vh] pt-24 pb-12 lg:pt-32 lg:pb-16 flex items-center overflow-hidden"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[400px] bg-gradient-to-tr from-[#d4af37]/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-[250px] h-[250px] bg-blue-900/10 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#fef08a] text-xs font-semibold tracking-wide font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="uppercase text-[11px]">Handcrafted Tone & Precision Lutherie</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Find Your Sound.{' '}
              <span className="block mt-1 text-gradient-gold">
                Create Your Story.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Premium musical instruments crafted for beginners, performers and passionate musicians. From stage-ready guitars to studio gear — order directly via WhatsApp.
            </p>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                id="hero-explore-btn"
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b48a1c] hover:from-[#fef08a] hover:to-[#d4af37] text-zinc-950 font-bold text-sm shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/35 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Explore Instruments</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="hero-whatsapp-btn"
                href={getGeneralInquiryWhatsAppUrl('Consultation for New Instrument Selection')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0d0e12] hover:bg-[#151720] text-white font-bold text-sm border border-emerald-500/40 hover:border-emerald-500/80 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Quick Guarantees Grid */}
            <div className="pt-4 grid grid-cols-3 gap-2.5 max-w-lg mx-auto lg:mx-0 border-t border-zinc-800/80">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-zinc-800/50">
                <div className="p-1.5 rounded bg-[#d4af37]/15 text-[#d4af37]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Luthier Setup</p>
                  <p className="text-[10px] text-zinc-400">Pre-intonated</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-zinc-800/50">
                <div className="p-1.5 rounded bg-emerald-500/15 text-emerald-400">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Fast Transit</p>
                  <p className="text-[10px] text-zinc-400">All India Insured</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-zinc-800/50">
                <div className="p-1.5 rounded bg-sky-500/15 text-sky-400">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">7-Day Trial</p>
                  <p className="text-[10px] text-zinc-400">Pure satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Guitar Visual Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Center Glowing Disc */}
            <div className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-gradient-to-tr from-[#d4af37]/15 via-[#d4af37]/5 to-transparent blur-2xl animate-pulse" />

            {/* Main Instrument Display Card */}
            <div className="relative z-10 w-full max-w-md bg-[#0a0a0d] rounded-2xl p-4.5 border border-zinc-800 shadow-2xl shadow-black">
              
              {/* Top Tag & Audio Preview Button */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#d4af37] text-zinc-950 tracking-wider uppercase font-mono">
                  Featured Masterpiece
                </span>
                <button
                  id="hero-play-sample-btn"
                  onClick={() => playInstrumentSound('electric_lead')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-[#fef08a] border border-[#d4af37]/30 text-[11px] font-semibold transition-all group"
                  title="Click to preview guitar chord tone"
                >
                  <Volume2 className="w-3 h-3 text-[#d4af37] group-hover:scale-110 transition-transform" />
                  <span>Audition Tone</span>
                </button>
              </div>

              {/* Main Guitar Image Container */}
              <div className="relative h-60 sm:h-64 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center group cursor-pointer"
                   onClick={() => onSelectGuitar('aurora-x1')}>
                <img
                  src="https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=85"
                  alt="MelodyCraft Aurora X1 Electric Guitar"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d] via-transparent to-transparent opacity-85" />

                {/* Floating Specs Chip on Image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10">
                  <div>
                    <h4 className="text-white text-xs font-bold">Aurora X1 Electric Guitar</h4>
                    <p className="text-[11px] text-[#d4af37] font-mono font-bold">₹24,999</p>
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-300 bg-white/10 px-2 py-0.5 rounded font-mono">
                    Roasted Maple
                  </span>
                </div>
              </div>

              {/* Floating Feature Spec Badges */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-left">
                  <span className="text-[9px] text-zinc-400 block uppercase tracking-wider font-mono">Pickups</span>
                  <span className="text-xs font-bold text-zinc-200">Dual Custom Alnico V</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-left">
                  <span className="text-[9px] text-zinc-400 block uppercase tracking-wider font-mono">Fretboard</span>
                  <span className="text-xs font-bold text-zinc-200">24 Jumbo Frets</span>
                </div>
              </div>

              {/* Instant WhatsApp Order for Featured Guitar */}
              <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 block font-mono">Showroom Price</span>
                  <span className="text-base font-extrabold text-white font-mono">₹24,999</span>
                </div>
                <button
                  id="hero-quick-view-btn"
                  onClick={() => onSelectGuitar('aurora-x1')}
                  className="px-3 py-1.5 rounded-lg bg-[#d4af37]/15 hover:bg-[#d4af37] text-[#fef08a] hover:text-zinc-950 font-bold text-xs border border-[#d4af37]/40 transition-all"
                >
                  View Full Specs
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
