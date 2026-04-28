"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, BookMarked, Grid3X3, FileCode2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "案例画廊", href: "/gallery", icon: Grid3X3 },
  { name: "模板库", href: "/templates", icon: FileCode2 },
  { name: "我的收藏", href: "/favorites", icon: BookMarked },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt="入行365"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold gradient-text">AIGC Prompt</span>
            <span className="block text-xs text-muted-foreground">入行365 提示词库</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground rounded-lg transition-colors hover:text-foreground hover:bg-muted/50"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-muted/50 rounded-lg transition-colors hover:bg-muted hover:text-foreground"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">搜索提示词...</span>
            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <div className="px-4 pb-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground rounded-lg transition-colors hover:text-foreground hover:bg-muted/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
