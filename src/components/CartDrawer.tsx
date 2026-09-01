import React from 'react';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { getCartWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, finish?: string) => void;
  onRemoveItem: (productId: string, finish?: string) => void;
  onClearCart: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreProducts,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const formattedTotal = totalAmount.toLocaleString('en-IN');

  return (
    <div 
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        id="cart-drawer-panel"
        className="fixed inset-y-0 right-0 w-full max-w-md bg-[#08090c] border-l border-zinc-800 shadow-2xl p-5 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pb-3.5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Your Musical Cart</h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                {totalItems} {totalItems === 1 ? 'instrument' : 'instruments & gear'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                id="clear-cart-btn"
                onClick={onClearCart}
                className="text-[10px] text-rose-400 hover:text-rose-300 font-medium px-2 py-0.5 rounded border border-rose-500/20 hover:border-rose-500/40 transition-colors font-mono"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2">
          {items.length > 0 ? (
            items.map((item, idx) => {
              const itemTotal = (item.product.price * item.quantity).toLocaleString('en-IN');
              return (
                <div
                  key={`${item.product.id}-${item.selectedFinish || 'default'}-${idx}`}
                  className="flex gap-2.5 p-2.5 rounded-xl bg-[#0d0e12] border border-zinc-800 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-black/40 flex-shrink-0 border border-zinc-800"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.selectedFinish && (
                        <p className="text-[10px] text-[#fef08a] font-mono">
                          Finish: {item.selectedFinish}
                        </p>
                      )}
                      <p className="text-xs font-mono font-bold text-zinc-300 mt-0.5">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Quantity Controls & Delete */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 bg-black/60 rounded border border-zinc-800 px-1 py-0.5">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1),
                              item.selectedFinish
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="p-0.5 text-zinc-400 hover:text-white disabled:opacity-30"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[11px] font-mono font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedFinish
                            )
                          }
                          className="p-0.5 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#d4af37]">
                          ₹{itemTotal}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedFinish)}
                          className="text-zinc-500 hover:text-rose-400 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Your cart is empty</h4>
                <p className="text-xs text-zinc-400 mt-0.5 max-w-xs">
                  Discover handcrafted guitars, stage keyboards, percussion and studio accessories.
                </p>
              </div>
              <button
                id="cart-empty-explore-btn"
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

        {/* Footer with WhatsApp Checkout */}
        {items.length > 0 && (
          <div className="pt-3 border-t border-zinc-800 space-y-3">
            <div className="space-y-1 text-xs text-zinc-300 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Total Value</span>
                <span className="font-bold text-white">₹{formattedTotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Freight & Transit</span>
                <span className="text-emerald-400 font-semibold">FREE</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-zinc-800 text-sm">
                <span className="font-bold text-white">Order Total</span>
                <span className="font-bold text-[#fef08a] text-sm">
                  ₹{formattedTotal}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Checkout Button */}
            <a
              id="cart-whatsapp-checkout-btn"
              href={getCartWhatsAppUrl(items, totalAmount)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
              <span>Complete Order on WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-3 text-[10px] text-zinc-400 font-mono pt-0.5">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                <span>Luthier Setup</span>
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-emerald-400" />
                <span>All-India Transit</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
