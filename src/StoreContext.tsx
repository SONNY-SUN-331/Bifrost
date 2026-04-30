import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Inquiry } from './types';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  setDoc, 
  doc 
} from 'firebase/firestore';
import { db, auth } from './lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isInquiryMode: boolean;
  setIsInquiryMode: (mode: boolean) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  submitSuccess: boolean;
  setSubmitSuccess: (success: boolean) => void;
  cartTotal: number;
  cartCount: number;
  inquiries: Inquiry[];
  submitInquiry: (customerInfo: Inquiry['customer']) => Promise<void>;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isLoadingInquiries: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isInquiryMode, setIsInquiryMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync inquiries from Firestore
  useEffect(() => {
    const q = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        ...doc.data()
      } as Inquiry));
      setInquiries(docs);
      setIsLoadingInquiries(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'inquiries');
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.filter(item => item.id !== product.id); // Toggle removal if already exists
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const submitInquiry = async (customer: Inquiry['customer']) => {
    const id = Math.random().toString(36).substring(2, 9).toUpperCase();
    const newInquiry: Inquiry = {
      id,
      customer,
      items: [...cart],
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    try {
      await setDoc(doc(db, 'inquiries', id), newInquiry);
      setCart([]); // Clear cart after success
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `inquiries/${id}`);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      isInquiryMode,
      setIsInquiryMode,
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      submitSuccess,
      setSubmitSuccess,
      cartTotal,
      cartCount,
      inquiries,
      submitInquiry,
      isAdminOpen,
      setIsAdminOpen,
      isLoadingInquiries
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
