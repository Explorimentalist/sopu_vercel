export interface Product {
  id: number
  name: string
  tag: string
  price: number
  image: string
  hoverImage: string
  thumbnailImage: string
  slug: string
  description?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Camiseta del pueblo Ndowéyé",
    tag: "Hombre, Mujer y Niños",
    price: 24.99,
    image: "camiseta3_yxspok",
    hoverImage: "camiseta1_dsplhs",
    thumbnailImage: "camiseta3_yxspok",
    slug: "camiseta",
    description: "Camiseta oficial del pueblo Ndowéyé"
  },
  {
    id: 2,
    name: "Calendario Ndowéyé",
    tag: "Kombe o Basèki",
    price: 19.99,
    image: "calendarioA3_1_cdxywv",
    hoverImage: "calendarioA3_2_ffvkdv",
    thumbnailImage: "calendarioA3_1_cdxywv",
    slug: "calendario",
    description: "Calendario Ndowéyé 2024"
  },
  {
    id: 3,
    name: "Likano la bolo nyama 2024",
    tag: "Libro para colorear",
    price: 14.99,
    image: "pronto_x2yscr",
    hoverImage: "pronto_x2yscr",
    thumbnailImage: "pronto_x2yscr",
    slug: "libro",
    description: "Libro para colorear Ndowéyé"
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug)
}

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id)
} 