interface WeightBracket {
  maxWeight: number
  cost: number
}

interface ShippingZone {
  domestic: {
    baseRate: number
    freeShippingThreshold: number
  }
  international: {
    eu: WeightBracket[]
  }
}

export const shippingConfig: ShippingZone = {
  domestic: {
    baseRate: 5.50,
    freeShippingThreshold: 40
  },
  international: {
    eu: [
      { maxWeight: 100, cost: 8.60 },
      { maxWeight: 399, cost: 10.85 },
      { maxWeight: 699, cost: 13.30 },
      { maxWeight: Infinity, cost: 23.90 }
    ]
  }
}

export const productWeights = {
  tshirt: 100,  // grams
  calendar: 225 // Updated from 250 to 225 grams
}

export function calculateShippingCost(
  items: Array<{ name: string; quantity: number }>,
  country: string,
  subtotal: number,
  exchangeRate: number = 1
): number {
  // Calculate total weight
  const totalWeight = items.reduce((weight, item) => {
    const itemWeight = item.name.toLowerCase().includes('camiseta') 
      ? productWeights.tshirt 
      : productWeights.calendar
    return weight + (itemWeight * item.quantity)
  }, 0)

  console.log('Shipping calculation details:', {
    totalWeight,
    country,
    subtotal,
    exchangeRate
  })

  // UK Domestic shipping (always in GBP)
  if (country === 'GB') {
    return subtotal >= shippingConfig.domestic.freeShippingThreshold 
      ? 0 
      : shippingConfig.domestic.baseRate
  }

  // EU shipping (Spain)
  if (country === 'ES') {
    const bracket = shippingConfig.international.eu.find(
      b => totalWeight <= b.maxWeight
    ) ?? shippingConfig.international.eu[shippingConfig.international.eu.length - 1]
    
    // For Spain, convert the shipping cost to EUR
    return bracket.cost * exchangeRate
  }

  throw new Error(`Unsupported shipping country: ${country}`)
}

export function getShippingRate(country: string, currency: string, items: Array<{ name: string; quantity: number }>) {
  // For UK orders, check free shipping threshold
  if (country === 'GB') {
    // Calculate total in GBP for threshold check
    const subtotal = items.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    )

    // If subtotal is over threshold, shipping is free
    if (subtotal >= shippingConfig.domestic.freeShippingThreshold) {
      return {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0, // Free shipping
            currency: 'gbp',
          },
          display_name: 'Free Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      }
    }

    // Otherwise, use standard UK shipping rate
    return {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 550, // 5.50 GBP
          currency: 'gbp',
        },
        display_name: 'Standard Shipping',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 5 },
          maximum: { unit: 'business_day', value: 7 },
        },
      },
    }
  }

  // For Spanish orders, keep the existing weight-based logic
  if (country === 'ES') {
    // Calculate total weight
    const totalWeight = items.reduce((weight, item) => {
      const itemWeight = item.name.toLowerCase().includes('camiseta') 
        ? productWeights.tshirt 
        : productWeights.calendar
      return weight + (itemWeight * item.quantity)
    }, 0)

    // Find the appropriate shipping bracket
    const bracket = shippingConfig.international.eu.find(
      b => totalWeight <= b.maxWeight
    ) ?? shippingConfig.international.eu[shippingConfig.international.eu.length - 1]

    return {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: Math.round(bracket.cost * 100), // Convert to cents
          currency: 'eur',
        },
        display_name: 'Standard Shipping',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 5 },
          maximum: { unit: 'business_day', value: 7 },
        },
      },
    }
  }

  throw new Error(`Unsupported shipping country: ${country}`)
} 