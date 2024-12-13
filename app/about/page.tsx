'use client'

import { AboutHero } from '@/components/about-hero'
import { AboutContent } from '@/components/about-content'
import { Footer } from '@/components/footer'

export default function About() {
  return (
    <main>
      <AboutHero />
      <AboutContent />
      <Footer />
    </main>
  )
}