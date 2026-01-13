'use client';

import { Search, Filter, Star } from 'lucide-react';

interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
  sortBy: 'price-low' | 'price-high';
  setSortBy: (value: 'price-low' | 'price-high') => void;
}

const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics"
];

export default function SearchFilter(props: SearchFilterProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => props.setShowFavorites(!props.showFavorites)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${props.showFavorites ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 dark:bg-gray-800'}`}
          >
            <Star fill={props.showFavorites ? "currentColor" : "none"} />
            Favorites
          </button>
          <select
            value={props.category}
            onChange={(e) => props.setCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={props.sortBy}
            onChange={(e) => props.setSortBy(e.target.value as any)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}