export type CategoryId = 
  | 'all'
  | 'electric-guitars'
  | 'acoustic-guitars'
  | 'classical-guitars'
  | 'bass-guitars'
  | 'keyboards'
  | 'drums'
  | 'microphones'
  | 'studio-equipment'
  | 'accessories';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Professional' | 'All Levels';

export interface ProductFinish {
  name: string;
  colorHex: string;
  image?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  image: string;
  galleryImages: string[];
  specs: ProductSpecification[];
  finishes: ProductFinish[];
  suitableFor: ExperienceLevel;
  whatsIncluded: string[];
  deliveryInfo: string;
  isGuitar: boolean;
  featured?: boolean;
  badge?: 'Bestseller' | 'New Release' | 'Artisan Pick' | 'Pro Series' | 'Special Edition';
  inStock: boolean;
  soundType?: 'electric_lead' | 'acoustic_strum' | 'bass_slap' | 'piano_grand' | 'drum_groove' | 'mic_acoustic';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish?: string;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  comment: string;
  verifiedPurchase: string;
  date: string;
  avatar: string;
}

export interface FilterState {
  searchQuery: string;
  category: CategoryId;
  minPrice: number;
  maxPrice: number;
  experienceLevel: ExperienceLevel | 'All';
  minRating: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
}
