import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      )
    }

    // Retrieve session with expanded line items and product metadata
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product']
    })

    // Map the line items to include product metadata
    const items = session.line_items?.data.map(item => ({
      description: item.description,
      name: item.description,
      quantity: item.quantity,
      amount_total: item.amount_total,
      metadata: item.price?.product as Stripe.Product && {
        ...((item.price?.product as Stripe.Product).metadata || {})
      }
    })) || []

    const orderDetails = {
      customerDetails: {
        email: session.customer_details?.email,
        name: session.customer_details?.name,
        phone: session.customer_details?.phone,
        address: session.customer_details?.address
      },
      orderDetails: {
        id: session.id,
        amount: session.amount_total,
        currency: session.currency,
        items: items,
        shipping: {
          carrier: 'Standard Shipping', // Or get from session if available
          amount: session.shipping_cost || 0
        }
      }
    }

    return NextResponse.json(orderDetails)
  } catch (error) {
    console.error('Error retrieving order details:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve order details' },
      { status: 500 }
    )
  }
} 