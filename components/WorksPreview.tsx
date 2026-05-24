'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SectionTitle from './ui/SectionTitle'
import { worksData, type WorkItem } from '@/lib/works-data'

function WorkCard({ work, index }: { work: WorkItem; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

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
        {work.imagePath ? (
          <Image
            src={work.imagePath}
            alt={work.title}
            fill
            className="object-cover work-card-img"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="work-card-img w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${work.gradientFrom}, ${work.gradientTo})`,
            }}
          >
            {/* Subtle tatami texture overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(255,255,255,0.3) 7px, rgba(255,255,255,0.3) 8px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,0.2) 15px, rgba(255,255,255,0.2) 16px)',
              }}
            />
            {/* Photo placeholder icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-tatami-400/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {work.service}
          </span>
        </div>
        {work.isBeforeAfter && (
          <div className="absolute top-3 right-3">
            <span className="bg-amber-500/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
              B/A
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-serif font-bold text-ink text-sm mb-1">{work.title}</h3>
        <p className="text-muted text-xs mb-1.5 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {work.location}
        </p>
        <p className="text-muted text-xs leading-relaxed">{work.description}</p>
      </div>
    </motion.div>
  )
}

export default function WorksPreview() {
  const preview = worksData.slice(0, 6)

  return (
    <section id="works" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="WORKS"
          ja="施工事例"
          description="鹿児島市内の畳施工実績を一部ご紹介します。"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
          {preview.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>

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
