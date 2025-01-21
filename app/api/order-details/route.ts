import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe client with API key and latest API version
// The '!' asserts that the environment variable is defined
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

/**
 * Interface defining the possible metadata fields for line items
 * These fields are custom attributes that can be attached to products/line items
 * - gender: Used for clothing items (male/female/kids)
 * - size: Clothing sizes (S/M/L/XL/etc)
 * - language: Language option for calendars (en/es)
 * - dimensions: Physical dimensions for products (A3/A4)
 * - original_name: Original product name before any modifications
 */
interface LineItemMetadata {
  gender?: string;
  size?: string;
  language?: string;
  dimensions?: string;
  original_name?: string;
}

/**
 * Extended type for Stripe Line Item that includes our custom metadata
 * Combines Stripe's base LineItem type with additional metadata and product information
 * This allows us to access both standard Stripe fields and our custom metadata
 * in a type-safe manner
 */
type LineItem = Stripe.Response<Stripe.ApiList<Stripe.LineItem>>['data'][0] & {
  metadata?: LineItemMetadata;
  price?: {
    product?: Stripe.Product & {
      name?: string;
      metadata?: LineItemMetadata;
    };
  };
}

/**
 * GET endpoint handler for retrieving order details from a Stripe checkout session
 * This endpoint is called after a successful checkout to display order confirmation
 * 
 * @param request - NextRequest object containing the session_id query parameter
 * @returns JSON response with order details or error message
 * 
 * Flow:
 * 1. Extract session_id from query parameters
 * 2. Validate session_id presence
 * 3. Retrieve session details from Stripe with expanded line items
 * 4. Transform and normalize the data for frontend consumption
 * 5. Return formatted order details or error response
 */
export async function GET(request: NextRequest) {
  try {
    // Extract session_id from query parameters
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    // Validate session_id presence
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      )
    }

    // Retrieve detailed session information from Stripe
    // The expand parameter ensures we get the complete product data including metadata
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product']
    })

    // Transform line items to include relevant product metadata
    // This simplifies the data structure for frontend consumption by:
    // - Flattening nested objects
    // - Including only necessary fields
    // - Normalizing metadata access
    const items = session.line_items?.data.map(item => ({
      description: item.description,
      name: item.description,
      quantity: item.quantity,
      amount_total: item.amount_total,
      metadata: item.price?.product as Stripe.Product && {
        ...((item.price?.product as Stripe.Product).metadata || {})
      }
    })) || []

    // Construct a simplified order details object
    // This includes all necessary information for the order confirmation page:
    // - Customer contact and shipping details
    // - Order metadata (ID, amount, currency)
    // - Line items with their metadata
    // - Shipping information
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
    // Log error for debugging purposes while returning a generic error message
    // This prevents exposing sensitive information to the client
    console.error('Error retrieving order details:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve order details' },
      { status: 500 }
    )
  }
} 