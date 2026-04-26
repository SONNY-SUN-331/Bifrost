import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';
import { useStore } from '../StoreContext';
import { cn } from '../lib/utils';
import { PRODUCTS } from '../types';

export default function Navbar() {
  const { 
    cartCount, 
    setIsCartOpen, 
    activeCategory,
    setActiveCategory, 
    setSearchQuery, 
    searchQuery 
  } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const categories = [
    'Blanket & Cushion',
    'Carpet',
    'Towel',
    'Table Cloth & Runner'
  ];

  const handleNavLink = (type: string) => {
    if (type === 'Shop All') {
      setActiveCategory('All');
      setSearchQuery('');
      window.scrollTo({ top: document.getElementById('shop')?.offsetTop ? document.getElementById('shop')!.offsetTop - 100 : 0, behavior: 'smooth' });
    } else if (type === 'New Arrivals') {
      setActiveCategory('New');
      setSearchQuery('');
      window.scrollTo({ top: document.getElementById('shop')?.offsetTop ? document.getElementById('shop')!.offsetTop - 100 : 0, behavior: 'smooth' });
    } else if (type === 'Philosophy') {
      window.scrollTo({ top: document.getElementById('ethos')?.offsetTop ? document.getElementById('ethos')!.offsetTop - 100 : 0, behavior: 'smooth' });
    } else if (type === 'Collections') {
      setIsSearchOpen(true);
    }
    setIsMobileMenuOpen(false);
  };

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery('');
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('shop');
      if (el) {
        window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
      }
    }, 100);
  };

  const closeAndScroll = (id: string, cat?: string) => {
    if (cat) setActiveCategory(cat);
    setSearchQuery('');
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
      }
    }, 100);
  };

  const navLinks = [
    { name: 'Shop All', action: () => closeAndScroll('shop', 'All') },
    { name: 'New Arrivals', action: () => closeAndScroll('shop', 'New') },
    { name: 'Collections', action: () => setIsSearchOpen(true) },
    { name: 'Philosophy', action: () => closeAndScroll('ethos') }
  ];

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12 flex items-center justify-between",
          isScrolled ? "bg-brand-bg/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent"
        )}
      >
        <div className="hidden md:flex items-center gap-12">
          {navLinks.slice(0, 2).map((link) => (
            <button key={link.name} onClick={link.action} className="nav-link outline-none">{link.name}</button>
          ))}
        </div>

        <div className="flex-1 flex justify-center">
          <button 
            onClick={() => closeAndScroll('hero', 'All')}
            className="font-serif text-3xl md:text-4xl tracking-[0.3em] font-light transition-all duration-300 text-white uppercase translate-x-4 outline-none hover:text-brand-gold"
          >
            Bifrost
          </button>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden md:flex items-center gap-12">
            {navLinks.slice(2).map((link) => (
              <button key={link.name} onClick={link.action} className="nav-link outline-none">{link.name}</button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-brand-gold transition-colors text-white/60 hover:text-white"
            >
              <Search size={18} strokeWidth={1} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-brand-gold transition-colors relative flex items-center gap-3 group"
            >
              <div className={cn(
                "w-7 h-7 border rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500",
                cartCount > 0 
                  ? "bg-brand-gold border-brand-gold text-brand-bg shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-110" 
                  : "border-white/20 text-white/40 group-hover:border-brand-gold group-hover:text-white"
              )}>
                {cartCount}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors hidden sm:block">Archive</span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              <Menu size={20} strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="fixed inset-0 bg-brand-bg z-[100] md:hidden p-12 flex flex-col justify-center gap-8"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-8 right-8 p-2 text-white/40 hover:text-white"
              >
                <X size={32} strokeWidth={1} />
              </button>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={link.action}
                  className="font-serif text-4xl uppercase tracking-widest text-white/80 hover:text-brand-gold text-left outline-none"
                >
                  {link.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search & Collections Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-bg/98 backdrop-blur-3xl overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col p-6 md:p-12">
              <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-12">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Archive Navigation</p>
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="text-white/40 hover:text-white transition-colors p-2"
                  >
                    <X size={24} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 flex-1">
                  {/* Left Side: Search & Quick Links */}
                  <div className="lg:col-span-7 space-y-16">
                    <div className="space-y-6">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-white/30">Keyword Search</label>
                      <div className="relative group">
                        <input 
                          autoFocus
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search product name or reference..."
                          className="w-full bg-white/5 border border-white/10 p-6 md:p-8 text-xl md:text-2xl font-serif text-white placeholder:text-white/10 outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20">
                          <Search size={24} strokeWidth={1} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <p className="text-[9px] uppercase tracking-widest text-white/20 self-center mr-2">Suggestions:</p>
                        {['Baby Blanket', 'Velvet Rug', 'Towel set', 'B001'].map(suggest => (
                          <button 
                            key={suggest}
                            onClick={() => setSearchQuery(suggest)}
                            className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest text-white/40 hover:border-brand-gold hover:text-white transition-colors"
                          >
                            {suggest}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Results Preview */}
                    {searchQuery && (
                      <div className="space-y-6">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-brand-gold font-bold">Matches in Archive</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                          {PRODUCTS.filter(p => 
                            p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.id.toLowerCase().includes(searchQuery.toLowerCase())
                          ).map(product => (
                            <button 
                              key={product.id}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setTimeout(() => {
                                  const el = document.getElementById('shop');
                                  if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
                                }, 100);
                              }}
                              className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 hover:border-brand-gold/30 hover:bg-white/10 transition-all text-left group"
                            >
                              <div className="w-16 h-16 bg-white/5 flex-shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                              </div>
                              <div>
                                <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-1">{product.id}</p>
                                <p className="font-serif text-sm text-white line-clamp-1">{product.name}</p>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">{product.category}</p>
                              </div>
                            </button>
                          ))}
                          {PRODUCTS.filter(p => 
                            p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.id.toLowerCase().includes(searchQuery.toLowerCase())
                          ).length === 0 && (
                            <div className="col-span-full py-8 border border-dashed border-white/10 text-center">
                              <p className="font-serif text-white/20 italic">No exact matches found</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="hidden lg:block bg-white/[0.02] border border-white/5 p-10 space-y-6">
                      <p className="font-serif text-lg italic text-brand-gold">B2B Sourcing Information</p>
                      <p className="text-sm text-white/40 leading-relaxed max-w-md">
                        All products in our archive are available for wholesale and custom OEM/ODM production. Selective materials meet ISO:9001 and OEKO-TEX standards.
                      </p>
                      <div className="pt-4 flex gap-8">
                        <div className="text-center">
                          <p className="text-brand-gold text-xl font-light">24h</p>
                          <p className="text-[8px] uppercase tracking-widest text-white/30">Quote Response</p>
                        </div>
                        <div className="text-center">
                          <p className="text-brand-gold text-xl font-light">Global</p>
                          <p className="text-[8px] uppercase tracking-widest text-white/30">Logistics Support</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: PDF Category Overview */}
                  <div className="lg:col-span-5 space-y-10">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-8">Category Overview</p>
                      <div className="space-y-2">
                        <button 
                          onClick={() => selectCategory('All')}
                          className={cn(
                            "w-full p-5 text-left transition-all flex items-center justify-between group border",
                            activeCategory === 'All' ? "bg-white/10 border-brand-gold/50" : "bg-white/5 border-white/5 hover:border-white/20"
                          )}
                        >
                          <span className="font-serif text-lg text-white">Full Archive</span>
                          <span className="text-[9px] uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brand-gold transition-all">Browse all items</span>
                        </button>
                        
                        {categories.map((cat) => (
                          <button 
                            key={cat}
                            onClick={() => selectCategory(cat)}
                            className={cn(
                              "w-full p-5 text-left transition-all flex items-center justify-between group border",
                              activeCategory === cat ? "bg-white/10 border-brand-gold/50" : "bg-white/5 border-white/5 hover:border-white/20"
                            )}
                          >
                            <div className="flex flex-col">
                              <span className="font-serif text-lg text-white group-hover:text-brand-gold transition-colors">{cat}</span>
                              <span className="text-[8px] uppercase tracking-widest text-white/30 group-hover:text-white/50">Section {categories.indexOf(cat) + 1}</span>
                            </div>
                            <ArrowRight size={16} className="text-white/20 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-brand-gold transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 border border-brand-gold/10 bg-brand-gold/[0.02]">
                       <button 
                        onClick={() => handleNavLink('New Arrivals')}
                        className="w-full flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold hover:text-white transition-colors"
                       >
                         View New Arrivals
                         <ArrowRight size={14} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-12 border-t border-white/5 text-center">
                 <p className="text-[9px] uppercase tracking-[0.4em] text-white/10">Bifrost Ltd. Archive System V1.0</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
