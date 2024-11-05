'use client'

import NavWrapper from '@/components/nav-wrapper'
import { HomeHero } from '@/components/home-hero'
import Component from '@/components/products-overview'

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavWrapper />
      </div>
      <main className="pt-24">
        <HomeHero />
        <Component />
      </main>
    </>
  );
}
