import { StoreProvider, useStore } from './StoreContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import InquiryForm from './components/InquiryForm';
import { PRODUCTS } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

function Dashboard() {
  const { activeCategory, searchQuery, setActiveCategory, setSearchQuery } = useStore();

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'All' 
      ? true 
      : activeCategory === 'New' 
        ? product.isNew 
        : product.category === activeCategory;
    
    const matchesSearch = searchQuery === '' 
      ? true 
      : product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <main>
        {/* Featured Section */}
        <section id="shop" className="py-32 px-6 md:px-12 bg-brand-bg">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="font-sans text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4"
                >
                  {activeCategory === 'All' ? 'Global Collection' : activeCategory}
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-serif text-4xl md:text-6xl text-brand-ink leading-tight font-light"
                >
                  Archive <br />
                  <span className="italic text-brand-gold">
                    {searchQuery ? `"${searchQuery}"` : 'Selections'}
                  </span>
                </motion.h2>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-8"
              >
                {(activeCategory !== 'All' || searchQuery !== '') && (
                  <button 
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                    }}
                    className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-gold hover:text-white transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
                <button className="font-sans text-xs uppercase tracking-[0.2em] border-b border-white/20 pb-2 hover:border-brand-gold transition-colors">
                  View Full Catalogue
                </button>
              </motion.div>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-32 text-center"
                >
                  <p className="font-serif text-3xl text-white/20 italic">No items found matching your criteria.</p>
                  <button 
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                    }}
                    className="mt-8 text-[10px] uppercase tracking-widest text-brand-gold"
                  >
                    Reset Archive Search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="ethos" className="py-40 px-6 md:px-12 bg-brand-surface relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="mb-12 flex justify-center"
            >
              <div className="w-16 h-[1px] bg-brand-gold" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-5xl text-brand-ink leading-snug mb-12 font-light"
            >
              "We bridge standard-driven textile precision with cutting-edge consumer tech, ensuring seamless global supply for the modern industry."
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-sans text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold"
            >
              The Bifrost Ethos
            </motion.p>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[24vw] opacity-[0.03] text-white pointer-events-none select-none whitespace-nowrap uppercase tracking-tighter">
            BIFROST
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
      <InquiryForm />
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <StoreProvider>
      <AnimatePresence>
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </StoreProvider>
  );
}

