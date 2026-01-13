export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  search: string;
  category: string;
  showFavorites: boolean;
  sortBy: 'price-low' | 'price-high';
}