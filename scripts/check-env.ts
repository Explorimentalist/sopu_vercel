const requiredEnvVars = [
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
]

const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars)
  process.exit(1)
}

console.log('Environment variables validated successfully') 