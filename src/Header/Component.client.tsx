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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    setIsMenuOpen(false) // Close menu on route change
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
          : 'py-8 bg-transparent'
      }`} 
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex justify-between items-center h-full">
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo loading="eager" priority="high" className={`transition-all duration-300 ${scrolled ? 'scale-90 opacity-90' : 'scale-100'}`} />
        </Link>
        
        {/* Desktop & Mobile Menu Trigger */}
        <div className="flex items-center gap-6">
           <CMSLink 
            url="/kontakt" 
            label="ZÍSKAŤ PONUKU"
            appearance="default"
            className="hidden md:flex bg-primary text-white border border-primary px-6 py-2 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(227,30,36,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-1"
          />

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group relative w-10 h-10 flex flex-col justify-center items-end gap-1.5 z-50 focus:outline-none"
          >
            <span className={`h-[2px] w-8 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5 w-8 bg-primary' : 'group-hover:w-10'}`} />
            <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'group-hover:w-10'}`} />
            <span className={`h-[2px] w-8 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5 w-8 bg-primary' : 'group-hover:w-10'}`} />
          </button>
        </div>
      </div>

      {/* Side Navigation Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-background border-l border-white/10 shadow-2xl transform transition-transform duration-500 ease-in-out z-40 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-12 pt-32 relative overflow-hidden">
           {/* Background Deco */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

           <div className="flex flex-col gap-8 flex-1">
              <HeaderNav data={data} />
           </div>

           <div className="pt-12 border-t border-white/10">
              <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-4">Kontakt</p>
              <p className="text-xl font-bold text-white mb-2">kageod@kageod.sk</p>
              <p className="text-xl font-bold text-white">+421 903 567 411</p>
           </div>
        </div>
      </div>
      
      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  )
}
