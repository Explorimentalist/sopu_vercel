'use client'

import { Noto_Sans } from "next/font/google"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export function AboutHero() {
  return (
    <section className="container mx-auto px-4 py-24 md:px-6 lg:px-8">
      <div className="flex flex-col items-left justify-left text-left">
        <h1 className={`${notoSans.className} text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight`}>
          La cultura
          Ndowéÿe
        </h1>
        <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-600">
          La labor de Sópu es mantener la cultura <span className="font-semibold">Ndowéÿé</span> creando productos hechos por <span className="font-semibold">Ndowéÿés</span> para los <span className="font-semibold">Ndowéÿe</span>.
        </p>
      </div>
    </section>
  )
}