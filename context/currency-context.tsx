'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CurrencyContextType {
  currency: 'EUR' | 'GBP'
  exchangeRate: number
  formatPrice: (price: number) => string
  setCurrency: (currency: 'EUR' | 'GBP') => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const CACHE_DURATION = 1000 * 60 * 60 // 1 hour
const DEFAULT_RATE = 1.17 // Fallback EUR/GBP rate

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<'EUR' | 'GBP'>('GBP')
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_RATE)

  useEffect(() => {
    async function detectLocation() {
      try {
        // Get URL parameters
        const params = new URLSearchParams(window.location.search)
        const countryParam = params.get('country')

        // Construct URL with country parameter if it exists
        const url = countryParam 
          ? `/api/location?country=${countryParam}`
          : '/api/location'

        const response = await fetch(url)
        const data = await response.json()
        
        // Set currency based on location data
        setCurrency(data.currency === 'EUR' ? 'EUR' : 'GBP')
      } catch (error) {
        console.error('Failed to detect location:', error)
        setCurrency('GBP') // Fallback to GBP
      }
    }

    detectLocation()
  }, [])

  const formatPrice = (price: number) => {
    const amount = currency === 'EUR' ? price * exchangeRate : price
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  const value = {
    currency,
    exchangeRate,
    formatPrice,
    setCurrency,
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
} 