'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '@/context/cart-context'
import NavWrapper from '@/components/nav-wrapper'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear cart only once when component mounts
    clearCart()
  }, []) // Remove clearCart from dependencies to prevent re-runs

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavWrapper />
      </div>
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-6">
            Thank you for your purchase!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your order has been successfully processed. You will receive a confirmation email shortly.
          </p>
          <Link 
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  )
} 