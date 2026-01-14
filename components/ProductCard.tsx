import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <Image 
          src={product.image} 
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <button 
          onClick={onToggleFavorite}
          className="cursor-pointer absolute top-2 right-2 p-2 bg-white/80 rounded-full"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart fill={isFavorite ? "red" : "white"} color={isFavorite ? "red" : "gray"} />
        </button>
      </div>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-blue-600">{product.title}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">{product.category}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{product.description}</p>
      </div>
    </div>
  );
}