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
const EXCHANGE_API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY
const DEFAULT_RATE = 1.17 // Fallback EUR/GBP rate

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<'EUR' | 'GBP'>('GBP')
  const [exchangeRate, setExchangeRate] = useState(DEFAULT_RATE)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // Try to get cached rate first
        const cached = localStorage.getItem('exchangeRate')
        if (cached) {
          const { rate, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setExchangeRate(rate)
            return
          }
        }

        // Check if we have an API key
        if (!EXCHANGE_API_KEY) {
          console.warn('Exchange rate API key not found')
          return
        }

        // Fetch new rate
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/pair/GBP/EUR`
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.result === 'success' && data.conversion_rate) {
          const rate = data.conversion_rate
          setExchangeRate(rate)
          
          // Cache the new rate
          localStorage.setItem('exchangeRate', JSON.stringify({
            rate,
            timestamp: Date.now()
          }))
        } else {
          throw new Error('Invalid API response format')
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error)
        
        // Try to get the last cached rate even if expired
        try {
          const cached = localStorage.getItem('exchangeRate')
          if (cached) {
            const { rate } = JSON.parse(cached)
            setExchangeRate(rate)
            return
          }
        } catch (e) {
          // If everything fails, use default rate
          setExchangeRate(DEFAULT_RATE)
        }
      }
    }

    fetchExchangeRate()
  }, []) // Only fetch on component mount

  const formatPrice = (price: number) => {
    // Ensure price is a number
    const numericPrice = Number(price)
    if (isNaN(numericPrice)) {
      console.warn('Invalid price provided to formatPrice:', price)
      return '---'
    }

    const finalPrice = currency === 'EUR' ? numericPrice * exchangeRate : numericPrice
    
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(finalPrice)
  }

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      exchangeRate,
      formatPrice, 
      setCurrency 
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
} 