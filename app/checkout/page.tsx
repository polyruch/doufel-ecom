"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { wilayas } from "@/utils/constants";
type CheckoutStep = "information" | "shipping";

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information");

  // Calculate shipping cost (can be modified based on your requirements)
  const shippingCost = 10.0;
  const total = subtotal + shippingCost;

  const handleStepChange = (step: CheckoutStep) => {
    setCurrentStep(step);
  };

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
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl text-[#5a8575]">Checkout</h1>
      </div>

      {/* Breadcrumb navigation */}
      <div className="flex justify-center mb-10">
        <nav className="flex w-full max-w-md">
          <button
            onClick={() => handleStepChange("information")}
            className={`flex-1 text-center py-2 border-b-2 ${
              currentStep === "information"
                ? "border-[#5a8575] text-[#5a8575]"
                : "border-neutral-200 text-neutral-400"
            }`}
          >
            Information
          </button>
          <button
            onClick={() => handleStepChange("shipping")}
            className={`flex-1 text-center py-2 border-b-2 ${
              currentStep === "shipping"
                ? "border-[#5a8575] text-[#5a8575]"
                : "border-neutral-200 text-neutral-400"
            }`}
          >
            Shipping
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left column: form steps */}
        <div className="lg:col-span-2 space-y-8">
          {currentStep === "information" && (
            <div className="space-y-6">
              <h2 className="text-xl">Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nom" className="block mb-2 text-sm">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    className="w-full p-3 border border-neutral-300 focus:border-[#5a8575] focus:outline-none"
                    placeholder="Nom"
                  />
                </div>
                <div>
                  <label htmlFor="prenom" className="block mb-2 text-sm">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    className="w-full p-3 border border-neutral-300 focus:border-[#5a8575] focus:outline-none"
                    placeholder="Prénom"
                  />
                </div>
                <div>
                  <label htmlFor="wilaya" className="block mb-2 text-sm">
                    Wilaya
                  </label>
                  <select
                    id="wilaya"
                    className="w-full p-3 border border-neutral-300 focus:border-[#5a8575] focus:outline-none"
                  >
                    <option value="">Sélectionner une wilaya</option>
                    {wilayas.map((wilaya) => (
                      <option key={wilaya.code} value={wilaya.code}>
                        {wilaya.code} - {wilaya.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block mb-2 text-sm">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="ville"
                    className="w-full p-3 border border-neutral-300 focus:border-[#5a8575] focus:outline-none"
                    placeholder="Ville"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block mb-2 text-sm">
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full p-3 border border-neutral-300 focus:border-[#5a8575] focus:outline-none"
                    placeholder="Adresse"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block mb-2 text-sm">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-3 border border-neutral-300 focus:border-[#5a8575] focus:outline-none"
                    placeholder="Numéro de téléphone"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleStepChange("shipping")}
                  className="w-full bg-[#5a8575] hover:bg-[#4a7265] text-white py-3"
                >
                  Continue to Shipping
                </button>
              </div>
            </div>
          )}

          {currentStep === "shipping" && (
            <div className="space-y-6">
              <h2 className="text-xl">Shipping Method</h2>

              <div className="space-y-3">
                <div className="border p-4 flex items-center">
                  <input
                    type="radio"
                    id="standard"
                    name="shipping"
                    className="mr-3"
                    defaultChecked
                  />
                  <label htmlFor="standard" className="flex-1">
                    <span className="font-medium">Standard Shipping</span>
                    <p className="text-sm text-neutral-500">
                      3-5 business days
                    </p>
                  </label>
                  <span className="font-medium">
                    ${shippingCost.toFixed(2)}
                  </span>
                </div>

                <div className="border p-4 flex items-center">
                  <input
                    type="radio"
                    id="express"
                    name="shipping"
                    className="mr-3"
                  />
                  <label htmlFor="express" className="flex-1">
                    <span className="font-medium">Express Shipping</span>
                    <p className="text-sm text-neutral-500">
                      1-2 business days
                    </p>
                  </label>
                  <span className="font-medium">$20.00</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => handleStepChange("information")}
                  className="text-[#5a8575] hover:underline"
                >
                  Return to Information
                </button>
                <button className="bg-[#5a8575] hover:bg-[#4a7265] text-white px-6 py-3">
                  Complete Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right column: order summary */}
        <div className="lg:col-span-1">
          <div className="border p-6 sticky top-24">
            <h2 className="text-xl mb-4 pb-4 border-b">Order Summary</h2>

            <div className="max-h-[400px] overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex py-4 border-b">
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 mr-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5a8575] text-xs font-medium text-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-normal">{item.name}</h4>
                      <span className="text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    {item.color && (
                      <p className="mt-1 text-xs text-neutral-500">
                        Color: {item.color}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="pt-2 mt-2 border-t flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
