import { Minus, Plus } from "lucide-react";
import React from "react";

const QuantitySelector = ({
  decrementQuantity,
  incrementQuantity,
  quantity,
}: any) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Quantity</h3>
      <div className="flex items-center border border-gray-300 rounded-md w-fit">
        <button
          onClick={decrementQuantity}
          className="px-3 py-2 text-gray-600 hover:text-pink-700 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
        <button
          onClick={incrementQuantity}
          className="px-3 py-2 text-gray-600 hover:text-pink-700 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
