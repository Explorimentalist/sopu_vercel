'use client'

import { motion } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const sharedLayoutVariants = {
  initial: {
    opacity: 0,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.14, 0, 0.07, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    transition: {
      duration: 0.7,
      ease: [0.14, 0, 0.07, 1],
    },
  },
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setMounted(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial="initial"
      animate={mounted ? "animate" : "initial"}
      exit="exit"
      variants={sharedLayoutVariants}
      className={`${className} motion-reduce:transition-none motion-reduce:transform-none`}
    >
      {children}
    </motion.div>
  )
} 