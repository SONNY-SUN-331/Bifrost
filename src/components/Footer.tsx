import { Instagram, Twitter, Facebook, ShieldCheck } from 'lucide-react';
import { useStore } from '../StoreContext';

export default function Footer() {
  const { setIsAdminOpen } = useStore();

  return (
    <footer className="bg-brand-bg text-white pt-32 pb-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-32">
        <div className="md:col-span-1">
          <a href="/" className="font-serif text-3xl tracking-[0.3em] font-light mb-8 block uppercase">
            BIFROST
          </a>
          <p className="font-sans text-[10px] uppercase tracking-widest text-white/30 leading-relaxed max-w-xs">
            Defining modern minimalism through technical precision and high-performance materials. Established MMXXIV.
          </p>
        </div>

        <div>
          <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-brand-gold">Archive</h4>
          <ul className="space-y-4">
            {['Blankets', 'Carpets', 'Towels', 'Table Linen'].map(item => (
              <li key={item}>
                <button className="font-sans text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">{item}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-brand-gold">Management</h4>
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-gold transition-all"
              >
                <ShieldCheck size={12} /> Admin Portal
              </button>
            </li>
            {['Shipping', 'Authentication', 'Legal'].map(item => (
              <li key={item}>
                <button className="font-sans text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">{item}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
           <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-brand-gold">Journal</h4>
          <p className="font-sans text-[10px] uppercase tracking-widest text-white/30 mb-8 max-w-[200px]">Subscribe for limited release notifications and archival access.</p>
          <div className="flex border-b border-white/10 pb-2">
            <input 
              type="email" 
              placeholder="ENTER EMAIL" 
              className="bg-transparent border-none outline-none font-sans text-[10px] uppercase tracking-widest w-full py-2 placeholder:text-white/10 text-white"
            />
            <button className="font-sans text-[10px] uppercase tracking-widest font-bold hover:text-brand-gold transition-colors text-white/40">Join</button>
          </div>
          <div className="flex gap-8 mt-12">
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Instagram size={16} /></a>
            <a href="#" className="text-white/20 hover:text-white transition-colors"><Twitter size={16} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/20">
          © {new Date().getFullYear()} BIFROST STUDIO. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8">
          <a href="#" className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
