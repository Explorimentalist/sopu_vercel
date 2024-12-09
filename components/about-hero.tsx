'use client'

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Noto_Sans } from "next/font/google"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1])
  
  return (
    <span className="relative inline-block mr-[0.25em] last:mr-0">
      <span className="opacity-20">{children}</span>
      <motion.span 
        className="absolute left-0 top-0"
        style={{ opacity }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"]
  })

  const text = "La labor de Sópu es mantener la cultura Ndowéÿé creando productos hechos por Ndowéÿés para los Ndowéÿe"
  const words = text.split(" ")

  return (
    <section 
      className="container mx-auto px-4 py-24 md:px-6 lg:px-20 flex justify-center items-center h-[60vh] md:h-[75vh]" 
    >
      <div className="grid grid-cols-12 gap-4 w-full">
        <div 
          ref={containerRef}
          className="col-span-12 md:col-span-11 md:col-start-0 lg:col-span-10 lg:col-start-0"
        >
          <h1 
            className={`${notoSans.className} text-zinc-900 text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight`}
            style={{ lineHeight: '1.35' }}
          >
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + (1 / words.length)
              return (
                <Word 
                  key={i} 
                  progress={scrollYProgress} 
                  range={[start, end]}
                >
                  {word}
                </Word>
              )
            })}
          </h1>
        </div>
      </div>
    </section>
  )
}