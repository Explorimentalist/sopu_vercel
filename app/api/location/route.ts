import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import axios from 'axios'

interface IpApiResponse {
  countryCode: string
  countryName: string
  isEU: boolean
}

export async function GET(request: Request) {
  try {
    const headersList = headers()
    const url = new URL(request.url)
    
    // Development testing support
    const testCountry = url.searchParams.get('country')
    if (testCountry) {
      console.log('Using test country:', testCountry)
      return NextResponse.json({
        country: testCountry,
        isEU: ['ES', 'FR', 'DE', 'IT'].includes(testCountry),
        shippingZone: testCountry === 'GB' ? 'domestic' : 'eu',
        currency: testCountry === 'ES' ? 'EUR' : 'GBP'
      })
    }

    // Get client IP
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const clientIp = forwardedFor?.split(',')[0].trim() || 
                    realIp || 
                    '147.161.105.115' // Fallback to UK IP for development

    try {
      const response = await axios.get<IpApiResponse>(
        `https://freeipapi.com/api/json/${clientIp}`,
        { timeout: 5000 }
      )

      const country = response.data.countryCode
      const isEU = response.data.isEU

      return NextResponse.json({
        country,
        isEU,
        shippingZone: country === 'GB' ? 'domestic' : 'eu',
        currency: country === 'ES' ? 'EUR' : 'GBP'
      })
    } catch (ipError) {
      console.error('IP API error:', ipError)
      // Fallback to UK if IP detection fails
      return NextResponse.json({
        country: 'GB',
        isEU: false,
        shippingZone: 'domestic',
        currency: 'GBP'
      })
    }
  } catch (error) {
    console.error('Location detection error:', error)
    return NextResponse.json({
      country: 'GB',
      isEU: false,
      shippingZone: 'domestic',
      currency: 'GBP'
    })
  }
} 