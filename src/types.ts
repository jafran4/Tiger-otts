export interface MediaItem {
  id: number;
  title: string;
  original_title?: string;
  name?: string; // For TV shows
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity?: number;
  genre_ids?: number[];
  genres?: string[];
  media_type?: 'movie' | 'tv';
  adult?: boolean;
  matchScore?: number; // e.g. 98%
  maturityRating?: string; // e.g. "TV-MA", "16+", "PG-13"
  duration?: string; // "2h 15m" or "3 Seasons"
  isOriginal?: boolean;
  top10Rank?: number; // 1 to 10
  trailerKey?: string;
  cast?: string[];
  director?: string;
}

export type CategoryKey = 
  | 'trending' 
  | 'top10' 
  | 'popular' 
  | 'tv' 
  | 'action' 
  | 'scifi' 
  | 'topRated' 
  | 'upcoming' 
  | 'comedy'
  | 'horror';

export interface RowCategory {
  key: CategoryKey;
  title: string;
  endpoint: string;
  isTop10?: boolean;
  isLarge?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  isKids: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  image: string;
  read: boolean;
}

export interface ContinueWatchingItem {
  media: MediaItem;
  progressPercentage: number;
  timeLeft: string;
}

export type ActiveNavTab = 
  | 'home'
  | 'tv'
  | 'movies'
  | 'new'
  | 'mylist'
  | 'ott_store'
  | 'reseller'
  | 'languages';

export interface OTTPlan {
  id: string;
  duration: string;
  price: number;
  originalPrice: number;
  currency?: string;
  screens: string; // e.g. "1 Private Screen (PIN Locked)" or "Full Private 4-Screen Account"
  quality: string; // "4K Ultra HD + Dolby Atmos"
  savePercent: number;
  badge?: string;
  instantDelivery: boolean;
}

export interface OTTService {
  id: string;
  name: string;
  category: 'Streaming' | 'Music' | 'Anime' | 'Bundle' | 'Live TV';
  tagline: string;
  logo: string;
  brandColor: string;
  gradient: string;
  rating: number;
  reviewsCount: number;
  popular?: boolean;
  bestValue?: boolean;
  features: string[];
  plans: OTTPlan[];
  warranty: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Instant Auto-Delivery';
}

export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  country: string;
  countryFlag: string;
  servicePurchased: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  comment: string;
}

export interface OTTOrder {
  orderId: string;
  serviceName: string;
  planDuration: string;
  screens: string;
  amountPaid: number;
  customerEmail: string;
  customerPhone?: string;
  paymentMethod: string;
  accountEmail: string;
  accountPassword: string;
  profilePin?: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'Active' | 'Delivered' | 'Warranty Protected';
}

