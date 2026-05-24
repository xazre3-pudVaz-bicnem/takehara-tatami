'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { getFeaturedImageUrl, stripHtml, type WPWork, type WPWorksCategory } from '@/lib/wordpress'

const WP_BASE =
  process.env.NEXT_PUBLIC_WP_API_URL ??
  'https://wp.takeharatatamiten.com/wp-json/wp/v2'

// ─── Helpers ─────────────────────────────────────────────

function getFirstCategory(work: WPWork): WPWorksCategory | null {
  return work._embedded?.['wp:term']?.[0]?.[0] ?? null
}

function getLocation(work: WPWork): string {
  return work.meta?.location ?? work.acf?.location ?? ''
}

function getService(work: WPWork): string {
  return work.meta?.service ?? work.acf?.service ?? ''
}

// ─── Skeleton ────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-tatami-100 rounded-2xl overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-2.5">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
      </div>
    </div>
  )
}

// ─── Work Card ───────────────────────────────────────────

function WorkCard({ work, index }: { work: WPWork; index: number }) {
  const img = getFeaturedImageUrl(work)
  const titleText = stripHtml(work.title.rendered)
  const excerpt = stripHtml(work.excerpt?.rendered ?? '').slice(0, 80)
  const cat = getFirstCategory(work)
  const location = getLocation(work)
  const service = getService(work)
  const meta = [location, service].filter(Boolean).join(' ・ ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/works/${work.slug}`}
        className="work-card group block bg-white border border-tatami-100 rounded-2xl overflow-hidden hover:border-tatami-200 hover:shadow-xl hover:shadow-tatami-100/60 transition-all duration-400"
      >
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden relative">
          {img ? (
            <img
              src={img}
              alt={titleText}
              loading="lazy"
              className="work-card-img w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-tatami-100 to-tatami-50 relative">
              <div className="absolute inset-0 tatami-grain opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-tatami-300 text-7xl font-serif select-none">畳</span>
              </div>
            </div>
          )}
          {cat && (
            <div className="absolute top-3 left-3">
              <span className="text-[10px] bg-white/90 backdrop-blur-sm text-tatami-600 font-medium px-2.5 py-1 rounded-full shadow-sm">
                {cat.name}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          <h2 className="font-serif font-bold text-ink text-base leading-snug mb-1.5 group-hover:text-tatami-600 transition-colors line-clamp-1">
            {titleText}
          </h2>
          {meta && <p className="text-muted text-xs mb-3">{meta}</p>}
          {excerpt && (
            <p className="text-muted text-sm leading-relaxed line-clamp-2">
              {excerpt}{excerpt.length >= 80 ? '…' : ''}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Main ────────────────────────────────────────────────

export function WorksListClient() {
  const [works, setWorks] = useState<WPWork[]>([])
  const [categories, setCategories] = useState<WPWorksCategory[]>([])
  const [active, setActive] = useState<number | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    async function load() {
      try {
        const [worksRes, catsRes] = await Promise.all([
          fetch(`${WP_BASE}/works?_embed&per_page=24`),
          fetch(`${WP_BASE}/works_category?per_page=50`),
        ])
        const worksData: WPWork[] = worksRes.ok ? await worksRes.json() : []
        const catsData: WPWorksCategory[] = catsRes.ok ? await catsRes.json() : []
        if (!cancelled) {
          setWorks(worksData)
          setCategories(catsData)
          setStatus('ok')
        }
      } catch (e) {
        console.error('[WorksListClient] fetch error:', e)
        if (!cancelled) setStatus('error')
      }
    }

    load()
    return () => { cancelled = true }
  }, [attempt])

  const filtered =
    active === null ? works : works.filter(w => w.works_category?.includes(active))

  // ── ローディング ──
  if (status === 'loading') {
    return (
      <>
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </>
    )
  }

  // ── エラー ──
  if (status === 'error') {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 bg-tatami-50 border border-tatami-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-tatami-300 text-2xl font-serif">畳</span>
        </div>
        <p className="text-ink font-serif font-bold text-lg mb-2">施工事例の読み込みに失敗しました</p>
        <p className="text-muted text-sm mb-6">しばらく経ってから再度お試しください。</p>
        <button
          onClick={() => setAttempt(n => n + 1)}
          className="text-tatami-500 text-sm hover:text-tatami-600 transition-colors underline"
        >
          再試行する
        </button>
      </div>
    )
  }

  // ── 施工事例なし ──
  if (works.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 bg-tatami-50 border border-tatami-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-tatami-300 text-2xl font-serif">畳</span>
        </div>
        <p className="text-ink font-serif font-bold text-lg mb-2">現在、施工事例を準備中です。</p>
        <p className="text-muted text-sm">施工が完了次第、順次公開いたします。</p>
      </div>
    )
  }

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === null
              ? 'bg-tatami-400 text-white shadow-sm'
              : 'bg-white border border-tatami-200 text-ink hover:border-tatami-400'
          }`}
        >
          すべて
          <span className={`ml-1.5 text-xs ${active === null ? 'text-white/70' : 'text-muted'}`}>
            {works.length}
          </span>
        </button>
        {categories.map(cat => {
          const count = works.filter(w => w.works_category?.includes(cat.id)).length
          if (count === 0) return null
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === cat.id
                  ? 'bg-tatami-400 text-white shadow-sm'
                  : 'bg-white border border-tatami-200 text-ink hover:border-tatami-400'
              }`}
            >
              {cat.name}
              <span className={`ml-1.5 text-xs ${active === cat.id ? 'text-white/70' : 'text-muted'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active ?? 'all'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="text-center text-muted text-sm py-16">該当する施工事例はありません。</p>
      )}

      {/* Bottom CTA */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-muted text-sm mb-2">施工写真は随時追加予定です</p>
        <p className="text-muted text-sm mb-5">実際の施工事例はお電話でもご紹介できます</p>
        <a href="tel:0992671577" className="font-bold text-tatami-500 text-xl hover:text-tatami-600 transition-colors">
          099-267-1577
        </a>
      </motion.div>
    </>
  )
}
