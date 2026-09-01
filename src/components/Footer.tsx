import React, { useState } from 'react';
import { 
  Guitar, 
  Instagram, 
  Facebook, 
  Youtube, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Heart,
  X,
  ShieldCheck
} from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { getGeneralInquiryWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const policyContent: Record<string, { title: string; body: string }> = {
    Shipping: {
      title: 'Shipping & Delivery Policy',
      body: 'All MelodyCraft Instruments are shipped across India with insured premium protective transit. Prior to dispatch, each instrument is inspected and intonated by our master luthiers. Delivery typically takes 2–4 business days with live dispatch updates shared directly via WhatsApp.'
    },
    Returns: {
      title: '7-Day Inspection Guarantee',
      body: 'We offer a fictional 7-day inspection window on all guitars and instruments. If you experience any tonal, cosmetic, or neck alignment issues, our showroom will coordinate immediate replacement or full reimbursement via WhatsApp customer care.'
    },
    'Privacy Policy': {
      title: 'Privacy Policy',
      body: 'MelodyCraft Instruments respects your privacy. We strictly utilize contact information solely for order dispatch notifications, luthier consultations, and delivery tracking. We do not sell or monetize customer data.'
    },
    'Terms & Conditions': {
      title: 'Terms & Conditions',
      body: 'MelodyCraft Instruments is a fictional showroom portfolio. All product descriptions, specifications, brand models, and pricing represent simulated demonstration assets for testing and shopping showcase purposes.'
    }
  };

  return (
    <>
      <footer id="main-footer" className="bg-[#050505] border-t border-zinc-800 text-zinc-400 text-xs">
        
        {/* Main Footer Container */}
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Column 1 & 2: Brand Identity */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center text-zinc-950 font-bold shadow-md">
                  <Guitar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-white text-base tracking-tight">
                    MelodyCraft Instruments
                  </h3>
                  <p className="text-[10px] text-[#fef08a] font-mono">
                    Showroom & Lutherie Studio
                  </p>
                </div>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
                Handcrafting and curating exquisite electric guitars, resonant acoustics, stage keyboards, and studio gear for musicians who refuse to compromise on tone.
              </p>

              <div className="pt-1 font-mono">
                <p className="text-xs font-bold text-[#fef08a]">
                  “Made for musicians. Built for sound.”
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-[#d4af37] hover:text-zinc-950 flex items-center justify-center text-zinc-300 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-[#d4af37] hover:text-zinc-950 flex items-center justify-center text-zinc-300 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-[#d4af37] hover:text-zinc-950 flex items-center justify-center text-zinc-300 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Column 3: Quick Navigation */}
            <div className="space-y-2 font-mono">
              <h4 className="font-bold text-white text-xs tracking-wider uppercase">
                Showroom
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                {['home', 'guitars', 'keyboards', 'drums', 'basses', 'accessories'].map((sec) => (
                  <li key={sec}>
                    <button
                      onClick={() => onNavigate(sec)}
                      className="hover:text-[#fef08a] transition-colors capitalize text-left text-xs"
                    >
                      {sec === 'home' ? 'Showroom Home' : `${sec.replace('-', ' ')} Collection`}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Customer Care & Policies */}
            <div className="space-y-2 font-mono">
              <h4 className="font-bold text-white text-xs tracking-wider uppercase">
                Information
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-[#fef08a] transition-colors text-xs">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="hover:text-[#fef08a] transition-colors text-xs">
                    Contact & Location
                  </button>
                </li>
                {['Shipping', 'Returns', 'Privacy Policy', 'Terms & Conditions'].map((pol) => (
                  <li key={pol}>
                    <button
                      onClick={() => setActivePolicyModal(pol)}
                      className="hover:text-[#fef08a] transition-colors text-xs"
                    >
                      {pol}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Showroom Direct */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs tracking-wider uppercase font-mono">
                Direct Contact
              </h4>
              <div className="space-y-1.5 text-xs">
                <p className="text-zinc-300">123 Harmony Avenue, Music District, Varanasi, UP, India</p>
                <p className="text-white font-mono font-semibold">Phone: {STORE_INFO.phone}</p>
                <p className="text-zinc-400 font-mono">Email: {STORE_INFO.email}</p>
              </div>

              <div className="pt-1.5">
                <a
                  href={getGeneralInquiryWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all font-semibold text-xs font-mono"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Fictional Disclaimer */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-[11px] font-mono">
            <p>© 2026 MelodyCraft Instruments. All rights reserved.</p>
            <p className="text-[#fef08a]/80 font-medium">
              *All brand names, specifications, reviews, and store details are strictly fictional.
            </p>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {activePolicyModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setActivePolicyModal(null)}
        >
          <div 
            className="w-full max-w-lg bg-[#08090c] border border-zinc-800 rounded-xl p-5 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>{policyContent[activePolicyModal]?.title}</span>
              </h3>
              <button
                onClick={() => setActivePolicyModal(null)}
                className="p-1 rounded-md text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {policyContent[activePolicyModal]?.body}
            </p>

            <div className="pt-2 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-zinc-950 font-bold text-xs font-mono hover:bg-[#fef08a] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
