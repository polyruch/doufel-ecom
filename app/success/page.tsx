"use client";
import { Check, Package, Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId") || "-";
  const total = params.get("total") || "-";
  const shipping = params.get("shipping") || "-";
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-light text-gray-800 mb-2">
            Commande Bien Reçue
          </h2>

          <p className="text-gray-600 font-light leading-relaxed">
            Nous avons bien reçu votre commande. Nous vous appellerons sous peu
            pour la confirmer.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6 border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">
                Commande reçue #{orderId}
              </h3>
              <span className="text-sm text-gray-500">{date}</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Montant total</span>
                <span className="font-medium text-gray-800">{total} DA</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Mode de livraison</span>
                <span className="text-gray-800">{shipping}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Délai estimé</span>
                <span className="text-gray-800">3-5 jours ouvrables</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mb-2">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 text-center">
                Commande
                <br />
                reçue
              </span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mb-2">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-600 text-center">
                Confirmation
                <br />
                téléphonique
              </span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                <Package className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600 text-center">
                Préparation
              </span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-2"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                <Truck className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-xs text-gray-600 text-center">
                Livraison
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full bg-slate-600 hover:bg-slate-700 text-white font-light py-3 rounded-sm"
            onClick={() => router.push("/")}
          >
            Continuer mes achats
          </Button>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 font-light mb-2">
            <strong className="text-gray-700">Important :</strong> Gardez votre
            téléphone à portée de main
          </p>
          <p className="text-sm text-gray-500 font-light">
            Une question ? Contactez-nous à{" "}
            <a
              href="mailto:contact@doufel.com"
              className="text-slate-600 underline"
            >
              contact@doufel.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
