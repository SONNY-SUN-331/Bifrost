import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useStore } from '../StoreContext';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, setIsInquiryMode, removeFromCart } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-brand-bg shadow-2xl z-[70] flex flex-col border-l border-white/10"
          >
            <div className="flex items-center justify-between p-8 border-b border-white/10">
              <h2 className="font-serif text-2xl uppercase tracking-widest font-light">Interest List</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/20 space-y-6 text-center">
                  <div className="relative">
                    <ShoppingBag size={48} strokeWidth={0.5} />
                    <div className="absolute inset-0 bg-brand-gold/10 blur-xl animate-pulse rounded-full" />
                  </div>
                  <p className="font-sans uppercase tracking-[0.3em] text-[10px] leading-relaxed">
                    Your interest list is empty.<br />Add items to begin your inquiry.
                  </p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold hover:text-white transition-colors"
                  >
                    Explore Categories
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-20 h-24 bg-brand-surface overflow-hidden rounded-sm relative group">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-brand-bg/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-sans text-xs tracking-wider text-white/90 leading-tight">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/20 hover:text-red-500 transition-colors ml-4"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[9px] text-white/30 mt-2 uppercase tracking-widest leading-loose">
                        Ref: {item.id}<br />
                        {item.category}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-brand-surface/50 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-sans uppercase tracking-[0.3em] text-[9px] opacity-40">Items selected</span>
                    <span className="font-sans text-sm font-bold text-brand-gold">{cart.length}</span>
                  </div>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">
                    Personalized quotations include technical data and global logistics options.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsInquiryMode(true);
                  }}
                  className="w-full bg-white text-black py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-brand-gold hover:text-white transition-all duration-500 transform"
                >
                  Confirm & Start Inquiry
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
