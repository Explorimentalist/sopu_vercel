'use client'

import React, { createContext, useContext, useState } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  gender?: string
  language?: string
  dimensions?: string
  timestamp: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  updateQuantity: (id: string, change: number) => void
  removeItem: (id: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => 
          item.name === newItem.name &&
          item.size === newItem.size &&
          item.gender === newItem.gender &&
          item.language === newItem.language &&
          item.dimensions === newItem.dimensions
      )

      if (existingItem) {
        return currentItems.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, newItem]
    })
  }

  const updateQuantity = (id: string, change: number) => {
    setItems(currentItems =>
      currentItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 