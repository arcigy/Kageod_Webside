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
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-12 flex flex-col gap-8 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          <div className="text-muted-foreground text-sm max-w-xs">
            <p>Geodetická kancelária - Ing. Rastislav Kamenský</p>
            <p className="mt-2 text-xs">Profesionálne geodetické služby vo Zvolene a v celom Banskobystrickom kraji.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">Kontakt</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="tel:+421900000000" className="hover:text-white transition-colors">Tel: +421 9xx xxx xxx</a>
            <a href="mailto:info@kageod.sk" className="hover:text-white transition-colors">Email: info@kageod.sk</a>
            <p>Adresa: Kancelária Zvolen</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start md:items-end">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white hover:text-primary transition-colors" key={i} {...link} />
            })}
          </nav>
          <p className="text-xs text-muted-foreground mt-4">
            &copy; {new Date().getFullYear()} KAGEOD s.r.o. Všetky práva vyhradené.
          </p>
        </div>
      </div>
    </footer>
  )
}
