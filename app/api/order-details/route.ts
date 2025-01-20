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
  id?: string;
  description?: string;
  quantity?: number;
  amount_total?: number;
  metadata?: {
    gender?: string;
    size?: string;
    language?: string;
    dimensions?: string;
  };
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
    // Expand all necessary fields including line_items and prices
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: [
        'line_items.data.price.product',
        'shipping_details',
        'customer',
        'shipping_cost.shipping_rate'
      ]
    })

    // Debug logs
    console.log('Session Data:', {
      lineItems: session.line_items?.data.map(item => ({
        id: item.id,
        description: item.description,
        price: {
          product: item.price?.product && typeof item.price.product === 'object' ? {
            name: (item.price.product as Stripe.Product).name,
            metadata: (item.price.product as Stripe.Product).metadata,
            description: (item.price.product as Stripe.Product).description
          } : null
        }
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
          const product = item.price?.product as Stripe.Product
          
          // Debug log the raw data
          console.log('Processing Order Item:', {
            id: item.id,
            description: item.description,
            product: {
              id: product?.id,
              name: product?.name,
              metadata: product?.metadata
            }
          })

          // Construct the description from metadata if not present
          const variantParts = []
          if (product?.metadata?.language) variantParts.push(product.metadata.language)
          if (product?.metadata?.dimensions) variantParts.push(product.metadata.dimensions)
          const variantDescription = variantParts.join(', ')

          return {
            description: item.description || variantDescription,
            name: product?.name || '',
            quantity: item.quantity,
            amount_total: item.amount_total,
            metadata: product?.metadata || {
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