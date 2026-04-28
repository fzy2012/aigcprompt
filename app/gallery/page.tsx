import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryGrid } from "@/components/gallery-grid"
import { CategoryFilter } from "@/components/category-filter"
import { getAllCases, getCategories } from "@/lib/parse-markdown"
import { Loader2 } from "lucide-react"

export const metadata = {
  title: "案例画廊 | AIGC Prompt - 入行365",
  description: "353+ 个高质量 AI 图像生成提示词案例，按分类浏览，图文并茂展示效果。",
}

function LoadingGrid() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
    </div>
  )
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const params = await searchParams
  const cases = await getAllCases()
  const categories = await getCategories()

  const selectedCategory = params.category || "all"
  const currentPage = parseInt(params.page || "1")
  const itemsPerPage = 24

  // 筛选案例
  const filteredCases =
    selectedCategory === "all"
      ? cases
      : cases.filter((c) => c.category === selectedCategory)

  // 分页
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage)
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Page Header */}
        <section className="py-12 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h1 className="text-3xl font-bold text-foreground">案例画廊</h1>
            <p className="mt-2 text-muted-foreground">
              浏览 {cases.length}+ 个高质量 AI 图像生成提示词案例
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-border bg-card/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              totalCount={cases.length}
            />
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                显示 {paginatedCases.length} / {filteredCases.length} 个案例
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-muted-foreground">
                  第 {currentPage} / {totalPages} 页
                </p>
              )}
            </div>

            <Suspense fallback={<LoadingGrid />}>
              <GalleryGrid cases={paginatedCases} />
            </Suspense>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {currentPage > 1 && (
                  <a
                    href={`/gallery?category=${selectedCategory}&page=${currentPage - 1}`}
                    className="btn-secondary px-4 py-2 text-sm"
                  >
                    上一页
                  </a>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <a
                        key={pageNum}
                        href={`/gallery?category=${selectedCategory}&page=${pageNum}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm transition-colors ${
                          pageNum === currentPage
                            ? "bg-brand-cyan text-background font-medium"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {pageNum}
                      </a>
                    )
                  })}
                </div>

                {currentPage < totalPages && (
                  <a
                    href={`/gallery?category=${selectedCategory}&page=${currentPage + 1}`}
                    className="btn-secondary px-4 py-2 text-sm"
                  >
                    下一页
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
