'use client'

import { ProductBarComponent } from "@/components/product-bar"
import { Footer } from "@/components/footer" 
import NavWrapper from "@/components/nav-wrapper"
import { useScroll } from "@/context/scroll-context"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ParallaxImage } from "@/components/parallax-image"
import { ProductImageCarousel } from "@/components/product-image-carousel"

export default function CalendarioPage() {
  const { isNearFooter } = useScroll()
  
  const productDetails = {
    en: `Celebrate the upcoming year with the Likano Calendar, inspired by the timeless fables of Likano la bolo nyama. With stunning illustrations, it's available in two linguistic variants, Basekí and Kombe, to honor cultural storytelling.

Choose between A4 size for compact spaces or A3 for a more prominent decorative touch. Each month features unique artworks that combine practicality with cultural heritage.

Key Features:

	•	Illustrated Inspiration: Monthly artwork based on Likano la bolo nyama.
	•	Bilingual Options: Basekí and Kombe for a personal cultural connection.
	•	Customizable Sizes: Perfect to fit your space and style.

More than a calendar, it's an artwork to enrich your walls and your daily life. Perfect as a special gift or as a meaningful addition to your home, the Likano Calendar lets you celebrate beauty and tradition every day.`,
    es: `Celebra el próximo año con el Calendario Likano, inspirado en las fábulas atemporales de Likano la bolo nyama. Con impresionantes ilustraciones, está disponible en dos variantes lingüísticas, Basekí y Kombe, para honrar la narración cultural.

Elige entre el tamaño A4 para espacios reducidos o A3 para un toque decorativo más destacado. Cada mes presenta obras únicas que combinan practicidad con herencia cultural.

Características principales:

	•	Inspiración ilustrada: Arte mensual basado en Likano la bolo nyama.
	•	Opciones bilingües: Basekí y Kombe para una conexión cultural personal.
	•	Tamaños personalizables: Perfecto para adaptarse a tu espacio y estilo.

Más que un calendario, es una obra de arte para enriquecer tus paredes y tu día a día. Perfecto como regalo especial o como una adición significativa a tu hogar, el Calendario Likano te permite celebrar la belleza y la tradición cada día.`
  };

  const images = [
    { src: "calendarioA3_1_cdxywv", alt: "Calendario Ndowéyé" },
    { src: "calendarioA3_2_ffvkdv", alt: "Calendario Ndowéyé" },
    { src: "calendarioA4_1_hvnpsf", alt: "Calendario Ndowéyé" },
    { src: "calendarioA4_2_bjvpxn", alt: "Calendario Ndowéyé" },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavWrapper />
      </div>
      <div className="flex flex-col md:flex-row min-h-screen pt-24">
        {/* Main Content Area */}
        <div className="w-full md:w-[70%] p-4">
          <ProductImageCarousel images={images} />
        </div>

        {/* Product Bar with dynamic positioning */}
        <div 
          className={`
            w-full md:w-[30%] 
            ${isNearFooter 
              ? 'md:relative md:top-auto' 
              : 'md:fixed md:right-0 md:top-24 md:bottom-0'
            }
            overflow-y-auto
          `}
        >
          <ProductBarComponent
            name="Calendario Ndowéyé"
            price={15}
            options={[
              {
                type: "language",
                label: "Variante lingüística",
                options: [
                  { id: "1", label: "Kombe", value: "kombe" },
                  { id: "2", label: "Basèki", value: "baseki" },
                ],
              },
              {
                type: "dimensions",
                label: "Dimensiones",
                options: [
                  { id: "1", label: "A3", value: "a3" },
                  { id: "2", label: "A4", value: "a4" },
                ],
              },
            ]}
            onAddToCart={() => alert("Added to cart")}
            productDetails={productDetails}
          />
        </div>
      </div>
      <Footer/>
    </>
  )
}