"use client"

import * as React from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, X } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { CartItem } from "@/context/cart-context"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function CartSidebarComponent() {
  const { items, updateQuantity, removeItem } = useCart()

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

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {items.length}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col border-l px-0 sm:max-w-md">
        <SheetHeader className="space-y-0 px-6 pt-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-normal">Shopping Cart</SheetTitle>
          </div>
        </SheetHeader>
        <div className="flex-1 border-t px-6 pt-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <p className="text-lg text-gray-500">Your cart is currently empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={`${item.id}-${item.timestamp}`} className="flex gap-4">
                  <div className="relative h-24 w-24 flex-none">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 96px, 96px"
                      className="rounded-md object-cover"
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
                        £{(item.price * item.quantity).toFixed(2)}
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
                £{subtotal.toFixed(2)}
              </span>
            </div>
          )}
          <p className="mb-4 text-center text-sm text-gray-500">
            Shipping & taxes calculated at checkout
          </p>
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            CHECKOUT
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}