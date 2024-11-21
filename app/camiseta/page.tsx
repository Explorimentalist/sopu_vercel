'use client'

import { ProductBarComponent } from "@/components/product-bar"
import NavWrapper from "@/components/nav-wrapper"
import { Footer } from "@/components/footer"

export default function CamisetaPage() {
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

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavWrapper />
      </div>
      <div className="flex flex-col md:flex-row min-h-screen pt-24">
        {/* Main Content Area */}
        <div className="w-full md:w-[70%] p-4">
          {/* Add your product images/content here */}
          <div className="h-fit bg-gray-100">
            <img src="/images/products/camiseta/camiseta1.png" alt="Camiseta del pueblo Ndowéyé" className="w-full h-auto" />
          </div>
          <div className="h-fit bg-gray-100">
            <img src="/images/products/camiseta/camiseta2.png" alt="Camiseta del pueblo Ndowéyé" className="w-full h-auto" />
          </div>
          <div className="h-fit bg-gray-100">
            <img src="/images/products/camiseta/camiseta3.png" alt="Camiseta del pueblo Ndowéyé" className="w-full h-auto" />
          </div>
          <div className="h-fit bg-gray-100">
            <img src="/images/products/camiseta/camiseta4.png" alt="Camiseta del pueblo Ndowéyé" className="w-full h-auto" />
          </div>
          <div className="h-fit bg-gray-100">
            <img src="/images/products/camiseta/camiseta5.png" alt="Camiseta del pueblo Ndowéyé" className="w-full h-auto" />
          </div>
          <div className="h-fit bg-gray-100">
            <img src="/images/products/camiseta/camiseta6.png" alt="Camiseta del pueblo Ndowéyé" className="w-full h-auto" />
          </div>
        </div>

        {/* Fixed Product Bar */}
        <div className="w-full md:w-[30%] md:fixed md:right-0 md:top-24 md:bottom-0 overflow-y-auto">
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
                options: [], // Empty default options
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
          />
        </div>
      </div>

      <Footer/>
    </>
  )
}