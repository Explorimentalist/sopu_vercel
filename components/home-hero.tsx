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
      duration: 0.5,
    },
  },
}

// Animation variants for each word with specific delays
const createWordVariants = (delay: number) => ({
  hidden: { 
    opacity: 0,
    transition: {
      ease: [0.14, 0, 0.07, 1],
    }
  },
  visible: { 
    opacity: 1,
    transition: {
      ease: [0.14, 0, 0.07, 1],
      duration: 0.5,
      delay: delay,
    }
  },
})

export function HomeHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <ScrollAnimation animation="fadeIn" duration={0.8}>
      <section 
        ref={ref} 
        className="container mx-auto max-w-[1240px] min-h-[calc(76vh-80px)] relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 p-6 pt-[10vh] pb-[5vh] mb-[180px]"
      >
        {/* First row - "La" */}
        <motion.div 
          className="col-span-2 row-start-1"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={createWordVariants(0)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-5xl md:text-8xl font-semibold text-zinc-900 block"
          >
            La
          </motion.span>
        </motion.div>

        {/* Second row - "tienda" */}
        <motion.div 
          className="col-span-3 md:col-span-4 lg:col-span-4 col-start-2 md:col-start-5 lg:col-start-9 row-start-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={createWordVariants(0.4)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-5xl md:text-8xl font-semibold text-right text-zinc-900 block"
          >
            tienda
          </motion.span>
        </motion.div>

        {/* Third row - "Ndowéÿé" */}
        <motion.div 
          className="col-span-4 xs:col-span-3 xs:col-start-2 md:col-span-5 lg:col-span-6 col-start-1 xs:col-start-2 md:col-start-2 lg:col-start-3 row-start-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={createWordVariants(0.8)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-5xl md:text-8xl font-semibold text-zinc-900 block"
          >
            Ndowéÿé
          </motion.span>
        </motion.div>

        {/* Grid row gaps */}
        <div className="row-start-1 row-end-2 h-[80px]" aria-hidden="true" />
        <div className="row-start-2 row-end-3 h-[80px]" aria-hidden="true" />
      </section>
    </ScrollAnimation>
  )
} 