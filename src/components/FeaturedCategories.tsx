import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { CategoryId } from '../types';
import { 
  Guitar, 
  Music, 
  Sparkles, 
  Radio, 
  Piano, 
  Drum, 
  Mic, 
  Sliders, 
  SlidersHorizontal,
  ArrowUpRight
} from 'lucide-react';

interface FeaturedCategoriesProps {
  onSelectCategory: (categoryId: CategoryId) => void;
  selectedCategory: CategoryId;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Guitar': return <Guitar className="w-5 h-5" />;
      case 'Music': return <Music className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Piano': return <Piano className="w-5 h-5" />;
      case 'Drum': return <Drum className="w-5 h-5" />;
      case 'Mic': return <Mic className="w-5 h-5" />;
      case 'Sliders': return <Sliders className="w-5 h-5" />;
      default: return <SlidersHorizontal className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-16 relative bg-[#07080b] border-y border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-[#d4af37] tracking-widest uppercase font-mono">
              <span>Curated Showroom</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Categories
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
              Explore our master collection across guitars, keyboards, percussion, live microphones, and stage essentials.
            </p>
          </div>

          <div className="mt-3 md:mt-0">
            <button
              id="view-all-categories-btn"
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#d4af37] text-zinc-950 shadow-md'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
              }`}
            >
              View All Instruments
            </button>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES_DATA.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <div
                key={category.id}
                id={`category-card-${category.id}`}
                onClick={() => onSelectCategory(category.id)}
                className={`group relative h-52 rounded-xl overflow-hidden cursor-pointer border transition-all duration-200 ${
                  isSelected 
                    ? 'border-[#d4af37] ring-1 ring-[#d4af37]/40 scale-[1.01]' 
                    : 'border-zinc-800 hover:border-[#d4af37]/50 hover:shadow-xl hover:shadow-black'
                }`}
              >
                {/* Background Image with Dark Vignette */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.65] group-hover:brightness-[0.8]"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/70 to-transparent" />

                {/* Top Badge & Icon */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#d4af37] group-hover:text-[#fef08a] group-hover:border-[#d4af37]/40 transition-colors">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold font-mono bg-black/80 backdrop-blur-md text-zinc-300 border border-white/10">
                    {category.itemCount} models
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white group-hover:text-[#fef08a] transition-colors">
                      {category.name}
                    </h3>
                    <div className="w-6 h-6 rounded-md bg-white/10 group-hover:bg-[#d4af37] group-hover:text-zinc-950 flex items-center justify-center text-white transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-snug">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
