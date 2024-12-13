'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CldImage } from 'next-cloudinary'
import { ScrollAnimation } from './scroll-animation'
import { ParallaxImage } from './parallax-image'
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductImage {
  src: string
  alt: string
}

interface ProductImageCarouselProps {
  images: ProductImage[]
  className?: string
}

export function ProductImageCarousel({ images, className = "" }: ProductImageCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0])

  const imageIndex = ((page % images.length) + images.length) % images.length

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div className={`relative ${className}`}>
      {/* Mobile/Tablet Carousel */}
      <div className="md:hidden w-full h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0 flex">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute inset-0 min-w-full"
            >
              <CldImage
                src={images[imageIndex].src}
                alt={images[imageIndex].alt}
                width={800}
                height={1200}
                className="object-cover w-full h-full"
                priority={imageIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls wrapper with higher z-index */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Navigation Arrows - re-enable pointer events */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-auto">
            <button 
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm opacity-70 hover:opacity-100 transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm opacity-70 hover:opacity-100 transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation Dots - re-enable pointer events */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-auto">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index - imageIndex])}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === imageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:flex md:flex-col">
        {images.map((image, index) => (
          <ScrollAnimation key={index} animation="fadeIn" duration={0.8} delay={index * 0.1}>
            <div className="h-[80vh]">
              <ParallaxImage
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                priority={index === 0}
              />
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  )
} 