import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className={clsx('flex items-center', className)}>
      <img
        alt="Kageod Logo"
        width={180}
        height={60}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="h-10 md:h-12 w-auto object-contain"
        src="/logo.jpg"
      />
    </div>
  )
}
