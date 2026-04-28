"use client"

import { useMemo } from "react"
import Link from "next/link"
import { BookMarked, Trash2, ArrowRight } from "lucide-react"
import { GalleryGrid } from "./gallery-grid"
import { useFavorites } from "@/hooks/use-favorites"
import type { PromptCase } from "@/lib/parse-markdown"

interface FavoritesClientProps {
  cases: PromptCase[]
}

export function FavoritesClient({ cases }: FavoritesClientProps) {
  const { favorites, isLoaded, clearFavorites } = useFavorites()

  const favoriteCases = useMemo(() => {
    if (!isLoaded) return []
    return cases.filter((c) => favorites.includes(c.id))
  }, [cases, favorites, isLoaded])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-muted-foreground">加载中...</div>
      </div>
    )
  }

  if (favoriteCases.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-6">
          <BookMarked className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          还没有收藏任何案例
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          在案例画廊中浏览提示词，点击收藏按钮将喜欢的案例添加到这里。
        </p>
        <Link href="/gallery" className="btn-primary">
          浏览案例画廊
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          共 {favoriteCases.length} 个收藏
        </p>
        <button
          onClick={() => {
            if (
              confirm(
                `确定要清空所有 ${favoriteCases.length} 个收藏吗？此操作无法撤销。`
              )
            ) {
              clearFavorites()
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          清空收藏
        </button>
      </div>

      {/* Grid */}
      <GalleryGrid cases={favoriteCases} />
    </div>
  )
}
