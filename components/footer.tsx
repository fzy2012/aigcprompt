import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"

const footerLinks = {
  product: [
    { name: "案例画廊", href: "/gallery" },
    { name: "模板库", href: "/templates" },
    { name: "搜索", href: "/search" },
    { name: "收藏", href: "/favorites" },
  ],
  ruhang365: [
    { name: "入行365官网", href: "https://ruhang365.cn", external: true },
    { name: "入行日报", href: "https://daily.ruhang365.cn", external: true },
    { name: "入行之路", href: "https://rhzl.ruhang365.cn", external: true },
    { name: "会员中心", href: "https://ruhangcenter.ruhang365.cn", external: true },
  ],
  resources: [
    { name: "智能体设计模式", href: "https://adpc.ruhang365.cn", external: true },
    { name: "AI Coding 指南", href: "https://ruhangcodeguide.ruhang365.cn", external: true },
    { name: "什么值得用", href: "https://smzdy.ruhang365.cn", external: true },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="入行365"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-lg font-bold gradient-text">AIGC Prompt</span>
                <span className="block text-xs text-muted-foreground">入行从这里开始</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              353+ 个高质量 AI 图像生成提示词案例，13 套工业级模板，助你快速掌握 AI 绘图。
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://github.com/fzy2012/aigcprompt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">功能导航</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ruhang365 Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">入行365</h3>
            <ul className="space-y-3">
              {footerLinks.ruhang365.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">更多资源</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2017-{new Date().getFullYear()} 入行365. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              基于{" "}
              <a
                href="https://github.com/canghe/awesome-gpt-image-2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-cyan hover:underline"
              >
                awesome-gpt-image-2
              </a>{" "}
              项目构建
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
