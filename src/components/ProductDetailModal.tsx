import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  Star, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  Volume2, 
  Check, 
  ShieldCheck, 
  Truck, 
  Package, 
  Sparkles,
  Share2,
  Info
} from 'lucide-react';
import { getProductWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';
import { playInstrumentSound } from '../utils/soundEngine';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, finish?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes.length > 0 ? product.finishes[0].name : undefined
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'included' | 'delivery'>('specs');

  const formattedPrice = product.price.toLocaleString('en-IN');
  const formattedOriginal = product.originalPrice?.toLocaleString('en-IN');

  const handleAddToCart = () => {
    onAddToCart(product, selectedFinish);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handlePlayTone = () => {
    setIsPlayingSound(true);
    playInstrumentSound(product.soundType || 'electric_lead');
    setTimeout(() => setIsPlayingSound(false), 2000);
  };

  return (
    <div 
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="product-detail-modal-content"
        className="relative w-full max-w-4xl bg-[#08090c] border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close product view"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Image Gallery & Previews */}
          <div className="lg:col-span-6 space-y-3">
            {/* Main Stage Image */}
            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 flex items-center justify-center group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />

              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#d4af37] text-zinc-950 shadow-md uppercase font-mono tracking-wider">
                  {product.badge}
                </span>
              )}

              {/* Tone Preview Audio Button */}
              {product.soundType && (
                <button
                  id="modal-audition-tone-btn"
                  onClick={handlePlayTone}
                  className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-lg backdrop-blur-md text-[11px] font-bold flex items-center gap-1.5 border shadow-md transition-all font-mono ${
                    isPlayingSound
                      ? 'bg-[#d4af37] text-zinc-950 border-[#fef08a] scale-105'
                      : 'bg-black/80 text-[#fef08a] border-zinc-800 hover:bg-black'
                  }`}
                >
                  <Volume2 className={`w-3.5 h-3.5 text-[#d4af37] ${isPlayingSound ? 'animate-bounce' : ''}`} />
                  <span>{isPlayingSound ? 'Playing Tone...' : 'Audition Tone'}</span>
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    id={`gallery-thumb-${idx}`}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border transition-all ${
                      activeImage === img
                        ? 'border-[#d4af37] ring-1 ring-[#d4af37]/60'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Luthier Certified</p>
                  <p className="text-[10px] text-zinc-400">100% Setup & Tested</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Insured Freight</p>
                  <p className="text-[10px] text-zinc-400">Safe Delivery Across India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Finishes, Specs, & Ordering */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-1.5 font-mono">
                <span className="text-[10px] font-bold text-[#d4af37] tracking-wider uppercase">
                  {product.categoryName}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-[#fef08a] font-bold bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/25">
                  <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {product.name}
              </h2>

              {/* Price & Level Pill */}
              <div className="mt-2.5 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-2xl font-black text-white">
                    ₹{formattedPrice}
                  </span>
                  {formattedOriginal && (
                    <span className="text-xs text-zinc-500 line-through">
                      ₹{formattedOriginal}
                    </span>
                  )}
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Free Delivery
                  </span>
                </div>

                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-cyan-500/30">
                  Level: {product.suitableFor}
                </span>
              </div>

              {/* Full Description */}
              <p className="mt-2.5 text-xs text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Available Finishes Selection */}
              {product.finishes.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-300 block mb-2">
                    Finish:{' '}
                    <span className="text-[#fef08a] font-bold">{selectedFinish}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.finishes.map((finish) => (
                      <button
                        key={finish.name}
                        id={`modal-finish-${finish.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setSelectedFinish(finish.name)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                          selectedFinish === finish.name
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-white'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white/30"
                          style={{ backgroundColor: finish.colorHex }}
                        />
                        <span className="text-[11px]">{finish.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Specs Tabs */}
              <div className="mt-4">
                <div className="flex items-center gap-3 border-b border-zinc-800 pb-1.5 font-mono text-xs">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`font-bold pb-1 -mb-2 transition-colors ${
                      activeTab === 'specs'
                        ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('included')}
                    className={`font-bold pb-1 -mb-2 transition-colors ${
                      activeTab === 'included'
                        ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    In The Box ({product.whatsIncluded.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`font-bold pb-1 -mb-2 transition-colors ${
                      activeTab === 'delivery'
                        ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Delivery & Warranty
                  </button>
                </div>

                <div className="mt-3">
                  {activeTab === 'specs' && (
                    <div className="space-y-1.5 font-mono text-xs">
                      {product.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-1 px-2.5 rounded bg-zinc-900/60 border border-zinc-800/80"
                        >
                          <span className="text-zinc-400 text-[11px]">{spec.label}</span>
                          <span className="text-zinc-200 font-semibold text-[11px] text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'included' && (
                    <ul className="space-y-1.5">
                      {product.whatsIncluded.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'delivery' && (
                    <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1 text-xs text-zinc-300">
                      <p className="font-semibold text-white">{product.deliveryInfo}</p>
                      <p className="text-zinc-400 text-[11px]">
                        Orders are confirmed personally by our showroom master luthier on WhatsApp with pictures of your exact instrument prior to packaging.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar (WhatsApp + Add to Bag + Wishlist) */}
            <div className="pt-4 border-t border-zinc-800 space-y-2.5">
              {/* Primary Direct WhatsApp Order Button */}
              <a
                id="modal-order-whatsapp-btn"
                href={getProductWhatsAppUrl(product, selectedFinish)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Order on WhatsApp (Instant Confirmation)</span>
              </a>

              {/* Secondary Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="modal-add-to-bag-btn"
                  onClick={handleAddToCart}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    addedAnimation
                      ? 'bg-[#d4af37] text-zinc-950 border-[#d4af37]'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-800'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Item Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  id="modal-toggle-wishlist-btn"
                  onClick={() => onToggleWishlist(product)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    isWishlisted
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : 'Save to Wishlist'}</span>
                </button>
              </div>

              <p className="text-center text-[10px] text-zinc-500 font-mono">
                Showroom Helpline: <span className="text-zinc-400 font-semibold">{WHATSAPP_DISPLAY_NUMBER}</span> (10 AM - 8 PM IST)
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
