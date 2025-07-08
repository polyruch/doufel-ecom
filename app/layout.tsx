import { Cormorant_Garamond, Marcellus } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
});

// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400", "500", "600"],
//   variable: "--font-playfair",
// });

// Load Cormorant Garamond font
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: "Dfl-collection Boutique",
  description:
    "Découvrez notre collection exclusive de vêtements modernes pour femmes. Des designs élégants, des matériaux de qualité et des styles uniques pour toutes les occasions.",
  metadataBase: new URL("https://dfl-collection.com"),
  keywords:
    "vêtements femmes, mode algérienne, fashion, boutique en ligne, dfl collection, tenues modernes",
  authors: [{ name: "Dfl Collection" }],
  creator: "Dfl Collection",
  publisher: "Dfl Collection",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Dfl-collection Boutique",
    description:
      "Découvrez notre collection exclusive de vêtements modernes pour femmes. Des designs élégants, des matériaux de qualité et des styles uniques pour toutes les occasions.",
    url: "https://dfl-collection.com",
    siteName: "Dfl Collection",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dfl Collection - Mode Moderne pour Femmes",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${marcellus.className} {playfair.variable} ${cormorant.variable} font-serif  antialiased  flex flex-col min-h-screen `}
      >
        <CartProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
