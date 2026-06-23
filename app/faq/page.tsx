'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { ChevronDown, Phone } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { extendedFaqs, extendedCategories, type ExtendedCategoryId } from '@/lib/faq-data'

function FAQItem({ q, a, link, index }: { q: string; a: string; link?: { href: string; label: string }; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div
      ref={ref}
      className="border-b border-tatami-100 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 py-5 text-left hover:bg-tatami-50/40 transition-colors px-2 -mx-2 rounded-lg"
      >
        <span className="flex-shrink-0 w-6 h-6 bg-tatami-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center mt-0.5">Q</span>
        <span className="flex-1 font-serif font-bold text-ink text-sm md:text-base leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 text-tatami-300 mt-1">
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex gap-4 pb-5 px-2">
              <span className="flex-shrink-0 w-6 h-6 bg-tatami-100 text-tatami-600 text-[10px] font-bold rounded-full flex items-center justify-center mt-0.5">A</span>
              <div>
                <p className="text-muted text-sm leading-relaxed">{a}</p>
                {link && (
                  <Link href={link.href} className="mt-2 inline-flex items-center gap-1 text-tatami-600 text-xs hover:underline">
                    {link.label} →
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
  const [active, setActive] = useState<ExtendedCategoryId>('all')
  const filtered = active === 'all' ? extendedFaqs : extendedFaqs.filter(f => f.cat === active)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: extendedFaqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <PageHero
          en="FAQ"
          ja="よくあるご質問"
          description={`畳の張替え・新調・素材・カビ・ダニ・対応エリアなど、よくいただくご質問を${extendedFaqs.length}問以上まとめました。`}
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            {/* Count badge */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 bg-tatami-50 border border-tatami-200 text-tatami-600 text-xs px-4 py-1.5 rounded-full">
                全{extendedFaqs.length}問
              </span>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {extendedCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    active === cat.id
                      ? 'bg-tatami-400 text-white'
                      : 'bg-tatami-50 border border-tatami-200 text-ink hover:border-tatami-400'
                  }`}
                >
                  {cat.label}
                  {active !== 'all' && cat.id === 'all' && ''}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="bg-white border border-tatami-100 rounded-2xl shadow-sm px-4 md:px-8 py-2">
                  {filtered.length === 0 ? (
                    <p className="text-muted text-sm py-8 text-center">このカテゴリのご質問はありません。</p>
                  ) : (
                    filtered.map((faq, i) => (
                      <FAQItem key={`${active}-${i}`} q={faq.q} a={faq.a} link={faq.link} index={i} />
                    ))
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick decision guide */}
            <motion.div
              className="mt-12 bg-tatami-50 rounded-2xl p-6 border border-tatami-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-tatami-400 text-[10px] tracking-widest mb-3 text-center uppercase">Quick Guide</p>
              <h3 className="font-serif text-ink text-lg font-bold text-center mb-4">どれを選べばいいか迷ったら</h3>
              <div className="space-y-2">
                {[
                  { cond: '使用3〜5年 / 表面の色褪せ・少しのチクチク', rec: '→ 裏返し', href: '/services/uragaeshi' },
                  { cond: '使用5〜10年 / 変色・ささくれ・臭いが気になる', rec: '→ 表替え', href: '/services/omotegae' },
                  { cond: '使用15年以上 / 踏むと沈む・波打つ', rec: '→ 新調', href: '/services/shinchou' },
                  { cond: '和モダンにしたい / フローリングと合わせたい', rec: '→ 縁なし畳', href: '/services/herinashi' },
                ].map((item, i) => (
                  <Link key={i} href={item.href} className="flex items-center justify-between p-3 bg-white rounded-xl border border-tatami-100 hover:border-tatami-400 transition-colors group">
                    <span className="text-muted text-xs">{item.cond}</span>
                    <span className="text-tatami-600 text-xs font-bold group-hover:text-tatami-800 transition-colors flex-shrink-0 ml-2">{item.rec}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-muted text-sm mb-4">その他のご質問はお気軽にどうぞ</p>
              <a href="tel:0992671577" className="font-bold text-tatami-500 text-xl hover:text-tatami-600 transition-colors flex items-center gap-2 justify-center mb-1">
                <Phone size={18} />099-267-1577
              </a>
              <p className="text-muted text-xs">8:30〜18:00（定休：日曜・祝日）</p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
