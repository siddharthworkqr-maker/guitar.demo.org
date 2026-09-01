import React from 'react';
import { Sparkles, ArrowRight, Tag, MessageCircle, Clock, Zap } from 'lucide-react';
import { getOfferWhatsAppUrl } from '../utils/whatsapp';

interface SpecialOffersProps {
  onExploreOffers: () => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ onExploreOffers }) => {
  return (
    <section id="offers" className="py-12 sm:py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-gradient-to-r from-[#0d0e14] via-[#090a0f] to-[#050508] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black">
          
          {/* Background Ambient Glow & Lighting */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#d4af37]/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Background Guitar Image Faded */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-20 lg:opacity-30 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=1000&q=80"
              alt="Guitar offer background"
              className="w-full h-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e14] via-[#0d0e14]/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl space-y-4">
            
            {/* Promo Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#fef08a] text-[10px] font-bold uppercase tracking-wider font-mono">
              <Zap className="w-3 h-3 text-[#d4af37]" />
              <span>Showroom Bundle • Save up to ₹5,000</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Upgrade Your Sound
            </h2>

            {/* Subheading */}
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Get exclusive fictional offers on selected instruments and accessories. Every guitar ordered this week comes with a complimentary luthier setup, premium padded gig bag, and instrument cable.
            </p>

            {/* Coupon Code Callout */}
            <div className="inline-flex items-center gap-2.5 p-2.5 rounded-lg bg-black/60 border border-zinc-800 backdrop-blur-md">
              <Tag className="w-3.5 h-3.5 text-[#d4af37]" />
              <div className="text-left font-mono">
                <p className="text-[9px] text-zinc-400 uppercase font-semibold">Special Promo Code</p>
                <p className="text-xs font-bold text-[#fef08a] tracking-wider">MELODYPRO2026</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="explore-offers-btn"
                onClick={onExploreOffers}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b48a1c] hover:from-[#fef08a] hover:to-[#d4af37] text-zinc-950 font-bold text-xs shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Explore Offers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                id="claim-offer-whatsapp-btn"
                href={getOfferWhatsAppUrl('Upgrade Your Sound Bundle', 'MELODYPRO2026')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#0f1118] hover:bg-[#181a24] text-white font-bold text-xs border border-emerald-500/40 hover:border-emerald-500/80 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Claim Offer on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
