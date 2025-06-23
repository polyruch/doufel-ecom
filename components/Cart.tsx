"use client";

import Link from "next/link";
import { X, Minus, Plus, WholeWord } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export function Cart() {
  const {
    items: basketItems,
    updateQuantity,
    removeItem,
    totalItems,
    subtotal,
  } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative text-neutral-800"
          aria-label="Shopping basket"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5a8575] text-xs font-medium text-white">
              {totalItems}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-w-[95vw] w-[350px] sm:w-[400px] p-4 sm:p-6 bg-white"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-xl font-normal">Your Basket ({totalItems})</h3>
            <button
              className="text-neutral-500 hover:text-neutral-800"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {basketItems.length === 0 ? (
            <p className="text-neutral-500">Your basket is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                {basketItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h4 className="text-base font-normal">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-neutral-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-base">{item.price} DA</p>
                      <div className="mt-2 flex items-center border rounded-md w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1 hover:bg-neutral-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm border-x">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-1 hover:bg-neutral-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-base">
                  <span>Subtotal</span>
                  <span>{subtotal} DA</span>
                </div>
                <p className="mt-1 text-sm text-neutral-500">
                  Plus les frais de livraison
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Link href="/checkout" className="w-full">
                  <button
                    className="w-full bg-[#5a8575] hover:bg-[#4a7265] text-white py-3 rounded-none"
                    onClick={() => setIsOpen(false)}
                  >
                    Valider la commande
                  </button>
                </Link>
                <Link href="/cart" className="w-full">
                  <button
                    className="w-full border border-neutral-200 hover:bg-neutral-50 py-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Voir le panier
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
