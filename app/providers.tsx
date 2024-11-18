'use client'

import { CurrencyProvider } from '../context/currency-context'
import { CartProvider } from '../context/cart-context'
import { StripeProvider } from '../components/stripe-provider'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CurrencyProvider>
      <CartProvider>
        <StripeProvider>
          {children}
        </StripeProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
