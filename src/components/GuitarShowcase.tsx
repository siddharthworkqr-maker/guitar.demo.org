import React, { useState, useMemo } from 'react';
import { Product, CategoryId, ExperienceLevel } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Guitar, 
  SlidersHorizontal, 
  Sparkles, 
  Filter, 
  Search, 
  Layers, 
  ArrowUpDown,
  Music
} from 'lucide-react';

interface GuitarShowcaseProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, finish?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
}

export const GuitarShowcase: React.FC<GuitarShowcaseProps> = ({
  products,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [subCategory, setSubCategory] = useState<string>('all-guitars');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [guitarSearch, setGuitarSearch] = useState<string>('');

  // Filter only guitars (Electric, Acoustic, Classical, Bass)
  const guitarProducts = useMemo(() => {
    return products.filter((p) => p.isGuitar);
  }, [products]);

  const filteredGuitars = useMemo(() => {
    return guitarProducts
      .filter((guitar) => {
        // Sub-category filter
        if (subCategory === 'electric' && guitar.category !== 'electric-guitars') return false;
        if (subCategory === 'acoustic' && guitar.category !== 'acoustic-guitars') return false;
        if (subCategory === 'classical' && guitar.category !== 'classical-guitars') return false;
        if (subCategory === 'bass' && guitar.category !== 'bass-guitars') return false;

        // Level filter
        if (levelFilter !== 'all' && guitar.suitableFor !== levelFilter) return false;

        // Search query
        if (guitarSearch.trim()) {
          const q = guitarSearch.toLowerCase();
          const matchName = guitar.name.toLowerCase().includes(q);
          const matchDesc = guitar.shortDescription.toLowerCase().includes(q);
          if (!matchName && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [guitarProducts, subCategory, levelFilter, sortBy, guitarSearch]);

  const guitarCategories = [
    { id: 'all-guitars', label: 'All Guitars (15)' },
    { id: 'electric', label: 'Electric (6)' },
    { id: 'acoustic', label: 'Acoustic (4)' },
    { id: 'classical', label: 'Classical (2)' },
    { id: 'bass', label: 'Basses (3)' },
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Professional', label: 'Pro Series' },
  ];

  return (
    <section id="guitars" className="py-14 sm:py-16 relative">
      {/* Background visual accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-sky-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#fef08a] text-[10px] font-bold uppercase tracking-widest font-mono">
            <Guitar className="w-3 h-3 text-[#d4af37]" />
            <span>Handcrafted Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Explore Our Guitar Collection
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            From resonant solid spruce acoustics to handcrafted boutique electric guitars. Inspected and intonated by our master luthiers before dispatch.
          </p>
        </div>

        {/* Filter & Sub-Nav Bar */}
        <div className="bg-[#0a0a0d] rounded-xl p-3.5 sm:p-4 border border-zinc-800 mb-6 space-y-3">
          
          {/* Top Row: Category Tabs & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {guitarCategories.map((cat) => (
                <button
                  key={cat.id}
                  id={`guitar-filter-tab-${cat.id}`}
                  onClick={() => setSubCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
                    subCategory === cat.id
                      ? 'bg-[#d4af37] text-zinc-950 shadow-sm'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* In-Section Guitar Search */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                id="guitar-collection-search-input"
                type="text"
                value={guitarSearch}
                onChange={(e) => setGuitarSearch(e.target.value)}
                placeholder="Search guitars by model or spec..."
                className="w-full pl-9 pr-4 py-1.5 rounded-md bg-black/60 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              {guitarSearch && (
                <button
                  onClick={() => setGuitarSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-[10px]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Level Chips & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2.5 border-t border-zinc-800/80">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1 font-mono uppercase">
                <SlidersHorizontal className="w-3 h-3" />
                <span>Level:</span>
              </span>
              {levels.map((lvl) => (
                <button
                  key={lvl.id}
                  id={`level-chip-${lvl.id.toLowerCase()}`}
                  onClick={() => setLevelFilter(lvl.id)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    levelFilter === lvl.id
                      ? 'bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1 font-mono uppercase">
                <ArrowUpDown className="w-3 h-3" />
                <span>Sort:</span>
              </span>
              <select
                id="guitar-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/60 border border-zinc-800 rounded-md px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="featured">Featured / Artisan</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-4 font-mono">
          <p>Showing <span className="font-bold text-white">{filteredGuitars.length}</span> guitars in showroom</p>
          <div className="flex items-center gap-1.5 text-[#d4af37] font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Free gig bag & luthier setup included</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredGuitars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredGuitars.map((guitar) => (
              <ProductCard
                key={guitar.id}
                product={guitar}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.has(guitar.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#0a0a0d] rounded-xl border border-zinc-800 space-y-2">
            <Music className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No guitars match your filter</h3>
            <p className="text-xs text-zinc-400">Try adjusting your search terms or filter settings</p>
            <button
              onClick={() => {
                setSubCategory('all-guitars');
                setLevelFilter('all');
                setGuitarSearch('');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] text-zinc-950 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
