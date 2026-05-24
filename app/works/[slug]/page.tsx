'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft, MapPin, Scissors, MessageSquare } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { worksData } from '@/lib/works-data'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const categoryLabel = (cat: string) =>
  cat === 'omotegae' ? '表替え'
  : cat === 'shinchou' ? '新調'
  : cat === 'fuchinas' ? '縁なし畳'
  : cat === 'ryukyu' ? '琉球畳風'
  : cat === 'wamodan' ? '和モダン施工'
  : 'ビフォーアフター'

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const work = worksData.find(w => w.slug === slug)
  const related = worksData.filter(w => w.slug !== slug && w.category === work?.category).slice(0, 3)
  const otherRelated = related.length < 3
    ? [...related, ...worksData.filter(w => w.slug !== slug && w.category !== work?.category)].slice(0, 3)
    : related

  if (!work) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 bg-tatami-50">
          <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <p className="text-muted mb-6">施工事例が見つかりませんでした。</p>
            <Link href="/works" className="text-tatami-500 text-sm hover:underline">施工事例一覧へ戻る</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero image */}
        <div className="relative pt-16 md:pt-20 bg-tatami-900">
          <div className="max-w-5xl mx-auto px-0 sm:px-8">
            <div className="overflow-hidden sm:rounded-b-2xl" style={{ maxHeight: '520px' }}>
              {work.imagePath ? (
                <motion.img
                  src={work.imagePath}
                  alt={work.title}
                  className="w-full object-cover"
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ maxHeight: '520px' }}
                />
              ) : (
                <motion.div
                  className="w-full flex items-center justify-center relative"
                  style={{ height: '420px', background: `linear-gradient(135deg, ${work.gradientFrom}, ${work.gradientTo})` }}
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
            <nav className="flex items-center gap-2 text-xs text-muted mb-8">
              <Link href="/" className="hover:text-tatami-500 transition-colors">トップ</Link>
              <span>/</span>
              <Link href="/works" className="hover:text-tatami-500 transition-colors">施工事例</Link>
              <span>/</span>
              <span className="text-ink">{work.title}</span>
            </nav>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="md:col-span-2">
              <FadeIn>
                {/* Category + B/A badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-tatami-50 border border-tatami-200 text-tatami-600 px-3 py-1 rounded-full">
                    {categoryLabel(work.category)}
                  </span>
                  {work.isBeforeAfter && (
                    <span className="text-xs bg-tatami-400 text-white px-3 py-1 rounded-full">ビフォーアフター</span>
                  )}
                </div>

                <h1 className="font-serif font-bold text-ink text-2xl md:text-3xl leading-snug mb-3">
                  {work.title}
                </h1>
                <p className="text-muted text-sm mb-8">{work.location} ・ {work.service}</p>
              </FadeIn>

              {/* Description */}
              <FadeIn delay={0.1}>
                <div className="bg-tatami-50 border border-tatami-100 rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare size={15} strokeWidth={1.5} className="text-tatami-400" />
                    <span className="text-tatami-400 text-xs tracking-wider font-medium">職人コメント</span>
                  </div>
                  <p className="text-ink text-base leading-loose font-serif italic">{work.description}</p>
                </div>
              </FadeIn>

              {/* Before/After note */}
              {work.isBeforeAfter && (
                <FadeIn delay={0.15}>
                  <div className="border border-tatami-200 rounded-2xl p-6 mb-8">
                    <h3 className="font-serif font-bold text-ink text-base mb-3">施工ビフォーアフター</h3>
                    <p className="text-muted text-sm leading-relaxed">
                      施工前後の写真は準備中です。同様のビフォーアフター施工についてはお電話でご確認いただけます。
                    </p>
                    <a href="tel:0992671577" className="mt-3 inline-flex items-center gap-1.5 text-tatami-500 text-sm font-medium hover:underline">
                      📞 099-267-1577
                    </a>
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <FadeIn delay={0.2}>
                <div className="bg-white border border-tatami-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-serif font-bold text-ink text-base mb-5">施工詳細</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} strokeWidth={1.5} className="text-tatami-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-muted text-xs mb-0.5">エリア</p>
                        <p className="text-ink text-sm font-medium">{work.location}</p>
                      </div>
                    </div>
                    <div className="h-px bg-tatami-50" />
                    <div className="flex items-start gap-3">
                      <Scissors size={15} strokeWidth={1.5} className="text-tatami-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-muted text-xs mb-0.5">施工内容</p>
                        <p className="text-ink text-sm font-medium">{work.service}</p>
                      </div>
                    </div>
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
                      📞 099-267-1577
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
          {otherRelated.length > 0 && (
            <div className="mt-16 pt-10 border-t border-tatami-100">
              <FadeIn>
                <h2 className="font-serif font-bold text-ink text-xl mb-8">関連施工事例</h2>
              </FadeIn>
              <div className="grid sm:grid-cols-3 gap-5">
                {otherRelated.map((w, i) => (
                  <FadeIn key={w.id} delay={i * 0.08}>
                    <Link
                      href={`/works/${w.slug}`}
                      className="group block bg-white border border-tatami-100 rounded-2xl overflow-hidden hover:border-tatami-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        {w.imagePath ? (
                          <img src={w.imagePath} alt={w.title} className="work-card-img w-full h-full object-cover" />
                        ) : (
                          <div
                            className="w-full h-full relative"
                            style={{ background: `linear-gradient(135deg, ${w.gradientFrom}, ${w.gradientTo})` }}
                          >
                            <div className="absolute inset-0 tatami-grain opacity-30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white/20 text-5xl font-serif">畳</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-muted text-xs mb-1">{categoryLabel(w.category)}</p>
                        <p className="font-serif font-bold text-ink text-sm group-hover:text-tatami-600 transition-colors">{w.title}</p>
                      </div>
                    </Link>
                  </FadeIn>
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
      <Footer />
    </>
  )
}
