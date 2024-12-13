'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { PageTransition } from './page-transition'
import NavWrapper from '@/components/nav-wrapper'
import { Preloader } from './preloader'
import { useRouteChange } from '@/hooks/use-route-change'

interface TransitionLayoutProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.14, 0, 0.07, 1],
    }
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.14, 0, 0.07, 1],
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.14, 0, 0.07, 1],
    }
  }
}

export function TransitionLayout({ children }: TransitionLayoutProps) {
  const pathname = usePathname()
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setShouldAnimate(true)
  }, [])

  useEffect(() => {
    // Show preloader on route change
    setIsLoading(true)
    
    // Hide preloader after a delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 700) // Match the PageTransition duration

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Preloader 
            isLoading={isLoading} 
            onLoadingComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>
      <div className="fixed top-0 left-0 right-0 z-50">
        <header>
          <NavWrapper />
        </header>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={shouldAnimate ? "initial" : false}
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="min-h-screen w-full overflow-x-hidden touch-pan-y"
        >
          <PageTransition className="pt-16 sm:pt-20 md:pt-24">
            {children}
          </PageTransition>
        </motion.div>
      </AnimatePresence>
    </>
  )
} 