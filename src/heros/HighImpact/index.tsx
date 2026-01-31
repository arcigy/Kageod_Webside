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
      className="relative -mt-[10.4rem] flex flex-col justify-center min-h-screen text-white overflow-hidden"
      data-theme="dark"
    >
      <div className="container z-10 relative">
        <div className="max-w-[48rem] animate-fade-in-up">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4 mt-8">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} appearance={i === 0 ? 'default' : 'outline'} />
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
            <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
