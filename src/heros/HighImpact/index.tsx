'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText/Simple'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex flex-col justify-center min-h-[90vh] text-white overflow-hidden"
      data-theme="dark"
    >
      <div className="container z-10 relative mt-32 md:mt-0">
        <div className="max-w-[54rem] animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-widest">
            Geodetická Kancelária Zvolen
          </div>
          {richText && (
            <div className="[&_h1]:text-5xl md:[&_h1]:text-7xl [&_h1]:font-bold [&_h1]:leading-[1.1] [&_h1]:mb-8 [&_p]:text-xl md:[&_p]:text-2xl [&_p]:text-white/80 [&_p]:leading-relaxed [&_p]:max-w-[40rem]">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-5 mt-12">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink 
                      {...link} 
                      appearance={i === 0 ? 'default' : 'outline'}
                      className={`px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 ${
                        i === 0 
                          ? 'shadow-[0_0_30px_rgba(255,165,0,0.3)] shadow-primary/30' 
                          : 'backdrop-blur-sm'
                      }`}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 select-none z-0">
        {media && typeof media === 'object' && (
          <React.Fragment>
            <Media fill imgClassName="object-cover" priority resource={media} />
            {/* Sophisticated dual-layered gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 z-0" />
            {/* Subtle technical overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
