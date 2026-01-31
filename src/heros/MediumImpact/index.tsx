import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText/Simple'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-32 bg-primary animate-pulse" />
      <div className="container mb-16 relative z-10">
        <div className="max-w-[50rem]">
          {richText && (
            <div className="[&_h1]:text-4xl md:[&_h1]:text-6xl [&_h1]:font-bold [&_h1]:mb-6 [&_p]:text-lg md:[&_p]:text-xl [&_p]:text-muted-foreground [&_p]:leading-relaxed">
              <RichText data={richText} enableGutter={false} />
            </div>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4 mt-10">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink 
                      {...link} 
                      appearance={i === 0 ? 'default' : 'outline'}
                      className="px-6 py-3 rounded-full font-medium transition-all hover:translate-y-[-2px]" 
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="container relative z-10">
        {media && typeof media === 'object' && (
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] scale-95 group-hover:scale-100 transition-transform duration-500 blur-2xl" />
            <Media
              className="overflow-hidden rounded-2xl shadow-2xl border border-border/50 relative"
              imgClassName="aspect-[21/9] object-cover"
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-6 text-sm text-muted-foreground font-medium flex items-center gap-2">
                <span className="w-8 h-[1px] bg-primary" />
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
