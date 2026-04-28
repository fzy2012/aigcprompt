"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { copyToClipboard, cn } from "@/lib/utils"

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        copied
          ? "bg-green-500/20 text-green-500 border border-green-500/30"
          : "bg-muted/50 text-foreground border border-border hover:bg-muted",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          已复制
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          复制提示词
        </>
      )}
    </button>
  )
}
