import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'electronics',
  image: '/test.jpg',
  rating: { rate: 4.5, count: 100 },
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const toggleMock = jest.fn();

    render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onToggleFavorite={toggleMock}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
  });

  it('calls toggleFavorite when heart button clicked', () => {
    const toggleMock = jest.fn();

    render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onToggleFavorite={toggleMock}
      />
    );

    fireEvent.click(screen.getByLabelText('Add to favorites'));
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
