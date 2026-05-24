/**
 * WordPress REST API helpers (server-side)
 *
 * NEXT_PUBLIC_ 変数はビルド時インライン化のため、サーバー専用に
 * WP_API_URL (非公開) を優先し、ハードコード URL を最終フォールバックとする。
 */

// サーバーサイド専用: ビルド時インライン化されない通常の環境変数を優先
const WP_BASE = (
  process.env.WP_API_URL ||
  process.env.NEXT_PUBLIC_WP_API_URL ||
  'https://wp.takeharatatamiten.com/wp-json/wp/v2'
).replace(/\/$/, '')

// WordPress が非ブラウザ UA をブロックする場合に備えてヘッダーを付与
const WP_HEADERS: HeadersInit = {
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0 (compatible; TakeharaTatami-NextJS/1.0)',
}

// ─── Types ───────────────────────────────────────────────

export interface WPFeaturedMedia {
  source_url: string
  alt_text: string
  media_details?: {
    sizes?: {
      medium?: { source_url: string }
      medium_large?: { source_url: string }
      large?: { source_url: string }
      full?: { source_url: string }
    }
  }
}

export interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string; protected: boolean }
  content: { rendered: string; protected: boolean }
  date: string
  modified: string
  link: string
  yoast_head_json?: {
    title?: string
    description?: string
    og_image?: Array<{ url: string; width: number; height: number }>
  }
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[]
    author?: Array<{ name: string; avatar_urls?: Record<string, string> }>
  }
}

export interface WPWork {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  acf?: {
    category?: string
    location?: string
    service?: string
    before_image?: string
    after_image?: string
  }
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[]
  }
}

// ─── Helpers ─────────────────────────────────────────────

export function getFeaturedImageUrl(item: WPPost | WPWork): string | null {
  const media = item._embedded?.['wp:featuredmedia']?.[0]
  if (!media) return null
  return (
    media.media_details?.sizes?.large?.source_url ??
    media.media_details?.sizes?.medium_large?.source_url ??
    media.source_url
  )
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z#0-9]+;/gi, ' ').trim()
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── Blog Posts (server-side) ────────────────────────────

export async function getPosts(perPage = 10): Promise<WPPost[]> {
  try {
    const res = await fetch(`${WP_BASE}/posts?_embed&per_page=${perPage}`, {
      headers: WP_HEADERS,
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.error(`[WP] getPosts failed: ${res.status} ${res.statusText}`)
      return []
    }
    return res.json()
  } catch (e) {
    console.error('[WP] getPosts error:', e)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${WP_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`,
      { headers: WP_HEADERS, next: { revalidate: 3600 } },
    )
    if (!res.ok) {
      console.error(`[WP] getPostBySlug failed: ${res.status}`)
      return null
    }
    const posts: WPPost[] = await res.json()
    return posts[0] ?? null
  } catch (e) {
    console.error('[WP] getPostBySlug error:', e)
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${WP_BASE}/posts?per_page=100&_fields=slug`, {
      headers: WP_HEADERS,
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const posts: Array<{ slug: string }> = await res.json()
    return posts.map(p => p.slug)
  } catch {
    return []
  }
}

// ─── Works (施工事例) ────────────────────────────────────

export async function getWorks(perPage = 12): Promise<WPWork[]> {
  try {
    const res = await fetch(`${WP_BASE}/works?_embed&per_page=${perPage}`, {
      headers: WP_HEADERS,
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function getWorkBySlug(slug: string): Promise<WPWork | null> {
  try {
    const res = await fetch(
      `${WP_BASE}/works?slug=${encodeURIComponent(slug)}&_embed`,
      { headers: WP_HEADERS, next: { revalidate: 3600 } },
    )
    if (!res.ok) return null
    const works: WPWork[] = await res.json()
    return works[0] ?? null
  } catch {
    return null
  }
}
