import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const country = searchParams.get('country')
  
  // If there's a country parameter, make it available to all routes
  if (country) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-country-override', country)
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
} 