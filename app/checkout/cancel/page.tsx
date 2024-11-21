'use client'

import Link from 'next/link'
import NavWrapper from '@/components/nav-wrapper'

export default function CheckoutCancelPage() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavWrapper />
      </div>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center -mt-24">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Pedido Cancelado
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tu proceso de pago ha sido cancelado. Los artículos de tu carrito siguen guardados si deseas completar tu compra.
          </p>
          <div className="space-x-4">
            <Link 
              href="/cart"
              className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Volver al Carrito
            </Link>
            <Link 
              href="/"
              className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    </>
  )
} 