'use client'

import { useEffect, useRef } from 'react'

interface VideoBackgroundProps {
  videoId: string
  className?: string
}

export function VideoBackground({ videoId, className = '' }: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Load the Vimeo Player API script
    const script = document.createElement('script')
    script.src = 'https://player.vimeo.com/api/player.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script)
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ padding: '56.25% 0 0 0', position: 'relative' }}
    >
      <iframe 
        src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameBorder="0" 
        allow="autoplay; fullscreen; picture-in-picture"
        title="Background Video"
      />
    </div>
  )
} 