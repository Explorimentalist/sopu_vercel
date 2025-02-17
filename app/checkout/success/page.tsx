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
        dimensions?: string;
        language?: string;
        gender?: string;
        size?: string;
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
        setLoading(true)
        // Ensure we're using the correct API path
        const apiUrl = `${window.location.origin}/api/order-details`
        
        console.log('Fetching from:', apiUrl) // Debug log
        
        const response = await fetch(`${apiUrl}?session_id=${sessionId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json'
          },
          next: { revalidate: 0 } // Disable cache
        })

        // Log the response details for debugging
        console.log('Response status:', response.status)
        console.log('Response headers:', Object.fromEntries(response.headers))

        // Check if response is redirect
        if (response.redirected) {
          throw new Error('Request was redirected - check your API route configuration')
        }

        let data
        try {
          const textData = await response.text() // Get raw response
          console.log('Raw response:', textData) // Debug log
          
          try {
            data = JSON.parse(textData)
          } catch (e) {
            console.error('JSON parse error:', e)
            throw new Error('Invalid JSON response from server')
          }
        } catch (e) {
          console.error('Response parsing error:', e)
          throw new Error('Failed to parse server response')
        }

        if (!response.ok || data.error) {
          throw new Error(data.error || `Server error: ${response.status}`)
        }

        if (!data.orderDetails) {
          throw new Error('Invalid order details received')
        }

        if (isMounted) {
          setOrderDetails(data)
          setError(null)
          setLoading(false)
        }
      } catch (err: any) {
        console.error('Error fetching order details:', err)
        if (isMounted) {
          setError(err.message || 'Unable to load order details')
          setLoading(false)
        }
      }
    }

    fetchOrderDetails()

    return () => {
      isMounted = false
    }
  }, [searchParams])

  const getVariantDisplay = (item: OrderDetails['orderDetails']['items'][0]) => {
    const variants = []
    
    if (item.metadata) {
      // Handle Calendario variants
      if (item.name.toLowerCase().includes('calendario')) {
        const { dimensions, language } = item.metadata
        if (dimensions) variants.push(dimensions)
        if (language) {
          variants.push(language.charAt(0).toUpperCase() + language.slice(1))
        }
      }
      // Handle clothing variants
      else {
        const { gender, size } = item.metadata
        if (gender) {
          const genderMap: Record<string, string> = {
            male: 'Hombre',
            female: 'Mujer',
            kids: 'Niños'
          }
          variants.push(genderMap[gender] || gender)
        }
        if (size) variants.push(size.toUpperCase())
      }
    }
    
    return variants.length > 0 ? variants.join(', ') : null
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

            {/* Order Items Section: Displays a list of all purchased items */}
            <div className="divide-y"> {/* Uses divide-y for visual separation between items */}
              {/* Iterate through each item in the order */}
              {orderDetails.orderDetails.items.map((item, index) => (
                /* Individual Item Container */
                <div key={index} className="p-6">
                  {/* Flex container for item details and price */}
                  <div className="flex items-start gap-4">
                    {/* Left side: Item details container */}
                    <div className="flex-grow">
                      {/* Item name/title */}
                      <h3 className="font-medium">{item.name}</h3>

                      {/* Variant Information Display (e.g., size, color, language) 
                          Only renders if getVariantDisplay returns a value */}
                      {getVariantDisplay(item) && (
                        <p className="text-sm text-zinc-500 mt-1">
                          {getVariantDisplay(item)} {/* Formats variant info like "Large, Red" */}
                        </p>
                      )}

                      {/* Item Description - Optional
                          Only displays if item has a description */}
                      {/* {item.description && (
                        <p className="text-sm text-zinc-600 mt-1">
                          {item.description}
                        </p>
                      )} */}

                      {/* Quantity Display 
                          Shows how many of this item were purchased */}
                      <div className="mt-1 text-sm text-zinc-600">
                        Cantidad: {item.quantity}
                      </div>
                    </div>

                    {/* Right side: Price Display
                        Uses formatPrice to display in correct currency
                        Divides by 100 because Stripe stores amounts in cents */}
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