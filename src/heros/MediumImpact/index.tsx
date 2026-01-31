import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText/Simple'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="py-24 md:py-32 bg-background relative overflow-hidden border-b border-white/5">
      {/* Structural background line */}
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5" />
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2">
             {/* Industrial indicator */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[2px] w-16 bg-primary" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Prehľad Služieb</span>
            </div>

            {richText && (
              <div className="[&_h1]:text-5xl md:[&_h1]:text-6xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:leading-tight [&_h1]:mb-8 [&_h1]:uppercase [&_p]:text-xl [&_p]:text-foreground/60 [&_p]:leading-relaxed">
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
                        className="px-8 py-4 rounded-sm font-black uppercase text-xs tracking-widest transition-all hover:bg-primary hover:text-white" 
                      />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="w-full lg:w-1/2 relative group">
            {/* Precision frame */}
            <div className="absolute -inset-4 border border-white/5 rounded-lg pointer-events-none transition-all duration-300 group-hover:border-primary/30" />
            
            <Media
              className="overflow-hidden rounded-md shadow-2xl border border-white/10 relative z-10"
              imgClassName="aspect-[4/3] object-cover"
              priority
              resource={media}
            />
            
            {typeof media === 'object' && media?.caption && (
              <div className="mt-8 text-[10px] text-foreground/40 font-black tracking-[0.3em] uppercase flex items-center gap-3">
                <div className="w-3 h-[1px] bg-primary" />
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
