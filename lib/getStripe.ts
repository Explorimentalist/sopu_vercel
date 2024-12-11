import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const validateStripeKey = (key: string): void => {
  if (!key.startsWith('pk_live_') && !key.startsWith('pk_test_')) {
    throw new Error('Invalid Stripe publishable key format');
  }
  
  // Add environment check
  if (process.env.NODE_ENV === 'development' && key.startsWith('pk_live_')) {
    throw new Error('Live mode Stripe keys cannot be used in development environment');
  }
  
  if (/[^a-zA-Z0-9_-]/.test(key)) {
    throw new Error('Invalid characters in Stripe publishable key');
  }
};

const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!key) {
      throw new Error('Stripe publishable key is missing. Check your .env.local file.');
    }

    try {
      // Validate key format before attempting to load Stripe
      validateStripeKey(key);
      
      stripePromise = loadStripe(key).catch(error => {
        console.error('Failed to load Stripe:', error);
        throw error;
      });
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      throw error;
    }
  }

  return stripePromise;
};

export default getStripe;
