import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchProduct } from '@/lib/api';
import BackButton from '@/components/BackButton';
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const product = await fetchProduct(Number(id)).catch(() => notFound());

  return (
 <div
  className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8"
  role="main"
  aria-label="Product details page"
>
  <BackButton aria-label="Go back to previous page" />

  <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
    <div className="md:flex">
      {/* Product Image */}
      <div className="md:w-1/2 p-8">
        <div
          className="relative h-96"
          aria-label="Product image"
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 p-8">
        <span
          className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          aria-label={`Product category: ${product.category}`}
        >
          {product.category}
        </span>

        <h1 className="text-3xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">
          {product.title}
        </h1>

        {/* Price & Rating */}
        <div className="flex items-center mb-6">
          <span
            className="text-4xl font-bold text-blue-600"
            aria-label={`Price: ${product.price} dollars`}
          >
            ${product.price}
          </span>

          <div className="ml-6">
            <div
              className="flex items-center"
              aria-label={`Rated ${product.rating.rate} out of 5 stars based on ${product.rating.count} reviews`}
            >
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
          aria-label="Product description"
        >
          {product.description}
        </p>

        {/* Add to Cart */}
        <button
          className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>

  );
}