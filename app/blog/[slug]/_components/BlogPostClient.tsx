'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, ArrowLeft, ChevronRight } from 'lucide-react'
import { getFeaturedImageUrl, formatDate, stripHtml, type WPPost } from '@/lib/wordpress'

const WP_BASE_URL = 'https://wp.takeharatatamiten.com/wp-json/wp/v2'

// ─── Skeleton ────────────────────────────────────────────

function Skeleton() {
  return (
    <>
      <div className="pt-16 md:pt-20" />
      <article className="max-w-3xl mx-auto px-6 sm:px-8 py-12 md:py-16">
        <div className="flex items-center gap-2 mb-8">
          <div className="skeleton h-3 w-10 rounded" />
          <div className="skeleton h-3 w-3 rounded" />
          <div className="skeleton h-3 w-14 rounded" />
          <div className="skeleton h-3 w-3 rounded" />
          <div className="skeleton h-3 w-36 rounded" />
        </div>
        <div className="skeleton h-3 w-28 rounded mb-4" />
        <div className="skeleton h-9 w-3/4 rounded mb-3" />
        <div className="skeleton h-7 w-1/2 rounded mb-10" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`skeleton h-4 rounded ${i % 3 === 2 ? 'w-3/4' : 'w-full'}`} />
          ))}
        </div>
      </article>
    </>
  )
}

// ─── Related card ─────────────────────────────────────────

