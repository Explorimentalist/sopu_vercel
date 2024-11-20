'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import Link from 'next/link'

// Define gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(true)

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted_all')
    setIsOpen(false)
    window.gtag?.('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'rejected_all')
    setIsOpen(false)
    window.gtag?.('consent', 'update', {
      'analytics_storage': 'denied'
    });
  }

  const handleCustomize = () => {
    localStorage.setItem('cookieConsent', 'customized')
    setIsOpen(false)
  }

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (consent) {
      setIsOpen(false)
    }
  }, [])

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={() => {}} // Prevent closing when clicking outside
    >
      <DialogContent 
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on click outside
        onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on Escape key
      >
        <DialogTitle className="text-lg font-semibold">
          Utilizamos cookies para mejorar tu experiencia
        </DialogTitle>
        <div className="mt-2 space-y-4">
          <span className="text-base text-muted-foreground">
            Sópu utiliza cookies para garantizar la funcionalidad del sitio web, guardar tus preferencias 
            y analizar el uso a través de herramientas como Google Analytics. Puedes gestionar tu configuración 
            de cookies en cualquier momento.
          </span>
          <span className="block text-sm text-muted-foreground">
            Para más información, lee nuestra{' '}
            <Link 
              href="https://mighty-smoke-371.notion.site/Pol-tica-de-Cookies-1446536706648062a963d1db9b14516a?pvs=4" 
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Cookies
            </Link>
          </span>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <Button 
            onClick={handleAcceptAll} 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Aceptar Todo
          </Button>
          <Button 
            onClick={handleRejectAll} 
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Rechazar Todo
          </Button>
          <Button 
            onClick={handleCustomize} 
            variant="outline" 
            className="w-full"
          >
            Personalizar Preferencias
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
