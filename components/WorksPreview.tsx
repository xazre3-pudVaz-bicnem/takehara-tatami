'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import SectionTitle from './ui/SectionTitle'
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

// ─── Skeleton ────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-20 rounded" />
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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  const img = getFeaturedImageUrl(work)
  const titleText = stripHtml(work.title.rendered)
  const excerpt = stripHtml(work.excerpt?.rendered ?? '').slice(0, 80)
  const cat = getFirstCategory(work)
  const location = getLocation(work)

  return (
    <motion.div
      ref={ref}
      className="work-card group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-400"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={titleText}
            loading="lazy"
            className="work-card-img w-full h-full object-cover"
          />
        ) : (
          <div className="work-card-img w-full h-full bg-gradient-to-br from-tatami-100 to-tatami-50 relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(255,255,255,0.3) 7px, rgba(255,255,255,0.3) 8px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,0.2) 15px, rgba(255,255,255,0.2) 16px)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-tatami-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        )}
        {/* Category badge */}
        {cat && (
          <div className="absolute top-3 left-3">
            <span className="bg-tatami-400/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
              {cat.name}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-serif font-bold text-ink text-sm mb-1 line-clamp-1">{titleText}</h3>
        {location && (
          <p className="text-muted text-xs mb-1.5 flex items-center gap-1">
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {location}
          </p>
        )}
        {excerpt && (
          <p className="text-muted text-xs leading-relaxed line-clamp-2">
            {excerpt}{excerpt.length >= 80 ? '…' : ''}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main ────────────────────────────────────────────────

export default function WorksPreview() {
  const [works, setWorks] = useState<WPWork[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    fetch(`${WP_BASE}/works?_embed&per_page=3`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<WPWork[]>
      })
      .then(data => { setWorks(data); setStatus('ok') })
      .catch(err => { console.error('[WorksPreview] fetch error:', err); setStatus('error') })
  }, [])

  return (
    <section id="works" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="WORKS"
          ja="施工事例"
          description="鹿児島市内の畳施工実績を一部ご紹介します。"
        />

        {/* Loading */}
        {status === 'loading' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error / Empty */}
        {(status === 'error' || (status === 'ok' && works.length === 0)) && (
          <div className="text-center py-16 mb-10">
            <div className="w-14 h-14 bg-tatami-50 border border-tatami-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-tatami-300 text-2xl font-serif">畳</span>
            </div>
            <p className="text-ink font-serif font-bold text-base mb-1">施工事例を準備中です。</p>
            <p className="text-muted text-sm">施工が完了次第、順次公開いたします。</p>
          </div>
        )}

        {/* Works grid */}
        {status === 'ok' && works.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
            {works.map((work, i) => (
              <WorkCard key={work.id} work={work} index={i} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 border border-tatami-300 text-tatami-600 hover:bg-tatami-50 px-8 py-3 rounded-full font-medium text-sm transition-colors duration-200"
          >
            施工事例をもっと見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
