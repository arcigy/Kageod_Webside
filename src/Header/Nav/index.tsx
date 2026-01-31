'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-8 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <div key={i} className="group relative">
            <CMSLink 
              {...link} 
              appearance="link" 
              className="text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors" 
            />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </div>
        )
      })}
    </nav>
  )
}
