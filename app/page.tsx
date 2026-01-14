'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import ErrorState from '@/components/ErrorState';
import { useProducts } from '@/hooks/useProducts';
import { useFavorites } from '../store/favorites';
import SearchFilter from '@/components/SearchFilter';

export default function HomePage() {
  const { products, isLoading, error } = useProducts();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high'>('price-low');

  // Pagination state
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedProducts, totalFiltered } = useMemo(() => {
    let filtered = [...products];

    if (showFavorites) {
      filtered = filtered.filter(p => isFavorite(p.id));
    }

    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }

    const totalFiltered = filtered.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    return { paginatedProducts, totalFiltered };
  }, [
    products,
    search,
    category,
    showFavorites,
    sortBy,
    isFavorite,
    currentPage,
    pageSize,
  ]);

  // Reset page when filters or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, showFavorites, sortBy, pageSize]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        <ErrorState error={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8"
      role="main"
      aria-label="Product explorer page"
    >
        
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Product Explorer
        </h1>

        <section aria-label="Search and filter products">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
            sortBy={sortBy}
            setSortBy={setSortBy}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalProducts={totalFiltered}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="status"
            aria-busy="true"
            aria-label="Loading products"
          >
            {Array.from({ length: pageSize }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div
              className="mb-4 text-gray-600 dark:text-gray-400"
              aria-live="polite"
            >
              {totalFiltered > 0 ? (
                <>
                  Showing {(currentPage - 1) * pageSize + 1} to{' '}
                  {Math.min(currentPage * pageSize, totalFiltered)} of{' '}
                  {totalFiltered} products
                </>
              ) : (
                <>Showing 0 products</>
              )}
            </div>

            {paginatedProducts.length === 0 ? (
              <div
                className="text-center py-12"
                role="alert"
                aria-label="No products found"
              >
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <section
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                aria-label="Product list"
              >
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={isFavorite(product.id)}
                    onToggleFavorite={() => toggleFavorite(product.id)}
                  />
                ))}
              </section>
            )}

            {totalFiltered > pageSize && (
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() =>
                    setCurrentPage(prev => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="cursor-pointer px-4 py-2 border rounded-lg disabled:opacity-50"
                  aria-label="Go to previous page"
                >
                  Previous
                </button>

                <span className="text-gray-600 dark:text-gray-400">
                  Page {currentPage} of{' '}
                  {Math.ceil(totalFiltered / pageSize)}
                </span>

                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage * pageSize >= totalFiltered}
                  className="cursor-pointer px-4 py-2 border rounded-lg disabled:opacity-50"
                  aria-label="Go to next page"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
