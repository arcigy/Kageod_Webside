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
    <div className={clsx('flex items-center gap-3', className)}>
      <img
        alt="Kageod Logo"
        width={40}
        height={40}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="w-10 h-10 object-contain"
        src="/logo.png"
      />
      <span className="font-bold text-2xl tracking-[0.2em] text-primary uppercase">Kageod</span>
    </div>
  )
}
