import React, { useState, useMemo } from 'react';
import { Product, CategoryId, ExperienceLevel } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Piano, 
  Drum, 
  Mic, 
  SlidersHorizontal, 
  Search, 
  Sliders, 
  Radio, 
  X,
  Sparkles,
  ArrowUpDown,
  Music,
  Check
} from 'lucide-react';

interface AllInstrumentsCatalogProps {
  products: Product[];
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, finish?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
}

export const AllInstrumentsCatalog: React.FC<AllInstrumentsCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  const categoryTabs = [
    { id: 'all' as CategoryId, label: 'All Catalog', icon: Music },
    { id: 'keyboards' as CategoryId, label: 'Keyboards & Pianos', icon: Piano },
    { id: 'drums' as CategoryId, label: 'Drums & Percussion', icon: Drum },
    { id: 'bass-guitars' as CategoryId, label: 'Basses', icon: Radio },
    { id: 'microphones' as CategoryId, label: 'Microphones', icon: Mic },
    { id: 'accessories' as CategoryId, label: 'Accessories', icon: SlidersHorizontal },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.categoryName.toLowerCase().includes(q);
          const matchDesc = product.shortDescription.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchDesc) return false;
        }

        // Level filter
        if (selectedLevel !== 'All' && product.suitableFor !== selectedLevel && product.suitableFor !== 'All Levels') {
          return false;
        }

        // Price filter
        if (product.price > maxPrice) {
          return false;
        }

        // Rating filter
        if (product.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, selectedLevel, maxPrice, minRating, sortBy]);

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) +
    (selectedLevel !== 'All' ? 1 : 0) +
    (maxPrice < 60000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetAllFilters = () => {
    onSelectCategory('all');
    setSelectedLevel('All');
    setMaxPrice(60000);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="py-14 sm:py-16 bg-[#050505] border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#d4af37] tracking-widest uppercase font-mono">
              <Sparkles className="w-3 h-3" />
              <span>Full Showroom Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              All Musical Instruments & Gear
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
              Discover stage pianos, acoustic drum sets, condenser microphones, boutique basses, and essential studio accessories.
            </p>
          </div>

          <div className="mt-3 md:mt-0 flex items-center gap-2">
            <button
              id="toggle-filter-panel-btn"
              onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border transition-all ${
                activeFiltersCount > 0
                  ? 'bg-[#d4af37]/20 text-[#fef08a] border-[#d4af37]/40'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#d4af37] text-zinc-950 text-[10px] font-extrabold flex items-center justify-center font-mono">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                id={`catalog-tab-${tab.id}`}
                onClick={() => onSelectCategory(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#d4af37] text-zinc-950 shadow-sm scale-[1.01]'
                    : 'bg-[#0e0f14] hover:bg-[#161822] text-zinc-300 border border-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Collapsible / Floating Filter Bar */}
        {showFiltersDrawer && (
          <div className="bg-[#0a0a0d] rounded-xl p-4 border border-zinc-800 mb-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
              <h3 className="font-bold text-xs text-white flex items-center gap-1.5 font-mono uppercase">
                <Sliders className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Refine Instruments & Studio Gear</span>
              </h3>
              <div className="flex items-center gap-3">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] text-[#d4af37] hover:text-[#fef08a] underline font-medium font-mono"
                  >
                    Clear All ({activeFiltersCount})
                  </button>
                )}
                <button
                  onClick={() => setShowFiltersDrawer(false)}
                  className="p-1 rounded-md text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Search */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1.5 font-mono">Search Catalog</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="E.g., SynthWave, 5A drumsticks..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-md bg-black/60 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1.5 font-mono">Player Experience</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-md bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="All">All Skill Levels</option>
                  <option value="Beginner">Beginner Friendly</option>
                  <option value="Intermediate">Intermediate Performer</option>
                  <option value="Professional">Professional / Stage Series</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold text-zinc-300 font-mono">Max Budget</label>
                  <span className="text-xs font-mono font-bold text-[#d4af37]">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="60000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-0.5 font-mono">
                  <span>₹500</span>
                  <span>₹60,000+</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1.5 font-mono">Minimum Star Rating</label>
                <div className="flex items-center gap-1">
                  {[0, 4.5, 4.8, 5.0].map((ratingVal) => (
                    <button
                      key={ratingVal}
                      onClick={() => setMinRating(ratingVal)}
                      className={`flex-1 py-1 rounded-md text-[11px] font-medium border transition-all font-mono ${
                        minRating === ratingVal
                          ? 'bg-[#d4af37]/20 text-[#fef08a] border-[#d4af37]/50'
                          : 'bg-black/40 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {ratingVal === 0 ? 'All' : `${ratingVal}★+`}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Active Filter Chips & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-400 font-mono">
              Showing <span className="font-bold text-white">{filteredProducts.length}</span> items
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-[#d4af37]/10 text-[#fef08a] px-2 py-0.5 rounded-md border border-[#d4af37]/25 font-mono">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-[#d4af37]/10 text-[#fef08a] px-2 py-0.5 rounded-md border border-[#d4af37]/25 capitalize font-mono">
                {selectedCategory.replace('-', ' ')}
                <button onClick={() => onSelectCategory('all')} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono uppercase">
              <ArrowUpDown className="w-3 h-3" />
              <span>Sort:</span>
            </span>
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0a0a0d] border border-zinc-800 rounded-md px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.has(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0a0a0d] rounded-xl border border-zinc-800 space-y-3">
            <Music className="w-10 h-10 text-zinc-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No musical gear found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              We couldn't find items matching your criteria. Try loosening your price limit or clearing filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-lg bg-[#d4af37] text-zinc-950 text-xs font-bold hover:bg-[#fef08a] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
