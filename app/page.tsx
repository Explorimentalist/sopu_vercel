'use client'

import NavWrapper from '@/components/nav-wrapper'
import { HomeHero } from '@/components/home-hero'
import ProductsOverview from '@/components/products-overview'
import { Faqs } from '@/components/faqs'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <header>
          <NavWrapper />
        </header>
      </div>
      <main className="pt-24">
        <HomeHero />
        <ProductsOverview />
        <Faqs />
        <Footer />
      </main>
    </>
  );
}
