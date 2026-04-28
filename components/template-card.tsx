"use client"

import { useState } from "react"
import {
  Layout,
  BarChart3,
  Image,
  ShoppingBag,
  Hexagon,
  Building2,
  Camera,
  Palette,
  User,
  Film,
  Scroll,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  AlertTriangle,
} from "lucide-react"
import { copyToClipboard, cn } from "@/lib/utils"

interface Template {
  id: string
  name: string
  icon: string
  description: string
  basicTemplate: string
  jsonTemplate?: string
  tips: string[]
}

interface TemplateCardProps {
  template: Template
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  BarChart3,
  Image,
  ShoppingBag,
  Hexagon,
  Building2,
  Camera,
  Palette,
  User,
  Film,
  Scroll,
  FileText,
  Sparkles,
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<"basic" | "json">("basic")
  const [copiedBasic, setCopiedBasic] = useState(false)
  const [copiedJson, setCopiedJson] = useState(false)

  const Icon = iconMap[template.icon] || Sparkles

  const handleCopyBasic = async () => {
    const success = await copyToClipboard(template.basicTemplate)
    if (success) {
      setCopiedBasic(true)
      setTimeout(() => setCopiedBasic(false), 2000)
    }
  }

  const handleCopyJson = async () => {
    if (template.jsonTemplate) {
      const success = await copyToClipboard(template.jsonTemplate)
      if (success) {
        setCopiedJson(true)
        setTimeout(() => setCopiedJson(false), 2000)
      }
    }
  }

  return (
    <div className="prompt-card">
      {/* Header */}
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {template.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {template.description}
            </p>
          </div>
        </div>
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-6 space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab("basic")}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === "basic"
                  ? "border-brand-cyan text-brand-cyan"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              常规模板
            </button>
            {template.jsonTemplate && (
              <button
                onClick={() => setActiveTab("json")}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "json"
                    ? "border-brand-cyan text-brand-cyan"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                JSON 进阶模板
              </button>
            )}
          </div>

          {/* Template Content */}
          <div className="relative">
            {activeTab === "basic" ? (
              <>
                <pre className="p-4 rounded-xl bg-muted/30 border border-border text-sm text-foreground whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-64 overflow-y-auto">
                  {template.basicTemplate}
                </pre>
                <button
                  onClick={handleCopyBasic}
                  className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-xs font-medium transition-all hover:bg-card"
                >
                  {copiedBasic ? (
                    <>
                      <Check className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <pre className="p-4 rounded-xl bg-muted/30 border border-border text-sm text-foreground whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-64 overflow-y-auto font-mono">
                  {template.jsonTemplate}
                </pre>
                <button
                  onClick={handleCopyJson}
                  className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-xs font-medium transition-all hover:bg-card"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Tips */}
          {template.tips.length > 0 && (
            <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <h4 className="font-medium text-foreground">避坑指南</h4>
              </div>
              <ul className="space-y-2">
                {template.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    - {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
