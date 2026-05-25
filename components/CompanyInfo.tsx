'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from './ui/SectionTitle'

const rows = [
  { label: '会社名', value: '(有)竹原タタミ店' },
  { label: '所在地', value: '鹿児島県鹿児島市東谷山2丁目35-15' },
  { label: '電話番号', value: '099-267-1577', phone: true },
  { label: '営業時間', value: '8:30〜18:00' },
  { label: '定休日', value: '基本日曜・祝日' },
  { label: '対応エリア', value: '鹿児島県内全域（鹿児島市内は迅速対応）' },
  { label: '主な業務', value: '畳の表替え・裏返し・新調・縁なし畳・琉球畳風' },
]

export default function CompanyInfo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="company" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <SectionTitle en="ABOUT US" ja="会社情報" />

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {/* Info table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl border border-tatami-100 overflow-hidden shadow-sm">
              {rows.map((r, i) => (
                <div
                  key={r.label}
                  className={`flex border-b border-tatami-50 last:border-0 ${i % 2 ? 'bg-tatami-50/30' : 'bg-white'}`}
                >
                  <div className="w-28 md:w-32 flex-shrink-0 px-4 py-4 bg-tatami-50 border-r border-tatami-100">
                    <span className="text-tatami-600 text-xs font-bold">{r.label}</span>
                  </div>
                  <div className="flex-1 px-4 py-4">
                    {r.phone ? (
                      <a href="tel:0992671577" className="text-tatami-500 font-bold text-base hover:underline">
                        {r.value}
                      </a>
                    ) : (
                      <span className="text-ink text-sm">{r.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              className="mt-5 bg-tatami-50 border border-tatami-100 rounded-xl p-5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-bold text-ink text-sm mb-3">対応していないサービス</h4>
              {['ふすま', '障子', '網戸', '内装リフォーム'].map(s => (
                <span key={s} className="inline-block text-muted text-xs mr-2 mb-1 border border-tatami-100 bg-white px-2 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
              <p className="text-muted text-xs mt-2">※ 畳に特化した専門店として、丁寧な施工をご提供しています。</p>
            </motion.div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-sm border border-tatami-100" style={{ height: '360px' }}>
              <iframe
                src="https://maps.google.com/maps?q=%E9%B9%BF%E5%85%90%E5%B3%B6%E7%9C%8C%E9%B9%BF%E5%85%90%E5%B3%B6%E5%B8%82%E6%9D%B1%E8%B0%B7%E5%B1%B12%E4%B8%81%E7%9B%AE35-15&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="(有)竹原タタミ店の地図"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="https://maps.google.com/?q=鹿児島県鹿児島市東谷山2丁目35-15"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-sm border border-tatami-200 text-tatami-600 hover:bg-tatami-50 py-2.5 rounded-xl transition-colors"
              >
                Googleマップで見る
              </a>
              <a
                href="tel:0992671577"
                className="flex-1 text-center text-sm bg-tatami-400 hover:bg-tatami-500 text-white font-medium py-2.5 rounded-xl transition-colors"
              >
                電話で問い合わせる
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
