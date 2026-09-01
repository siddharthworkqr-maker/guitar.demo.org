import React, { useState } from 'react';
import { Product } from '../types';
import { 
  Star, 
  Eye, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  Volume2, 
  Check, 
  Sparkles
} from 'lucide-react';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { playInstrumentSound } from '../utils/soundEngine';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, finish?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes.length > 0 ? product.finishes[0].name : undefined
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedFinish);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handlePlaySound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    playInstrumentSound(product.soundType || 'electric_lead');
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const formattedPrice = product.price.toLocaleString('en-IN');
  const formattedOriginal = product.originalPrice?.toLocaleString('en-IN');

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col justify-between rounded-xl bg-[#0c0d12] border border-zinc-800/80 hover:border-[#d4af37]/60 p-3 transition-all duration-200 hover:shadow-xl hover:shadow-black/80 hover:-translate-y-0.5"
    >
      {/* Top Image Container */}
      <div 
        className="relative h-48 sm:h-52 w-full rounded-lg overflow-hidden bg-zinc-950 cursor-pointer flex items-center justify-center border border-white/[0.04]"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.92] group-hover:brightness-100"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent opacity-85" />

        {/* Badge (Bestseller, Artisan Pick, etc.) */}
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase font-mono shadow-md ${
            product.badge === 'Bestseller'
              ? 'bg-[#d4af37] text-zinc-950'
              : product.badge === 'Pro Series'
              ? 'bg-sky-500 text-zinc-950'
              : product.badge === 'Artisan Pick'
              ? 'bg-emerald-500 text-zinc-950'
              : 'bg-purple-500 text-white'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Action icons on Image (Wishlist + Sound Preview) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`p-1.5 rounded-lg backdrop-blur-md border transition-all ${
              isWishlisted
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-black/70 text-zinc-300 hover:text-rose-400 border-white/10 hover:border-rose-400/50'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {product.soundType && (
            <button
              id={`sound-btn-${product.id}`}
              onClick={handlePlaySound}
              aria-label="Audition tone sample"
              className={`p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                isPlayingAudio
                  ? 'bg-[#d4af37] text-zinc-950 border-[#d4af37] scale-105'
                  : 'bg-black/70 text-zinc-300 hover:text-[#fef08a] border-white/10 hover:border-[#d4af37]/50'
              }`}
              title="Audition Tone"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
            </button>
          )}
        </div>

        {/* Level Tag (Beginner/Intermediate/Professional) */}
        <span className="absolute bottom-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-zinc-300 border border-white/10 font-mono uppercase tracking-wider">
          {product.suitableFor}
        </span>
      </div>

      {/* Middle Content */}
      <div className="pt-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider font-mono">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#d4af37] font-bold">
              <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-sm font-bold text-white group-hover:text-[#fef08a] transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-snug">
            {product.shortDescription}
          </p>

          {/* Finish Selectors */}
          {product.finishes.length > 1 && (
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="text-[9px] text-zinc-500 font-mono uppercase">Finishes:</span>
              <div className="flex items-center gap-1">
                {product.finishes.map((finish) => (
                  <button
                    key={finish.name}
                    id={`finish-${product.id}-${finish.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFinish(finish.name);
                    }}
                    title={finish.name}
                    aria-label={`Select ${finish.name} finish`}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedFinish === finish.name
                        ? 'ring-2 ring-[#d4af37] scale-110 border-white'
                        : 'border-white/20 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: finish.colorHex }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-zinc-400 ml-1 truncate max-w-[100px] font-mono">
                {selectedFinish}
              </span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-extrabold text-white font-mono tracking-tight">
              ₹{formattedPrice}
            </span>
            {formattedOriginal && (
              <span className="text-[11px] text-zinc-500 line-through font-mono">
                ₹{formattedOriginal}
              </span>
            )}
          </div>
          <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase font-mono">
            In Stock
          </span>
        </div>

        {/* Action Buttons: View Details, Add to Cart, Order on WhatsApp */}
        <div className="mt-3 space-y-1.5">
          {/* Top Row: View Details & Add to Cart */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              id={`view-details-btn-${product.id}`}
              onClick={() => onViewDetails(product)}
              className="w-full py-2 px-1.5 rounded-md bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white text-[11px] font-bold border border-zinc-800 flex items-center justify-center gap-1 transition-all"
            >
              <Eye className="w-3 h-3" />
              <span>Details</span>
            </button>

            <button
              id={`add-to-bag-btn-${product.id}`}
              onClick={handleAddToCart}
              className={`w-full py-2 px-1.5 rounded-md text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                addedAnimation
                  ? 'bg-[#d4af37] text-zinc-950'
                  : 'bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/30'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>

          {/* Primary WhatsApp Ordering Button */}
          <a
            id={`whatsapp-order-btn-${product.id}`}
            href={getProductWhatsAppUrl(product, selectedFinish)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-950 transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
            <span>Order on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
