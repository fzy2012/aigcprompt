"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Filter } from "lucide-react"
import { GalleryGrid } from "./gallery-grid"
import { cn } from "@/lib/utils"
import type { PromptCase, Category } from "@/lib/parse-markdown"

interface SearchClientProps {
  cases: PromptCase[]
  categories: Category[]
  initialQuery: string
}

export function SearchClient({
  cases,
  categories,
  initialQuery,
}: SearchClientProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Search and filter logic
  const filteredCases = useMemo(() => {
    let results = cases

    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter((c) => c.category === selectedCategory)
    }

    // Filter by search query
    if (query.trim()) {
      const searchTerms = query.toLowerCase().trim().split(/\s+/)
      results = results.filter((c) => {
        const searchText = `${c.title} ${c.prompt} ${c.source}`.toLowerCase()
        return searchTerms.every((term) => searchText.includes(term))
      })
    }

    return results
  }, [cases, query, selectedCategory])

  // Update URL when query changes
  const updateUrl = useCallback(
    (newQuery: string) => {
      const params = new URLSearchParams()
      if (newQuery.trim()) {
        params.set("q", newQuery)
      }
      const newUrl = params.toString()
        ? `/search?${params.toString()}`
        : "/search"
      router.replace(newUrl, { scroll: false })
    },
    [router]
  )

  // Debounced URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, updateUrl])

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        const input = document.querySelector<HTMLInputElement>("#search-input")
        input?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索提示词、标题、来源..."
          className="w-full h-14 pl-12 pr-20 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
          autoFocus
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
          <kbd className="hidden sm:flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-xs text-muted-foreground">
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Filters Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            showFilters
              ? "bg-brand-cyan/10 text-brand-cyan"
              : "bg-muted/50 text-muted-foreground hover:text-foreground"
          )}
        >
          <Filter className="w-4 h-4" />
          筛选
          {selectedCategory !== "all" && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-brand-cyan text-background text-xs">
              1
            </span>
          )}
        </button>

        <p className="text-sm text-muted-foreground">
          找到 {filteredCases.length} 个结果
        </p>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="p-4 rounded-xl bg-card/50 border border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">分类筛选</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-colors",
                selectedCategory === "all"
                  ? "bg-brand-cyan text-background"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm transition-colors",
                  selectedCategory === category.slug
                    ? "bg-brand-cyan text-background"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                {category.name}
                <span className="ml-1 opacity-60">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {filteredCases.length > 0 ? (
        <GalleryGrid cases={filteredCases.slice(0, 30)} />
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            未找到相关结果
          </h3>
          <p className="text-muted-foreground">
            尝试使用不同的关键词或清除筛选条件
          </p>
        </div>
      )}

      {/* Load More Hint */}
      {filteredCases.length > 30 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            显示前 30 个结果，共 {filteredCases.length} 个匹配。
            <a href="/gallery" className="text-brand-cyan hover:underline ml-1">
              前往画廊查看更多
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
