'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

let stripePromise: Promise<Stripe | null> | null = null

const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      throw new Error('Stripe publishable key is missing')
    }
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

export function StripeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Elements stripe={getStripe()}>
      {children}
    </Elements>
  )
}