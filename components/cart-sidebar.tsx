"use client"

import * as React from "react"
import { Minus, Plus, ShoppingCart, X } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { CartItem } from "@/context/cart-context"
import { useCurrency } from "@/context/currency-context"
import { useState } from 'react'
import getStripe from '@/lib/getStripe'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartImage } from './cart-image'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebarComponent({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem } = useCart()
  const { formatPrice, currency, exchangeRate } = useCurrency()
  const [isProcessing, setIsProcessing] = useState(false)

  const getVariantDisplay = (item: CartItem) => {
    console.log('Cart Item:', item)
    const variants = []
    
    if (item.name.includes("Camiseta")) {
      if (item.gender) variants.push(
        item.gender === 'male' ? 'Hombre' :
        item.gender === 'female' ? 'Mujer' :
        item.gender === 'kids' ? 'Niños' : item.gender
      )
      if (item.size) variants.push(item.size.toUpperCase())
    } else if (item.name.includes("Calendario")) {
      if (item.language) variants.push(
        item.language.charAt(0).toUpperCase() + item.language.slice(1)
      )
      if (item.dimensions) variants.push(item.dimensions.toUpperCase())
    }
    
    return variants.join(', ')
  }

  // Calculate subtotal in base currency (GBP)
  const baseSubtotal = items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  )

  // Use formatPrice for all price displays
  const displayPrice = (amount: number) => {
    return formatPrice(amount)
  }

  const handleCheckout = async () => {
    try {
      setIsProcessing(true)

      // Get the current window origin
      const origin = window.location.origin

      // Format line items with proper structure
      const lineItems = items.map(item => ({
        name: item.name,
        price: Number((currency === 'EUR' ? item.price * exchangeRate : item.price).toFixed(2)),
        quantity: item.quantity,
        // Ensure image URL is absolute
        image: item.image?.startsWith('http') 
          ? item.image 
          : `${origin}${item.image}`,
        description: getVariantDisplay(item),
        metadata: {
          gender: item.gender || '',
          size: item.size || '',
          language: item.language || '',
          dimensions: item.dimensions || '',
        }
      }))

      console.log('Sending to checkout:', { items: lineItems, currency })

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: lineItems,
          currency: currency.toLowerCase(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      if (!data.id) {
        throw new Error('No session ID returned from checkout')
      }

      const stripe = await getStripe()
      if (!stripe) throw new Error('Failed to load Stripe')

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id,
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert(error.message || 'Payment initialization failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Calculate total quantity
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalQuantity > 0 && (
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
              {totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col border-l px-0 sm:max-w-md">
        <SheetHeader className="space-y-0 px-6 pt-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-normal">Carrito de la compra</SheetTitle>
          </div>
        </SheetHeader>
        <div className="flex-1 border-t px-6 pt-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <p className="text-lg text-gray-500">El carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={`${item.id}-${item.timestamp}`} className="flex gap-4">
                  <div className="relative h-24 w-24 flex-none">
                    <CartImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-base font-normal">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {getVariantDisplay(item)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItem(item.id)
                            } else {
                              updateQuantity(item.id, -1)
                            }
                          }}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <p className="font-medium">
                        {displayPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-t px-6 py-6">
          {items.length > 0 && (
            <div className="mb-4 flex items-center justify-between">
              <span className="text-base font-medium">Subtotal</span>
              <span className="text-base font-medium">
                {displayPrice(baseSubtotal)}
              </span>
            </div>
          )}
          <p className="mb-4 text-center text-sm text-gray-500">
            Envio & tasas son calculadas en la caja
          </p>
          <Button 
            className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={items.length === 0 || isProcessing}
            onClick={handleCheckout}
          >
            {isProcessing ? 'Processing...' : 'CHECKOUT'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}