import React, { Fragment } from 'react'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

type Props = {
  data: any
  enableGutter?: boolean
  enableProse?: boolean
  className?: string
}

const Serialize = ({ nodes }: { nodes: any[] }) => {
  if (!nodes || !Array.isArray(nodes)) return null

  return (
    <Fragment>
      {nodes.map((node, i) => {
        if (!node) return null

        if (node.type === 'text') {
          let text = <span dangerouslySetInnerHTML={{ __html: node.text }} />
          if (node.format & 1) text = <strong>{text}</strong>
          if (node.format & 2) text = <em>{text}</em>
          if (node.format & 8) text = <u>{text}</u>
          if (node.format & 16) text = <code>{text}</code>
          return <Fragment key={i}>{text}</Fragment>
        }

        if (node.type === 'heading') {
          const Tag = node.tag as any
          return (
            <Tag key={i}>
              <Serialize nodes={node.children} />
            </Tag>
          )
        }

        if (node.type === 'paragraph') {
          return (
            <p key={i}>
              <Serialize nodes={node.children} />
            </p>
          )
        }

        if (node.type === 'list') {
          const Tag = node.listType === 'number' ? 'ol' : 'ul'
          return (
            <Tag key={i} className={node.listType === 'number' ? 'list-decimal' : 'list-disc'}>
              <Serialize nodes={node.children} />
            </Tag>
          )
        }

        if (node.type === 'listitem') {
          return (
            <li key={i}>
              <Serialize nodes={node.children} />
            </li>
          )
        }

        if (node.type === 'link') {
          return (
             <Link key={i} href={node.fields?.url || '#'}>
                <Serialize nodes={node.children} />
             </Link>
          )
        }

        return null
      })}
    </Fragment>
  )
}

export default function SimpleRichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, data } = props
  if (!data || !data.root || !data.root.children) return null

  return (
    <div
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
    >
      <Serialize nodes={data.root.children} />
    </div>
  )
}
