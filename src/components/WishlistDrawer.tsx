import React from 'react';
import { Product } from '../types';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  Heart, 
  Star,
  ArrowRight
} from 'lucide-react';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onExploreProducts: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  onViewDetails,
  onExploreProducts,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="wishlist-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="wishlist-drawer-panel"
        className="fixed inset-y-0 right-0 w-full max-w-md bg-[#08090c] border-l border-zinc-800 shadow-2xl p-5 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pb-3.5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Heart className="w-4 h-4 fill-rose-500/30" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Saved Instruments</h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} in wishlist
              </p>
            </div>
          </div>

          <button
            id="close-wishlist-btn"
            onClick={onClose}
            className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-2.5 p-2.5 rounded-xl bg-[#0d0e12] border border-zinc-800 relative group"
              >
                {/* Thumbnail */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover bg-black/40 flex-shrink-0 cursor-pointer border border-zinc-800"
                  onClick={() => {
                    onClose();
                    onViewDetails(product);
                  }}
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#d4af37] font-semibold uppercase font-mono">
                        {product.categoryName}
                      </span>
                      <button
                        onClick={() => onRemoveWishlist(product)}
                        className="text-zinc-500 hover:text-rose-400 p-0.5"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <h4 
                      onClick={() => {
                        onClose();
                        onViewDetails(product);
                      }}
                      className="text-xs font-bold text-white line-clamp-1 cursor-pointer hover:text-[#fef08a]"
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs font-mono font-bold text-zinc-300 mt-0.5">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Actions: Add to Cart + WhatsApp */}
                  <div className="flex items-center gap-1.5 pt-1.5">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 py-1 px-2 rounded-md bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#fef08a] hover:text-zinc-950 text-[11px] font-bold border border-[#d4af37]/30 flex items-center justify-center gap-1 transition-colors font-mono"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>

                    <a
                      href={getProductWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center"
                      title="Order on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Your wishlist is empty</h4>
                <p className="text-xs text-zinc-400 mt-0.5 max-w-xs">
                  Tap the heart icon on any guitar or instrument to save it for your next session.
                </p>
              </div>
              <button
                id="wishlist-empty-explore-btn"
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="px-4 py-2 rounded-lg bg-[#d4af37] text-zinc-950 font-bold text-xs hover:bg-[#fef08a] transition-colors"
              >
                Browse Instruments
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="pt-3 border-t border-zinc-800">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#d4af37] hover:bg-[#fef08a] text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors font-mono"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add All to Shopping Bag</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
