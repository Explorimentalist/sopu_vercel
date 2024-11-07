'use client'

import NavWrapper from "@/components/nav-wrapper"
import { AboutHero } from "@/components/about-hero"
import Image from "next/image"

export default function AboutPage() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavWrapper />
      </div>
      <main className="pt-24">
        <AboutHero />
        
        {/* Content Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {/* Left Column - Title */}
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Historia
              </h2>
              <h3 className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Y por qué los productos?
              </h3>
            </div>

            {/* Right Column - Content */}
            <div className="text-base leading-relaxed text-gray-600 md:text-lg">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius
                faucibus massa sollicitudin amet augue. Nibh metus a semper purus mauris
                duis. Lorem eu neque, tristique quis duis. Nibh scelerisque ac adipiscing
                velit non nulla in amet pellentesque. Sit turpis pretium eget maecenas.
                Vestibulum dolor mattis consectetur eget commodo vitae. Amet
                pellentesque sit pulvinar lorem mi a, euismod risus rhoncus. Elementum
                ullamcorper nec, habitasse vulputate. Eget dictum quis est sed egestas
                tellus, a lectus. Quam ullamcorper in fringilla arcu aliquet fames arcu.
                Lacinia eget faucibus urna, nam risus nec elementum cras porta. Sed elementum,
                sed dolor purus dolor dui. Ut dictum nulla pulvinar vulputate sit sagittis in
                eleifend dignissim. Natoque mauris cras molestie velit. Maecenas eget
                adipiscing quisque lectus arcu, tincidunt ultrices pellentesque.
              </p>
            </div>
          </div>

          {/* Large Image Section */}
          <div className="mt-16 md:mt-24">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src="/images/about/explorimentalist.png"
                alt="The explorimentalist"
                width={1600}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Heading and Paragraph */}
          <div className="mt-16 md:mt-24">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              The explorimentalist
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
              enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
              dolor interdum nulla, ut commodo diam libero vitae erat.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}