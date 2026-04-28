import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "AIGC Prompt | 入行365 - GPT-Image2 提示词模板库",
  description:
    "353+ 个高质量 AI 图像生成提示词案例，13 套工业级模板，覆盖 UI、信息图、海报、电商、品牌等多个分类。入行从这里开始。",
  keywords: [
    "AI 提示词",
    "GPT-Image",
    "AI 绘图",
    "Prompt 模板",
    "入行365",
    "AIGC",
    "图像生成",
  ],
  authors: [{ name: "入行365" }],
  openGraph: {
    title: "AIGC Prompt | 入行365",
    description: "353+ 个高质量 AI 图像生成提示词案例与工业级模板",
    type: "website",
    locale: "zh_CN",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  )
}
