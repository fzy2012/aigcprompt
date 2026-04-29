import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, LayoutGrid, FileCode2, Search, Copy, Heart } from "lucide-react"
import { getAllCases, getCategories, getAllTemplates } from "@/lib/parse-markdown"

const features = [
  {
    icon: LayoutGrid,
    title: "353+ 精选案例",
    description: "涵盖 UI、信息图、海报、电商、品牌等多个分类的高质量提示词案例",
  },
  {
    icon: FileCode2,
    title: "13 套工业级模板",
    description: "经过验证的提示词模板，包含常规模板和 JSON 进阶模板",
  },
  {
    icon: Copy,
    title: "一键复制",
    description: "所有提示词支持一键复制，方便快速使用",
  },
  {
    icon: Search,
    title: "智能搜索",
    description: "快速搜索你需要的提示词，支持关键词和分类筛选",
  },
  {
    icon: Heart,
    title: "收藏管理",
    description: "收藏喜欢的提示词，方便下次快速访问",
  },
  {
    icon: Sparkles,
    title: "持续更新",
    description: "基于 GitHub 开源项目，持续同步最新案例",
  },
]

export default async function HomePage() {
  const cases = await getAllCases()
  const categories = await getCategories()
  const templates = await getAllTemplates()

  const featuredCases = cases.slice(0, 6)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span className="text-sm text-brand-cyan">GPT-Image2 提示词模板库</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="gradient-text">AI 绘图提示词</span>
              <br />
              <span className="text-foreground">从这里开始</span>
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed">
              {cases.length}+ 个精选案例，{templates.length} 套工业级模板，
              覆盖 {categories.length} 个分类。助你快速掌握 AI 绘图技巧，创作出色的视觉作品。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/gallery" className="btn-primary gap-2">
                <LayoutGrid className="w-4 h-4" />
                浏览案例画廊
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/templates" className="btn-secondary gap-2">
                <FileCode2 className="w-4 h-4" />
                查看模板库
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{cases.length}+</div>
              <div className="text-sm text-muted-foreground mt-1">精选案例</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{templates.length}</div>
              <div className="text-sm text-muted-foreground mt-1">工业级模板</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{categories.length}</div>
              <div className="text-sm text-muted-foreground mt-1">内容分类</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground mt-1">免费开源</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">按分类浏览</h2>
            <p className="text-muted-foreground">选择你感兴趣的分类，快速找到相关案例</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/gallery?category=${category.slug}`}
                className="category-badge"
              >
                {category.name}
                <span className="ml-1 text-brand-cyan">({category.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">精选案例</h2>
              <p className="text-muted-foreground">最新收录的高质量提示词案例</p>
            </div>
            <Link href="/gallery" className="btn-secondary text-sm">
              查看全部
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCases.map((item) => (
              <Link
                key={item.id}
                href={`/gallery/${item.id}`}
                className="group prompt-card overflow-hidden"
              >
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-foreground mb-2 line-clamp-1 group-hover:text-brand-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.prompt.substring(0, 100)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">为什么选择我们</h2>
            <p className="text-muted-foreground">专为 AI 创作者打造的提示词资源库</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="prompt-card">
                <div className="w-12 h-12 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-brand-cyan" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-brand-cyan/5 to-brand-purple/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">开始探索 AI 绘图的无限可能</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            无论你是设计师、营销人员还是内容创作者，这里都有适合你的提示词模板
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/gallery" className="btn-primary gap-2">
              立即开始
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="https://ruhangcenter.ruhang365.cn" 
              target="_blank"
              className="btn-secondary"
            >
              加入入行365会员
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
