'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { getFeaturedImageUrl, formatDate, stripHtml, type WPPost } from '@/lib/wordpress'

const WP_POSTS_URL =
  'https://wp.takeharatatamiten.com/wp-json/wp/v2/posts?_embed&per_page=12'

// ─── Skeleton ────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white border border-tatami-100 rounded-2xl overflow-hidden">
      <div className="aspect-[16/9] skeleton flex-shrink-0" />
      <div className="flex flex-col flex-1 p-6 space-y-2.5">
        <div className="skeleton h-3 w-28 rounded" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="skeleton h-3 w-full rounded mt-1" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="skeleton h-3 w-24 rounded mt-2" />
      </div>
    </div>
  )
}

// ─── Card ────────────────────────────────────────────────

function PostCard({ post, index }: { post: WPPost; index: number }) {
  const img = getFeaturedImageUrl(post)
  const excerpt = stripHtml(post.excerpt?.rendered ?? '').slice(0, 90)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card-anim group flex flex-col bg-white border border-tatami-100 rounded-2xl overflow-hidden hover:border-tatami-200 hover:shadow-xl hover:shadow-tatami-100/60 transition-all duration-300"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <div className="aspect-[16/9] bg-tatami-50 overflow-hidden flex-shrink-0">
        {img ? (
          <img
            src={img}
            alt={stripHtml(post.title.rendered)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-tatami-100 to-tatami-50 seigaiha">
            <span className="text-tatami-300 text-5xl font-serif select-none">畳</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <p className="flex items-center gap-1.5 text-tatami-400 text-xs mb-3">
          <Calendar size={11} strokeWidth={1.5} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h2
          className="font-serif font-bold text-ink text-base leading-snug mb-3 group-hover:text-tatami-600 transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {excerpt && (
          <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1">
            {excerpt}
            {excerpt.length >= 90 ? '…' : ''}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-tatami-50 flex items-center gap-1.5 text-tatami-500 text-xs font-medium">
          <span>続きを読む</span>
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </div>
      </div>
    </Link>
  )
}

// ─── Main ────────────────────────────────────────────────

export function BlogListClient() {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    fetch(WP_POSTS_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
        return res.json() as Promise<WPPost[]>
      })
      .then(data => {
        setPosts(data)
        setStatus('ok')
      })
      .catch(err => {
        console.error('[BlogListClient] fetch error:', err)
        setStatus('error')
      })
  }, [])

  // ── ローディング ──
  if (status === 'loading') {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  // ── エラー ──
  if (status === 'error') {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 bg-tatami-50 border border-tatami-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-tatami-300 text-2xl font-serif">畳</span>
        </div>
        <p className="text-ink font-serif font-bold text-lg mb-2">記事の読み込みに失敗しました</p>
        <p className="text-muted text-sm mb-6">しばらく経ってから再度お試しください。</p>
        <button
          onClick={() => {
            setStatus('loading')
            fetch(WP_POSTS_URL)
              .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`)
                return r.json()
              })
              .then(data => { setPosts(data); setStatus('ok') })
              .catch(err => { console.error('[BlogListClient] retry error:', err); setStatus('error') })
          }}
          className="text-tatami-500 text-sm hover:text-tatami-600 transition-colors underline"
        >
          再試行する
        </button>
      </div>
    )
  }

  // ── 記事なし ──
  if (posts.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 bg-tatami-50 border border-tatami-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-tatami-300 text-2xl font-serif">畳</span>
        </div>
        <p className="text-ink font-serif font-bold text-lg mb-2">近日公開予定</p>
        <p className="text-muted text-sm">畳に関するお役立ち情報を準備中です。</p>
      </div>
    )
  }

  // ── 記事一覧 ──
  return (
    <>
      <p className="text-right text-xs text-muted mb-6">{posts.length}件の記事</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </>
  )
}
