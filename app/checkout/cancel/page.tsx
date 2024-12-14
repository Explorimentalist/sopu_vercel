'use client'

import Link from 'next/link'
import { CartSidebarComponent } from '@/components/cart-sidebar'

export default function CheckoutCancelPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center -mt-24">
          <h1 className="text-4xl font-bold text-zinc-900 mb-6">
            Pedido Cancelado
          </h1>
          <p className="text-lg text-zinc-600 mb-8">
            Tu proceso de pago ha sido cancelado. Los artículos de tu carrito siguen guardados si deseas completar tu compra.
          </p>
          <div className="space-x-4">
            <Link 
              href="/"
              className="inline-block bg-zinc-200 text-zinc-800 px-8 py-3 rounded-md hover:bg-zinc-300 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
      <CartSidebarComponent />
    </>
  )
} 