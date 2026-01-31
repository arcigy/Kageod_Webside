'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm border-b border-black/5 dark:border-white/5' 
          : 'py-8 bg-transparent'
      }`} 
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Logo loading="eager" priority="high" className={`transition-transform duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`} />
        </Link>
        <div className="flex items-center gap-8">
          <HeaderNav data={data} />
          <Link 
            href="/kontakt" 
            className="hidden md:flex bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 text-sm uppercase tracking-wider"
          >
            Získať ponuku
          </Link>
        </div>
      </div>
    </header>
  )
}
