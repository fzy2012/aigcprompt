import fs from "fs"
import path from "path"

export interface PromptCase {
  id: number
  title: string
  image: string
  source: string
  prompt: string
  category: string
}

export interface Template {
  id: string
  name: string
  description: string
  basicTemplate: string
  jsonTemplate?: string
  tips: string[]
}

export interface Category {
  name: string
  count: number
  slug: string
}

// 分类映射
const categoryMap: Record<string, string> = {
  信息图: "infographic",
  社媒: "social-media",
  海报: "poster",
  UI: "ui",
  界面: "ui",
  电商: "ecommerce",
  商品: "ecommerce",
  品牌: "brand",
  标志: "brand",
  建筑: "architecture",
  空间: "architecture",
  摄影: "photography",
  写实: "photography",
  插画: "illustration",
  艺术: "illustration",
  人物: "character",
  角色: "character",
  场景: "scene",
  叙事: "scene",
  历史: "historical",
  古风: "historical",
  文档: "document",
  出版物: "document",
  其他: "other",
}

// 从标题推断分类
function inferCategory(title: string): string {
  for (const [keyword, slug] of Object.entries(categoryMap)) {
    if (title.includes(keyword)) {
      return slug
    }
  }
  return "other"
}

// 解析画廊 Markdown 文件
export async function parseGalleryMarkdown(filePath: string): Promise<PromptCase[]> {
  const fullPath = path.join(process.cwd(), filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`)
    return []
  }
  
  const content = fs.readFileSync(fullPath, "utf-8")
  const cases: PromptCase[] = []

  // 匹配每个案例块
  const casePattern = /<a name="case-(\d+)"><\/a>\s*###\s*例\s*\d+[：:]\s*(.+?)\n\n!\[.+?\]\(([^)]+)\)\n\n\*\*来源[：:]\*\*\s*(.+?)\n\n\*\*提示词[：:]\*\*\s*\n\n```(?:text|json)?\n([\s\S]+?)```/g

  let match
  while ((match = casePattern.exec(content)) !== null) {
    const [, id, title, image, source, prompt] = match
    
    // 处理图片路径
    let imagePath = image.trim()
    if (imagePath.startsWith("../")) {
      imagePath = imagePath.replace("../", "/")
    }
    
    cases.push({
      id: parseInt(id),
      title: title.trim(),
      image: imagePath,
      source: source.trim(),
      prompt: prompt.trim(),
      category: inferCategory(title),
    })
  }

  return cases
}

// 解析模板 Markdown 文件
export async function parseTemplatesMarkdown(filePath: string): Promise<Template[]> {
  const fullPath = path.join(process.cwd(), filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`)
    return []
  }
  
  const content = fs.readFileSync(fullPath, "utf-8")
  const templates: Template[] = []

  // 模板部分的标题模式
  const sectionPattern = /<a name="tpl-(\w+)"><\/a>\s*###\s*(.+?)\n\n\*\*常规模板\*\*\s*\n\n```text\n([\s\S]+?)```(?:\s*\n\n\*\*JSON 进阶模板[^*]*\*\*\s*\n\n```json\n([\s\S]+?)```)?(?:\s*\n\n\*\*避坑指南\*\*\s*\n([\s\S]+?)(?=\n###|\n<a name|$))?/g

  let match
  while ((match = sectionPattern.exec(content)) !== null) {
    const [, id, name, basicTemplate, jsonTemplate, tipsSection] = match
    
    // 解析避坑指南
    const tips: string[] = []
    if (tipsSection) {
      const tipPattern = /- \*\*(.+?)\*\*[：:]\s*(.+)/g
      let tipMatch
      while ((tipMatch = tipPattern.exec(tipsSection)) !== null) {
        tips.push(`${tipMatch[1]}：${tipMatch[2]}`)
      }
    }

    templates.push({
      id,
      name: name.trim(),
      description: `${name}类型的工业级提示词模板`,
      basicTemplate: basicTemplate.trim(),
      jsonTemplate: jsonTemplate?.trim(),
      tips,
    })
  }

  return templates
}

// 获取所有案例
export async function getAllCases(): Promise<PromptCase[]> {
  const part1 = await parseGalleryMarkdown("docs/gallery-part-1.md")
  const part2 = await parseGalleryMarkdown("docs/gallery-part-2.md")
  return [...part1, ...part2]
}

// 获取分类统计
export async function getCategories(): Promise<Category[]> {
  const cases = await getAllCases()
  const categoryCount: Record<string, number> = {}

  for (const c of cases) {
    categoryCount[c.category] = (categoryCount[c.category] || 0) + 1
  }

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

  return Object.entries(categoryCount)
    .map(([slug, count]) => ({
      name: categoryNames[slug] || slug,
      count,
      slug,
    }))
    .sort((a, b) => b.count - a.count)
}

// 获取所有模板
export async function getAllTemplates(): Promise<Template[]> {
  return parseTemplatesMarkdown("docs/templates.md")
}
