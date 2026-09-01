import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Music, 
  MessageCircle, 
  Phone,
  Guitar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { getGeneralInquiryWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Guitars', id: 'guitars' },
    { label: 'Keyboards', id: 'keyboards' },
    { label: 'Drums', id: 'drums' },
    { label: 'Basses', id: 'basses' },
    { label: 'Accessories', id: 'accessories' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        id="main-navigation-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-[#222226] py-3 shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-[#050505]/95 via-[#050505]/85 to-transparent py-4'
        }`}
      >
        {/* Top notice ticker */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#996515] p-[1px] shadow-md shadow-[#d4af37]/20 group-hover:shadow-[#d4af37]/40 transition-all">
                <div className="w-full h-full bg-[#0a0a0d] rounded-[7px] flex items-center justify-center">
                  <Guitar className="w-4 h-4 text-[#d4af37] group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-[#fef08a] transition-colors">
                    MelodyCraft
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#d4af37]/15 text-[#fef08a] border border-[#d4af37]/30 uppercase tracking-wider font-mono">
                    PRO
                  </span>
                </div>
                <p className="text-[9px] tracking-widest text-zinc-400 font-medium uppercase font-display">
                  Instruments & Sound Studio
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                    activeSection === item.id
                      ? 'text-[#fef08a] bg-[#d4af37]/15 border border-[#d4af37]/30 shadow-sm'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                id="header-search-btn"
                onClick={onOpenSearch}
                aria-label="Search instruments"
                className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#d4af37]/40 transition-all"
                title="Search instruments (/)"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Button */}
              <button
                id="header-wishlist-btn"
                onClick={onOpenWishlist}
                aria-label="View saved instruments"
                className="relative p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/40 transition-all"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Button */}
              <button
                id="header-cart-btn"
                onClick={onOpenCart}
                aria-label="View cart"
                className="relative p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-[#fef08a] border border-zinc-800 hover:border-[#d4af37]/40 transition-all"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d4af37] text-zinc-950 text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp CTA Button */}
              <a
                id="header-whatsapp-cta-btn"
                href={getGeneralInquiryWhatsAppUrl('Instrument Catalog Assistance')}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-100 fill-emerald-100" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Mobile Hamburger Menu Button */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-50 lg:hidden bg-black/85 backdrop-blur-md transition-opacity"
        >
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#0a0a0d] border-l border-zinc-800 p-5 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#d4af37] flex items-center justify-center text-zinc-950 font-bold">
                    <Guitar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">MelodyCraft</h4>
                    <p className="text-[9px] text-[#d4af37] font-medium font-mono uppercase">Instruments Studio</p>
                  </div>
                </div>
                <button
                  id="mobile-drawer-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Nav Links */}
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                      activeSection === item.id
                        ? 'bg-[#d4af37]/15 text-[#fef08a] border border-[#d4af37]/30'
                        : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Bottom Details */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <a
                id="mobile-drawer-whatsapp-btn"
                href={getGeneralInquiryWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Order on WhatsApp</span>
              </a>

              <div className="text-center">
                <p className="text-[11px] text-zinc-400">Direct Showroom Helpline</p>
                <p className="text-xs font-mono font-semibold text-[#d4af37] mt-0.5">{WHATSAPP_DISPLAY_NUMBER}</p>
                <p className="text-[10px] text-zinc-500 mt-1">Varanasi, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
