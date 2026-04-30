import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { useStore } from '../StoreContext';

export default function InquiryForm() {
  const { cart, isInquiryMode, setIsInquiryMode, setSubmitSuccess, submitSuccess, submitInquiry, inquiries } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    position: '',
    market: 'North America',
    requirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate slight delay for professional feel
    setTimeout(() => {
      submitInquiry(formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const lastInquiryId = inquiries[0]?.id || '...';

  if (!isInquiryMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-brand-bg flex items-center justify-center p-6 md:p-12 overflow-y-auto"
    >
      <button 
        onClick={() => setIsInquiryMode(false)}
        className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 py-12">
        <AnimatePresence mode="wait">
          {!submitSuccess ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight font-light">
                  Request <br /><span className="italic text-brand-gold">Catalogue & Quote</span>
                </h2>
                <div className="space-y-8">
                  <p className="text-white/40 text-sm leading-relaxed">
                    Our specialist team will review your selection and contact you within 24 hours with a comprehensive quotation and technical specifications.
                  </p>
                  
                  <div className="border-t border-white/10 pt-8">
                    <h3 className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-6">Selected Archive Items ({cart.length})</h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 items-center border-b border-white/5 pb-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-sm opacity-60" />
                          <div>
                            <p className="text-xs text-white/80">{item.name}</p>
                            <p className="text-[9px] text-white/20 uppercase tracking-widest">{item.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-brand-surface/50 border border-white/10 p-4 text-xs text-white outline-none focus:border-brand-gold transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Company</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.company}
                      onChange={e => setFormData(f => ({ ...f, company: e.target.value }))}
                      className="w-full bg-brand-surface/50 border border-white/10 p-4 text-xs text-white outline-none focus:border-brand-gold transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/40">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-brand-surface/50 border border-white/10 p-4 text-xs text-white outline-none focus:border-brand-gold transition-colors" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Position</label>
                    <input 
                      type="text" 
                      value={formData.position}
                      onChange={e => setFormData(f => ({ ...f, position: e.target.value }))}
                      className="w-full bg-brand-surface/50 border border-white/10 p-4 text-xs text-white outline-none focus:border-brand-gold transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Target Market</label>
                    <select 
                      className="w-full bg-brand-surface/50 border border-white/10 p-4 text-xs text-white outline-none focus:border-brand-gold transition-colors appearance-none"
                      value={formData.market}
                      onChange={e => setFormData(f => ({ ...f, market: e.target.value }))}
                    >
                      <option>North America</option>
                      <option>Europe</option>
                      <option>Asia Pacific</option>
                      <option>Middle East</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/40">Additional Requirements</label>
                  <textarea 
                    className="w-full bg-brand-surface/50 border border-white/10 p-4 text-xs text-white outline-none focus:border-brand-gold transition-colors h-32 resize-none" 
                    placeholder="Volume requirements, lead times, or specific certifications..."
                    value={formData.requirements}
                    onChange={e => setFormData(f => ({ ...f, requirements: e.target.value }))}
                  ></textarea>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-5 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-brand-gold hover:text-white transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : 'Submit Inquiry Request'}
                </button>
              </motion.form>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center py-24 space-y-8"
            >
              <div className="flex justify-center">
                <CheckCircle2 size={64} className="text-brand-gold" strokeWidth={1} />
              </div>
              <h2 className="font-serif text-5xl md:text-7xl font-light">Inquiry Sent</h2>
              <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for your interest in the Bifrost archive. Reference ID: {lastInquiryId}. We will respond shortly.
              </p>
              <div className="pt-8">
                <button 
                  onClick={() => {
                    setSubmitSuccess(false);
                    setIsInquiryMode(false);
                  }}
                  className="bg-white/5 border border-white/10 text-white px-12 py-5 uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all duration-500"
                >
                  Return to Archive
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
