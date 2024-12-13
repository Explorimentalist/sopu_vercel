'use client'

import Image from 'next/image'
import { CldImage } from 'next-cloudinary'

interface CartImageProps {
  src: string
  alt: string
  className?: string
}

export function CartImage({ src, alt, className = "" }: CartImageProps) {
  // Check if the source is a Cloudinary ID
  const isCloudinaryId = !src.startsWith('/')
  
  if (!isCloudinaryId) {
    // Use Next.js Image component for non-Cloudinary sources
    return (
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="96px"
          className={`rounded-md object-cover ${className}`}
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <CldImage
        src={src}
        alt={alt}
        width={96}
        height={96}
        className={`rounded-md object-cover ${className}`}
        crop="fill"
        gravity="face:center"
        sizes="96px"
      />
    </div>
  )
} 