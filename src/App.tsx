/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, CategoryId } from './types';
import { PRODUCTS_DATA } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { GuitarShowcase } from './components/GuitarShowcase';
import { AllInstrumentsCatalog } from './components/AllInstrumentsCatalog';
import { SpecialOffers } from './components/SpecialOffers';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { MessageCircle, ArrowUp, Volume2 } from 'lucide-react';
import { getGeneralInquiryWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from './utils/whatsapp';

export default function App() {
  // Cart state with persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('melodycraft_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with persistence
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('melodycraft_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Selected category filter
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('melodycraft_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('melodycraft_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Track active section
      const sections = ['home', 'categories', 'guitars', 'catalog', 'offers', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, finish?: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          (finish ? item.selectedFinish === finish : true)
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity: 1,
            selectedFinish: finish || (product.finishes[0]?.name ?? undefined),
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number, finish?: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!finish || item.selectedFinish === finish)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (productId: string, finish?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && (!finish || item.selectedFinish === finish))
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  const wishlistIds = new Set(wishlist.map((p) => p.id));
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'keyboards' || sectionId === 'drums' || sectionId === 'basses' || sectionId === 'accessories') {
      if (sectionId === 'keyboards') setSelectedCategory('keyboards');
      if (sectionId === 'drums') setSelectedCategory('drums');
      if (sectionId === 'basses') setSelectedCategory('bass-guitars');
      if (sectionId === 'accessories') setSelectedCategory('accessories');
      
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectGuitarById = (guitarId: string) => {
    const guitar = PRODUCTS_DATA.find((p) => p.id === guitarId);
    if (guitar) {
      setSelectedProduct(guitar);
    }
  };

  const handleSelectCategoryFromFeatured = (catId: CategoryId) => {
    setSelectedCategory(catId);
    if (catId === 'electric-guitars' || catId === 'acoustic-guitars' || catId === 'classical-guitars') {
      const el = document.getElementById('guitars');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f6] flex flex-col justify-between selection:bg-[#d4af37]/30 selection:text-[#fef08a]">
      
      {/* Fixed Sticky Luxury Navigation Bar */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleNavigate('guitars')}
          onSelectGuitar={handleSelectGuitarById}
        />

        {/* Featured Categories */}
        <FeaturedCategories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategoryFromFeatured}
        />

        {/* Guitar Collection — Main Focus */}
        <GuitarShowcase
          products={PRODUCTS_DATA}
          onViewDetails={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* Special Offer Banner */}
        <SpecialOffers
          onExploreOffers={() => handleNavigate('catalog')}
        />

        {/* All Instruments & Gear Catalog (Keyboards, Drums, Bass, Mics, Accessories) */}
        <AllInstrumentsCatalog
          products={PRODUCTS_DATA}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onViewDetails={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Customer Reviews */}
        <ReviewsSection />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onExploreProducts={() => handleNavigate('guitars')}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlist}
        onRemoveWishlist={handleRemoveWishlist}
        onAddToCart={handleAddToCart}
        onViewDetails={(p) => setSelectedProduct(p)}
        onExploreProducts={() => handleNavigate('guitars')}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS_DATA}
        onViewDetails={(p) => setSelectedProduct(p)}
      />

      {/* Floating Action Buttons (WhatsApp Quick Chat & Scroll to Top) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-3 rounded-full bg-[#161c2c]/90 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-white/10 hover:border-amber-400 shadow-xl transition-all hover:scale-110"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Live Helpline */}
        <a
          id="floating-whatsapp-btn"
          href={getGeneralInquiryWhatsAppUrl('Showroom Live Assistance')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-2xl shadow-emerald-950/70 border border-emerald-400/30 transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600 animate-pulse" />
          <span className="hidden sm:inline font-semibold">Order on WhatsApp</span>
        </a>
      </div>

    </div>
  );
}
