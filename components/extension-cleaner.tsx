'use client'

import { useEffect } from 'react'

export function ExtensionCleaner() {
  useEffect(() => {
    // Remove Grammarly extension attributes that cause hydration issues
    const body = document.querySelector('body')
    if (body) {
      body.removeAttribute('data-new-gr-c-s-check-loaded')
      body.removeAttribute('data-gr-ext-installed')
    }
  }, [])

  return null
} 