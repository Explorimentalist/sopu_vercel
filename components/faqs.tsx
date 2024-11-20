'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faqs() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 font-sans">
      <h1 className="mb-8 text-5xl font-bold">Preguntas Frecuentes (FAQs)</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="w-full border-b border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Qué productos ofrece Sópu?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            <p>Sópu ofrece una selección exclusiva de productos Ndowéÿé:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Camisetas para hombres, mujeres (tallas S a XXL) y niños (tallas 2T a 5T)</li>
              <li>Calendarios en formato impreso y digital para el año 2025, disponibles en los tamaños DINA3 y DINA4</li>
              <li>Libros infantiles en Ndowéÿé, disponibles a través de Amazon</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿En qué idiomas están disponibles los productos?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Los productos están disponibles en Ndowéÿé y Español.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Qué opciones lingüísticas tienen los calendarios?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Los calendarios están disponibles en las variantes lingüísticas Basèki y Kombe.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Puedo personalizar los productos?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            No, actualmente los productos no son personalizables.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Sópu realiza envíos internacionales?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Sí, realizamos envíos a países europeos, incluyendo Reino Unido y España.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Qué métodos de envío utilizan?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            El envío estándar es la opción predeterminada. Si desea un método diferente, por favor contáctenos.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Cómo puedo comprar los libros en Amazon?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            En nuestra tienda encontrará un enlace directo para adquirir los libros a través de Amazon.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Puedo rastrear mi pedido?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Actualmente no ofrecemos un sistema de rastreo para los pedidos.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Cuáles son las formas de pago aceptadas?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Aceptamos pagos internacionales a través de Stripe.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Tendré que pagar impuestos o aranceles si vivo en España?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Sí, los productos enviados desde el Reino Unido a España pueden estar sujetos a impuestos o aranceles. Los costos específicos dependen de las normativas locales y del transportista.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-11" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Qué hago si recibo un producto dañado?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            <p>Si recibe un producto dañado, puede:</p>
            <ol className="list-decimal pl-6 mt-2">
              <li>Solicitar un cambio, cubriendo usted los costos de envío</li>
              <li>Pedir un reembolso parcial enviándonos fotos del producto dañado como evidencia</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-12" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Puedo devolver un producto?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Sí, puede devolver un producto dentro de las 2 semanas posteriores a su recepción, siempre y cuando esté en su empaque original y en buen estado. Los costos de devolución serán cubiertos por el cliente.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-13" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">¿Cómo puedo contactar a Sópu?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Puede enviarnos un correo electrónico utilizando el formulario de contacto en nuestra página web. Su mensaje será reenviado automáticamente a nuestro correo: brianoko@gmail.com.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}