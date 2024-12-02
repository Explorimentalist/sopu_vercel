'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCurrency } from "@/context/currency-context"
import { CldImage } from 'next-cloudinary'

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
    tag: "",
    price: 25,
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
    tag: "Libro",
    price: 25,
    image: "/placeholder.svg?height=600&width=600",
    hoverImage: "/images/products/libro/caracol.png",
  },
  // {
  //   id: 4,
  //   name: "Epàlwí-rèbbo ekalanga panyólé",
  //   tag: "Aplicación móvil",
  //   price: 2,
  //   image: "/placeholder.svg?height=600&width=600",
  //   hoverImage: "/placeholder.svg?height=600&width=600",
  // },
]

export default function ProductsOverview() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { formatPrice } = useCurrency()

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 font-sans">
      {products.map((product) => (
        <div key={product.id} className="group relative">
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
                className="object-cover object-center transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={product.id === 1}
                crop="fill"
                gravity="center"
              />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              {product.tag && (
                <p className="text-sm text-gray-500">{product.tag}</p>
              )}
              <p className="text-lg font-medium text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}