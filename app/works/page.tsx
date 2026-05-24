'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { worksData, WORK_CATEGORIES, type WorkCategoryId } from '@/lib/works-data'

const categoryLabel = (cat: string) =>
  cat === 'omotegae' ? '表替え'
  : cat === 'shinchou' ? '新調'
  : cat === 'fuchinas' ? '縁なし畳'
  : cat === 'ryukyu' ? '琉球畳風'
  : cat === 'wamodan' ? '和モダン'
  : 'ビフォーアフター'

function WorkCard({ work, index }: { work: (typeof worksData)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/works/${work.slug}`}
        className="work-card group block bg-white border border-tatami-100 rounded-2xl overflow-hidden hover:border-tatami-200 hover:shadow-xl hover:shadow-tatami-100/60 transition-all duration-400"
      >
        {/* Image area */}
        <div className="aspect-[4/3] overflow-hidden relative">
          {work.imagePath ? (
            <img
              src={work.imagePath}
              alt={work.title}
              className="work-card-img w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full relative"
              style={{ background: `linear-gradient(135deg, ${work.gradientFrom}, ${work.gradientTo})` }}
            >
              <div className="absolute inset-0 tatami-grain opacity-30 work-card-img" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/20 text-7xl font-serif select-none">畳</span>
              </div>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="text-[10px] bg-white/90 backdrop-blur-sm text-tatami-600 font-medium px-2.5 py-1 rounded-full shadow-sm">
              {categoryLabel(work.category)}
            </span>
          </div>
          {work.isBeforeAfter && (
            <div className="absolute top-3 right-3">
              <span className="text-[10px] bg-tatami-400 text-white font-medium px-2.5 py-1 rounded-full">B/A</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="font-serif font-bold text-ink text-base leading-snug mb-1.5 group-hover:text-tatami-600 transition-colors line-clamp-1">
            {work.title}
          </h2>
          <p className="text-muted text-xs mb-3">{work.location} ・ {work.service}</p>
          <p className="text-muted text-sm leading-relaxed line-clamp-2">{work.description}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function WorksPage() {
  const [active, setActive] = useState<WorkCategoryId>('all')
  const filtered = active === 'all' ? worksData : worksData.filter(w => w.category === active)

  return (
    <>
      <Header />
      <main>
        <PageHero
          en="WORKS"
          ja="施工事例"
          description="鹿児島市内での実際の施工事例をご紹介します。写真・施工内容・職人コメントを掲載しています。"
        />

        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {WORK_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id as WorkCategoryId)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    active === cat.id
                      ? 'bg-tatami-400 text-white shadow-sm'
                      : 'bg-white border border-tatami-200 text-ink hover:border-tatami-400'
                  }`}
                >
                  {cat.label}
                  <span className={`ml-1.5 text-xs ${active === cat.id ? 'text-white/70' : 'text-muted'}`}>
                    {cat.id === 'all' ? worksData.length : worksData.filter(w => w.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
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
                📞 099-267-1577
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
