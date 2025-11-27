"use client"

import { useState, useEffect } from "react"

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check
    checkDevice()

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    // Update state when media query changes
    const handleChange = () => {
      setIsMobile(mediaQuery.matches)
    }

    // Modern approach with matchMedia
    mediaQuery.addEventListener("change", handleChange)

    // Fallback for older browsers
    window.addEventListener("resize", checkDevice)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      window.removeEventListener("resize", checkDevice)
    }
  }, [breakpoint])

  return isMobile
}