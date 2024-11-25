"use client"

import * as React from "react"
import { X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface CookieSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CookieSettingsModal({ open, onOpenChange }: CookieSettingsModalProps) {
  const [preferences, setPreferences] = React.useState({
    analytics: false,
    preferences: true,
  })

  const handleSave = () => {
    console.log("Saving preferences:", preferences)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold">
            Configuración de Cookies
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Ajuste sus preferencias de cookies. Las cookies esenciales no se pueden desactivar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-start justify-between space-y-0">
            <div className="space-y-1 pr-8">
              <Label htmlFor="cookies-essential" className="text-base font-semibold">
                Cookies Esenciales
              </Label>
              <p className="text-sm text-gray-500">
                Necesarias para el funcionamiento del sitio. No se pueden desactivar.
              </p>
            </div>
            <Switch 
              id="cookies-essential" 
              checked={true} 
              disabled 
              className="data-[state=checked]:bg-gray-400 data-[state=unchecked]:bg-gray-200 mt-1"
            />
          </div>

          <div className="flex items-start justify-between space-y-0">
            <div className="space-y-1 pr-8">
              <Label htmlFor="cookies-analytics" className="text-base font-semibold">
                Cookies de Análisis
              </Label>
              <p className="text-sm text-gray-500">
                Nos ayudan a mejorar el sitio (Google Analytics, aún no implementadas).
              </p>
            </div>
            <Switch
              id="cookies-analytics"
              checked={preferences.analytics}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, analytics: checked }))
              }
              className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200 mt-1"
            />
          </div>

          <div className="flex items-start justify-between space-y-0">
            <div className="space-y-1 pr-8">
              <Label htmlFor="cookies-preferences" className="text-base font-semibold">
                Cookies de Preferencias
              </Label>
              <p className="text-sm text-gray-500">
                Recuerdan sus configuraciones como el idioma o tamaño de calendarios.
              </p>
            </div>
            <Switch
              id="cookies-preferences"
              checked={preferences.preferences}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, preferences: checked }))
              }
              className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200 mt-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={handleSave}
            className="w-full bg-black text-white hover:bg-black/90 rounded-md py-3 text-base font-medium"
          >
            Guardar preferencias
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}