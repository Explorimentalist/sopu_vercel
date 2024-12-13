import { NextResponse } from 'next/server'
import axios from 'axios'

interface IpApiResponse {
  countryCode: string
  countryName: string
  isEU: boolean
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
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

    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                    request.headers.get('x-real-ip') || 
                    '147.161.105.115'

    const response = await axios.get<IpApiResponse>(
      `https://freeipapi.com/api/json/${clientIp}`,
      { timeout: 5000 }
    )

    return NextResponse.json({
      country: response.data.countryCode,
      isEU: response.data.isEU,
      shippingZone: response.data.countryCode === 'GB' ? 'domestic' : 'eu',
      currency: response.data.countryCode === 'ES' ? 'EUR' : 'GBP'
    })
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