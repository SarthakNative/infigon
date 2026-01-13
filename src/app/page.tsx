'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import SearchFilter from '@/components/SearchFilter';
import ErrorState from '@/components/ErrorState';
import { useProducts } from '@/hooks/useProducts';
import { useFavorites } from '../store/favorites';

export default function HomePage() {
  const { products, isLoading, error } = useProducts();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high'>('price-low');

  const filteredProducts = useMemo(() => {
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
    
    return filtered;
  }, [products, search, category, showFavorites, sortBy, isFavorite]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        <ErrorState 
          error={error} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Product Explorer
        </h1>
        
        <SearchFilter 
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600 dark:text-gray-400">
              Showing {filteredProducts.length} of {products.length} products
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={isFavorite(product.id)}
                    onToggleFavorite={() => toggleFavorite(product.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}