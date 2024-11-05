'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faqs() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 font-sans">
      <h1 className="mb-8 text-5xl font-bold">FAQ</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="w-full border-b border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">What are your services like?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Our services are designed to be welcoming and inclusive. We focus on creating a meaningful
            experience through worship, community, and practical teaching that relates to everyday life.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">What will happen when I visit for the first time?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            When you arrive, you'll be greeted by our welcome team who will help you get oriented.
            You can expect a warm welcome, engaging service, and the opportunity to connect with others.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">What do I wear?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            Come as you are! We maintain a casual and comfortable atmosphere. Wear what makes you
            feel comfortable and ready to engage with the community.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">What&apos;s the vibe like?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            <p className="mb-4">
              If you&apos;re too big to serve then you are too small to lead. We believe the greatest
              leadership is service to others.
            </p>
            <p>
              Every leader is a servant first. From the parking lot to the pulpit, everyone serves.
              Every role is different but they are all important.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="w-full border-t-0 px-0">
          <AccordionTrigger className="text-xl font-normal hover:no-underline [&[data-state=open]>div>svg]:rotate-180 flex w-full">
            <div className="flex-1 text-left">What do you offer for middle and high schoolers?</div>
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed pr-4">
            We have dedicated programs for middle and high school students that include engaging
            activities, meaningful discussions, and opportunities to build lasting friendships in a
            safe and supportive environment.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}