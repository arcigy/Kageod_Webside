'use client'

import { useEffect } from 'react'

export const MediaHealer = () => {
  useEffect(() => {
    // Fire and forget self-healing API call
    // This restores images if they were wiped by ephemeral storage
    fetch('/api/seed').catch(err => console.error('Self-healing failed', err))
  }, [])

  return null
}