function RelatedCard({ post }: { post: WPPost }) {
  const img = getFeaturedImageUrl(post)
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white border border-tatami-100 rounded-2xl overflow-hidden hover:border-tatami-200 hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-[16/9] overflow-hidden bg-tatami-50">
        {img ? (
          <img
            src={img}
            alt={stripHtml(post.title.rendered)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center seigaiha">
            <span className="text-tatami-200 text-4xl font-serif">畳</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="flex items-center gap-1.5 text-tatami-400 text-xs mb-1.5">
          <Calendar size={10} strokeWidth={1.5} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <p
          className="font-serif font-bold text-ink text-sm leading-snug group-hover:text-tatami-600 transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </div>
    </Link>
  )
}

// ─── Main ────────────────────────────────────────────────

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<WPPost | null>(null)
  const [related, setRelated] = useState<WPPost[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'notfound' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    setStatus('loading')
    let cancelled = false

    async function load() {
      const postUrl = `https://wp.takeharatatamiten.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`
      const relatedUrl = `${WP_BASE_URL}/posts?_embed&per_page=6`

      try {
        const [postRes, relatedRes] = await Promise.all([
          fetch(postUrl),
          fetch(relatedUrl),
        ])

        if (!postRes.ok) {
          console.error(`[BlogPostClient] post fetch failed: ${postRes.status} ${postRes.statusText} url=${postUrl}`)
          if (!cancelled) setStatus('error')
          return
        }

        const posts: WPPost[] = await postRes.json()

        if (!posts[0]) {
          console.error(`[BlogPostClient] post not found: slug=${slug} url=${postUrl}`)
          if (!cancelled) setStatus('notfound')
          return
        }

        const allPosts: WPPost[] = relatedRes.ok ? await relatedRes.json() : []

        if (!cancelled) {
          setPost(posts[0])
          setRelated(allPosts.filter(p => p.slug !== slug).slice(0, 3))
          setStatus('ok')
        }
      } catch (err) {
        console.error(`[BlogPostClient] fetch error: slug=${slug}`, err)
        if (!cancelled) setStatus('error')
      }
    }

    load()
    return () => { cancelled = true }
  }, [slug, attempt])

  // ── ローディング ──
  if (status === 'loading') return <Skeleton />

  // ── 記事なし ──
  if (status === 'notfound') {
    return (
      <div className="pt-16 md:pt-20 min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6 py-24 max-w-sm mx-auto">
          <div className="w-16 h-16 bg-tatami-50 border border-tatami-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-tatami-300 text-2xl font-serif">畳</span>
          </div>
          <h2 className="font-serif font-bold text-ink text-xl mb-3">記事が見つかりません</h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-tatami-500 text-sm hover:text-tatami-600 transition-colors"
          >
            <ArrowLeft size={15} />
            ブログ一覧へ戻る
          </Link>
        </div>
      </div>
    )
  }

  // ── エラー ──
  if (status === 'error') {
    return (
      <div className="pt-16 md:pt-20 min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6 py-24 max-w-sm mx-auto">
          <div className="w-16 h-16 bg-tatami-50 border border-tatami-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-tatami-300 text-2xl font-serif">畳</span>
          </div>
          <h2 className="font-serif font-bold text-ink text-xl mb-3">記事の読み込みに失敗しました</h2>
          <p className="text-muted text-sm mb-6">しばらく経ってから再度お試しください。</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setAttempt(n => n + 1)}
              className="px-6 py-2.5 bg-tatami-400 hover:bg-tatami-500 text-white text-sm font-medium rounded-full transition-colors"
            >
              再試行する
            </button>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-tatami-500 text-sm hover:text-tatami-600 transition-colors"
            >
              <ArrowLeft size={14} />
              ブログ一覧へ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!post) return null

  const img = getFeaturedImageUrl(post)
  const titleText = stripHtml(post.title.rendered)

  return (
    <>
      {/* Hero image or spacer */}
      {img ? (
        <div className="relative pt-16 md:pt-20 bg-tatami-900">
          <div
            className="max-w-4xl mx-auto overflow-hidden sm:rounded-b-2xl"
            style={{ maxHeight: '420px' }}
          >
            <img
              src={img}
              alt={titleText}
              className="w-full object-cover"
              style={{ maxHeight: '420px' }}
            />
          </div>
        </div>
      ) : (
        <div className="pt-16 md:pt-20" />
      )}

      <article className="max-w-3xl mx-auto px-6 sm:px-8 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav
          aria-label="パンくずリスト"
          className="flex items-center flex-wrap gap-1.5 text-xs text-muted mb-8"
        >
          <Link href="/" className="hover:text-tatami-500 transition-colors">
            トップ
          </Link>
          <ChevronRight size={12} className="text-tatami-200 flex-shrink-0" />
          <Link href="/blog" className="hover:text-tatami-500 transition-colors">
            ブログ
          </Link>
          <ChevronRight size={12} className="text-tatami-200 flex-shrink-0" />
          <span className="text-ink line-clamp-1">{titleText}</span>
        </nav>

        {/* Date */}
        <div className="flex items-center gap-2 text-tatami-400 text-xs mb-4">
          <Calendar size={13} strokeWidth={1.5} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        {/* Title */}
        <h1
          className="font-serif font-bold text-ink text-2xl md:text-3xl leading-snug mb-8"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Decorative divider */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-tatami-100" />
          <span className="text-tatami-300 text-xs font-serif">◆</span>
          <div className="h-px flex-1 bg-tatami-100" />
        </div>

        {/* Article body */}
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: post.content?.rendered ?? '' }}
        />

        {/* CTA */}
        <div className="mt-12 p-6 bg-tatami-50 border border-tatami-100 rounded-2xl text-center">
          <p className="font-serif font-bold text-ink text-base mb-1">
            畳のことならお気軽にご相談ください
          </p>
          <p className="text-muted text-sm mb-4">鹿児島県内全域対応（鹿児島市内は迅速対応）</p>
          <a
            href="tel:0992671577"
            className="inline-flex items-center gap-2 bg-tatami-400 hover:bg-tatami-500 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors"
          >
            📞 099-267-1577
          </a>
        </div>

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-tatami-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-tatami-500 text-sm hover:text-tatami-600 transition-colors"
          >
            <ArrowLeft size={15} />
            ブログ一覧へ戻る
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-14 bg-tatami-50 border-t border-tatami-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <h2 className="font-serif font-bold text-ink text-xl mb-8 flex items-center gap-3">
              <span className="h-5 w-0.5 bg-tatami-400 rounded-full" />
              関連記事
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map(p => (
                <RelatedCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
