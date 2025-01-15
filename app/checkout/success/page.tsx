'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { useCurrency } from '@/context/currency-context'

interface OrderDetails {
  customerDetails: {
    email: string;
    name: string;
    phone: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      postal_code: string;
      country: string;
    };
  };
  orderDetails: {
    id: string;
    amount: number;
    currency: string;
    items: Array<{
      description: string;
      name: string;
      quantity: number;
      amount_total: number;
      metadata: {
        gender?: string;
        size?: string;
        language?: string;
        dimensions?: string;
      };
    }>;
    shipping: {
      carrier: string;
      amount: number;
    };
  };
}

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const { formatPrice } = useCurrency()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCleared, setIsCleared] = useState(false)

  useEffect(() => {
    if (!isCleared) {
      clearCart()
      setIsCleared(true)
    }
  }, [clearCart, isCleared])

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    let isMounted = true
    
    if (!sessionId) {
      setLoading(false)
      setError('No session ID provided')
      return
    }

    const fetchOrderDetails = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
        const response = await fetch(`${apiUrl}/api/order-details?session_id=${sessionId}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Order not found - please check your order ID')
          } else {
            throw new Error(`Server error: ${response.status}`)
          }
        }
        
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }
        
        setOrderDetails(data)
        setError(null)
      } catch (err) {
        console.error('Error details:', err)
        setError(err.message || 'Unable to load order details')
      }
    }

    fetchOrderDetails()

    return () => {
      isMounted = false
    }
  }, [searchParams])

  const getVariantDisplay = (item: OrderDetails['orderDetails']['items'][0]) => {
    const variants = []
    
    if (item.name.toLowerCase().includes('calendario')) {
      if (item.metadata.dimensions) variants.push(`Dimensiones: ${item.metadata.dimensions}`)
      if (item.metadata.language) variants.push(`Idioma: ${item.metadata.language.charAt(0).toUpperCase() + item.metadata.language.slice(1)}`)
    } else if (item.name.toLowerCase().includes('camiseta')) {
      if (item.metadata.gender) variants.push(
        `Género: ${item.metadata.gender === 'male' ? 'Hombre' :
        item.metadata.gender === 'female' ? 'Mujer' :
        item.metadata.gender === 'kids' ? 'Niños' : item.metadata.gender}`
      )
      if (item.metadata.size) variants.push(`Talla: ${item.metadata.size.toUpperCase()}`)
    }
    
    return variants.length > 0 ? variants.join(' | ') : ''
  }

  return (
    <main className="min-h-screen pt-24 px-4 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-6">
            ¡Gracias por tu compra!
          </h1>
          <p className="text-lg text-zinc-600">
            Tu pedido ha sido procesado con éxito. Recibirás un correo electrónico de confirmación en breve.
          </p>
        </div>

        {loading && !error && !orderDetails && (
          <div className="text-center py-8">
            <p>Cargando detalles del pedido...</p>
          </div>
        )}

        {error && !orderDetails && (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {orderDetails && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
            {/* Order Summary Header */}
            <div className="bg-zinc-50 px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Resumen del Pedido</h2>
              <p className="text-sm text-zinc-600">Pedido #{orderDetails.orderDetails.id}</p>
            </div>

            {/* Customer Details */}
            <div className="px-6 py-4 border-b">
              <h3 className="font-medium mb-2">Detalles de Envío</h3>
              <p>{orderDetails.customerDetails.name}</p>
              <p>{orderDetails.customerDetails.address.line1}</p>
              {orderDetails.customerDetails.address.line2 && (
                <p>{orderDetails.customerDetails.address.line2}</p>
              )}
              <p>
                {orderDetails.customerDetails.address.city}, {orderDetails.customerDetails.address.postal_code}
              </p>
              <p>{orderDetails.customerDetails.address.country}</p>
              <p>{orderDetails.customerDetails.phone}</p>
              <p>{orderDetails.customerDetails.email}</p>
            </div>

            {/* Order Items */}
            <div className="divide-y">
              {orderDetails.orderDetails.items.map((item, index) => (
                <div key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      {/* Add variant display */}
                      {getVariantDisplay(item) && (
                        <p className="text-sm text-zinc-600 mt-1">
                          {getVariantDisplay(item)}
                        </p>
                      )}
                      <div className="mt-1 text-sm text-zinc-600">
                        Cantidad: {item.quantity}
                      </div>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.amount_total / 100)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="bg-zinc-50 px-6 py-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{formatPrice((orderDetails.orderDetails.amount - orderDetails.orderDetails.shipping.amount) / 100)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Envío ({orderDetails.orderDetails.shipping.carrier})</p>
                  <p>{formatPrice(orderDetails.orderDetails.shipping.amount / 100)}</p>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <p>Total</p>
                  <p>{formatPrice(orderDetails.orderDetails.amount / 100)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <Link 
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-zinc-800 transition-colors"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    </main>
  )
} 