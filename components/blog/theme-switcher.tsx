"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Palette, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

const colorThemes = [
  { id: "firouzei", name: "فیروزه‌ای کلاسیک", color: "#0F766E" },
  { id: "sorkh", name: "سرخ ادبی", color: "#9F1239" },
  { id: "talaei", name: "طلایی مینیمال", color: "#D97706" },
  { id: "nili", name: "نیلی عرفانی", color: "#4338CA" },
  { id: "khaki", name: "خاکی سنتی", color: "#78716C" },
]

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [colorTheme, setColorTheme] = useState("firouzei")

  useEffect(() => {
    setMounted(true)
    const savedColorTheme = localStorage.getItem("color-theme") || "firouzei"
    setColorTheme(savedColorTheme)
    document.documentElement.setAttribute("data-theme", savedColorTheme)
  }, [])

  const handleColorThemeChange = (newTheme: string) => {
    setColorTheme(newTheme)
    localStorage.setItem("color-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
        <Palette className="h-4 w-4" />
        <span className="sr-only">تغییر تم</span>
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-1">
      {/* Dark/Light toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="relative h-10 w-10 rounded-full hover:bg-secondary transition-all duration-300"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">تغییر حالت روشن/تاریک</span>
      </Button>

      {/* Color theme dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-10 w-10 rounded-full hover:bg-secondary transition-all duration-300"
          >
            <div 
              className="h-4 w-4 rounded-full ring-2 ring-foreground/20"
              style={{ backgroundColor: colorThemes.find(t => t.id === colorTheme)?.color || colorThemes[0].color }}
            />
            <span className="sr-only">انتخاب تم رنگی</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-2 text-sm font-medium text-muted-foreground">
            انتخاب تم
          </div>
          <DropdownMenuSeparator />
          <AnimatePresence>
            {colorThemes.map((item, index) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => handleColorThemeChange(item.id)}
                className="flex items-center gap-3 cursor-pointer py-2.5"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="h-5 w-5 rounded-full ring-2 ring-border"
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1">{item.name}</span>
                {colorTheme === item.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-primary"
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                )}
              </DropdownMenuItem>
            ))}
          </AnimatePresence>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
