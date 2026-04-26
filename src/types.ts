export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  // --- Blanket & Cushion ---
  {
    id: 'B001',
    name: 'Baby Blanket / Baby Sac',
    price: 0,
    isNew: true,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1615486511484-92e17430ff3a?auto=format&fit=crop&q=80&w=800',
    description: 'Soft, hypoallergenic materials for infants. Customizable patterns and sizes.'
  },
  {
    id: 'B002',
    name: 'Single-side Brushed Fleece',
    price: 0,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1584043729379-2ef507295865?auto=format&fit=crop&q=80&w=800',
    description: 'Lightweight and warm, perfect for seasonal transitions and promotional items.'
  },
  {
    id: 'B003',
    name: 'Imitation Cashmere Blanket',
    price: 0,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&q=80&w=800',
    description: 'Luxury feel without the cost. High-density weave for superior softness.'
  },
  {
    id: 'B004',
    name: 'Bonded Chenille & Fleece Blanket',
    price: 0,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1579547945413-43951afda97c?auto=format&fit=crop&q=80&w=800',
    description: 'Dual-layer texture for ultimate comfort and aesthetic appeal.'
  },
  {
    id: 'B005',
    name: 'Teddy Fleece Blanket',
    price: 0,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?auto=format&fit=crop&q=80&w=800',
    description: 'Thick, fluffy texture providing extreme warmth and cozy touch.'
  },
  {
    id: 'B006',
    name: 'Faux / Rabbit Fur Blanket',
    price: 0,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?auto=format&fit=crop&q=80&w=800',
    description: 'Premium synthetic fur, shed-resistant and incredibly soft.'
  },
  {
    id: 'B007',
    name: 'Sherp Blanket',
    price: 0,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1626815663738-99ee3e7ef1f3?auto=format&fit=crop&q=80&w=800',
    description: 'Sherpa-lined for maximum insulation during winter seasons.'
  },
  {
    id: 'B008',
    name: 'Flannel Blanket',
    price: 0,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1616627561839-07437f75997d?auto=format&fit=crop&q=80&w=800',
    description: 'Classic flannel finish, anti-pilling and color-fast.'
  },
  {
    id: 'B009',
    name: 'Raschel Blanket',
    price: 0,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1520004434532-668416a08753?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant embossed patterns with heavy-duty warmth construction.'
  },
  {
    id: 'B010',
    name: 'Cushions',
    price: 0,
    category: 'Blanket & Cushion',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800',
    description: 'Matching decorative cushions in various textures and fillings.'
  },

  // --- Carpet ---
  {
    id: 'C001',
    name: 'Velvet / Ultra-Soft Plush Rug',
    price: 0,
    category: 'Carpet',
    image: 'https://images.unsplash.com/photo-1545080136-89bf16fb1918?auto=format&fit=crop&q=80&w=800',
    description: 'Modern minimalist rugs with anti-slip backing and memory foam core.'
  },
  {
    id: 'C002',
    name: 'Shaggy Carpets',
    price: 0,
    category: 'Carpet',
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=800',
    description: 'High-pile shaggy rugs for extra comfort and luxury feel.'
  },
  {
    id: 'C003',
    name: 'Prayer Mat',
    price: 0,
    category: 'Carpet',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional and modern designs with durable anti-slip bases.'
  },

  // --- Towel ---
  {
    id: 'T001',
    name: 'Coral Fleece Towels',
    price: 0,
    category: 'Towel',
    image: 'https://images.unsplash.com/photo-1583922606661-0822ed0bd916?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-absorbent coral fleece for quick drying and soft touch.'
  },
  {
    id: 'T002',
    name: 'Hand / Hair Towels',
    price: 0,
    category: 'Towel',
    image: 'https://images.unsplash.com/photo-1595111101532-a531f8eeedec?auto=format&fit=crop&q=80&w=800',
    description: 'Specialized sizes and materials tailored to specific hygiene needs.'
  },

  // --- Table Cloth & Table Runner ---
  {
    id: 'R001',
    name: 'Linen & Cotton Table Cloth',
    price: 0,
    category: 'Table Cloth & Runner',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb270?auto=format&fit=crop&q=80&w=800',
    description: 'Durable, stain-resistant fabrics for hospitality and home use.'
  },
  {
    id: 'R002',
    name: 'Table Runners - Theme Collections',
    price: 0,
    category: 'Table Cloth & Runner',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    description: 'Seasonal and thematic designs to elevate dining experiences.'
  }
];
