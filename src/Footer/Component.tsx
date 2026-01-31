import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  let footerData: Footer | null = null

  try {
    footerData = await getCachedGlobal('footer', 1)()
  } catch (error) {
    console.warn('Unable to fetch footer (safe to ignore during initial build):', error)
  }

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Map visual placeholder - Industrial Tech Style */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#333_0,#333_1px,transparent_0,transparent_50%)] bg-[length:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      </div>

      <div className="container py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Brand & Quick Links */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <Link className="flex items-center" href="/">
              <Logo />
            </Link>
            <div className="text-gray-400 text-sm leading-relaxed max-w-sm">
              <p>Vaša istota v meraní a katastri už od roku 1990. Poskytujeme komplexné geodetické služby pre občanov aj firmy.</p>
            </div>
            <nav className="flex flex-col gap-3 mt-4">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink 
                    className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors hover:pl-2 duration-300 border-l border-transparent hover:border-primary pl-0" 
                    key={i} 
                    {...link} 
                  />
                )
              })}
            </nav>
          </div>

          {/* Contact Details Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Address Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-black uppercase text-white tracking-tight border-b border-primary/30 pb-4 w-fit">Kde nás nájdete</h3>
              <div className="flex flex-col gap-2 text-gray-400">
                <p className="font-bold text-white uppercase tracking-wider text-xs mb-1">Fakturačná adresa</p>
                <p className="text-lg text-white font-medium">KAGEOD s.r.o.</p>
                <p>Neresnická cesta 3</p>
                <p>Budova STRABAG</p>
                <p>960 51 Zvolen</p>
                
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Neresnická+cesta+3+Zvolen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:text-white transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                    🗺️
                  </span>
                  Otvoriť na mape
                </a>
              </div>
            </div>

            {/* Contact Info Column */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-black uppercase text-white tracking-tight border-b border-primary/30 pb-4 w-fit">Kontaktujte nás</h3>
              <div className="flex flex-col gap-6">
                
                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-xs mb-1">Kontaktná osoba</p>
                  <p className="text-lg text-gray-300">Ing. Rastislav Kamenský</p>
                </div>

                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-xs mb-1">Telefón & Mobil</p>
                  <a href="tel:+421903567411" className="block text-lg text-white font-medium hover:text-primary transition-colors">+421 903 567 411</a>
                  <a href="tel:+421455479783" className="block text-gray-400 hover:text-primary transition-colors">+421 45 547 97 83</a>
                </div>

                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-xs mb-1">Email</p>
                  <a href="mailto:kageod@kageod.sk" className="text-lg text-primary font-bold hover:text-white transition-colors">kageod@kageod.sk</a>
                </div>

                <div>
                  <p className="font-bold text-white uppercase tracking-wider text-xs mb-1">Web</p>
                  <a href="https://www.kageod.sk" className="text-gray-400 hover:text-primary transition-colors">www.kageod.sk</a>
                </div>

              </div>
            </div>

          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} KAGEOD s.r.o. Všetky práva vyhradené.</p>
            <div className="flex gap-4">
              <ThemeSelector />
            </div>
        </div>
      </div>
    </footer>
  )
}
