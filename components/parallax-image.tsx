'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CloudinaryImage } from './cloudinary-image'

interface ParallaxImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export function ParallaxImage({ 
  src, 
  alt, 
  width, 
  height,
  priority = false,
  className = ''
}: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <div 
      ref={ref}
      className="relative overflow-hidden bg-gray-100 h-full w-full"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 h-[120%] -top-[10%]"
      >
        <CloudinaryImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`absolute w-full h-full object-cover object-center ${className}`}
          priority={priority}
        />
      </motion.div>
    </div>
  )
}