'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import NavWrapper from '@/components/nav-wrapper'
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
      quantity: number;
      amount_total: number;
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
        const response = await fetch(`/api/order-details?session_id=${sessionId}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })
        
        if (!isMounted) return
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch order details')
        }
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        setOrderDetails(data)
        setError(null)
      } catch (err) {
        if (!isMounted) return
        console.error('Error fetching order details:', err)
        setError('Unable to load order details')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchOrderDetails()

    return () => {
      isMounted = false
    }
  }, [searchParams])

  return (
    <>
      <NavWrapper />
      <main className="min-h-screen pt-24 px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-600 mb-6">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-lg text-gray-600">
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
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Order Summary Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">Resumen del Pedido</h2>
                <p className="text-sm text-gray-600">Pedido #{orderDetails.orderDetails.id}</p>
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
              <div className="px-6 py-4">
                <h3 className="font-medium mb-4">Artículos</h3>
                <div className="space-y-4">
                  {orderDetails.orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.amount_total / 100)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Totals */}
              <div className="bg-gray-50 px-6 py-4">
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
              className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </main>
    </>
  )
} 