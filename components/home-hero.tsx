'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ScrollAnimation } from './scroll-animation'

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

// Animation variants for each letter
const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: {
      ease: [0.14, 0, 0.07, 1],
    }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      ease: [0.14, 0, 0.07, 1],
      duration: 0.8,
    }
  },
}

export function HomeHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <ScrollAnimation animation="fadeIn" duration={0.8}>
      <section ref={ref} className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h3 
            className="font-sans text-xl md:text-2xl text-gray-300 mt-8 mb-0 text-left px-3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {'La tienda'.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h3>
          <motion.h1 
            className="font-sans text-5xl md:text-9xl font-semibold mb-24 text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {'Ndowéÿé'.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </section>
    </ScrollAnimation>
  )
} 