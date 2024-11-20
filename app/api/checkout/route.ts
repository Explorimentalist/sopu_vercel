console.log('ENV check:', {
  secretKey: process.env.STRIPE_SECRET_KEY?.slice(0, 8) + '...',
  pubKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.slice(0, 8) + '...'
})
import { NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import type { ShippingAddress } from '@/types/shipping'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const origin = req.headers.get('origin') || 'http://localhost:3001'
    
    if (!body.items?.length) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    const { items, currency } = body

    if (!currency) {
      return NextResponse.json(
        { error: 'Currency is required' },
        { status: 400 }
      )
    }

    const lineItems = items.map((item: any) => {
      if (!item.name || !item.price || !item.quantity) {
        throw new Error(`Invalid item data: ${JSON.stringify(item)}`)
      }

      const imageUrl = item.image?.startsWith('/')
        ? `${origin}${item.image}`
        : item.image

      return {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: item.name,
            images: imageUrl ? [imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }
    })

    const session = await createCheckoutSession({
      lineItems,
      currency: currency.toLowerCase(),
      successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/checkout/cancel`,
    })

    return NextResponse.json({ id: session.id })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Checkout creation failed' },
      { status: error.statusCode || 400 }
    )
  }
} 