'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

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
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'sopu-cart-items'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem(CART_STORAGE_KEY)
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems))
      } catch (error) {
        console.error('Error loading cart items:', error)
      }
    }
  }, [])

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

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

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      updateQuantity, 
      removeItem,
      clearCart
    }}>
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