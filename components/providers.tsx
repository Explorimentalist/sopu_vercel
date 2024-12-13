'use client'

import { CartProvider as USCProvider } from 'use-shopping-cart'
import { StripeProvider } from '@/components/stripe-provider'
import { ErrorBoundary } from '@/components/error-boundary'
import { CurrencyProvider } from '@/context/currency-context'
import { CartProvider } from '@/context/cart-context'

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <StripeProvider>
          <USCProvider
            mode="payment"
            cartMode="client-only"
            stripe={stripeKey}
            successUrl={`${window?.location?.origin || ''}/success`}
            cancelUrl={`${window?.location?.origin || ''}/cart`}
            currency="USD"
            billingAddressCollection={true}
            shouldPersist={true}
            language="en-US"
          >
            <CartProvider>{children}</CartProvider>
          </USCProvider>
        </StripeProvider>
      </CurrencyProvider>
    </ErrorBoundary>
  )
}
