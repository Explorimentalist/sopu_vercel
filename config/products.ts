export interface Product {
  id: number
  name: string
  price: number
  image: string
  hoverImage: string
  tag?: string
  slug: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Camiseta del pueblo Ndowéyé",
    price: 24.99,
    image: "camiseta3_yxspok",
    hoverImage: "camiseta1_dsplhs",
    tag: "Edición especial",
    slug: "camiseta"
  },
  {
    id: 2,
    name: "Calendario Ndowéyé",
    price: 9.97,
    image: "calendarioA3_1_cdxywv",
    hoverImage: "calendarioA3_2_ffvkdv",
    tag: "Edición limitada",
    slug: "calendario"
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug)
} 