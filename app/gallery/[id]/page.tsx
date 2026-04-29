import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { FavoriteButton } from "@/components/favorite-button"
import { getAllCases } from "@/lib/parse-markdown"

const categoryNames: Record<string, string> = {
  infographic: "图表与信息可视化",
  "social-media": "社媒界面",
  poster: "海报与排版",
  ui: "UI与界面",
  ecommerce: "商品与电商",
  brand: "品牌与标志",
  architecture: "建筑与空间",
  photography: "摄影与写实",
  illustration: "插画与艺术",
  character: "人物与角色",
  scene: "场景与叙事",
  historical: "历史与古风",
  document: "文档与出版物",
  other: "其他应用场景",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cases = await getAllCases()
  const promptCase = cases.find((c) => c.id === parseInt(id))

  if (!promptCase) {
    return { title: "案例未找到 | AIGC Prompt" }
  }

  return {
    title: `${promptCase.title} | AIGC Prompt - 入行365`,
    description: promptCase.prompt.slice(0, 160),
  }
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cases = await getAllCases()
  const caseIndex = cases.findIndex((c) => c.id === parseInt(id))

  if (caseIndex === -1) {
    notFound()
  }

  const promptCase = cases[caseIndex]
  const prevCase = caseIndex > 0 ? cases[caseIndex - 1] : null
  const nextCase = caseIndex < cases.length - 1 ? cases[caseIndex + 1] : null

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/gallery" className="hover:text-foreground transition-colors">
            案例画廊
          </Link>
          <span>/</span>
          <Link
            href={`/gallery?category=${promptCase.category}`}
            className="hover:text-foreground transition-colors"
          >
            {categoryNames[promptCase.category] || promptCase.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">例 {promptCase.id}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
              <Image
                src={promptCase.image}
                alt={promptCase.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              {prevCase ? (
                <Link
                  href={`/gallery/${prevCase.id}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  上一个案例
                </Link>
              ) : (
                <div />
              )}
              {nextCase && (
                <Link
                  href={`/gallery/${nextCase.id}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  下一个案例
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Title & Meta */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
                  {promptCase.title}
                </h1>
                <FavoriteButton id={promptCase.id} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="category-badge">
                  {categoryNames[promptCase.category] || promptCase.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  案例 #{promptCase.id}
                </span>
              </div>

              {promptCase.source && promptCase.source !== "未提供" && (
                <p className="mt-3 text-sm text-muted-foreground">
                  来源: {promptCase.source}
                </p>
              )}
            </div>

            {/* Prompt */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">提示词</h2>
                <CopyButton text={promptCase.prompt} />
              </div>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-muted/50 border border-border text-sm text-foreground whitespace-pre-wrap leading-relaxed overflow-x-auto font-mono">
                  {promptCase.prompt}
                </pre>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20">
              <h3 className="font-semibold text-foreground mb-2">使用提示</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>- 可以直接复制提示词用于 GPT-Image2 等 AI 绘图工具</li>
                <li>- 根据实际需求修改方括号 [] 内的参数</li>
                <li>- 建议保留结构化的描述格式以获得更稳定的结果</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
