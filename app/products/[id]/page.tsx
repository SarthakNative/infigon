// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@/components/BackButton';

/**
 * Generate static pages for known product IDs at build time
 */
export async function generateStaticParams() {
  try {
    // Fetch all products to get their IDs
    const response = await fetch('https://fakestoreapi.com/products', {
      cache: 'force-cache', // Ensure it's cached during build
    });
    
    if (!response.ok) {
      return [];
    }
    
    const products = await response.json();
    
    // Return array of params for each product
    return products.map((product: { id: number }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Enable dynamic params - allows accessing products not in generateStaticParams
 */
export const dynamicParams = true;

/**
 * Enable ISR - revalidate every 3600 seconds (1 hour)
 */
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Product {
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

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  // Fetch product directly here with proper cache settings
  let product: Product;
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${numericId}`,
      {
        // Use 'force-cache' for static generation
        // Or 'no-store' if you want always fresh data
        cache: 'force-cache',
        next: { revalidate: 3600 }, // ISR: revalidate every hour
      }
    );

    if (!response.ok) {
      notFound();
    }

    product = await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <BackButton />
      
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-8">
            <div className="relative h-96">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">
              {product.title}
            </h1>

            <div className="flex items-center mb-6">
              <span className="text-4xl font-bold text-blue-600">
                ${product.price}
              </span>
              <div className="ml-6">
                ⭐ {product.rating.rate} ({product.rating.count} reviews)
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>

            <button className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}