'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '@/context/cart-context'
import NavWrapper from '@/components/nav-wrapper'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavWrapper />
      </div>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center -mt-24">
          <h1 className="text-4xl font-bold text-green-600 mb-6">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tu pedido ha sido procesado con éxito. Recibirás un correo electrónico de confirmación en breve.
          </p>
          <Link 
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    </>
  )
} 