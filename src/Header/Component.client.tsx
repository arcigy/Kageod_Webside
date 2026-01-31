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
      <div className="container flex justify-between items-center h-full">
        <Link href="/">
          <Logo loading="eager" priority="high" className={`transition-all duration-300 ${scrolled ? 'scale-90 opacity-90' : 'scale-100'}`} />
        </Link>
        <div className="flex items-center gap-4">
          <HeaderNav data={data} />
          <CMSLink 
            url="/kontakt" 
            label="ZÍSKAŤ PONUKU"
            appearance="default"
            className="md:flex bg-primary text-white border border-primary px-8 py-2 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(227,30,36,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-1"
          />
        </div>
      </div>
    </header>
  )
}
