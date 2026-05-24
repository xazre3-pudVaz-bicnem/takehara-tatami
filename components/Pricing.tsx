'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from './ui/SectionTitle'

const items = [
  { service: '畳の表替え', note: '素材・グレードにより変わります' },
  { service: '畳の裏返し', note: '表替えより費用を抑えられます' },
  { service: '畳の新調', note: '枚数・素材で大きく変わります' },
  { service: '縁なし畳', note: '素材・サイズにより異なります' },
  { service: '琉球畳風', note: '素材・仕様により変わります' },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="PRICING"
          ja="料金について"
          description="畳の状態・枚数・素材により料金は異なります。現地確認後にわかりやすくご案内します。"
        />

        <motion.div
          ref={ref}
          className="overflow-hidden rounded-2xl border border-tatami-100 shadow-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 bg-tatami-400 text-white">
            <div className="px-6 py-3 text-sm font-medium">サービス</div>
            <div className="px-6 py-3 text-sm font-medium">料金目安</div>
          </div>
          {items.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-2 border-b border-tatami-50 last:border-0 ${i % 2 ? 'bg-tatami-50/50' : 'bg-white'}`}
            >
              <div className="px-6 py-4 font-serif font-bold text-ink text-sm">{item.service}</div>
              <div className="px-6 py-4 text-sm flex items-center flex-wrap gap-2">
                <span className="text-tatami-500 font-bold">現地確認後にご案内</span>
                <span className="text-muted text-xs">/ {item.note}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="bg-tatami-50 rounded-2xl p-6 md:p-8 border border-tatami-100"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-tatami-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif font-bold text-ink mb-2">現地確認・お見積もりは無料</h3>
              <p className="text-muted text-sm leading-relaxed">
                畳の状態・枚数・お選びいただく素材により料金は異なります。
                職人が現地でしっかり確認したうえで、わかりやすく丁寧にご案内します。
                見積もりだけのご依頼も大歓迎です。気軽にお声がけください。
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
        >
          <a
            href="tel:0992671577"
            className="btn-shimmer inline-flex items-center gap-3 bg-tatami-400 hover:bg-tatami-500 text-white px-8 py-4 rounded-full font-medium transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            無料でお見積もりを依頼する
          </a>
        </motion.div>
      </div>
    </section>
  )
}
