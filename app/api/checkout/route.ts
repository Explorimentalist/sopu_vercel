console.log('ENV check:', {
  secretKey: process.env.STRIPE_SECRET_KEY?.slice(0, 8) + '...',
  pubKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.slice(0, 8) + '...'
})
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const origin = req.headers.get('origin') || 'http://localhost:3001'
    
    // Debug logging
    console.log('Request body:', body)
    
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

    // Create line items with validation and absolute URLs
    const lineItems = items.map((item: any) => {
      if (!item.name || !item.price || !item.quantity) {
        throw new Error(`Invalid item data: ${JSON.stringify(item)}`)
      }

      // Convert relative image URLs to absolute URLs
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

    console.log('Creating Stripe session with:', {
      lineItems,
      successUrl: `${origin}/checkout/success`,
      cancelUrl: `${origin}/cart`
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/cart`,
    })

    console.log('Session created:', session.id)
    return NextResponse.json({ id: session.id })
  } catch (error: any) {
    console.error('Detailed checkout error:', {
      message: error.message,
      type: error.type,
      stack: error.stack
    })
    
    return NextResponse.json(
      { error: error.message || 'Checkout creation failed' },
      { status: error.statusCode || 400 }
    )
  }
} 