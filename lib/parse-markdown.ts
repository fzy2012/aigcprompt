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

  // 按 *** 分割案例块
  const blocks = content.split(/\*{3,}/)
  
  for (const block of blocks) {
    // 匹配案例ID
    const idMatch = block.match(/<a name="case-(\d+)"><\/a>/)
    if (!idMatch) continue
    
    const id = parseInt(idMatch[1])
    
    // 匹配标题
    const titleMatch = block.match(/###\s*例\s*\d+[：:]\s*(.+)/)
    if (!titleMatch) continue
    const title = titleMatch[1].trim()
    
    // 匹配图片
    const imageMatch = block.match(/!\[.*?\]\(([^)]+)\)/)
    if (!imageMatch) continue
    let imagePath = imageMatch[1].trim()
    if (imagePath.startsWith("../")) {
      imagePath = imagePath.replace("../", "/")
    }
    
    // 匹配来源
    const sourceMatch = block.match(/\*\*来源[：:]\*\*\s*(.+)/)
    const source = sourceMatch ? sourceMatch[1].trim() : "未提供"
    
    // 匹配提示词
    const promptMatch = block.match(/```(?:text|json)?\s*\n([\s\S]+?)```/)
    if (!promptMatch) continue
    const prompt = promptMatch[1].trim()
    
    cases.push({
      id,
      title,
      image: imagePath,
      source,
      prompt,
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

  // 按 <a name="tpl- 分割模板块
  const tplBlocks = content.split(/<a name="tpl-/)
  
  for (const block of tplBlocks) {
    if (!block.includes('"></a>')) continue
    
    // 提取 ID
    const idMatch = block.match(/^(\w+)"><\/a>/)
    if (!idMatch) continue
    const id = idMatch[1]
    
    // 提取名称
    const nameMatch = block.match(/###\s*(.+)/)
    if (!nameMatch) continue
    const name = nameMatch[1].trim()
    
    // 提取常规模板 - 第一个 ```text 块
    const basicMatch = block.match(/\*\*常规模板\*\*[\s\S]*?```text\s*\n([\s\S]+?)```/)
    const basicTemplate = basicMatch ? basicMatch[1].trim() : ""
    
    // 提取 JSON 模板
    const jsonMatch = block.match(/```json\s*\n([\s\S]+?)```/)
    const jsonTemplate = jsonMatch ? jsonMatch[1].trim() : undefined
    
    // 提取避坑指南
    const tips: string[] = []
    const tipsSection = block.match(/\*\*避坑指南\*\*[\s\S]*?((?:- \*\*.+\n?)+)/)
    if (tipsSection) {
      const tipPattern = /- \*\*(.+?)\*\*[：:]\s*(.+)/g
      let tipMatch
      while ((tipMatch = tipPattern.exec(tipsSection[1])) !== null) {
        tips.push(`${tipMatch[1]}：${tipMatch[2]}`)
      }
    }
    
    if (basicTemplate) {
      templates.push({
        id,
        name,
        description: `${name}类型的工业级提示词模板`,
        basicTemplate,
        jsonTemplate,
        tips,
      })
    }
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
