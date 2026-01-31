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
      {/* Decorative vertical line */}
      <div className="absolute left-8 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />
      
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-12 lg:gap-x-16 items-stretch">
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
                <div className="w-full p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.15] hover:translate-y-[-8px] group relative flex flex-col justify-between overflow-hidden">
                  {/* Subtle card glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    {richText && (
                      <div className="[&_h2]:text-3xl md:[&_h2]:text-4xl [&_h2]:font-bold [&_h2]:mb-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-4 [&_p]:text-foreground/70 [&_p]:leading-relaxed [&_li]:text-foreground/60 [&_li]:mb-2">
                        <RichText data={richText} enableGutter={false} />
                      </div>
                    )}
                  </div>

                  {enableLink && (
                    <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                      <CMSLink 
                        {...link} 
                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
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
