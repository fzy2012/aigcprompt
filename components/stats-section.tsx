"use client"

import { useEffect, useState } from "react"
import { FileImage, LayoutTemplate, Layers } from "lucide-react"

interface StatsSectionProps {
  casesCount: number
  templatesCount: number
  categoriesCount: number
}

function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(easeOutQuart * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])

  return <span>{displayValue}+</span>
}

export function StatsSection({
  casesCount,
  templatesCount,
  categoriesCount,
}: StatsSectionProps) {
  const stats = [
    {
      icon: FileImage,
      value: casesCount,
      label: "提示词案例",
      description: "真实可用的高质量案例",
    },
    {
      icon: LayoutTemplate,
      value: templatesCount,
      label: "工业级模板",
      description: "开箱即用的专业模板",
    },
    {
      icon: Layers,
      value: categoriesCount,
      label: "应用分类",
      description: "覆盖主流使用场景",
    },
  ]

  return (
    <section className="py-16 border-y border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center mb-4">
                <stat.icon className="w-7 h-7 text-brand-cyan" />
              </div>
              <div className="text-4xl font-bold gradient-text">
                <AnimatedNumber value={stat.value} />
              </div>
              <div className="mt-2 text-lg font-medium text-foreground">
                {stat.label}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
