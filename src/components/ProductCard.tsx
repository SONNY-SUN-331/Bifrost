import { motion } from 'motion/react';
import { Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../StoreContext';
import { cn } from '../lib/utils';

export default function ProductCard({ product, index }: { product: Product; index: number; key?: string | number }) {
  const { addToCart, cart } = useStore();
  const isInCart = cart.some(item => item.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group"
    >
      <div className="relative aspect-[3/4] bg-brand-surface overflow-hidden mb-8 rounded-sm">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        
        <div className="absolute inset-0 bg-brand-bg opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border backdrop-blur-md",
              isInCart 
                ? "bg-brand-gold border-brand-gold text-brand-bg scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
                : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
            )}
          >
            {isInCart ? <Check size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={1.5} />}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
           <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-4 text-[9px] uppercase tracking-widest text-white/60">
              Technical Specification Available
           </div>
        </div>
      </div>

      <div className="flex flex-col items-start px-1 text-left">
        <div className="flex justify-between items-start w-full mb-3">
           <div className="max-w-[70%]">
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-brand-gold mb-1 font-bold">{product.category}</p>
              <h3 className="font-serif text-xl text-white font-light group-hover:text-brand-gold transition-colors">{product.name}</h3>
           </div>
           <p className="font-sans text-[10px] tracking-[0.2em] opacity-40 uppercase">Ref. {product.id}</p>
        </div>
        <p className="text-[10px] leading-relaxed text-white/30 line-clamp-2 font-light">{product.description}</p>
      </div>
    </motion.div>
  );
}
