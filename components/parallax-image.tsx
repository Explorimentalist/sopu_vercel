'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { useRef } from 'react'

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
        <CldImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`absolute w-full h-full object-cover object-center ${className}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          crop="fill"
          gravity="center"
        />
      </motion.div>
    </div>
  )
}