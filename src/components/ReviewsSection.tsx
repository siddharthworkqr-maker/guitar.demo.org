import React from 'react';
import { REVIEWS_DATA } from '../data/products';
import { Star, Quote, CheckCircle2, Music, Sparkles } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-14 sm:py-16 bg-[#050505] relative border-t border-zinc-800 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#fef08a] text-[10px] font-bold uppercase tracking-widest font-mono">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>Musician Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Loved by Passionate Musicians
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Hear from guitarists, producers, and performers who made MelodyCraft their instrument of choice.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="relative rounded-xl bg-[#0a0a0d] border border-zinc-800 p-4.5 flex flex-col justify-between hover:border-[#d4af37]/40 transition-all duration-200 hover:shadow-xl hover:shadow-black group"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                    ))}
                  </div>
                  <Quote className="w-4 h-4 text-zinc-600 group-hover:text-[#d4af37]/60 transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-xs text-zinc-300 leading-relaxed italic mb-4">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-zinc-800/80 space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#d4af37]/40"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#fef08a] transition-colors">
                      {review.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400 font-mono">{review.role}</p>
                  </div>
                </div>

                {/* Verified Tag */}
                <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 font-mono">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Order</span>
                  </span>
                  <span>{review.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust summary statement */}
        <div className="mt-8 text-center font-mono">
          <p className="text-[11px] text-zinc-500">
            ★ 4.9/5 Average rating across 500+ handcrafted fictional orders delivered India-wide.
          </p>
        </div>

      </div>
    </section>
  );
};
