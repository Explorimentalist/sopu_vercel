'use client'

import { ProductBarComponent } from "@/components/product-bar"
import NavWrapper from "@/components/nav-wrapper"

export default function CalendarioPage() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavWrapper />
      </div>
      <div className="flex flex-col md:flex-row min-h-screen pt-24">
        {/* Main Content Area */}
        <div className="w-full md:w-[70%] p-4">
          <div className="h-fit bg-gray-100">
            <img src="/images/products/calendario/calendarioA3_1.png" alt="Calendario Ndowéyé" className="w-full h-auto rounded-lg" />
          </div>
          <div className="h-fit bg-gray-100 rounded-lg">
            <img src="/images/products/calendario/calendarioA3_2.png" alt="Calendario Ndowéyé" className="w-full h-auto rounded-lg" />
          </div>
          <div className="h-fit bg-gray-100 rounded-lg">
            <img src="/images/products/calendario/calendarioA4_1.png" alt="Calendario Ndowéyé" className="w-full h-auto rounded-lg" />
          </div>
          <div className="h-fit bg-gray-100 rounded-lg">
            <img src="/images/products/calendario/calendarioA4_2.png" alt="Calendario Ndowéyé" className="w-full h-auto rounded-lg" />
          </div>
        </div>

        {/* Fixed Product Bar */}
        <div className="w-full md:w-[30%] md:fixed md:right-0 md:top-24 md:bottom-0 overflow-y-auto">
          <ProductBarComponent
            name="Calendario Ndowéyé"
            price={15}
            options={[
              {
                type: "language",
                label: "Variante lingüística",
                options: [
                  { id: "1", label: "Bènga", value: "benga" },
                  { id: "2", label: "Bapuku", value: "bapuku" },
                  { id: "3", label: "Kombe", value: "kombe" },
                  { id: "4", label: "One", value: "one" },
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
          />
        </div>
      </div>
    </>
  )
}