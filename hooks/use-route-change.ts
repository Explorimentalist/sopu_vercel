'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface RouteChangeOptions {
  onStart?: () => void
  onComplete?: () => void
}

export function useRouteChange({ onStart, onComplete }: RouteChangeOptions = {}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Route change started
    onStart?.()

    // Route change completed
    const timeout = setTimeout(() => {
      onComplete?.()
    }, 700) // Increased to match PageTransition duration

    return () => clearTimeout(timeout)
  }, [pathname, searchParams, onStart, onComplete])
} 