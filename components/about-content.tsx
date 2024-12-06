'use client'

import Image from "next/image"
import { ScrollAnimation } from './scroll-animation'

export function AboutContent() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      {/* Grid Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Left Column - Title */}
        <ScrollAnimation animation="slideUp" duration={0.7} delay={0.1}>
          <div>
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              La importancia de los productos
            </h2>
          </div>
        </ScrollAnimation>

        {/* Right Column - Content */}
        <ScrollAnimation animation="slideUp" duration={0.7} delay={0.3}>
          <div className="text-base leading-relaxed text-zinc-500 md:text-lg">
            <p className="pb-6">
              Está la lengua Ndowéÿé muriendo? Aparte de los grupos de Whatsapp dónde puedo practicar Ndowéÿé? 
              Dónde puedo arroparme con la cultura Ndowéÿé?
            </p>
            <p className="pb-6">
                Te escribo en español sabiendo que hubiese preferido hacerlo en Ndowéÿé, pero yo como a muchos otros nacidos en la diáspora hemos vivido bajo cierta precariedad cultural. 
            </p>
            <p className="pb-6">
                Quizás puedes hablar y te hacerte entender en Ndowéÿé, o 
                lo chapurreas, quizás no lo hablas pero lo entiendes, o quizás sólo sabes un par de palabras. En cualquier caso hacer un hueco a tu nuestra lengua cuesta. Cuesta vivir siendo Ndowéÿé en un entorno que no lo es. Y cuesta por el hecho de que crear ese entorno significa crear lo que otras culturas gozan.

            </p>

            <p>

            </p>
            <p className="pb-9"> 
                Otras culturas gozan de la infraestructura necesaria para hablar en su lengua. Libros, películas, diccionarios, aplicaciones móbiles, correctores hechos, empaquetados y distribuidos por gente de esa cultura o afines.
            </p>

            <h3 className="text-4xl text-zinc-800 "> Qué hay de los productos Ndowéÿé?</h3>
          </div>
        </ScrollAnimation>
      </div>

      {/* Large Image Section */}
      <ScrollAnimation animation="fadeIn" duration={1} delay={0.3}>
        <div className="mt-16 md:mt-24">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-100">
            <Image
              src="/images/about/explorimentalist.png"
              alt="The explorimentalist"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </ScrollAnimation>

      {/* Bottom Heading and Paragraph */}
      <div className="mt-16 md:mt-24">
        <ScrollAnimation animation="slideUp" duration={0.7}>
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-zinc-900">
            The explorimentalist
          </h2>
        </ScrollAnimation>
        <ScrollAnimation animation="slideUp" duration={0.7} delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
            enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
            dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
        </ScrollAnimation>
      </div>
    </section>
  )
} 