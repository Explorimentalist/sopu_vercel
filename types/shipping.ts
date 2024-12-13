export interface ShippingRate {
  id: string
  display_name: string
  amount: number
  currency: string
  delivery_estimate: {
    minimum: {
      unit: 'business_day'
      value: number
    }
    maximum: {
      unit: 'business_day'
      value: number
    }
  }
}

export interface ShippingAddress {
  line1: string
  line2?: string
  city: string
  state?: string
  postal_code: string
  country: string
}

export interface CustomerDetails {
  name: string
  email: string
  phone?: string
  address: ShippingAddress
} 