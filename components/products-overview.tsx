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
  thumbnailImage: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Camiseta del pueblo Ndowéyé",
    tag: "Hombre, Mujer y Niños",
    price: 20,
    image: "camiseta3_yxspok",
    hoverImage: "camiseta1_dsplhs",
    thumbnailImage: "camiseta3_yxspok",
  },
  {
    id: 2,
    name: "Calendario Ndowéyé",
    tag: "Kombe o Basèki",
    price: 15,
    image: "calendarioA3_1_cdxywv",
    hoverImage: "calendarioA3_2_ffvkdv",
    thumbnailImage: "calendarioA3_1_cdxywv",
  },
  {
    id: 3,
    name: "Likano la bolo nyama 2024",
    tag: "Libro para colorear",
    price: 10,
    image: "pronto_x2yscr",
    hoverImage: "pronto_x2yscr",
    thumbnailImage: "pronto_x2yscr",
  },
]

export default function ProductsOverview() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { formatPrice } = useCurrency()

  return (
    <div className="container mx-auto max-w-[1240px] px-4 space-y-12 mb-48">
      {products.map((product, index) => (
        <ScrollAnimation 
          key={product.id}
          animation="slideUp"
          delay={index * 0.2}
          duration={0.6}
        >
          <div 
            className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6"
          >
            {/* Image section - responsive columns */}
            <Link 
              href={product.id === 1 ? "/camiseta" : product.id === 2 ? "/calendario" : "#"}
              className="col-span-4 md:col-span-8 lg:col-span-9 relative aspect-[5/6] md:aspect-[16/9] overflow-hidden bg-zinc-100"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div 
                className={`
                  absolute inset-0 w-full h-full
                  transition-opacity duration-300
                  ease-[cubic-bezier(0.14,0,0.07,1)]
                  ${hoveredProduct === product.id ? 'opacity-0' : 'opacity-100'}
                `}
              >
                <CldImage
                  src={product.image}
                  alt={product.name}
                  width={1200}
                  height={900}
                  className="object-cover object-center h-full w-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw"
                  priority={product.id === 1}
                  crop="fill"
                  gravity="face:center"
                />
              </div>
              <div 
                className={`
                  absolute inset-0 w-full h-full
                  transition-opacity duration-300
                  ease-[cubic-bezier(0.14,0,0.07,1)]
                  ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <CldImage
                  src={product.hoverImage}
                  alt={`${product.name} hover`}
                  width={1200}
                  height={900}
                  className="object-cover object-center h-full w-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw"
                  crop="fill"
                  gravity="face:center"
                />
              </div>
            </Link>

            {/* Product info section - responsive columns */}
            <div className="col-span-4 md:col-span-8 lg:col-span-3 flex flex-col lg:justify-end mt-0 lg:mt-0">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-zinc-900">{product.name}</h3>
                {product.tag && (
                  <p className="text-sm text-zinc-500">{product.tag}</p>
                )}
                <p className="text-lg font-medium text-zinc-900">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      ))}
    </div>
  )
}