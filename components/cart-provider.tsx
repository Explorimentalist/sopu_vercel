'use client'

import { CartProvider as USCProvider } from 'use-shopping-cart'
import { useEffect, useState } from 'react'

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  if (!origin) return null // Don't render until we have the origin

  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl={`${origin}/success`}
      cancelUrl={`${origin}/cart`}
      currency="USD"
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  )
}
