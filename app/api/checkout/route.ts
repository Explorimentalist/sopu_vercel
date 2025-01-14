console.log('ENV check:', {
  secretKey: process.env.STRIPE_SECRET_KEY?.slice(0, 8) + '...',
  pubKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.slice(0, 8) + '...'
})
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getShippingRate } from '@/lib/shipping'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  try {
    const origin = process.env.NODE_ENV === 'production' 
      ? 'https://www.xn--spu-gna.com' 
      : 'http://localhost:3000'
    
    interface LineItem {
      name: string;
      price: number;
      quantity: number;
      description?: string;
      image?: string;
      language?: string;
      dimensions?: string;
      gender?: string;
      size?: string;
    }

    interface LineItemInput extends LineItem {
      // existing LineItem interface properties...
    }

    const { items, currency = 'gbp' } = await req.json() as { 
      items: LineItem[];
      currency: string;
    }

    if (!items?.length) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    // Create Stripe line items with proper structure
    const lineItems = items.map((item: LineItemInput) => ({
      price_data: {
        currency: currency.toLowerCase(),
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
      locale: currency.toLowerCase() === 'eur' ? 'es' : 'en',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      customer_creation: 'always',
      billing_address_collection: 'required',
      invoice_creation: { enabled: true },
      payment_intent_data: {
        description: 'Sópu order',
        metadata: {
          order_source: 'web_checkout'
        }
      },
      shipping_address_collection: {
        allowed_countries: ['GB', 'ES'],
      },
      shipping_options: [
        getShippingRate(
          currency.toLowerCase() === 'eur' ? 'ES' : 'GB',
          currency.toLowerCase(),
          items
        )
      ],
      metadata: {
        order_id: `order_${Date.now()}`,
        items_count: items.length.toString()
      },
      currency: currency.toLowerCase(),
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