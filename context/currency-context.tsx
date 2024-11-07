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

  // Detect user's location and set initial currency
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://api.ipapi.com/check?access_key=YOUR_IPAPI_KEY')
        const data = await response.json()
        
        // Set currency based on country
        if (data.continent_code === 'EU' && data.country_code !== 'GB') {
          setCurrency('EUR')
        } else {
          setCurrency('GBP')
        }
      } catch (error) {
        console.error('Error detecting location:', error)
        // Default to GBP if location detection fails
        setCurrency('GBP')
      }
    }

    detectLocation()
  }, [])

  // Fetch and cache exchange rates
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // Check localStorage for cached rate
        const cached = localStorage.getItem('exchangeRateCache')
        if (cached) {
          const { rate, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setExchangeRate(rate)
            return
          }
        }

        // Fetch new rate if cache is invalid or missing
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/GBP`
        )
        const data = await response.json()

        if (data.result === 'success') {
          const newRate = data.conversion_rates.EUR
          setExchangeRate(newRate)
          
          // Cache the new rate
          localStorage.setItem('exchangeRateCache', JSON.stringify({
            rate: newRate,
            timestamp: Date.now()
          }))
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error)
        // Use fallback rate if API call fails
        setExchangeRate(1.17) // Fallback EUR/GBP rate
      }
    }

    fetchExchangeRate()
  }, []) // Only run on mount

  const formatPrice = (price: number) => {
    if (!price) return '£0.00'
    
    const finalPrice = currency === 'EUR' ? price * exchangeRate : price
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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