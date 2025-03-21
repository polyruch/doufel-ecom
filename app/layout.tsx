import {
  Cormorant_Garamond,
  Marcellus,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

// Load Cormorant Garamond font
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: "Dfl-collection Boutique",
  description: "Modern women's clothing store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${marcellus.className} ${playfair.variable} ${cormorant.variable} font-serif  antialiased  flex flex-col min-h-screen `}
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
