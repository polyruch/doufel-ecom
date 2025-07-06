"use client";

import { Metadata } from "next";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center">
          <h1 className="text-3xl mb-6">Your cart is empty</h1>
          <p className="mb-8 text-neutral-600">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/">
            <button className="bg-[#5a8575] hover:bg-[#4a7265] text-white px-8 py-3">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl mb-8 text-center text-[#5a8575]">Your Cart</h1>

      {/* Header - Desktop only */}
      <div className="hidden md:grid md:grid-cols-[3fr_1fr_1fr_auto] gap-4 pb-4 border-b text-sm text-neutral-500">
        <div>Product</div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Price</div>
        <div className="w-8"></div>
      </div>

      {/* Cart items */}
      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            className="py-6 grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_auto] gap-6 items-center"
          >
            {/* Product info */}
            <div className="flex items-center gap-4">
              <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-base font-medium">{item.name}</h3>
                {item.color && (
                  <p className="mt-1 text-sm text-neutral-500">
                    Color: {item.color}
                  </p>
                )}
                <p className="mt-1 text-sm text-neutral-500 md:hidden">
                  {item.price} DA
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-center">
              <div className="flex items-center border rounded-md w-fit">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-3 py-2 hover:bg-neutral-50"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="px-3 py-2 text-sm border-x min-w-[40px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-3 py-2 hover:bg-neutral-50"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">{item.price * item.quantity} DA</div>

            {/* Remove button */}
            <div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-neutral-500 hover:text-neutral-800"
                aria-label="Remove item"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className="mt-10 md:flex md:justify-end">
        <div className="md:w-1/2 lg:w-1/3">
          <div className="bg-neutral-50 p-6 border">
            <h2 className="text-xl mb-4">Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>{subtotal} DA</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="pt-2 mt-2 border-t flex justify-between font-medium">
                <span>Total</span>
                <span>{subtotal} DA</span>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/checkout">
                <button className="w-full bg-[#5a8575] hover:bg-[#4a7265] text-white py-3">
                  Proceed to Checkout
                </button>
              </Link>
              <Link href="/">
                <button className="w-full mt-3 border border-neutral-300 hover:bg-neutral-50 py-3">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
