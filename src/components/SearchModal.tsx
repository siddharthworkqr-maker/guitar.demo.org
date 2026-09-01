import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { 
  Search, 
  X, 
  Guitar, 
  ArrowRight, 
  Sparkles, 
  Star, 
  MessageCircle,
  Eye
} from 'lucide-react';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onViewDetails: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onViewDetails,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !isOpen) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchResults = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.specs.some((s) => s.value.toLowerCase().includes(q))
        );
      })
    : products.filter((p) => p.featured).slice(0, 4);

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 bg-black/90 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="w-full max-w-2xl bg-[#08090c] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-3 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="relative border-b border-zinc-800 p-3.5 flex items-center gap-2.5 bg-[#0d0e12]">
          <Search className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
          <input
            ref={inputRef}
            id="global-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guitars, keyboards, drums, microphones, strings..."
            className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Suggestions */}
        <div className="p-2.5 bg-black/40 border-b border-zinc-800 flex items-center gap-1.5 overflow-x-auto text-[11px] text-zinc-400 font-mono">
          <span className="font-semibold text-zinc-500">Popular:</span>
          {['Aurora X1', 'Acoustic', 'Eclipse Pro', 'KeysPro 61', 'Drum Kit', 'Leather Strap', 'StudioMic'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-[#d4af37]/20 hover:text-[#fef08a] border border-zinc-800 transition-colors whitespace-nowrap text-[10px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1 px-1 font-mono">
            <span>{query.trim() ? `Search Results (${searchResults.length})` : 'Popular Featured Instruments'}</span>
            {!query.trim() && <span className="text-[#fef08a]">Staff Recommendations</span>}
          </div>

          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div
                key={product.id}
                id={`search-result-${product.id}`}
                onClick={() => {
                  onClose();
                  onViewDetails(product);
                }}
                className="group flex items-center justify-between p-2.5 rounded-lg bg-[#0d0e12] hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover bg-black/40 flex-shrink-0 border border-zinc-800"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-[9px] text-[#d4af37] font-semibold uppercase">
                        {product.categoryName}
                      </span>
                      <span className="text-[9px] text-zinc-500">• {product.suitableFor}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#fef08a] transition-colors">
                      {product.name}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="text-right font-mono">
                    <span className="text-xs font-extrabold text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-[#d4af37]">
                      <Star className="w-2.5 h-2.5 fill-[#d4af37] text-[#d4af37]" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-md bg-zinc-900 group-hover:bg-[#d4af37] group-hover:text-zinc-950 flex items-center justify-center text-zinc-400 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-zinc-400 space-y-1">
              <p className="text-xs font-semibold text-white">No instruments found for "{query}"</p>
              <p className="text-[11px] text-zinc-500">Try searching for "guitar", "keys", or "drum".</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#0d0e12] border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
          <span>Direct Orders: <strong className="text-emerald-400">+91 8695767656</strong></span>
          <span>Click to view details</span>
        </div>
      </div>
    </div>
  );
};
