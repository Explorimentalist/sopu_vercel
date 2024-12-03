'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCurrency } from "@/context/currency-context"
import { CldImage } from 'next-cloudinary'
import { ScrollAnimation } from './scroll-animation'

interface Product {
  id: number
  name: string
  tag: string
  price: number
  image: string
  hoverImage: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Camiseta del pueblo Ndowéyé",
    tag: "Hombre, Mujer y Niños",
    price: 20,
    image: "camiseta3_yxspok",
    hoverImage: "camiseta1_dsplhs",
  },
  {
    id: 2,
    name: "Calendario Ndowéyé",
    tag: "Kombe o Basèki",
    price: 15,
    image: "calendarioA3_2_ffvkdv",
    hoverImage: "calendarioA3_1_cdxywv",
  },
  {
    id: 3,
    name: "Likano la bolo nyama 2024",
    tag: "Libro para colorear",
    price: 10,
    image: "/placeholder.svg?height=600&width=600",
    hoverImage: "/images/products/libro/caracol.png",
  },
]

export default function ProductsOverview() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { formatPrice } = useCurrency()

  return (
    <div className="mx-auto max-w-7xl px-4 grid gap-8 md:grid-cols-2 font-sans">
      {products.map((product, index) => (
        <ScrollAnimation 
          key={product.id}
          animation="slideUp"
          delay={index * 0.2}
          duration={0.6}
        >
          <div 
            className={`
              group/item relative 
              transition-all duration-500 ease-[cubic-bezier(0.14,0,0.07,1)]
              ${hoveredProduct !== null && hoveredProduct !== product.id ? 'opacity-80 blur-sm' : ''}
            `}
          >
            <Link href={product.id === 1 ? "/camiseta" : product.id === 2 ? "/calendario" : "#"}>
              <div
                className="relative aspect-square overflow-hidden bg-gray-100"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <CldImage
                  src={hoveredProduct === product.id ? product.hoverImage : product.image}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="
                    object-cover object-center 
                    transition-all duration-300 ease-[cubic-bezier(0.14,0,0.07,1)]
                    group-hover/item:scale-105
                  "
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={product.id === 1}
                  crop="fill"
                  gravity="center"
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-lg font-medium text-gray-900 transition-colors duration-300 ease-[cubic-bezier(0.14,0,0.07,1)] group-hover/item:text-black">
                  {product.name}
                </h3>
                {product.tag && (
                  <p className="text-sm text-gray-500 transition-colors duration-300 ease-[cubic-bezier(0.14,0,0.07,1)] group-hover/item:text-gray-700">
                    {product.tag}
                  </p>
                )}
                <p className="text-lg font-medium text-gray-900 transition-colors duration-300 ease-[cubic-bezier(0.14,0,0.07,1)] group-hover/item:text-black">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          </div>
        </ScrollAnimation>
      ))}
    </div>
  )
}