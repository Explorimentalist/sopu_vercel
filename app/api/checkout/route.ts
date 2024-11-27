console.log('ENV check:', {
  secretKey: process.env.STRIPE_SECRET_KEY?.slice(0, 8) + '...',
  pubKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.slice(0, 8) + '...'
})
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  try {
    // Get headers synchronously in Next.js 13+
    const headersList = await headers()
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    
    const { items, currency = 'gbp' } = await req.json()

    if (!items?.length) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    // Create Stripe line items with proper structure
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
          description: item.description || `${item.language || ''}, ${item.dimensions || ''}`.trim(),
          images: item.image && new URL(item.image) ? [item.image] : undefined,
          metadata: {
            gender: item.gender || '',
            size: item.size || '',
            language: item.language || '',
            dimensions: item.dimensions || ''
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      locale: 'es',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      customer_creation: 'always',
      billing_address_collection: 'required',
      invoice_creation: {
        enabled: true,
      },
      payment_intent_data: {
        description: 'Sópu order',
      },
      metadata: {
        items_count: items.length.toString(),
        item1_gender: items[0]?.gender || '',
        item1_size: items[0]?.size || '',
        item1_language: items[0]?.language || '',
        item1_dimensions: items[0]?.dimensions || ''
      },
      shipping_address_collection: {
        allowed_countries: ['GB', 'ES'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500,
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
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: error.message || 'Checkout creation failed' },
      { status: error.statusCode || 500 }
    )
  }
} 