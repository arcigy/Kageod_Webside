import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText/Simple'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mb-12">
        <div className="max-w-[48rem]">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
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
      <div className="container">
        {media && typeof media === 'object' && (
          <div className="relative">
            <Media
              className="overflow-hidden rounded-2xl shadow-2xl border border-white/10"
              imgClassName="aspect-video object-cover"
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-4 text-sm text-muted-foreground italic">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
