import React, { useState } from 'react';

const BakerySeeMore = ({ item, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return <div>.</div>;
  }

  const handleAddToCart = () => {
    const totalPrice = item.price * quantity;
    addToCart({ ...item, quantity, totalPrice: totalPrice });
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="border rounded-lg p-4 w-[300px]">
        <img src="/api/placeholder/240/160" alt={item.name} className="w-full h-auto mb-4" />
        <h2 className="text-xl font-bold">{item.name}</h2>
        <p className="text-sm text-gray-500 mb-2">Unit Price: ${item.price} | Total Price: ${(item.price * quantity).toFixed(2)}</p>
        <p className="mb-4">
          This is a detailed description of {item.name}. Add more information about ingredients, preparation methods, and any other relevant details here.
        </p>
        <div className="flex items-center justify-between mb-4">
          <button onClick={decreaseQuantity} className="px-2 py-1 border rounded">
            -
          </button>
          <span className="mx-4">{quantity}</span>
          <button onClick={increaseQuantity} className="px-2 py-1 border rounded">
            +
          </button>
        </div>
        <button 
          onClick={handleAddToCart} 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BakerySeeMore;
