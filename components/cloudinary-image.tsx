'use client'

import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

interface CloudinaryImageProps {
  src: string
  alt: string
  width: number
  height: number
  sizes?: string
  priority?: boolean
  className?: string
  crop?: 'fill' | 'crop' | 'scale' | 'thumb'
  gravity?: 'auto' | 'face' | 'center' | string
}

export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  className = "",
  crop = "fill",
  gravity = "auto"
}: CloudinaryImageProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!cloudName) {
    // Fallback to a placeholder or local image when Cloudinary is not configured
    return (
      <div className={`${className} bg-zinc-100 flex items-center justify-center`}>
        <span className="text-zinc-400">Image placeholder</span>
      </div>
    )
  }

  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      format="auto"
      quality="auto"
      loading={priority ? "eager" : "lazy"}
      crop={crop}
      gravity={gravity}
    />
  )
} 