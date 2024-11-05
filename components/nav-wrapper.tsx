'use client'

import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('@/components/nav'), {
  loading: () => <div className="w-full px-4 py-6">Loading...</div>
})

export default function NavWrapper() {
  return <Nav />
} 