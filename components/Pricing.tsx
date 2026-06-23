'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import SectionTitle from './ui/SectionTitle'

const igusaRows = [
  { service: '表替え', price: '5,000円〜', note: '1枚あたり、天然い草素材' },
  { service: '裏返し', price: '3,500円〜', note: '1枚あたり' },
  { service: '新調', price: '15,000円〜', note: '1枚あたり、天然い草素材' },
  { service: '縁なし半畳 表替え', price: '10,000円〜', note: '目積・ヘリなし' },
  { service: '縁なし半畳 新調', price: '15,000円〜', note: '目積・ヘリなし' },
]

const otherRows = [
  { service: '表替え', price: '12,000円〜', note: '1枚あたり、和紙・樹脂表' },
  { service: '裏返し', price: '3,500円〜', note: '1枚あたり' },
  { service: '新調', price: '22,000円〜', note: '1枚あたり、和紙・樹脂表' },
  { service: '縁なし半畳 表替え', price: '10,000円〜', note: '目積・ヘリなし' },
  { service: '縁なし半畳 新調', price: '15,000円〜', note: '目積・ヘリなし' },
]

function PriceTable({ title, rows, delay = 0 }: { title: string; rows: typeof igusaRows; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-tatami-100 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="bg-tatami-700 text-white px-5 py-3">
        <p className="font-serif font-bold text-sm">{title}</p>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] bg-tatami-400 text-white text-xs">
        <div className="px-4 py-2 font-medium">施工内容</div>
        <div className="px-4 py-2 font-medium text-center">料金目安</div>
        <div className="px-4 py-2 font-medium">備考</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-[1fr_auto_1fr] border-b border-tatami-50 last:border-0 ${i % 2 ? 'bg-tatami-50/50' : 'bg-white'}`}
        >
          <div className="px-4 py-3.5 font-serif font-bold text-ink text-sm">{row.service}</div>
          <div className="px-4 py-3.5 text-sm text-center">
            <span className="text-tatami-600 font-bold text-base whitespace-nowrap">{row.price}</span>
          </div>
          <div className="px-4 py-3.5 text-muted text-xs flex items-center">{row.note}</div>
        </div>
      ))}
    </motion.div>
  )
}

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="PRICING"
          ja="料金の目安"
          description="施工内容・素材・枚数によって料金が異なります。現地確認・お見積もりは無料です。"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <PriceTable title="天然い草（国産）" rows={igusaRows} delay={0} />
          <PriceTable title="い草以外（和紙表・樹脂表）" rows={otherRows} delay={0.15} />
        </div>

        <motion.p
          className="text-center text-muted text-xs mb-8"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          ※ 表示価格はすべて税込・1枚あたりの目安です。枚数・素材グレード・施工内容により変わります。
        </motion.p>

        <motion.div
          className="bg-tatami-50 rounded-2xl p-6 md:p-8 border border-tatami-100 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-tatami-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif font-bold text-ink mb-2">現地確認・お見積もりは完全無料</h3>
              <p className="text-muted text-sm leading-relaxed">
                畳の状態・枚数・素材によって最適なご提案が変わります。
                サンプルをお持ちして、実際に手で触れながらお選びいただけます。
                見積もりだけでもお気軽にご連絡ください。
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:0992671577"
              className="btn-shimmer inline-flex items-center justify-center gap-3 bg-tatami-400 hover:bg-tatami-500 text-white px-8 py-4 rounded-full font-medium transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              無料でお見積もりを依頼する
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-tatami-300 text-tatami-600 hover:bg-tatami-50 px-8 py-4 rounded-full font-medium transition-colors duration-200 text-sm"
            >
              Webからお問い合わせ
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
