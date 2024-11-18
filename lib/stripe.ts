import Stripe from 'stripe'

// Add debug logging at initialization
console.log('Initializing Stripe with key:', {
  exists: !!process.env.STRIPE_SECRET_KEY,
  prefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7)
})

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing')
}

// Initialize Stripe with the secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
}) 