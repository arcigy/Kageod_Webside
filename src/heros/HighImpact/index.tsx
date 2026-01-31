'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText/Simple'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const [scrollY, setScrollY] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="relative -mt-[10.4rem] flex flex-col justify-center min-h-[95vh] text-white overflow-hidden"
      data-theme="dark"
    >
      <div className="container z-10 relative pt-32 md:pt-0">
        <div 
          className="max-w-[62rem] animate-fade-in-up transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${scrollY * 0.2}px)`, opacity: Math.max(0, 1 - scrollY / 700) }}
        >
          {/* Top Badge: Technical, clean */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-10 bg-primary/10 border-l-2 border-primary">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">
              TRADÍCIA • PRECÍZNOSŤ • KONSTRUKCIA
            </span>
          </div>

          {richText && (
            <div className="[&_h1]:text-6xl md:[&_h1]:text-8xl [&_h1]:font-black [&_h1]:tracking-tighter [&_h1]:leading-[0.95] [&_h1]:mb-10 [&_h1]:uppercase [&_p]:text-xl md:[&_p]:text-2xl [&_p]:text-white/60 [&_p]:leading-relaxed [&_p]:max-w-[44rem] [&_p]:font-medium">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4 mt-14">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink 
                      {...link} 
                      appearance={i === 0 ? 'default' : 'outline'}
                      className={`px-10 py-5 rounded-sm font-black uppercase text-xs tracking-widest transition-all duration-300 ${
                        i === 0 
                          ? 'bg-primary text-white hover:bg-white hover:text-black' 
                          : 'bg-transparent border border-white/20 hover:border-white hover:bg-white/5'
                      }`}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Background with decorative elements */}
      <div className="absolute inset-0 select-none z-0">
        {media && typeof media === 'object' && (
          <React.Fragment>
            <Media fill imgClassName="object-cover" priority resource={media} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-0" />
            <div className="absolute inset-0 bg-black/40 z-0" />
          </React.Fragment>
        )}
      </div>

      {/* Decorative side line for technical feel */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 opacity-20">
        <div className="w-[1px] h-32 bg-primary" />
        <span className="[writing-mode:vertical-lr] text-xs font-bold uppercase tracking-[0.5em]">Precision First</span>
        <div className="w-[1px] h-32 bg-primary" />
      </div>
    </div>
  )
}
