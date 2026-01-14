import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchProduct } from '@/lib/api';
import BackButton from '@/components/BackButton';

/**
 * ISR: page is generated on-demand and revalidated
 */
export const revalidate = 60;

/**
 * Return empty array for full on-demand generation
 * This is required by the documentation for runtime generation
 */
export async function generateStaticParams() {
  return [];
}

/**
 * Or use this alternative approach:
 */
// export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const product = await fetchProduct(numericId).catch(() => notFound());
  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8"
      role="main"
      aria-label="Product details page"
    >
      <BackButton aria-label="Go back to previous page" />

      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <div className="relative h-96" aria-label="Product image">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold mt-4 mb-2">
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

            <p className="mb-8">{product.description}</p>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
