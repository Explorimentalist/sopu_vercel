import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

interface LineItemMetadata {
  gender?: string;
  size?: string;
  language?: string;
  dimensions?: string;
  original_name?: string;
}

// Define the shape of our line item
type LineItem = Stripe.Response<Stripe.ApiList<Stripe.LineItem>>['data'][0] & {
  metadata?: LineItemMetadata;
  price?: {
    product?: Stripe.Product & {
      name?: string;
      metadata?: LineItemMetadata;
    };
  };
}

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

    // Retrieve session with expanded line items to access product metadata
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product']
    })

    // Extract line items with their product metadata
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
          carrier: session.shipping_cost?.shipping_rate?.display_name || 'Standard Shipping',
          amount: session.shipping_cost?.amount_total || 0
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