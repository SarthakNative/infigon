'use client';

import { Search, Star } from 'lucide-react';

interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
  sortBy: 'price-low' | 'price-high';
  setSortBy: (value: 'price-low' | 'price-high') => void;

  // Pagination props 
  pageSize: number;
  setPageSize: (value: number) => void;
  totalProducts: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  'jewelery',
  'electronics',
];

export default function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  showFavorites,
  setShowFavorites,
  sortBy,
  setSortBy,
  pageSize,
  setPageSize,
  totalProducts,
  currentPage,
  setCurrentPage,
}: SearchFilterProps) {
  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <div
      className="mb-8 space-y-4"
      role="search"
      aria-label="Search and filter products"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            aria-label="Search products by name"
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          {/* Favorites toggle */}
          <button
            onClick={() => {
              setShowFavorites(!showFavorites);
              setCurrentPage(1);
            }}
            aria-pressed={showFavorites}
            aria-label={
              showFavorites
                ? 'Show all products'
                : 'Show only favorite products'
            }
            className={`cursor-pointer px-4 py-2 rounded-lg flex items-center gap-2 ${
              showFavorites
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <Star
              fill={showFavorites ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
            Favorites
          </button>

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter products by category"
            className="cursor-pointer px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price-low' | 'price-high')}
            aria-label="Sort products by price"
            className="cursor-pointer px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* Pagination controls */}
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Pagination controls"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Show:
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              aria-label="Select number of products per page"
              className="cursor-pointer px-3 py-1.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm"
            >
              <option value="4">4 per page</option>
              <option value="8">8 per page</option>
              <option value="12">12 per page</option>
              <option value="20">20 per page</option>
            </select>

            <span className="text-sm text-gray-600 dark:text-gray-400 mx-2">
              Page:
            </span>
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              aria-label="Select page number"
              className="cursor-pointer px-3 py-1.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} of {totalPages}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
