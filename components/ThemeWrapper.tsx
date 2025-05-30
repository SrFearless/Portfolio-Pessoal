"use client"

import { useEffect, useState } from "react"

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-200 dark:bg-gray-900">
      {children}
    </div>
  )
}