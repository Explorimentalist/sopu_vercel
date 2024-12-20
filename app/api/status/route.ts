export async function GET() {
  try {
    // Test external services
    const services = {
      stripe: await testStripeConnection(),
      location: await testLocationAPI()
    }
    return NextResponse.json({ status: 'ok', services })
  } catch (error) {
    return NextResponse.json({ status: 'error', message: error.message })
  }
} 