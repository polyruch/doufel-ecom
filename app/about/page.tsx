import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, Award, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-6">
          À Propos de DFL-Collection
        </h1>
        <p className="text-lg md:text-xl text-pink-600 max-w-3xl mx-auto">
          Où le design moderne rencontre la qualité exceptionnelle. Nous créons
          des pièces intemporelles qui célèbrent le style et la confiance de la
          femme contemporaine.
        </p>
      </section>

      {/* Brand Story Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-pink-800">Notre Histoire</h2>
          <p className="text-gray-600 leading-relaxed">
            DFL-Collection est née d'une passion pour créer de beaux vêtements
            féminins de haute qualité qui allient harmonieusement l'esthétique
            moderne avec l'élégance intemporelle. Fondée avec la vision
            d'autonomiser les femmes par la mode, nous croyons que chaque pièce
            doit vous faire sentir confiante et belle.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Notre parcours a commencé avec une idée simple : créer des vêtements
            qui ne suivent pas seulement les tendances, mais qui les
            définissent. Nous sélectionnons soigneusement chaque design, en nous
            assurant que chaque vêtement reflète notre engagement envers la
            qualité, le style et la durabilité.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
          <Image
            src="/dfl-logo.png"
            alt="Histoire DFL Collection"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-pink-800 text-center mb-12">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-pink-800">
                Qualité Avant Tout
              </h3>
              <p className="text-gray-600">
                Nous nous approvisionnons uniquement avec les meilleurs
                matériaux et employons des artisans qualifiés pour garantir que
                chaque pièce répond à nos standards exigeants.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-pink-800">
                Design Moderne
              </h3>
              <p className="text-gray-600">
                Nos designs mélangent les tendances contemporaines avec
                l'élégance intemporelle, créant des pièces à la fois actuelles
                et durables.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-pink-800">
                Durabilité
              </h3>
              <p className="text-gray-600">
                Nous nous engageons à des pratiques éthiques et à une mode
                durable, prenant soin à la fois de nos clientes et de notre
                planète.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-pink-800">
                Communauté
              </h3>
              <p className="text-gray-600">
                Nous célébrons la communauté diverse de femmes qui portent nos
                pièces, favorisant la connexion et l'autonomisation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Materials Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="relative h-64 md:h-full">
          <Image
            src="/tissue.jpg"
            alt="Matériaux Premium"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-pink-800">
            Matériaux Premium
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Chez DFL-Collection, nous croyons que des vêtements exceptionnels
            commencent par des matériaux exceptionnels. Nous nous associons avec
            des fournisseurs de confiance dans le monde entier pour nous
            approvisionner avec les meilleurs tissus, des soies luxueuses et
            cotons biologiques aux textiles durables innovants.
          </p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Coton biologique premium pour le confort et la respirabilité
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Mélanges de soie luxueux pour un drapé et un toucher élégants
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Fibres de bambou durables pour une mode éco-responsable
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Tissus techniques haute performance pour les vêtements de sport
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-pink-800 mb-6">
          Découvrez DFL-Collection
        </h2>
        <p className="text-lg text-pink-600 mb-8 max-w-2xl mx-auto">
          Découvrez notre dernière collection et trouvez des pièces qui parlent
          à votre style unique. Rejoignez des milliers de femmes qui ont fait de
          DFL-Collection une partie de leur garde-robe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-pink-700 hover:bg-pink-600 text-white">
            <Link href="/products">Voir la Collection</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-pink-700 text-pink-500 hover:bg-pink-50 bg-transparent"
          >
            <Link href="#contact">Nous Contacter</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
