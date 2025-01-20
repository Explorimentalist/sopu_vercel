import Stripe from 'stripe'

// Add debug logging at initialization
console.log('Initializing Stripe with key:', {
  exists: !!process.env.STRIPE_SECRET_KEY,
  prefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7)
})

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing')
}

// Initialize Stripe with the secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Add this interface above CreateCheckoutSessionParams
interface ExtendedLineItem extends Stripe.Checkout.SessionCreateParams.LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      description?: string;
      images?: string[];
      metadata?: {
        size?: string;
        gender?: string;
        language?: string;
        dimensions?: string;
        quantity?: string;
      };
    };
    unit_amount: number;
  };
}

export interface CreateCheckoutSessionParams {
  lineItems: ExtendedLineItem[];
  currency: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession(params: CreateCheckoutSessionParams) {
  const lineItems = params.lineItems.map(item => {
    // Create a descriptive name that includes variants
    const variantParts = []
    if (item.price_data.product_data.metadata?.language) {
      variantParts.push(item.price_data.product_data.metadata.language)
    }
    if (item.price_data.product_data.metadata?.dimensions) {
      variantParts.push(item.price_data.product_data.metadata.dimensions)
    }
    const variantDescription = variantParts.join(', ')

    return {
      ...item,
      price_data: {
        ...item.price_data,
        product_data: {
          ...item.price_data.product_data,
          // Include variants in the name itself
          name: `${item.price_data.product_data.name}${variantDescription ? ` - ${variantDescription}` : ''}`,
          description: variantDescription || undefined,
          metadata: item.price_data.product_data.metadata
        },
      }
    }
  })

  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    shipping_address_collection: {
      allowed_countries: ['ES', 'GB'],
    },
    billing_address_collection: 'required',
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 500,
            currency: params.currency,
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
    customer_creation: 'always',
    phone_number_collection: {
      enabled: true,
    },
    metadata: {
      order_id: `order_${Date.now()}`,
    },
    invoice_creation: {
      enabled: true,
    },
    payment_intent_data: {
      description: 'Sópu order',
    },
  } as Stripe.Checkout.SessionCreateParams)
} 