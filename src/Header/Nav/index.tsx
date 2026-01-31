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
    <nav className="flex gap-6 items-center w-auto">
      {navItems.map(({ link }, i) => {
        const href = link.type === 'reference' && typeof link.reference?.value === 'object' && link.reference.value.slug
          ? `/${link.reference.value.slug === 'home' ? '' : link.reference.value.slug}`
          : link.url || ''

        return (
          <div key={i} onClick={(e) => handleClick(e as any, href)} className="relative">
             <CMSLink 
              {...link} 
              appearance="default"
              className="font-serif italic text-[11px] text-white/80 hover:text-white uppercase tracking-[0.2em] transition-colors duration-300"
            />
          </div>
        )
      })}
    </nav>
  )
}
