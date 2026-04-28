"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Copy, Check, ExternalLink } from "lucide-react"
import { copyToClipboard, truncateText } from "@/lib/utils"
import type { PromptCase } from "@/lib/parse-markdown"

interface FeaturedCasesProps {
  cases: PromptCase[]
}

function CaseCard({ promptCase }: { promptCase: PromptCase }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const success = await copyToClipboard(promptCase.prompt)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="group prompt-card overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] -mx-4 -mt-4 mb-4 overflow-hidden bg-muted">
        <Image
          src={promptCase.image}
          alt={promptCase.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Copy Button Overlay */}
        <button
          onClick={handleCopy}
          className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-sm font-medium opacity-0 group-hover:opacity-100 transition-all hover:bg-card"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-green-500">已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>复制提示词</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-brand-cyan transition-colors">
            {promptCase.title}
          </h3>
          <span className="shrink-0 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            #{promptCase.id}
          </span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {truncateText(promptCase.prompt, 80)}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="category-badge text-xs">
            {promptCase.category === "infographic" && "信息图"}
            {promptCase.category === "ui" && "UI界面"}
            {promptCase.category === "poster" && "海报"}
            {promptCase.category === "illustration" && "插画"}
            {promptCase.category === "photography" && "摄影"}
            {promptCase.category === "social-media" && "社媒"}
            {promptCase.category === "ecommerce" && "电商"}
            {promptCase.category === "brand" && "品牌"}
            {promptCase.category === "character" && "角色"}
            {promptCase.category === "other" && "其他"}
          </span>
          <Link
            href={`/gallery/${promptCase.id}`}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-cyan transition-colors"
          >
            详情
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function FeaturedCases({ cases }: FeaturedCasesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cases.map((promptCase) => (
        <CaseCard key={promptCase.id} promptCase={promptCase} />
      ))}
    </div>
  )
}
