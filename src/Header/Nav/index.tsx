'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  
  // Helper for smooth scroll to top if active
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (typeof window !== 'undefined' && window.location.pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="flex gap-4 items-center">
      {navItems.map(({ link }, i) => {
        const href = link.type === 'reference' && typeof link.reference?.value === 'object' && link.reference.value.slug
          ? `/${link.reference.value.slug === 'home' ? '' : link.reference.value.slug}`
          : link.url || ''

        return (
          <div key={i} onClick={(e) => handleClick(e as any, href)}>
             <CMSLink 
              {...link} 
              appearance="default"
              className="bg-transparent border border-white/10 text-white px-6 py-2 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            />
          </div>
        )
      })}
    </nav>
  )
}
