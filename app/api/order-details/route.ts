import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

interface LineItemMetadata {
  gender?: string;
  size?: string;
  language?: string;
  dimensions?: string;
}

// Define the shape of our line item
interface LineItem {
  description?: string;
  quantity?: number;
  amount_total?: number;
  price?: {
    product?: Stripe.Product & {
      name?: string;
      metadata?: {
        gender?: string;
        size?: string;
        language?: string;
        dimensions?: string;
      };
    };
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product', 'shipping_details', 'customer', 'shipping_cost.shipping_rate']
    })

    console.log('Session:', {
      lineItems: session.line_items?.data.map(item => ({
        price: item.price,
        product: item.price?.product,
        metadata: item.price?.product?.metadata,
        description: item.description
      }))
    })

    return NextResponse.json({
      customerDetails: {
        email: session.customer_details?.email,
        name: session.customer_details?.name,
        phone: session.customer_details?.phone,
        address: session.shipping_details?.address
      },
      orderDetails: {
        id: session.metadata?.order_id || session.id,
        amount: session.amount_total,
        currency: session.currency,
        items: session.line_items?.data.map(item => {
          const product = item.price?.product
          const metadata = product && typeof product === 'object' && 'metadata' in product
            ? product.metadata as LineItemMetadata
            : null
          
          // Debug log for each item's metadata
          console.log('Processing line item:', {
            name: product && typeof product === 'object' ? product.name : null,
            metadata,
            description: item.description
          })
          
          return {
            description: item.description,
            quantity: item.quantity,
            amount_total: item.amount_total,
            name: product && typeof product === 'object' ? product.name : undefined,
            metadata: metadata || {
              gender: '',
              size: '',
              language: '',
              dimensions: ''
            }
          }
        }),
        shipping: {
          carrier: session.shipping_cost?.shipping_rate && typeof session.shipping_cost.shipping_rate === 'object'
            ? session.shipping_cost.shipping_rate?.display_name ?? 'Standard Shipping'
            : 'Standard Shipping',
          amount: session.shipping_cost?.amount_total
        }
      }
    })
  } catch (error) {
    console.error('Error fetching order details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order details' },
      { status: 500 }
    )
  }
} 