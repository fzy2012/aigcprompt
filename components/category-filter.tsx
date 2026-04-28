"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/parse-markdown"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  totalCount: number
}

export function CategoryFilter({
  categories,
  selectedCategory,
  totalCount,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/gallery?category=all"
        className={cn(
          "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
          selectedCategory === "all"
            ? "bg-brand-cyan text-background"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        全部
        <span className="ml-2 opacity-70">{totalCount}</span>
      </Link>

      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/gallery?category=${category.slug}`}
          className={cn(
            "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
            selectedCategory === category.slug
              ? "bg-brand-cyan text-background"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {category.name}
          <span className="ml-2 opacity-70">{category.count}</span>
        </Link>
      ))}
    </div>
  )
}
