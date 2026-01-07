// ============================================
// MedVerify Age - Global State Management
// Using Zustand for lightweight state management
// ============================================

import { create } from 'zustand';
import { Product, Article, DailyInsight, SearchFilters, ApprovalStatus } from '../types';
import { dataService } from '../services/dataService';

// App State Interface
interface AppState {
  // Products State
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Search State
  searchQuery: string;
  searchResults: Product[];
  filters: SearchFilters;
  
  // Articles State
  articles: Article[];
  selectedArticle: Article | null;
  
  // Insights State
  dailyInsight: DailyInsight | null;
  
  // UI State
  activeTab: 'home' | 'search' | 'education' | 'alerts';
  showScanner: boolean;
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  searchProducts: (query: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  selectProduct: (product: Product | null) => void;
  fetchArticles: () => Promise<void>;
  fetchArticleById: (id: string) => Promise<Article | null>;
  selectArticle: (article: Article | null) => void;
  fetchDailyInsight: () => Promise<void>;
  setActiveTab: (tab: 'home' | 'search' | 'education' | 'alerts') => void;
  setShowScanner: (show: boolean) => void;
  clearError: () => void;
}

// Create the store
export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  
  searchQuery: '',
  searchResults: [],
  filters: {
    searchQuery: '',
  },
  
  articles: [],
  selectedArticle: null,
  
  dailyInsight: null,
  
  activeTab: 'home',
  showScanner: false,
  
  // Actions
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await dataService.getAllProducts();
      set({ products, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load products', isLoading: false });
    }
  },
  
  fetchProductById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const product = await dataService.getProductById(id);
      set({ selectedProduct: product, isLoading: false });
      return product;
    } catch (error) {
      set({ error: 'Failed to load product', isLoading: false });
      return null;
    }
  },
  
  searchProducts: async (query: string) => {
    set({ isLoading: true, searchQuery: query });
    try {
      const results = await dataService.searchProducts(query);
      set({ searchResults: results, isLoading: false });
    } catch (error) {
      set({ error: 'Search failed', isLoading: false });
    }
  },
  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    if (query.length > 2) {
      get().searchProducts(query);
    } else {
      set({ searchResults: [] });
    }
  },
  
  setFilters: (filters: Partial<SearchFilters>) => {
    set(state => ({
      filters: { ...state.filters, ...filters }
    }));
  },
  
  clearFilters: () => {
    set({ filters: { searchQuery: '' } });
  },
  
  selectProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },
  
  fetchArticles: async () => {
    set({ isLoading: true, error: null });
    try {
      const articles = await dataService.getAllArticles();
      set({ articles, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load articles', isLoading: false });
    }
  },

  fetchArticleById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const article = await dataService.getArticleById(id);
      set({ selectedArticle: article, isLoading: false });
      return article;
    } catch (error) {
      set({ error: 'Failed to load article', isLoading: false });
      return null;
    }
  },
  
  selectArticle: (article: Article | null) => {
    set({ selectedArticle: article });
  },
  
  fetchDailyInsight: async () => {
    try {
      const insight = await dataService.getLatestInsight();
      set({ dailyInsight: insight });
    } catch (error) {
      console.error('Failed to load insight');
    }
  },
  
  setActiveTab: (tab: 'home' | 'search' | 'education' | 'alerts') => {
    set({ activeTab: tab });
  },
  
  setShowScanner: (show: boolean) => {
    set({ showScanner: show });
  },
  
  clearError: () => {
    set({ error: null });
  },
}));

// Selector hooks for optimized re-renders
export const useProducts = () => useAppStore(state => state.products);
export const useSelectedProduct = () => useAppStore(state => state.selectedProduct);
export const useSearchResults = () => useAppStore(state => state.searchResults);
export const useIsLoading = () => useAppStore(state => state.isLoading);
export const useError = () => useAppStore(state => state.error);
export const useDailyInsight = () => useAppStore(state => state.dailyInsight);
export const useArticles = () => useAppStore(state => state.articles);
export const useActiveTab = () => useAppStore(state => state.activeTab);

// Computed selectors
export const useFilteredProducts = () => {
  const products = useAppStore(state => state.products);
  const filters = useAppStore(state => state.filters);
  
  return products.filter(product => {
    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(product.status)) return false;
    }
    return true;
  });
};

export const useBannedProducts = () => {
  const products = useAppStore(state => state.products);
  return products.filter(p => p.status === 'BANNED');
};

export const useProductsWithAlerts = () => {
  const products = useAppStore(state => state.products);
  return products.filter(p => p.status === 'BANNED' || p.safetyAlerts.length > 0);
};
