'use client'

import React, { useEffect, useRef } from 'react'

interface CustomAlertProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
}

export function CustomAlert({ isOpen, onClose, title, message }: CustomAlertProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  )
}
