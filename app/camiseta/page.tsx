'use client'

import { ProductBarComponent } from "@/components/product-bar"
import NavWrapper from "@/components/nav-wrapper"
import { Footer } from "@/components/footer"
import { useScroll } from "@/context/scroll-context"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ParallaxImage } from "@/components/parallax-image"

export default function CamisetaPage() {
  const { isNearFooter } = useScroll()
  
  const adultSizes = [
    { id: "1", label: "S", value: "s" },
    { id: "2", label: "M", value: "m" },
    { id: "3", label: "L", value: "l" },
    { id: "4", label: "XL", value: "xl" },
    { id: "5", label: "XXL", value: "xxl" },
  ]

  const kidsSizes = [
    { id: "6", label: "2T", value: "2t" },
    { id: "7", label: "3T", value: "3t" },
    { id: "8", label: "4T", value: "4t" },
    { id: "9", label: "5T", value: "5t" },
  ]

  const productDetails = {
    en: `Ndowéÿé Heritage T-Shirt – Symbol of Strength and Unity
Celebrate the resilience and spirit of the Ndowéÿé people with this special-edition T-shirt, created for the Día del Pueblo Ndowé. Featuring the Rhombe (antelope) standing confidently in a serene tropical setting, the design embodies overcoming obstacles and finding strength in unity. Inspired by the legendary moment when the Ndowéÿé crossed a river they thought impassable, encouraged by the sight of the Rhombe, this shirt is a proud symbol of determination.

Crafted from 100% premium cotton, it offers a comfortable fit for all ages and sizes, available in 2T-5T for children and S-XXL for men and women. Whether celebrating Ndowé heritage or embracing the universal message of resilience, this T-shirt serves as a stylish reminder to face life's challenges with courage. Perfect for the festivities or everyday wear, it connects you to a legacy of strength and cultural pride.`,
    es: `Camiseta del Patrimonio Ndowéÿé – Símbolo de Fuerza y Unidad
Celebra la resiliencia y el espíritu del pueblo Ndowéÿé con esta camiseta de edición especial, diseñada para el Día del Pueblo Ndowé. Muestra a Rhombe (antílope) representado confiado y de pie al lado del río en un paisaje tropical sereno, el diseño simboliza superar obstáculos y encontrar fuerza en la unidad. Inspirada en la legendaria hazaña de los Ndowéÿé, quienes cruzaron un río que creían intransitable al ver a la Rhombe en el agua, esta camiseta es un símbolo orgulloso de determinación.

Fabricada en algodón 100% de alta calidad, ofrece un ajuste cómodo para todas las edades y tallas, disponible en 2T-5T para niños y S-XXL para hombres y mujeres. Ya sea para celebrar el patrimonio Ndowé o abrazar el mensaje universal de resiliencia, esta camiseta es un recordatorio elegante para enfrentar los retos con valentía. Perfecta para las festividades o el uso diario, conecta con una herencia de fuerza y orgullo cultural.`
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavWrapper />
      </div>
      <div className="flex flex-col md:flex-row min-h-screen pt-24">
        {/* Main Content Area */}
        <div className="w-full md:w-[70%] p-4">
          <div className="flex flex-col">
            <ScrollAnimation animation="fadeIn" duration={0.8}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta1_dsplhs"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                  priority
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" duration={0.8} delay={0.1}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta2_sevhaz"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" duration={0.8} delay={0.2}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta3_yxspok"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" duration={0.8} delay={0.3}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta4_ciwdkc"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" duration={0.8} delay={0.4}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta5_kwwkhb"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" duration={0.8} delay={0.5}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta6_m8iktg"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" duration={0.8} delay={0.5}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta7_ixfawb"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" duration={0.8} delay={0.5}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta8_ueaij6"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" duration={0.8} delay={0.5}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta9_jpy6i4"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeIn" duration={0.8} delay={0.5}>
              <div className="h-[80vh]">
                <ParallaxImage
                  src="camiseta10_c8nco3"
                  alt="Camiseta del pueblo Ndowéyé"
                  width={1200}
                  height={900}
                />
              </div>
            </ScrollAnimation>
          </div>
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
            name="Camiseta del pueblo Ndowéyé"
            price={25}
            options={[
              {
                type: "gender",
                label: "Para",
                options: [
                  { id: "1", label: "Hombre", value: "male" },
                  { id: "2", label: "Mujer", value: "female" },
                  { id: "3", label: "Niños", value: "kids" },
                ],
              },
              {
                type: "size",
                label: "Talla",
                options: [],
                dependsOn: {
                  type: "gender",
                  values: {
                    male: adultSizes,
                    female: adultSizes,
                    kids: kidsSizes,
                  }
                }
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