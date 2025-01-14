const requiredEnvVars = [
  // Stripe variables
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  // Cloudinary variables
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  'NEXT_PUBLIC_CLOUDINARY_API_KEY',
  'NEXT_PUBLIC_CLOUDINARY_API_SECRET'
] as const;

function formatMissingVars(vars: string[]): string {
  return vars.map(v => `- ${v}`).join('\n');
}

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`
Missing required environment variables:
${formatMissingVars(missingVars)}

Please add these variables to your .env.local file or Vercel project settings.
For local development, create a .env.local file with these variables.
For production, add them in your Vercel project settings.
`);
  process.exit(1);
}

// Log success but mask sensitive values
console.log('Environment check:', {
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY ? '✓ (masked)' : '✗',
    pubKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✓ (masked)' : '✗'
  },
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? '✓' : '✗',
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? '✓ (masked)' : '✗',
    apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET ? '✓ (masked)' : '✗'
  }
}); 