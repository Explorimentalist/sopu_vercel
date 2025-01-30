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
import { CookieSettingsModal } from './cookie-settings-modal'

// Define gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    console.log('Initial consent value:', consent)
    setIsOpen(!consent)
    console.log('Dialog open state set to:', !consent)
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted_all')
    setIsOpen(false)
    window.gtag?.('consent', 'update', {
      'analytics_storage': 'granted',
      'functionality_storage': 'granted'
    });
    console.log('Accepted all cookies')
  }

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'rejected_all')
    setIsOpen(false)
    window.gtag?.('consent', 'update', {
      'analytics_storage': 'denied',
      'functionality_storage': 'denied'
    });
    console.log('Rejected all cookies')
  }

  const handleCustomize = () => {
    localStorage.setItem('cookieConsent', 'customized')
    setIsOpen(false)
    setShowSettings(true)
    console.log('Customizing preferences')
  }

  if (isOpen === undefined) return null;

  return (
    <>
      <Dialog 
        open={isOpen} 
        onOpenChange={() => {}}
      >
        <DialogContent 
          className="sm:max-w-[425px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
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
              className="w-full bg-black hover:bg-gray-800 text-white transition-colors"
            >
              Aceptar Todo
            </Button>
            <Button 
              onClick={handleRejectAll} 
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
            >
              Rechazar Todo
            </Button>
            <Button 
              onClick={handleCustomize} 
              variant="outline" 
              className="w-full border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all"
            >
              Personalizar Preferencias
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <CookieSettingsModal 
        open={showSettings} 
        onOpenChange={setShowSettings}
      />
    </>
  )
}
