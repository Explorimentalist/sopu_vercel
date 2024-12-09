'use client'

import { CloudinaryImage } from './cloudinary-image'
import { ScrollAnimation } from './scroll-animation'

export function AboutContent() {
  return (
    <section className="container mx-auto px-4 lg:px-20 py-16 md:py-24">
      {/* Grid Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Left Column - Title */}
        <ScrollAnimation animation="slideUp" duration={0.7} delay={0.1}>
          <div>
            <h3 className="text-3xl font-medium tracking-normal text-zinc-700 leading-snug">
              La importancia de los productos
            </h3>
          </div>
        </ScrollAnimation>

        {/* Right Column - Content */}
        <ScrollAnimation animation="slideUp" duration={0.7} delay={0.3}>
          <div className="text-base leading-relaxed text-zinc-700 md:text-lg">
            <p className="pb-6">
              Está la lengua Ndowéÿé muriendo? Aparte de mis padres con quién puedo practicar Ndowéÿé? 
              Cómo puedo rodearme de la cultura Ndowéÿé?
            </p>
            <p className="pb-6">
                Si te haces las mismas preguntas, no estás sólo. Te escribo en español sabiendo que hubiese preferido hacerlo en Ndowéÿé, 
                pero yo como a muchos otros nacidos en la diáspora hemos vivido bajo cierta precariedad cultural. 
            </p>
            <p className="pb-6">
                Quizás puedes hablar y te hacerte entender en Ndowéÿé, o 
                lo chapurreas, quizás no lo hablas pero lo entiendes, o quizás sólo sabes un par de palabras. 
                En cualquier caso hacer un hueco a tu nuestra lengua cuesta. 
                Cuesta vivir siendo Ndowéÿé en un entorno que no lo es. 
                Y cuesta por el hecho de que crear ese entorno significa crear lo que otras culturas gozan.

            </p>

            <p>

            </p>
            <p className="pb-6"> 
                La infraestructura necesaria para hablar en su lengua. Libros, películas, diccionarios, aplicaciones móbiles, correctores hechos, empaquetados y distribuidos por gente de esa cultura o afines.
            </p>

          
          </div>


        </ScrollAnimation>
      </div>

      {/* Large Image Section */}
      <ScrollAnimation animation="fadeIn" duration={1} delay={0.3}>
        <div className="mt-4 md:mt-24 lg:mt-28">
          <div className="aspect-[5/6] md:aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-100">
            <CloudinaryImage
              src="about_sxnyp4"
              alt="The explorimentalist"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
              crop="fill"
              gravity="auto"
            />
          </div>
        </div>
      </ScrollAnimation>

      {/* Bottom Heading and Paragraph */}
      <div className="mt-10 md:mt-24 lg:mt-28">
        <ScrollAnimation animation="slideUp" duration={0.7}>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl lg:text-5xl text-zinc-900 lg:leading-snug">
             Pero qué hay de los productos Ndowéÿé?
          </h2>
        </ScrollAnimation>
        <ScrollAnimation animation="slideUp" duration={0.7} delay={0.2}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
            He creado Sópu como respuesta a facilitar la formación de un entorno cultural desde la creación y elaboración de productos Ndowéÿé 
            que sustenten varios aspectos de nuestra cultura tomando en cuenta las circumstancias la vida moderna.
          </p>
        </ScrollAnimation>
        <ScrollAnimation animation="slideUp" duration={0.7} delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
            Sòpu, como su nombre indica, aspira a ser no solo la tienda en la que la gente compra libros, juguetes, comida, software, ropa, etc... 
            sinó que represente, respalde y avive nuestra cultura, la cultura Ndowéÿé.

          </p>
          
        </ScrollAnimation>
      </div>
    </section>
  )
} 