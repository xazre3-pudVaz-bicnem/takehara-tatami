'use client'

/**
 * トップページ ブログ一覧
 *
 * サーバーサイド fetch (lib/wordpress.ts) は Vercel → WordPress 間で
 * WAF にブロックされるため、/blog と同様にブラウザから直接取得する。
 */

import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SectionTitle from './ui/SectionTitle'
import { getFeaturedImageUrl, formatDate, stripHtml, type WPPost } from '@/lib/wordpress'

// /blog と同じ || パターンで空文字・未設定どちらもフォールバックする
const WP_API =
  (process.env.NEXT_PUBLIC_WP_API_URL || '').replace(/\/$/, '') ||
  'https://wp.takeharatatamiten.com/wp-json/wp/v2'

// ─── Skeleton ────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="aspect-video skeleton" />
      <div className="p-5 space-y-2">
        <div className="h-3 w-20 skeleton rounded" />
        <div className="h-5 skeleton rounded" />
        <div className="h-4 w-4/5 skeleton rounded" />
      </div>
    </div>
  )
}

// ─── Card ────────────────────────────────────────────────

function PostCard({ post, index }: { post: WPPost; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const img = getFeaturedImageUrl(post)

  return (
    <motion.article
      ref={ref}
      className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          {img ? (
            <Image
              src={img}
              alt={stripHtml(post.title.rendered)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-tatami-100 to-tatami-200 flex items-center justify-center">
              <span className="font-serif text-tatami-300 text-4xl">畳</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <time className="text-muted text-xs">{formatDate(post.date)}</time>
          <h3
            className="font-serif font-bold text-ink text-base mt-1.5 mb-2 group-hover:text-tatami-500 transition-colors line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p className="text-muted text-sm leading-relaxed line-clamp-2">
            {stripHtml(post.excerpt?.rendered ?? '')}
          </p>
          <span className="inline-flex items-center gap-1 text-tatami-500 text-xs font-medium mt-3">
            続きを読む
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

// ─── Main ────────────────────────────────────────────────

export default function BlogPreview() {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    fetch(`${WP_API}/posts?_embed&per_page=3`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<WPPost[]>
      })
      .then(data => {
        setPosts(data)
        setStatus('ok')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [])

  const blogLink = (
    <div className="text-center">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 border border-tatami-300 text-tatami-600 hover:bg-tatami-50 px-8 py-3 rounded-full font-medium text-sm transition-colors duration-200"
      >
        ブログ一覧を見る
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )

  return (
    <section id="blog" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="BLOG"
          ja="ブログ・お知らせ"
          description="畳に関するお役立ち情報や施工のご報告をお届けします。"
        />

        {/* ── ローディング ── */}
        {status === 'loading' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
            {[0, 1, 2].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── 記事一覧 ── */}
        {status === 'ok' && posts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
            {posts.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
          </div>
        )}

        {/* ── 記事なし ── */}
        {status === 'ok' && posts.length === 0 && (
          <motion.div
            className="text-center py-16 bg-white rounded-2xl border border-tatami-100 mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 bg-tatami-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-serif text-tatami-300 text-2xl">畳</span>
            </div>
            <p className="font-serif text-ink font-bold mb-2">ブログは近日公開予定です</p>
            <p className="text-muted text-sm">畳に関するお役立ち情報を準備中です。</p>
          </motion.div>
        )}

        {/* ── エラー ── */}
        {status === 'error' && (
          <motion.div
            className="text-center py-16 bg-white rounded-2xl border border-tatami-100 mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 bg-tatami-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="font-serif text-tatami-300 text-2xl">畳</span>
            </div>
            <p className="font-serif text-ink font-bold mb-2">ブログは近日公開予定です</p>
            <p className="text-muted text-sm">ブログ記事の取得に失敗しました。しばらくお待ちください。</p>
          </motion.div>
        )}

        {status !== 'loading' && blogLink}
      </div>
    </section>
  )
}
