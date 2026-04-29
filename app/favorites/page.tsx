import { FavoritesClient } from "@/components/favorites-client"
import { getAllCases } from "@/lib/parse-markdown"
import { BookMarked } from "lucide-react"

export const metadata = {
  title: "我的收藏 | AIGC Prompt - 入行365",
  description: "管理你收藏的 AI 图像生成提示词案例。",
}

export default async function FavoritesPage() {
  const cases = await getAllCases()

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center">
              <BookMarked className="w-6 h-6 text-brand-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">我的收藏</h1>
              <p className="text-muted-foreground">
                管理你收藏的提示词案例
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Favorites Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <FavoritesClient cases={cases} />
        </div>
      </section>
    </div>
  )
}
