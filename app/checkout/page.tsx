"use client";

import { Metadata } from "next";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { wilayas } from "@/utils/constants";
import { createOrder } from "@/utils/axiosClient";

type CheckoutStep = "information" | "shipping" | "confirmation";

interface FormData {
  nom: string;
  prenom: string;
  wilaya: string;
  ville: string;
  address: string;
  phone: string;
}

export const metadata: Metadata = {
  title: "Paiement | Dfl-collection Boutique",
  description: "Finalisez votre commande en toute sécurité sur Dfl-collection.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } =
    useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("information");
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    wilaya: "",
    ville: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<string>("Bureau");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const router = useRouter();

  // Calculate shipping cost based on selected method
  const shippingCost = selectedShippingMethod === "Bureau" ? 400 : 600;
  const total = subtotal + shippingCost;

  const handleStepChange = (step: CheckoutStep) => {
    setCurrentStep(step);
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.startsWith("0") && cleanPhone.length === 10;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nom.trim()) newErrors.nom = "Nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Prénom est requis";
    if (!formData.wilaya) newErrors.wilaya = "Wilaya est requise";
    if (!formData.ville.trim()) newErrors.ville = "Ville est requise";
    if (!formData.address.trim()) newErrors.address = "Adresse est requise";

    if (!formData.phone.trim()) {
      newErrors.phone = "Numéro de téléphone est requis";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone =
        "Le numéro doit commencer par 0 et contenir 10 chiffres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToShipping = () => {
    if (validateForm()) {
      setCurrentStep("shipping");
    }
  };

  const handleCompleteOrder = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    try {
      const orderData = {
        customerInfo: formData,
        items: items,
        shippingMethod:
          selectedShippingMethod === "Bureau"
            ? "Livraison au Bureaux"
            : "Livraison à domicile",
        shippingCost: shippingCost,
        subtotal: subtotal,
        total: total,
      };

      const response = await createOrder(orderData);

      if (response.data) {
        setOrderId(response.data.id);
        clearCart();
        router.push(
          `/success?orderId=${response.data.id}&total=${total}&shipping=${selectedShippingMethod}`
        );
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Erreur lors de la création de la commande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
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
                    className={`w-full p-3 border focus:border-[#5a8575] focus:outline-none ${
                      errors.nom ? "border-red-500" : "border-neutral-300"
                    }`}
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={(e) => handleInputChange("nom", e.target.value)}
                  />
                  {errors.nom && (
                    <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="prenom" className="block mb-2 text-sm">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    className={`w-full p-3 border focus:border-[#5a8575] focus:outline-none ${
                      errors.prenom ? "border-red-500" : "border-neutral-300"
                    }`}
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={(e) =>
                      handleInputChange("prenom", e.target.value)
                    }
                  />
                  {errors.prenom && (
                    <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="wilaya" className="block mb-2 text-sm">
                    Wilaya
                  </label>
                  <select
                    id="wilaya"
                    className={`w-full p-3 border focus:border-[#5a8575] focus:outline-none ${
                      errors.wilaya ? "border-red-500" : "border-neutral-300"
                    }`}
                    value={formData.wilaya}
                    onChange={(e) =>
                      handleInputChange("wilaya", e.target.value)
                    }
                  >
                    <option value="">Sélectionner une wilaya</option>
                    {wilayas.map((wilaya) => (
                      <option key={wilaya.code} value={wilaya.code}>
                        {wilaya.code} - {wilaya.name}
                      </option>
                    ))}
                  </select>
                  {errors.wilaya && (
                    <p className="text-red-500 text-sm mt-1">{errors.wilaya}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="ville" className="block mb-2 text-sm">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="ville"
                    className={`w-full p-3 border focus:border-[#5a8575] focus:outline-none ${
                      errors.ville ? "border-red-500" : "border-neutral-300"
                    }`}
                    placeholder="Ville"
                    value={formData.ville}
                    onChange={(e) => handleInputChange("ville", e.target.value)}
                  />
                  {errors.ville && (
                    <p className="text-red-500 text-sm mt-1">{errors.ville}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block mb-2 text-sm">
                    Adresse
                  </label>
                  <input
                    type="text"
                    id="address"
                    className={`w-full p-3 border focus:border-[#5a8575] focus:outline-none ${
                      errors.address ? "border-red-500" : "border-neutral-300"
                    }`}
                    placeholder="Adresse"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block mb-2 text-sm">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={`w-full p-3 border focus:border-[#5a8575] focus:outline-none ${
                      errors.phone ? "border-red-500" : "border-neutral-300"
                    }`}
                    placeholder="Ex: 0772722464"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Format: 0XXXXXXXXX (10 chiffres)
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleContinueToShipping}
                  className="w-full bg-[#5a8575] hover:bg-[#4a7265] text-white py-3"
                >
                  Choisir la méthode de livraison
                </button>
              </div>
            </div>
          )}

          {currentStep === "shipping" && (
            <div className="space-y-6">
              <h2 className="text-xl">Méthode de livraison</h2>

              <div className="space-y-3">
                <div className="border p-4 flex items-center">
                  <input
                    type="radio"
                    id="standard"
                    name="shipping"
                    className="mr-3"
                    checked={selectedShippingMethod === "Bureau"}
                    onChange={() => setSelectedShippingMethod("Bureau")}
                  />
                  <label htmlFor="standard" className="flex-1">
                    <span className="font-medium">Livraison au Bureaux</span>
                    <p className="text-sm text-neutral-500">
                      3-5 jours ouvrables
                    </p>
                  </label>
                  <span className="font-medium">400 DA</span>
                </div>

                <div className="border p-4 flex items-center">
                  <input
                    type="radio"
                    id="express"
                    name="shipping"
                    className="mr-3"
                    checked={selectedShippingMethod === "Domicile"}
                    onChange={() => setSelectedShippingMethod("Domicile")}
                  />
                  <label htmlFor="express" className="flex-1">
                    <span className="font-medium">Livraison à domicile</span>
                    <p className="text-sm text-neutral-500">
                      1-2 jours ouvrables
                    </p>
                  </label>
                  <span className="font-medium">600 DA</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => handleStepChange("information")}
                  className="text-[#5a8575] hover:underline"
                >
                  Retour aux informations
                </button>
                <button
                  onClick={handleCompleteOrder}
                  disabled={isSubmitting}
                  className="bg-[#5a8575] hover:bg-[#4a7265] text-white px-6 py-3 disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Création de la commande..."
                    : "Finaliser la commande"}
                </button>
              </div>
            </div>
          )}

          {currentStep === "confirmation" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl text-[#5a8575] mb-4">
                  Commande confirmée!
                </h2>
                <p className="text-lg mb-2">Merci pour votre commande</p>
                {orderId && (
                  <p className="text-sm text-gray-600 mb-6">
                    Numéro de commande: #{orderId}
                  </p>
                )}
                <p className="text-sm text-gray-600 mb-8">
                  Nous vous contacterons bientôt pour confirmer votre commande.
                </p>
                <Link href="/">
                  <button className="bg-[#5a8575] hover:bg-[#4a7265] text-white px-8 py-3">
                    Retour à l'accueil
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right column: order summary */}
        <div className="lg:col-span-1">
          <div className="border p-6 sticky top-24">
            <h2 className="text-xl mb-4 pb-4 border-b">Commande</h2>

            <div className="max-h-[400px] overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex py-4 border-b">
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 mr-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full  text-xs font-medium text-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-normal">{item.name}</h4>
                      <span className="text-sm">
                        {item.price * item.quantity} DA
                      </span>
                    </div>
                    {item.color && (
                      <div className="mt-1 flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.color }}
                        />
                        <p className="text-xs text-neutral-500">
                          Quantité: {item.quantity}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4">
              <div className="flex justify-between">
                <span>subtotal</span>
                <span>{subtotal} DA</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost} DA</span>
              </div>
              <div className="pt-2 mt-2 border-t flex justify-between font-medium">
                <span>Total</span>
                <span>{total} DA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
