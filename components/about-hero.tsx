'use client'

import { Noto_Sans } from "next/font/google"
import { ScrollAnimation } from './scroll-animation'

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export function AboutHero() {
  return (
    <section className="container mx-auto px-4 py-24 md:px-6 lg:px-8 flex justify-center items-center" style={{ height: '80vh' }}>
      <div className="flex flex-col items-left justify-left text-left">
        <ScrollAnimation animation="fadeIn" duration={0.7}>
          <h1 className={`${notoSans.className} text-zinc-900 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight`} style={{ lineHeight: '1.35' }}>
          La labor de Sópu es mantener la cultura <span className="font-semibold">Ndowéÿé</span> creando productos hechos por <span className="font-semibold">Ndowéÿés</span> para los <span className="font-semibold">Ndowéÿe</span>.
          </h1>
        </ScrollAnimation>

      </div>
    </section>
  )
}