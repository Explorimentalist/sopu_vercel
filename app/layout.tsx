import type { Metadata } from "next";
import { Inknut_Antiqua, Noto_Sans } from 'next/font/google'
import "./globals.css";
import { CartProvider } from "@/context/cart-context"
import { CurrencyProvider } from "@/context/currency-context"

const inknutAntiqua = Inknut_Antiqua({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inknut',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: "Sópu - La tienda Ndowéyé",
  description: "La tienda Ndowéyé para los Ndowéyé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inknutAntiqua.variable} ${notoSans.variable} antialiased`}>
        <CurrencyProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
