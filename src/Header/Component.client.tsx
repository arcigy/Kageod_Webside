'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Hide dock only when scrolling down fast, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
         setHidden(true)
      } else {
         setHidden(false)
      }
      lastScrollY = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 py-8 pointer-events-none">
        <div className="container flex justify-between items-start pointer-events-auto">
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo loading="eager" priority="high" className="scale-100 transition-transform duration-300 hover:scale-105" />
          </Link>
        </div>
      </header>
      
      {/* Floating Bottom Dock Navigation */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${
          hidden ? 'translate-y-[200%] opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="bg-black/20 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full shadow-2xl flex items-center gap-8">
           <HeaderNav data={data} />
        </div>
      </div>
    </>
  )
}
