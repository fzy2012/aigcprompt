import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "AIGC Prompt | 入行365 提示词模板库",
  description: "GPT-Image2 提示词模板库 - 353+ 精选案例，13 套工业级模板，覆盖 UI、信息图、海报、电商、品牌等多个分类。入行从这里开始。",
  keywords: ["AIGC", "Prompt", "GPT-Image", "AI绘图", "提示词", "入行365"],
  authors: [{ name: "入行365" }],
  openGraph: {
    title: "AIGC Prompt | 入行365",
    description: "GPT-Image2 提示词模板库 - 入行从这里开始",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="min-h-screen antialiased font-sans flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
