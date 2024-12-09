'use client'

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const letterVariants = {
  initial: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    y: [0, -2, -3, -2], // Subtle floating range
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  },
  exit: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 17,
      mass: 0.8
    }
  }
}

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      // Show footer when user is near the bottom (within 100px)
      const nearBottom = scrollTop + windowHeight >= documentHeight - 600
      setIsVisible(nearBottom)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="relative h-[600px]"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <footer 
        className={`fixed bottom-0 w-full bg-black text-white font-sans ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Navigation and Social Links */}
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            {/* Navigation Links */}
            <nav>
              <ul className="flex flex-wrap gap-8 text-sm font-medium">
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-gray-400"
                  >
                    Contáctanos
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Social Media Links - Hidden for now */}
            <div className="hidden gap-6">
              <Link
                href="#"
                className="transition-colors hover:text-gray-400"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-gray-400"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-gray-400"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-gray-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-gray-400"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className="my-24 flex justify-center">
            <div className="text-white">
              <svg
                width="239"
                height="113"
                viewBox="-10 -10 239 113"
                fill="currentColor"
                className="w-[320px] md:w-[30vw] h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* "s" path */}
                <motion.path 
                  d="M33.9602 58.2395C33.9602 56.5862 33.2935 55.0395 31.9602 53.5995C30.6802 52.1595 29.0802 50.8529 27.1602 49.6795C25.2402 48.4529 22.5735 46.9329 19.1602 45.1195C15.1602 42.9862 11.9335 41.1462 9.4802 39.5995C7.02686 37.9995 4.9202 36.1595 3.1602 34.0795C1.45353 31.9462 0.600195 29.5995 0.600195 27.0395C0.600195 24.3729 1.74686 21.5195 4.0402 18.4795C6.38686 15.3862 9.24019 12.7995 12.6002 10.7195C15.9602 8.5862 19.0535 7.51953 21.8802 7.51953C25.2935 7.51953 29.2669 7.91953 33.8002 8.71954C38.3869 9.51954 41.7202 10.3729 43.8002 11.2795V27.5995H39.0002C36.5469 23.2795 33.8269 19.9195 30.8402 17.5195C27.9069 15.1195 24.8135 13.9195 21.5602 13.9195C18.8402 13.9195 16.7069 14.7729 15.1602 16.4795C13.6135 18.1329 12.8402 20.2929 12.8402 22.9595C12.8402 24.7195 13.5069 26.3729 14.8402 27.9195C16.1735 29.4129 17.8269 30.7729 19.8002 31.9995C21.8269 33.2262 24.5469 34.7195 27.9602 36.4795C31.8535 38.5062 35.0269 40.2929 37.4802 41.8395C39.9335 43.3862 41.9869 45.1995 43.6402 47.2795C45.3469 49.3595 46.2002 51.6529 46.2002 54.1595C46.2002 56.8262 44.9469 59.7062 42.4402 62.7995C39.9869 65.8395 36.9735 68.4262 33.4002 70.5595C29.8269 72.6395 26.5735 73.6795 23.6402 73.6795C20.0669 73.6795 15.8002 73.2795 10.8402 72.4795C5.93353 71.6795 2.38686 70.8262 0.200195 69.9195V53.5995H5.08019C7.6402 57.9195 10.5735 61.2795 13.8802 63.6795C17.1869 66.0795 20.5735 67.2795 24.0402 67.2795C27.0269 67.2795 29.4269 66.3995 31.2402 64.6395C33.0535 62.8262 33.9602 60.6929 33.9602 58.2395Z"
                  onMouseEnter={() => setHoveredLetter('s')}
                  onMouseLeave={() => setHoveredLetter(null)}
                  variants={letterVariants}
                  initial="initial"
                  animate={hoveredLetter === 's' ? "hover" : "exit"}
                />
                {/* "o" path */}
                <motion.path 
                  d="M134.909 72.7998C132.295 72.7998 129.922 72.0531 127.789 70.5598V85.0398L139.389 88.3198L137.389 92.3198H109.469V89.0398L116.589 83.3598V42.1598L109.469 37.8398V34.5598L124.349 27.7598L127.149 37.6798L138.029 29.1198C139.735 28.6931 141.682 28.4798 143.869 28.4798C146.909 28.4798 149.629 29.4131 152.029 31.2798C154.482 33.0931 156.402 35.5731 157.789 38.7198C159.175 41.8664 159.869 45.3598 159.869 49.1998C159.869 53.3598 158.562 57.2531 155.949 60.8798C153.389 64.5064 150.162 67.4131 146.269 69.5998C142.375 71.7331 138.615 72.7998 134.989 72.7998H134.909ZM139.389 37.4398C137.415 37.4398 135.522 37.7864 133.709 38.4798C131.949 39.1198 129.949 40.3464 127.709 42.1598V55.3598C127.709 58.1331 128.722 60.4531 130.749 62.3198C132.829 64.1331 135.762 65.0398 139.549 65.0398C145.042 65.0398 147.789 61.0398 147.789 53.0398C147.789 48.6131 147.069 44.9064 145.629 41.9198C144.189 38.9331 142.109 37.4398 139.389 37.4398Z"
                  onMouseEnter={() => setHoveredLetter('o')}
                  onMouseLeave={() => setHoveredLetter(null)}
                  variants={letterVariants}
                  initial="initial"
                  animate={hoveredLetter === 'o' ? "hover" : "exit"}
                />
                {/* "p" path */}
                <motion.path 
                  d="M81.0958 28.4806C84.7758 28.4806 88.0825 29.414 91.0158 31.2806C93.9492 33.094 96.2158 35.574 97.8158 38.7206C99.4692 41.8673 100.296 45.3606 100.296 49.2006C100.296 53.3606 98.9892 57.254 96.3758 60.8806C93.8158 64.5073 90.5892 67.414 86.6958 69.6006C82.8025 71.734 79.0425 72.8006 75.4158 72.8006C71.7358 72.8006 68.4292 71.894 65.4958 70.0806C62.6158 68.214 60.3492 65.7073 58.6958 62.5606C57.0425 59.3606 56.2158 55.8406 56.2158 52.0006C56.2158 47.8406 57.4958 43.974 60.0558 40.4006C62.6692 36.774 65.9225 33.894 69.8158 31.7606C73.7092 29.574 77.4692 28.4806 81.0958 28.4806ZM76.4558 36.1606C73.7892 36.1606 71.7625 37.174 70.3758 39.2006C69.0425 41.2273 68.3758 44.214 68.3758 48.1606C68.3758 53.014 69.3892 57.0406 71.4158 60.2406C73.4425 63.4406 76.3225 65.0406 80.0558 65.0406C85.4958 65.0406 88.2158 61.014 88.2158 52.9606C88.2158 48.1606 87.2025 44.1606 85.1758 40.9606C83.1492 37.7606 80.2425 36.1606 76.4558 36.1606ZM95.3358 4.88062L76.4558 18.1606L72.6958 16.3206L81.2558 0.640625L93.5758 2.16062L95.3358 4.88062Z"
                  onMouseEnter={() => setHoveredLetter('p')}
                  onMouseLeave={() => setHoveredLetter(null)}
                  variants={letterVariants}
                  initial="initial"
                  animate={hoveredLetter === 'p' ? "hover" : "exit"}
                />
                {/* "u" path */}
                <motion.path 
                  d="M216.226 71.9999H199.826V64.2399L190.306 72.1599C189.186 72.5866 187.64 72.7999 185.666 72.7999C181.88 72.7999 178.866 71.7066 176.626 69.5199C174.386 67.2799 173.266 64.2666 173.266 60.4799V42.1599L166.146 37.9999V34.7199L180.626 27.9199H184.466V55.6799C184.466 58.5066 184.893 60.4799 185.746 61.5999C186.6 62.6666 188.093 63.1999 190.226 63.1999C191.72 63.1999 193.213 62.9333 194.706 62.3999C196.2 61.8666 197.906 60.8533 199.826 59.3599V42.1599L192.706 37.9999V34.7199L207.186 27.9199H211.026V65.3599L218.226 67.9999L216.226 71.9999Z"
                  onMouseEnter={() => setHoveredLetter('u')}
                  onMouseLeave={() => setHoveredLetter(null)}
                  variants={letterVariants}
                  initial="initial"
                  animate={hoveredLetter === 'u' ? "hover" : "exit"}
                />
              </svg>
            </div>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
              <span>© 2024 Sópu. Todos los derechos reservados.</span>
              <span className="h-1 w-1 rounded-full bg-gray-700" />
              <Link
                href="https://mighty-smoke-371.notion.site/Pol-tica-de-Privacidad-1436536706648087a616c01bfa8b9b5d?pvs=4"
                className="transition-colors hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad
              </Link>
              <span className="h-1 w-1 rounded-full bg-gray-700" />
              <Link
                href="https://mighty-smoke-371.notion.site/Pol-tica-de-devoluciones-14365367066480e1a58cd3bec04b98db?pvs=4"
                className="transition-colors hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de devoluciones
              </Link>
              <span className="h-1 w-1 rounded-full bg-gray-700" />
              <Link
                href="https://mighty-smoke-371.notion.site/Pol-tica-de-Cookies-1446536706648062a963d1db9b14516a?pvs=4"
                className="transition-colors hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}