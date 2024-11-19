"use client"

import * as React from "react"
import { ChevronDown, Ruler, User, Languages } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useCurrency } from "@/context/currency-context"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type OptionType = "gender" | "size" | "language" | "dimensions"

interface Option {
  id: string
  label: string
  value: string
}

interface ProductOptionProps {
  type: OptionType
  label: string
  options: Option[]
  selected?: string
  onSelect: (value: string) => void
}

interface ProductBarProps {
  name: string
  price: number
  options?: {
    type: OptionType
    label: string
    options: Option[]
  }[]
  onAddToCart: () => void
}

function ProductOption({ type, label, options, selected, onSelect }: ProductOptionProps) {
  const getIcon = () => {
    switch (type) {
      case "gender":
        return <User className="h-4 w-4" />
      case "dimensions":
        return <Ruler className="h-4 w-4" />
      case "language":
        return <Languages className="h-4 w-4" />
      case "size":
        return <Ruler className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
        {getIcon()}
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            size="sm"
            className={`rounded-md ${
              selected === option.value
                ? "bg-black text-white hover:bg-black/90"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function ProductBarComponent({ name, price, options = [], onAddToCart }: ProductBarProps) {
  const [selections, setSelections] = React.useState<Record<string, string>>({})
  const { addItem } = useCart()
  const { formatPrice } = useCurrency()

  const handleSelect = (type: string, value: string) => {
    setSelections((prev) => ({ ...prev, [type]: value }))
  }

  const isComplete = options.length > 0 ? options.every((option) => selections[option.type]) : true

  const handleAddToCart = () => {
    if (!isComplete) return

    console.log('Selections:', selections)

    const uniqueId = `${name}-${Date.now()}-${
      selections.size || ''}-${
      selections.language || ''}-${
      selections.dimensions || ''}-${
      selections.gender || ''
    }`

    const cartItem = {
      id: uniqueId,
      name,
      price,
      quantity: 1,
      timestamp: Date.now(),
      image: name.includes("Calendario") 
        ? "/images/products/calendario/calendarioA3_1.png"
        : "/images/products/camiseta/camiseta1.png",
      ...(selections.size && { size: selections.size }),
      ...(selections.gender && { gender: selections.gender }),
      ...(selections.language && { language: selections.language }),
      ...(selections.dimensions && { dimensions: selections.dimensions })
    }

    addItem(cartItem)
    setSelections({})
    onAddToCart()
  }

  return (
    <div className="flex h-full w-full flex-col bg-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-normal">{name}</h1>
        <p className="mt-2 text-xl">{formatPrice(price)}</p>
      </div>

      {options.map((option) => (
        <ProductOption
          key={option.type}
          type={option.type}
          label={option.label}
          options={option.options}
          selected={selections[option.type]}
          onSelect={(value) => handleSelect(option.type, value)}
        />
      ))}

      <Accordion type="single" collapsible className="mt-auto">
        <AccordionItem value="details" className="border-t">
          <AccordionTrigger className="text-base font-normal">
            Detalles del producto
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-600">
              Product details and description go here.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        className="mt-6 w-full bg-black text-white hover:bg-black/90"
        size="lg"
        disabled={!isComplete}
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </div>
  )
}