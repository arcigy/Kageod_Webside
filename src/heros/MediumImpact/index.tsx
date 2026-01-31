import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText/Simple'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,oklch(75%_0.15_220deg/0.05),transparent_70%)]" />
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
             {/* Technical indicator */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Služby & Riešenia</span>
            </div>

            {richText && (
              <div className="[&_h1]:text-5xl md:[&_h1]:text-6xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:leading-tight [&_h1]:mb-8 [&_p]:text-xl [&_p]:text-foreground/60 [&_p]:leading-relaxed">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-wrap gap-4 mt-12">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink 
                        {...link} 
                        appearance={i === 0 ? 'default' : 'outline'}
                        className="px-8 py-4 rounded-xl font-bold transition-all hover:translate-y-[-2px] hover:shadow-xl" 
                      />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="w-full lg:w-1/2 relative group">
            {/* Styled image container with technical frame */}
            <div className="absolute -inset-4 border border-white/5 rounded-[2.5rem] pointer-events-none transition-all duration-500 group-hover:border-primary/20" />
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <Media
              className="overflow-hidden rounded-[2rem] shadow-2xl border border-white/10 relative z-10"
              imgClassName="aspect-[4/3] object-cover"
              priority
              resource={media}
            />
            
            {typeof media === 'object' && media?.caption && (
              <div className="mt-6 text-xs text-foreground/40 font-mono tracking-widest uppercase flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
