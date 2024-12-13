'use client'

import { HomeHero } from '@/components/home-hero'
import ProductsOverview from '@/components/products-overview'
import { Faqs } from '@/components/faqs'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <HomeHero />
      <ProductsOverview />
      <Faqs />
      <Footer />
    </main>
  )
}
