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
      
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 lg:gap-x-12 items-stretch">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            // Hack to inject map if placeholder is found
            const hasMapPlaceholder = JSON.stringify(richText).includes('%%MAP%%')

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]} flex`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                <div className="w-full h-full relative group">
                  <div className="absolute inset-0 hover-neon-snake pointer-events-none rounded-lg z-0" />
                  <div className="w-full h-full p-10 bg-secondary/20 border border-white/5 backdrop-blur-sm transition-all duration-300 group-hover:bg-secondary/30 relative flex flex-col justify-between rounded-lg z-10">
                  {/* Technical corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-lg" />
                  
                  <div className="relative z-10 w-full">
                    {hasMapPlaceholder ? (
                      <div className="w-full h-[400px] rounded-lg overflow-hidden border border-white/10 transition-all duration-500 shadow-2xl">
                         <iframe 
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.606709841804!2d19.13968897762635!3d48.58289417129532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47153b6883e00001%3A0xe744473335508c0!2sBudova%20Strabag!5e0!3m2!1sen!2ssk!4v1709212345678!5m2!1sen!2ssk"
                           width="100%" 
                           height="100%" 
                           style={{ border: 0 }} 
                           allowFullScreen 
                           loading="lazy" 
                           referrerPolicy="no-referrer-when-downgrade"
                         />
                      </div>
                    ) : (
                      richText && (
                        <div className="[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-black [&_h2]:mb-8 [&_h2]:uppercase [&_h2]:tracking-tight [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:uppercase [&_p]:text-foreground/60 [&_p]:leading-relaxed [&_li]:text-foreground/50 [&_li]:mb-3">
                          <RichText data={richText} enableGutter={false} />
                        </div>
                      )
                    )}
                  </div>

                  {enableLink && !hasMapPlaceholder && (
                    <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                      <CMSLink 
                        {...link} 
                        className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            )
          })}
      </div>
    </div>
  )
}
