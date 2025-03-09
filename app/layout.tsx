import type { Metadata } from "next";
import { Geist, Geist_Mono, Marcellus } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
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
        className={`${marcellus.className} font-serif  antialiased  flex flex-col min-h-screen border-2 `}
      >
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
