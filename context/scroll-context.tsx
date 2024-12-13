'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ScrollContextType {
  isNearFooter: boolean
  scrollPosition: number
}

const ScrollContext = createContext<ScrollContextType>({
  isNearFooter: false,
  scrollPosition: 0,
})

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollState, setScrollState] = useState<ScrollContextType>({
    isNearFooter: false,
    scrollPosition: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      // Calculate when we're near the footer (600px before bottom)
      const isNearFooter = scrollTop + windowHeight >= documentHeight - 600

      setScrollState({
        isNearFooter,
        scrollPosition: scrollTop,
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ScrollContext.Provider value={scrollState}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => useContext(ScrollContext) 