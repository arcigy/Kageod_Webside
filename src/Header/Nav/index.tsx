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
    <nav className="flex flex-col gap-6 items-start w-full">
      {navItems.map(({ link }, i) => {
        const href = link.type === 'reference' && typeof link.reference?.value === 'object' && link.reference.value.slug
          ? `/${link.reference.value.slug === 'home' ? '' : link.reference.value.slug}`
          : link.url || ''

        return (
          <div key={i} onClick={(e) => handleClick(e as any, href)} className="w-full">
             <CMSLink 
              {...link} 
              appearance="default"
              className="group flex w-full bg-transparent border-l border-white/10 pl-6 pr-4 py-4 text-white text-2xl font-black uppercase tracking-widest hover:bg-white/5 hover:border-primary hover:text-primary transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-4">
                {link.label}
              </span>
            </CMSLink>
          </div>
        )
      })}
    </nav>
  )
}
