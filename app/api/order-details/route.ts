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
  original_name?: string;
}

// Define custom types for Stripe entities with metadata
interface CustomProduct extends Omit<Stripe.Product, 'metadata'> {
  metadata: LineItemMetadata;
}

interface CustomPrice extends Omit<Stripe.Price, 'product'> {
  product: CustomProduct;
}

interface CustomLineItem extends Omit<Stripe.LineItem, 'price' | 'metadata'> {
  metadata: LineItemMetadata;
  price: CustomPrice;
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
            name: (item.price.product as CustomProduct).name,
            metadata: (item.price.product as CustomProduct).metadata,
            description: (item.price.product as CustomProduct).description
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
          const lineItem = item as unknown as CustomLineItem
          const product = lineItem.price.product
          
          // Debug log the raw data
          console.log('Processing Order Item:', {
            id: lineItem.id,
            description: lineItem.description,
            product: {
              id: product?.id,
              name: product?.name,
              metadata: product?.metadata
            },
            lineItemMetadata: lineItem.metadata
          })

          // Get metadata from both product and line item
          const metadata = {
            ...product?.metadata,
            ...lineItem.metadata // Line item metadata takes precedence
          }

          // Construct the variant description
          const variantParts = []
          if (metadata.language) variantParts.push(metadata.language)
          if (metadata.dimensions) variantParts.push(metadata.dimensions)
          if (metadata.gender) variantParts.push(
            metadata.gender === 'male' ? 'Hombre' :
            metadata.gender === 'female' ? 'Mujer' :
            metadata.gender === 'kids' ? 'Niños' : 
            metadata.gender
          )
          if (metadata.size) variantParts.push(metadata.size.toUpperCase())
          
          const variantDescription = variantParts.join(', ')

          return {
            description: lineItem.description || variantDescription,
            name: metadata.original_name || product?.name || '',
            quantity: lineItem.quantity,
            amount_total: lineItem.amount_total,
            metadata: metadata
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