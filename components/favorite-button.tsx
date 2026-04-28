"use client"

import { Bookmark, BookmarkCheck } from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  id: number
  className?: string
}

export function FavoriteButton({ id, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites()
  const isFav = isFavorite(id)

  if (!isLoaded) {
    return (
      <button
        disabled
        className={cn(
          "p-3 rounded-lg border border-border bg-muted/50 opacity-50",
          className
        )}
      >
        <Bookmark className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => toggleFavorite(id)}
      className={cn(
        "p-3 rounded-lg border transition-all",
        isFav
          ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan"
          : "bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:bg-muted",
        className
      )}
      title={isFav ? "取消收藏" : "添加收藏"}
    >
      {isFav ? (
        <BookmarkCheck className="w-5 h-5" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
    </button>
  )
}
