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
      className="relative -mt-[10.4rem] flex flex-col justify-center min-h-[95vh] text-white overflow-hidden"
      data-theme="dark"
    >
      <div className="container z-10 relative pt-32 md:pt-0">
        <div className="max-w-[58rem] animate-fade-in-up">
          {/* Top Badge: Very modern, small, tracked out */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl group">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              Inovácie v Geodézii • Od roku 1990
            </span>
          </div>

          {richText && (
            <div className="[&_h1]:text-6xl md:[&_h1]:text-8xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:leading-[1.05] [&_h1]:mb-10 [&_p]:text-xl md:[&_p]:text-2xl [&_p]:text-white/60 [&_p]:leading-relaxed [&_p]:max-w-[42rem] [&_p]:font-light">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-6 mt-14">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink 
                      {...link} 
                      appearance={i === 0 ? 'default' : 'outline'}
                      className={`px-10 py-5 rounded-xl font-bold transition-all duration-300 hover:translate-y-[-4px] active:scale-95 ${
                        i === 0 
                          ? 'bg-primary text-black shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)]' 
                          : 'bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10'
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
            <Media fill imgClassName="object-cover transition-transform duration-1000 scale-105" priority resource={media} />
            {/* Multi-layered futuristic mask */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/80 to-transparent z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,oklch(75%_0.15_220deg/0.15),transparent_50%)] z-0" />
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
