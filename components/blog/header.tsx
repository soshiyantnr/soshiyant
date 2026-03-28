"use client"

import { motion } from "framer-motion"
import { ThemeSwitcher } from "./theme-switcher"
import { Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import Link from "next/link"

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/categories/technology", label: "دسته‌بندی‌ها" },
  { href: "/authors", label: "نویسندگان" },
  { href: "/about", label: "درباره ما" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
            نوشتار
          </span>
          <span className="text-accent text-xl sm:text-2xl">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((item) => (
            <motion.div key={item.href}>
              <Link
                href={item.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 after:absolute after:right-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          {searchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Input
                type="search"
                placeholder="جستجو..."
                className="w-32 sm:w-40 text-right text-sm"
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} className="h-9 w-9">
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="h-9 w-9 sm:h-10 sm:w-10">
              <Search className="h-4 w-4" />
            </Button>
          )}
          
          <ThemeSwitcher />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">منو</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
        >
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-accent hover:bg-secondary/50 transition-colors py-3 px-4 rounded-lg text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
