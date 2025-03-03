'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function HeroVideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  
  useEffect(() => {
    let scriptElement: HTMLScriptElement | null = null
    let iframeElement: HTMLIFrameElement | null = null
    let timeoutId: NodeJS.Timeout | null = null
    
    const setupVideo = async () => {
      try {
        // Load the Vimeo Player API script
        scriptElement = document.createElement('script')
        scriptElement.src = 'https://player.vimeo.com/api/player.js'
        scriptElement.async = true
        
        // Create a promise to wait for script to load
        const scriptLoadPromise = new Promise<void>((resolve, reject) => {
          scriptElement!.onload = () => resolve()
          scriptElement!.onerror = () => reject(new Error('Failed to load Vimeo API'))
          
          // Set a timeout for script loading
          timeoutId = setTimeout(() => {
            reject(new Error('Timeout loading Vimeo API'))
          }, 5000)
        })
        
        // Add script to document
        document.body.appendChild(scriptElement)
        
        // Wait for script to load
        await scriptLoadPromise
        if (timeoutId) clearTimeout(timeoutId)
        
        // Create the iframe
        iframeElement = document.createElement('iframe')
        iframeElement.src = "https://player.vimeo.com/video/1062132948?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
        iframeElement.style.position = 'absolute'
        iframeElement.style.top = '0'
        iframeElement.style.left = '0'
        iframeElement.style.width = '100%'
        iframeElement.style.height = '100%'
        iframeElement.setAttribute('frameborder', '0')
        iframeElement.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media')
        iframeElement.title = "National Parks Background"
        
        // Set up load event
        iframeElement.onload = () => {
          setStatus('loaded')
        }
        
        // Set up error handling
        iframeElement.onerror = () => {
          console.error('Failed to load Vimeo video')
          setStatus('error')
        }
        
        // Add the iframe to the container
        if (containerRef.current) {
          containerRef.current.appendChild(iframeElement)
        }
        
        // Set a timeout for video loading
        timeoutId = setTimeout(() => {
          if (status === 'loading') {
            console.warn('Video loading timeout - falling back to image')
            setStatus('error')
          }
        }, 8000) // 8 second timeout for video loading
      } catch (error) {
        console.error('Error setting up video background:', error)
        setStatus('error')
      }
    }
    
    setupVideo()
    
    return () => {
      // Clean up
      if (timeoutId) clearTimeout(timeoutId)
      
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement)
      }
      
      if (containerRef.current && iframeElement && containerRef.current.contains(iframeElement)) {
        containerRef.current.removeChild(iframeElement)
      }
    }
  }, [status])
  
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      {/* Fallback image that shows while video is loading or if there's an error */}
      {status !== 'loaded' && (
        <div className="absolute inset-0">
          <Image
            src="/images/hero-background.jpg"
            alt="National Park landscape"
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
      <div 
        ref={containerRef}
        style={{padding:'56.25% 0 0 0', position:'relative'}}
        className={status === 'loaded' ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}
      ></div>
    </div>
  )
} 