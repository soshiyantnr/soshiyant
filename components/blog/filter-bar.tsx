"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  filters: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
  label?: string
}

export function FilterBar({ filters, activeFilter, onFilterChange, label = "فیلتر بر اساس" }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap items-center gap-2 mb-8"
    >
      <span className="text-sm text-muted-foreground ml-2">{label}:</span>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange(filter)}
          className={cn(
            "rounded-full px-4 text-sm transition-all duration-300",
            activeFilter === filter
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {filter}
        </Button>
      ))}
    </motion.div>
  )
}

interface SortOption {
  value: string
  label: string
}

interface SortBarProps {
  options: SortOption[]
  activeSort: string
  onSortChange: (sort: string) => void
}

export function SortBar({ options, activeSort, onSortChange }: SortBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">مرتب‌سازی:</span>
      <select
        value={activeSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-secondary text-secondary-foreground text-sm rounded-lg px-3 py-1.5 border-none outline-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
