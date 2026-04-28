"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Copy, Check, Bookmark, BookmarkCheck, Eye } from "lucide-react"
import { copyToClipboard, truncateText, cn } from "@/lib/utils"
import { useFavorites } from "@/hooks/use-favorites"
import type { PromptCase } from "@/lib/parse-markdown"

interface GalleryGridProps {
  cases: PromptCase[]
}

const categoryNames: Record<string, string> = {
  infographic: "信息图",
  "social-media": "社媒",
  poster: "海报",
  ui: "UI界面",
  ecommerce: "电商",
  brand: "品牌",
  architecture: "建筑",
  photography: "摄影",
  illustration: "插画",
  character: "角色",
  scene: "场景",
  historical: "古风",
  document: "文档",
  other: "其他",
}

function GalleryCard({ promptCase }: { promptCase: PromptCase }) {
  const [copied, setCopied] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const isFav = isFavorite(promptCase.id)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const success = await copyToClipboard(promptCase.prompt)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(promptCase.id)
  }

  return (
    <div className="group prompt-card overflow-hidden">
      {/* Image */}
      <Link href={`/gallery/${promptCase.id}`}>
        <div className="relative aspect-[4/3] -mx-4 -mt-4 mb-4 overflow-hidden bg-muted">
          <Image
            src={promptCase.image}
            alt={promptCase.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-sm font-medium transition-all hover:bg-card"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>复制</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleFavorite}
                  className={cn(
                    "p-2 rounded-lg bg-card/90 backdrop-blur-sm border border-border transition-all hover:bg-card",
                    isFav && "text-brand-cyan border-brand-cyan/50"
                  )}
                >
                  {isFav ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <Link
                  href={`/gallery/${promptCase.id}`}
                  className="p-2 rounded-lg bg-card/90 backdrop-blur-sm border border-border transition-all hover:bg-card"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-md bg-card/90 backdrop-blur-sm text-xs font-medium">
              {categoryNames[promptCase.category] || promptCase.category}
            </span>
          </div>

          {/* ID Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded-md bg-card/90 backdrop-blur-sm text-xs text-muted-foreground">
              #{promptCase.id}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div>
        <Link href={`/gallery/${promptCase.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-brand-cyan transition-colors">
            {promptCase.title}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {truncateText(promptCase.prompt, 100)}
        </p>

        {promptCase.source && promptCase.source !== "未提供" && (
          <p className="mt-2 text-xs text-muted-foreground">
            来源: {promptCase.source}
          </p>
        )}
      </div>
    </div>
  )
}

export function GalleryGrid({ cases }: GalleryGridProps) {
  if (cases.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">暂无案例</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((promptCase) => (
        <GalleryCard key={promptCase.id} promptCase={promptCase} />
      ))}
    </div>
  )
}
