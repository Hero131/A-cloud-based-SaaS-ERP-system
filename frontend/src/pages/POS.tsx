import React, { useState } from 'react';
import { SearchIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/outline';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: number;
}

const POS: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="h-full flex">
      {/* Product Selection */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Sample products - Replace with actual data */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="card cursor-pointer" onClick={() => handleAddToCart({
              id: `product-${item}`,
              name: `Product ${item}`,
              price: 1000 * item,
              quantity: 1,
              weight: 10 * item,
            })}>
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                {/* Add product image here */}
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Product {item}</h3>
                <p className="mt-1 text-sm text-gray-500">₹{1000 * item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Current Sale</h2>
        
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateQuantity(item.id, -1)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, 1)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="p-1 text-red-400 hover:text-red-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 ? (
          <div className="mt-6">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">Total</dt>
              <dd className="text-base font-medium text-gray-900">₹{calculateTotal()}</dd>
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="w-full btn-primary"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center text-gray-500">
            No items in cart
          </div>
        )}
      </div>
    </div>
  );
};

export default POS; 