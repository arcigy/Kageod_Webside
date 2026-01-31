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
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 50) {
         setHidden(true)
      } else {
         setHidden(false)
      }
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
        hidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 py-6 bg-transparent'
      }`} 
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="w-full px-8 relative flex justify-between items-start h-full">
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo loading="eager" priority="high" className="scale-100 transition-transform duration-300 hover:scale-105" />
        </Link>
        
        {/* Absolute Right Column Navigation - Pinned to edge */}
        <div className="absolute right-8 top-0 flex flex-col items-end gap-1 mt-2">
           <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}
