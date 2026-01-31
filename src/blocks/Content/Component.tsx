import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText/Simple'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container py-24 md:py-32 relative overflow-hidden">
      {/* Technical grid vertical marker */}
      <div className="absolute left-0 top-0 w-[2px] h-full bg-primary" />
      
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-12 items-stretch">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]} flex`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                <div className="w-full p-10 bg-secondary/20 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 group relative flex flex-col justify-between rounded-lg">
                  {/* Technical corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-lg" />
                  
                  <div className="relative z-10">
                    {richText && (
                      <div className="[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-black [&_h2]:mb-8 [&_h2]:uppercase [&_h2]:tracking-tight [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:uppercase [&_p]:text-foreground/60 [&_p]:leading-relaxed [&_li]:text-foreground/50 [&_li]:mb-3">
                        <RichText data={richText} enableGutter={false} />
                      </div>
                    )}
                  </div>

                  {enableLink && (
                    <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                      <CMSLink 
                        {...link} 
                        className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
