"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

interface ReadingProgressProps {
  showLabel?: boolean
}

export function ReadingProgress({ showLabel = false }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)
  const scaleX = useSpring(0, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const newProgress = scrollHeight > 0 ? scrolled / scrollHeight : 0
      setProgress(Math.round(newProgress * 100))
      scaleX.set(newProgress)
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [scaleX])

  return (
    <div className="fixed top-0 right-0 left-0 z-50">
      <motion.div
        className="h-[3px] bg-gradient-to-l from-primary via-primary/80 to-accent origin-right"
        style={{ scaleX }}
        initial={{ scaleX: 0 }}
      />
      {showLabel && progress > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 left-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50"
        >
          پیشرفت خواندن: {progress}٪
        </motion.div>
      )}
    </div>
  )
}
