import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  return (
    <>
      {/* Top Header Removed as requested - "logo co je v lavom hornom rohu daj prec" */}
      
      {/* Floating Bottom Dock Navigation - Always Visible */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform translate-y-0 opacity-100`}>
        <div className="bg-black/80 backdrop-blur-md border border-white/10 px-12 py-5 rounded-full shadow-2xl flex items-center gap-12">
           <HeaderNav data={data} />
        </div>
      </div>
    </>
  )
}
