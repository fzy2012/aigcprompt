import { Suspense } from "react"
import { SearchClient } from "@/components/search-client"
import { getAllCases, getCategories } from "@/lib/parse-markdown"
import { Search, Loader2 } from "lucide-react"

export const metadata = {
  title: "搜索 | AIGC Prompt - 入行365",
  description: "搜索 353+ 个高质量 AI 图像生成提示词案例，快速找到你需要的提示词。",
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
    </div>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const cases = await getAllCases()
  const categories = await getCategories()

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center">
              <Search className="w-6 h-6 text-brand-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">搜索提示词</h1>
              <p className="text-muted-foreground">
                在 {cases.length}+ 个案例中搜索
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Suspense fallback={<LoadingState />}>
            <SearchClient
              cases={cases}
              categories={categories}
              initialQuery={params.q || ""}
            />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
