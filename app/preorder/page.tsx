"use client";

// app/about/preorder/page.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProductBySlug } from "@/config/products";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { Footer } from "@/components/footer";
import { useScroll } from "@/context/scroll-context";

interface Section {
  id: number;
  title: string;
  description: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "middle-left" | "middle-right" | "middle-center";
  imageUrl: string;
}

const product = getProductBySlug("preorder");

const sections: Section[] = [
  {
    id: 1,
    title: product?.name || "",
    description: "",
    position: "middle-center",
    imageUrl: "dina_cover_uwchsi"
  },
  {
    id: 2,
    title: "Animales",
    description: "Descubre cómo se nombran los animales en Ndowéÿé. Una herramienta educativa ideal para que los niños aprendan jugando y los adultos refuercen su vocabulario de manera entretenida.",
    position: "bottom-left",
    imageUrl: "dina_animals_ioyb8s"
  },
  {
    id: 3,
    title: "Objetos",
    description: "Aprende el nombre de los objetos cotidianos en Ndowéÿé. Una guía práctica que te ayudará a incorporar el idioma en tu día a día, fortaleciendo la conexión con tu cultura.",
    position: "bottom-right",
    imageUrl: "dina_objects_ifqsqx"
  },
  {
    id: 4,
    title: "Frutas",
    description: "Explora los sabores de nuestra tierra a través del lenguaje. Una sección diseñada para preservar nuestro patrimonio culinario y lingüístico, perfecta para todas las generaciones.",
    position: "bottom-left",
    imageUrl: "dina_fruit_jshxl8"
  }
];

export default function PreorderPage() {
  const { isNearFooter } = useScroll();

  return (
    <>
      <div className={`relative transition-colors duration-300 ${
        isNearFooter ? 'bg-black' : 'bg-white'
      }`}>
        <div className="relative min-h-screen">
          {sections.map((section) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="min-h-screen relative flex items-center"
            >
              <CloudinaryImage
                src={section.imageUrl}
                alt={section.title}
                width={1920}
                height={1080}
                className="absolute inset-0 object-cover w-full h-full"
                priority={section.id === 1}
                gravity="east"
                {...(section.id === 1 && { 
                  className: `fixed inset-0 object-cover w-full h-full transition-opacity duration-300 ${
                    isNearFooter ? 'opacity-0' : 'opacity-100'
                  }` 
                })}
              />
              
              <div className={`absolute p-8 ${
                section.id === 1 
                  ? `left-1/2 top-24 -translate-x-1/2 text-center transition-opacity duration-300 ${
                      isNearFooter ? 'opacity-0' : 'opacity-100'
                    }` 
                  : `${section.position.includes("left") ? "left-8" : "right-8"} 
                     ${section.position.includes("top") ? "top-8" : section.position.includes("bottom") ? "bottom-8" : "top-1/2 -translate-y-1/2"} text-left`
              }`}>
                <h2 className="color-zinc-500 text-4xl font-bold mb-4">{section.title}</h2>
                <p className="color-zinc-500 text-lg mb-4 max-w-[45ch]">{section.description}</p>
              </div>
            </motion.section>
          ))}
          
          <div className={`${
            isNearFooter 
              ? 'absolute bottom-8' 
              : 'fixed bottom-8'
            } left-1/2 -translate-x-1/2 z-10 text-center`}
          >
            <p className="text-lg font-medium mb-4 text-zinc-800 px-6 py-2 rounded-full">
              Reserva tu copia y mantén el Ndowéÿé vivo. 
            </p>
            <Link href="/preorder/form">
              <Button 
                size="lg"
                className="bg-red-500 hover:bg-red-800 text-white transition-colors px-8 py-6 text-lg"
              >
                Reserva ahora
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
} 