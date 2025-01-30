import type { Metadata } from "next";
import { Inknut_Antiqua, Noto_Sans } from 'next/font/google'
import "./globals.css";
import { CartProvider } from "@/context/cart-context"
import { CurrencyProvider } from "@/context/currency-context"
import { ScrollProvider } from "@/context/scroll-context"
import { CookieConsent } from "@/components/cookieconsent"
import { TransitionLayout } from "@/components/transition-layout"
import Script from 'next/script'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script 
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9SYNGE7FKX" 
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Initialize with consent mode
            gtag('consent', 'default', {
              'analytics_storage': 'denied'
            });
            
            gtag('js', new Date());
            gtag('config', 'G-9SYNGE7FKX', {
              page_location: window.location.href,
              page_path: window.location.pathname,
              cookie_domain: '.xn--spu-gna.com'
            });
          `}
        </Script>
      </head>
      <body 
        className={`${inknutAntiqua.variable} ${notoSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <CurrencyProvider>
          <CartProvider>
            <ScrollProvider>
              <TransitionLayout>
                {children}
              </TransitionLayout>
              <CookieConsent />
            </ScrollProvider>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
