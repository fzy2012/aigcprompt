import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Copy, Grid3X3, FileCode2, Bookmark, Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCases, getCategories, getAllTemplates } from "@/lib/parse-markdown"
import { FeaturedCases } from "@/components/featured-cases"
import { StatsSection } from "@/components/stats-section"

export default async function HomePage() {
  console.log("[v0] HomePage: Starting to load data...")
  const cases = await getAllCases()
  console.log("[v0] HomePage: Loaded cases:", cases.length)
  const categories = await getCategories()
  console.log("[v0] HomePage: Loaded categories:", categories.length)
  const templates = await getAllTemplates()
  console.log("[v0] HomePage: Loaded templates:", templates.length)

  // 精选案例 - 取一些有代表性的
  const featuredCases = cases.filter((c) =>
    [1, 2, 6, 17, 166, 310, 330, 334].includes(c.id)
  ).slice(0, 8)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-20 lg:py-32 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8">
                <Sparkles className="w-4 h-4 text-brand-cyan" />
                <span className="text-sm text-muted-foreground">
                  GPT-Image2 工业级提示词引擎
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                <span className="gradient-text">AIGC Prompt</span>
                <br />
                <span className="text-foreground">提示词模板库</span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                {cases.length}+ 个高质量 AI 图像生成案例，{templates.length} 套工业级模板，
                覆盖 UI、信息图、海报、电商、品牌等 {categories.length} 个分类。
                <span className="text-foreground font-medium">入行从这里开始。</span>
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/gallery" className="btn-primary group">
                  浏览案例画廊
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/templates" className="btn-secondary">
                  查看模板库
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection
          casesCount={cases.length}
          templatesCount={templates.length}
          categoriesCount={categories.length}
        />

        {/* Features Section */}
        <section className="py-20 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">核心功能</h2>
              <p className="mt-4 text-muted-foreground">
                为你提供高效、便捷的 AI 提示词学习与使用体验
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Grid3X3,
                  title: "案例画廊",
                  description: "353+ 个真实案例，按分类浏览，图文并茂展示效果",
                  href: "/gallery",
                },
                {
                  icon: FileCode2,
                  title: "模板库",
                  description: "13 套工业级模板，常规模板 + JSON 进阶模板，开箱即用",
                  href: "/templates",
                },
                {
                  icon: Copy,
                  title: "一键复制",
                  description: "点击即可复制提示词，快速应用到你的 AI 绘图工作流",
                  href: "/gallery",
                },
                {
                  icon: Bookmark,
                  title: "收藏管理",
                  description: "收藏喜欢的案例和模板，建立你的个人提示词库",
                  href: "/favorites",
                },
              ].map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="prompt-card group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center mb-4 group-hover:from-brand-cyan/30 group-hover:to-brand-purple/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Cases */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground">精选案例</h2>
                <p className="mt-2 text-muted-foreground">
                  从信息图到 UI 界面，展示 AI 绘图的无限可能
                </p>
              </div>
              <Link
                href="/gallery"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-brand-cyan hover:underline"
              >
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <FeaturedCases cases={featuredCases} />

            <div className="mt-8 text-center sm:hidden">
              <Link href="/gallery" className="btn-secondary">
                查看全部案例
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">分类浏览</h2>
              <p className="mt-4 text-muted-foreground">
                按场景和类型快速找到你需要的提示词
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/gallery?category=${category.slug}`}
                  className="category-badge"
                >
                  {category.name}
                  <span className="ml-2 text-brand-cyan">{category.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10 border border-border p-8 lg:p-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl -z-10" />

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">
                    准备好提升你的 AI 绘图技能了吗？
                  </h2>
                  <p className="mt-4 text-muted-foreground max-w-xl">
                    加入入行365，获取更多 AI 工具、实战教程和社区支持。
                    从入行到拿到结果，我们陪你一路成长。
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://ruhang365.cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary whitespace-nowrap"
                  >
                    访问入行365
                  </a>
                  <Link href="/search" className="btn-secondary whitespace-nowrap">
                    <Search className="w-4 h-4 mr-2" />
                    搜索提示词
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
