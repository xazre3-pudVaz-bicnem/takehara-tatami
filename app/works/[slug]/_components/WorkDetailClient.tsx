'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Scissors, Calendar, Tag } from 'lucide-react'
import {
  getFeaturedImageUrl,
  formatDate,
  stripHtml,
  type WPWork,
  type WPWorksCategory,
} from '@/lib/wordpress'

const WP_BASE =
  process.env.NEXT_PUBLIC_WP_API_URL ??
  'https://wp.takeharatatamiten.com/wp-json/wp/v2'

// ─── Helpers ─────────────────────────────────────────────

function getCategories(work: WPWork): WPWorksCategory[] {
  return work._embedded?.['wp:term']?.[0] ?? []
}

function getLocation(work: WPWork): string {
  return work.meta?.location ?? work.acf?.location ?? ''
}

function getService(work: WPWork): string {
  return work.meta?.service ?? work.acf?.service ?? ''
}

// ─── Skeleton ────────────────────────────────────────────

function Skeleton() {
  return (
    <>
      <div className="pt-16 md:pt-20 bg-tatami-900">
        <div className="max-w-5xl mx-auto px-0 sm:px-8">
          <div className="skeleton sm:rounded-b-2xl" style={{ height: 420 }} />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 md:py-16">
        <div className="skeleton h-3 w-48 rounded mb-8" />
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="skeleton h-3 w-24 rounded" />
            <div className="skeleton h-8 w-3/4 rounded" />
            <div className="skeleton h-3 w-40 rounded" />
            <div className="skeleton h-32 rounded-2xl mt-6" />
          </div>
          <div className="space-y-5">
            <div className="skeleton h-48 rounded-2xl" />
            <div className="skeleton h-36 rounded-2xl" />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Related card ─────────────────────────────────────────

function RelatedCard({ work }: { work: WPWork }) {
  const img = getFeaturedImageUrl(work)
  const cat = work._embedded?.['wp:term']?.[0]?.[0]
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group block bg-white border border-tatami-100 rounded-2xl overflow-hidden hover:border-tatami-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={stripHtml(work.title.rendered)}
            loading="lazy"
            className="work-card-img w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-tatami-100 to-tatami-50 relative">
            <div className="absolute inset-0 tatami-grain opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-tatami-300 text-5xl font-serif">畳</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        {cat && <p className="text-muted text-xs mb-1">{cat.name}</p>}
        <p className="font-serif font-bold text-ink text-sm group-hover:text-tatami-600 transition-colors line-clamp-2">
          {stripHtml(work.title.rendered)}
        </p>
      </div>
    </Link>
  )
}

// ─── FadeIn wrapper ───────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Main ────────────────────────────────────────────────

export default function WorkDetailClient({ slug }: { slug: string }) {
  const [work, setWork] = useState<WPWork | null>(null)
  const [related, setRelated] = useState<WPWork[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'notfound' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    async function load() {
      try {
        const workRes = await fetch(
          `${WP_BASE}/works?slug=${encodeURIComponent(slug)}&_embed`,
        )
        if (!workRes.ok) {
          if (!cancelled) setStatus('error')
          return
        }
        const works: WPWork[] = await workRes.json()
        if (!works[0]) {
          if (!cancelled) setStatus('notfound')
          return
        }

        const found = works[0]
        const categoryIds = found.works_category ?? []

        // 関連施工事例: 同カテゴリー優先
        let relatedWorks: WPWork[] = []
        if (categoryIds.length > 0) {
          const relRes = await fetch(
            `${WP_BASE}/works?_embed&per_page=4&works_category=${categoryIds[0]}&exclude=${found.id}`,
          )
          if (relRes.ok) relatedWorks = await relRes.json()
        }
        // 同カテゴリーが足りなければ他からも補完
        if (relatedWorks.length < 3) {
          const fallRes = await fetch(
            `${WP_BASE}/works?_embed&per_page=6&exclude=${found.id}`,
          )
          if (fallRes.ok) {
            const fallbacks: WPWork[] = await fallRes.json()
            const existing = new Set(relatedWorks.map(w => w.id))
            for (const w of fallbacks) {
              if (!existing.has(w.id) && relatedWorks.length < 3) {
                relatedWorks.push(w)
                existing.add(w.id)
              }
            }
          }
        }

        if (!cancelled) {
          setWork(found)
          setRelated(relatedWorks.slice(0, 3))
          setStatus('ok')
        }
      } catch (e) {
        console.error('[WorkDetailClient] fetch error:', e)
        if (!cancelled) setStatus('error')
      }
    }

    load()
    return () => { cancelled = true }
  }, [slug, attempt])

  // ── ローディング ──
  if (status === 'loading') return <Skeleton />

  // ── 見つからない ──
  if (status === 'notfound') {
    return (
      <div className="pt-16 md:pt-20 min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6 py-24 max-w-sm mx-auto">
          <div className="w-16 h-16 bg-tatami-50 border border-tatami-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-tatami-300 text-2xl font-serif">畳</span>
          </div>
          <h2 className="font-serif font-bold text-ink text-xl mb-3">施工事例が見つかりません</h2>
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-tatami-500 text-sm hover:text-tatami-600 transition-colors"
          >
            <ArrowLeft size={15} />
            施工事例一覧へ戻る
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
          <h2 className="font-serif font-bold text-ink text-xl mb-3">読み込みに失敗しました</h2>
          <p className="text-muted text-sm mb-6">しばらく経ってから再度お試しください。</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setAttempt(n => n + 1)}
              className="px-6 py-2.5 bg-tatami-400 hover:bg-tatami-500 text-white text-sm font-medium rounded-full transition-colors"
            >
              再試行する
            </button>
            <Link
              href="/works"
              className="inline-flex items-center gap-1.5 text-tatami-500 text-sm hover:text-tatami-600 transition-colors"
            >
              <ArrowLeft size={14} />
              一覧へ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!work) return null

  const img = getFeaturedImageUrl(work)
  const titleText = stripHtml(work.title.rendered)
  const cats = getCategories(work)
  const location = getLocation(work)
  const service = getService(work)

  return (
    <main className="bg-white">
      {/* Hero image */}
      <div className="relative pt-16 md:pt-20 bg-tatami-900">
        <div className="max-w-5xl mx-auto px-0 sm:px-8">
          <div className="overflow-hidden sm:rounded-b-2xl" style={{ maxHeight: '520px' }}>
            {img ? (
              <motion.img
                src={img}
                alt={titleText}
                className="w-full object-cover"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ maxHeight: '520px' }}
              />
            ) : (
              <motion.div
                className="w-full flex items-center justify-center relative bg-gradient-to-br from-tatami-800 to-tatami-900"
                style={{ height: '420px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <div className="absolute inset-0 tatami-grain opacity-30" />
                <div className="relative z-10 text-center">
                  <span className="text-white/20 text-[120px] md:text-[180px] font-serif leading-none select-none">畳</span>
                  <p className="text-white/40 text-sm mt-2">施工写真は準備中です</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 md:py-16">
        {/* Breadcrumb */}
        <FadeIn>
          <nav className="flex items-center gap-2 text-xs text-muted mb-8 flex-wrap">
            <Link href="/" className="hover:text-tatami-500 transition-colors">トップ</Link>
            <span>/</span>
            <Link href="/works" className="hover:text-tatami-500 transition-colors">施工事例</Link>
            <span>/</span>
            <span className="text-ink line-clamp-1">{titleText}</span>
          </nav>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="md:col-span-2">
            <FadeIn>
              {/* Categories */}
              {cats.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {cats.map(cat => (
                    <span
                      key={cat.id}
                      className="text-xs bg-tatami-50 border border-tatami-200 text-tatami-600 px-3 py-1 rounded-full"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-serif font-bold text-ink text-2xl md:text-3xl leading-snug mb-3">
                {titleText}
              </h1>

              {(location || service) && (
                <p className="text-muted text-sm mb-2">
                  {[location, service].filter(Boolean).join(' ・ ')}
                </p>
              )}

              <p className="text-muted text-xs mb-8 flex items-center gap-1.5">
                <Calendar size={12} strokeWidth={1.5} />
                <time dateTime={work.date}>{formatDate(work.date)}</time>
              </p>
            </FadeIn>

            {/* Article body */}
            {work.content?.rendered ? (
              <FadeIn delay={0.1}>
                <div
                  className="wp-content mb-8"
                  dangerouslySetInnerHTML={{ __html: work.content.rendered }}
                />
              </FadeIn>
            ) : work.excerpt?.rendered ? (
              <FadeIn delay={0.1}>
                <div className="bg-tatami-50 border border-tatami-100 rounded-2xl p-6 mb-8">
                  <p className="text-ink text-base leading-loose font-serif italic">
                    {stripHtml(work.excerpt.rendered)}
                  </p>
                </div>
              </FadeIn>
            ) : null}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <FadeIn delay={0.2}>
              <div className="bg-white border border-tatami-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif font-bold text-ink text-base mb-5">施工詳細</h3>
                <div className="space-y-4">
                  {location && (
                    <div className="flex items-start gap-3">
                      <MapPin size={15} strokeWidth={1.5} className="text-tatami-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-muted text-xs mb-0.5">エリア</p>
                        <p className="text-ink text-sm font-medium">{location}</p>
                      </div>
                    </div>
                  )}
                  {location && service && <div className="h-px bg-tatami-50" />}
                  {service && (
                    <div className="flex items-start gap-3">
                      <Scissors size={15} strokeWidth={1.5} className="text-tatami-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-muted text-xs mb-0.5">施工内容</p>
                        <p className="text-ink text-sm font-medium">{service}</p>
                      </div>
                    </div>
                  )}
                  {cats.length > 0 && (
                    <>
                      {(location || service) && <div className="h-px bg-tatami-50" />}
                      <div className="flex items-start gap-3">
                        <Tag size={15} strokeWidth={1.5} className="text-tatami-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-muted text-xs mb-1">カテゴリー</p>
                          <div className="flex flex-wrap gap-1">
                            {cats.map(cat => (
                              <span key={cat.id} className="text-xs bg-tatami-50 border border-tatami-100 text-tatami-600 px-2.5 py-0.5 rounded-full">
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="bg-tatami-50 border border-tatami-100 rounded-2xl p-6">
                <p className="font-serif font-bold text-ink text-sm mb-2">同様の施工をご検討の方へ</p>
                <p className="text-muted text-xs leading-relaxed mb-4">現地確認・お見積もりは無料です。</p>
                <div className="space-y-2">
                  <a
                    href="tel:0992671577"
                    className="flex items-center justify-center gap-2 bg-tatami-400 hover:bg-tatami-500 text-white text-sm font-medium py-3 rounded-xl transition-colors w-full"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                    </svg>
                    099-267-1577
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center border border-tatami-200 text-tatami-600 hover:bg-white text-sm py-3 rounded-xl transition-colors w-full"
                  >
                    フォームで問い合わせ
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Related works */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-tatami-100">
            <FadeIn>
              <h2 className="font-serif font-bold text-ink text-xl mb-8">関連施工事例</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((w, i) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <RelatedCard work={w} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <FadeIn className="mt-10">
          <Link href="/works" className="inline-flex items-center gap-2 text-tatami-500 text-sm hover:text-tatami-600 transition-colors">
            <ArrowLeft size={16} />
            施工事例一覧へ戻る
          </Link>
        </FadeIn>
      </div>
    </main>
  )
}
