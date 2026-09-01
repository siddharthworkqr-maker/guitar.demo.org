import React from 'react';
import { Award, Headphones, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 'feat-1',
      title: 'Premium Quality',
      description: 'Carefully selected fictional instruments designed for great performance.',
      icon: Award,
      accentColor: 'from-[#d4af37] to-[#b48a1c]',
      iconBg: 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20',
      glow: 'group-hover:border-[#d4af37]/40',
    },
    {
      id: 'feat-2',
      title: 'Expert Support',
      description: 'Friendly guidance for choosing the right instrument.',
      icon: Headphones,
      accentColor: 'from-cyan-400 to-blue-600',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      glow: 'group-hover:border-cyan-500/40',
    },
    {
      id: 'feat-3',
      title: 'Secure Packaging',
      description: 'Professional fictional packaging and delivery experience.',
      icon: ShieldCheck,
      accentColor: 'from-emerald-400 to-teal-600',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'group-hover:border-emerald-500/40',
    },
    {
      id: 'feat-4',
      title: 'Musician First',
      description: 'Everything designed around the needs of musicians.',
      icon: HeartHandshake,
      accentColor: 'from-rose-400 to-pink-600',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      glow: 'group-hover:border-rose-500/40',
    },
  ];

  return (
    <section id="why-choose-us" className="py-14 sm:py-16 bg-[#06070a] relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#fef08a] text-[10px] font-bold uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>The MelodyCraft Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Crafted for tone, longevity, and effortless purchase through direct WhatsApp communication.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                id={`feature-card-${feat.id}`}
                className={`group relative rounded-xl bg-[#0a0a0d] p-4.5 border border-zinc-800 ${feat.glow} transition-all duration-200 hover:shadow-xl hover:shadow-black flex flex-col justify-between`}
              >
                <div>
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${feat.iconBg} mb-3 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-[#fef08a] transition-colors">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom subtle accent line */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono">
                  <span className="text-[10px] text-zinc-500">
                    Quality Certified
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60 group-hover:bg-[#d4af37] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
