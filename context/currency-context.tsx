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

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<'EUR' | 'GBP'>('GBP')
  const [exchangeRate, setExchangeRate] = useState(1)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem('exchangeRate')
        if (cached) {
          const { rate, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setExchangeRate(rate)
            return
          }
        }

        // Fetch new rate if cache is invalid
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/GBP`
        )
        const data = await response.json()
        
        if (data.result === 'success') {
          const rate = data.conversion_rates.EUR
          setExchangeRate(rate)
          // Cache the new rate
          localStorage.setItem('exchangeRate', JSON.stringify({
            rate,
            timestamp: Date.now()
          }))
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error)
      }
    }

    fetchExchangeRate()
  }, [])

  const formatPrice = (price: number) => {
    const finalPrice = currency === 'EUR' ? price * exchangeRate : price
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
    }).format(finalPrice)
  }

  return (
    <CurrencyContext.Provider value={{ currency, exchangeRate, formatPrice, setCurrency }}>
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