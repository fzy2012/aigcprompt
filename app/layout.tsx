import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AIGC Prompt | 入行365",
  description: "GPT-Image2 提示词模板库",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
