console.log('ENV check:', {
  secretKey: process.env.STRIPE_SECRET_KEY?.slice(0, 8) + '...',
  pubKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.slice(0, 8) + '...'
})
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getShippingRate } from '@/lib/shipping'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, currency } = body

    // Transform items to Stripe's expected format
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
          description: item.description,
          images: [item.image],
          metadata: item.product_data.metadata, // Metadata goes here in product_data
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['GB', 'ES'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 550,
              currency: currency,
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
    })

    return NextResponse.json({ id: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 
