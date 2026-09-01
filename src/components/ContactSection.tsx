import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  Guitar, 
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { getGeneralInquiryWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER, WHATSAPP_PHONE_NUMBER } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Guitar Recommendation');
  const [userQuery, setUserQuery] = useState('');

  const handleSendFormWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const namePart = userName ? `My name is ${userName}. ` : '';
    const message = `Hello MelodyCraft Instruments!\n\n${namePart}I am inquiring regarding: [${selectedTopic}]\n\nQuestion: ${userQuery || 'I would like to receive product recommendations and delivery timeline.'}\n\nPlease get back to me.`;
    
    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-14 sm:py-16 bg-[#050505] relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold uppercase tracking-widest font-mono">
            <MessageCircle className="w-3 h-3" />
            <span>Showroom & Support</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Connect With Our Musicians
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Visit our Varanasi showroom or message us on WhatsApp for fast expert instrument advice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Store Details & WhatsApp Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl bg-[#0a0a0d] border border-zinc-800 p-5 sm:p-6 space-y-4 shadow-xl">
              
              <div>
                <h3 className="text-lg font-bold text-white mb-0.5">
                  {STORE_INFO.name}
                </h3>
                <p className="text-xs text-[#d4af37] font-medium font-mono">
                  Flagship Store & Lutherie Studio
                </p>
              </div>

              {/* Detail Items */}
              <div className="space-y-3">
                {/* Address */}
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <div className="p-1.5 rounded-lg bg-zinc-900 text-[#d4af37] border border-zinc-800 flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block font-semibold mb-0.5 font-mono text-[10px] uppercase">Showroom Address</span>
                    <span className="text-white leading-relaxed text-xs">{STORE_INFO.address}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <div className="p-1.5 rounded-lg bg-zinc-900 text-emerald-400 border border-zinc-800 flex-shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block font-semibold mb-0.5 font-mono text-[10px] uppercase">Direct Phone & WhatsApp</span>
                    <span className="text-white font-mono font-bold text-xs">{STORE_INFO.phone}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <div className="p-1.5 rounded-lg bg-zinc-900 text-sky-400 border border-zinc-800 flex-shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block font-semibold mb-0.5 font-mono text-[10px] uppercase">Official Email</span>
                    <span className="text-white font-mono text-xs">{STORE_INFO.email}</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <div className="p-1.5 rounded-lg bg-zinc-900 text-purple-400 border border-zinc-800 flex-shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-zinc-400 block font-semibold mb-0.5 font-mono text-[10px] uppercase">Showroom Hours</span>
                    <p className="text-white text-xs">{STORE_INFO.hours.weekdays}</p>
                    <p className="text-zinc-400 text-[11px]">{STORE_INFO.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* Large WhatsApp Action Button */}
              <div className="pt-3 border-t border-zinc-800">
                <a
                  id="contact-large-whatsapp-btn"
                  href={getGeneralInquiryWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Quick Instrument Inquiry Form (Routes to WhatsApp) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-[#0a0a0d] border border-zinc-800 p-5 sm:p-6 space-y-4 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white mb-0.5">
                  Request Instrument Guidance
                </h3>
                <p className="text-xs text-zinc-400">
                  Fill in your requirements below to instantly generate a tailored WhatsApp message to our team.
                </p>
              </div>

              <form onSubmit={handleSendFormWhatsApp} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-300 block mb-1 font-mono">
                      Your Name
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Siddharth"
                      className="w-full px-3 py-1.5 rounded-md bg-black/60 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-300 block mb-1 font-mono">
                      Instrument of Interest
                    </label>
                    <select
                      id="contact-topic-select"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                    >
                      <option value="Guitar Recommendation">Electric & Acoustic Guitars</option>
                      <option value="Stage Piano / Keyboard">Keyboards & Stage Pianos</option>
                      <option value="Acoustic or Electronic Drums">Drums & Percussion</option>
                      <option value="Bass Guitar Selection">Bass Guitars</option>
                      <option value="Studio Microphone Consultation">Microphones & Studio Gear</option>
                      <option value="Bulk / School Order Inquiry">Accessories & Bulk Gear</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-300 block mb-1 font-mono">
                    What sound or feature are you looking for?
                  </label>
                  <textarea
                    id="contact-message-textarea"
                    rows={3}
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="E.g., I play blues and rock and need a versatile guitar with roasted maple neck under ₹30,000..."
                    className="w-full px-3 py-2 rounded-md bg-black/60 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] resize-none"
                  />
                </div>

                <button
                  id="contact-submit-whatsapp-btn"
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b48a1c] hover:from-[#fef08a] hover:to-[#d4af37] text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Consultation Request on WhatsApp</span>
                </button>
              </form>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>⚡ WhatsApp response time: &lt; 15 mins</span>
                <span className="text-[#d4af37]">Fictional Store</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
