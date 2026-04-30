import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Clock, User, Building, Mail, Package, Lock, Key } from 'lucide-react';
import { useStore } from '../StoreContext';

export default function AdminPanel() {
  const { inquiries, isAdminOpen, setIsAdminOpen, isLoadingInquiries } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Bifrost' && password === 'sonny') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const downloadData = () => {
    const dataStr = JSON.stringify(inquiries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `bifrost_inquiries_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const closePanel = () => {
    setIsAdminOpen(false);
    setIsAuthenticated(false); // Reset on close
    setUsername('');
    setPassword('');
  };

  if (!isAdminOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-brand-bg/98 backdrop-blur-xl flex flex-col p-6 md:p-12 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-gold/10 rounded-full mb-6">
                  <Lock className="text-brand-gold" size={30} />
                </div>
                <h2 className="font-serif text-3xl text-white mb-2">Internal Access</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Secure Archive Management Portal</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" size={16} />
                    <input 
                      required
                      type="text" 
                      placeholder="USERNAME"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-5 pl-12 text-[11px] tracking-widest text-white outline-none focus:border-brand-gold transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" size={16} />
                    <input 
                      required
                      type="password" 
                      placeholder="PASSWORD"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-5 pl-12 text-[11px] tracking-widest text-white outline-none focus:border-brand-gold transition-all"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-[10px] uppercase tracking-widest text-center">{error}</p>}

                <button 
                  type="submit"
                  className="w-full bg-brand-gold text-white p-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white hover:text-black transition-all"
                >
                  Authorize Access
                </button>

                <button 
                  type="button"
                  onClick={closePanel}
                  className="w-full text-white/20 hover:text-white text-[9px] uppercase tracking-widest transition-colors"
                >
                  Return to Archive
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-white">Inquiry Management</h2>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold">B2B Archive Admin Portal</p>
                  <span className="h-4 w-px bg-white/10" />
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Authorized as Bifrost</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={downloadData}
                  className="flex items-center gap-2 bg-brand-gold text-white px-6 py-3 rounded-sm text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  <Download size={14} /> Export JSON
                </button>
                <button 
                  onClick={closePanel}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={32} strokeWidth={1} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              {isLoadingInquiries ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin mb-4" />
                  <p className="font-serif text-white/20 text-xl italic text-center">Synchronizing with global archive...</p>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-sm">
                  <p className="font-serif text-white/20 text-xl italic">No inquiries received yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 pb-12">
                  {inquiries.map((inquiry) => (
                    <div 
                      key={inquiry.id} 
                      className="bg-white/[0.03] border border-white/5 p-8 rounded-sm hover:border-brand-gold/30 transition-all group"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Customer Info */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-brand-gold">
                            <Clock size={14} />
                            <span className="text-[10px] uppercase tracking-widest bg-brand-gold/10 px-2 py-1">
                              {new Date(inquiry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-serif text-white mb-2">{inquiry.id}</h3>
                            <div className="space-y-2 text-white/60 text-sm">
                              <div className="flex items-center gap-2">
                                <User size={14} className="text-white/20" />
                                <span>{inquiry.customer.name} ({inquiry.customer.position})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building size={14} className="text-white/20" />
                                <span>{inquiry.customer.company} — {inquiry.customer.market}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail size={14} className="text-white/20" />
                                <span className="text-brand-gold/80">{inquiry.customer.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Requirements */}
                        <div className="border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-8 py-4 lg:py-0">
                          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Additional Requirements</p>
                          <p className="text-sm text-white/80 leading-relaxed italic">
                            "{inquiry.customer.requirements || 'No specific requirements mentioned.'}"
                          </p>
                        </div>

                        {/* Products */}
                        <div className="border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-8 py-4 lg:py-0">
                          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Selected Items ({inquiry.items.length})</p>
                          <div className="space-y-3">
                            {inquiry.items.map(item => (
                              <div key={item.id} className="flex items-center gap-3 bg-white/5 p-2 pr-4 rounded-sm">
                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4">
                                    <p className="text-[10px] text-white truncate font-medium">{item.name}</p>
                                    <span className="text-[9px] text-brand-gold bg-brand-gold/10 px-1.5 py-0.5 rounded-xs font-mono">
                                      {item.id}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <p className="text-[8px] text-white/20 uppercase tracking-widest">Qty: {item.quantity}</p>
                                    <span className="h-0.5 w-0.5 bg-white/10" />
                                    <p className="text-[8px] text-white/20 uppercase tracking-widest">Cat: {item.category}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
