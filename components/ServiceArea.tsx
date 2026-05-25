'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Clock, Phone } from 'lucide-react'
import SectionTitle from './ui/SectionTitle'

const kagoshimaAreas = [
  { name: '東谷山', note: '拠点' },
  { name: '谷山', note: '' },
  { name: '宇宿', note: '' },
  { name: '中山', note: '' },
  { name: '紫原', note: '' },
  { name: '坂之上', note: '' },
  { name: '和田', note: '' },
  { name: '郡元', note: '' },
  { name: '武岡', note: '' },
  { name: '草牟田', note: '' },
  { name: '吉野', note: '' },
  { name: '小松原', note: '' },
]

const prefectureAreas = ['姶良市', '霧島市', '指宿市', '南さつま市', '枕崎市', '薩摩川内市', '出水市', '伊佐市']

const services = [
  { label: '表替え', desc: '畳表・縁を交換' },
  { label: '裏返し', desc: '最もリーズナブル' },
  { label: '新調', desc: '全て新品に交換' },
  { label: '縁なし畳', desc: '和モダンスタイル' },
]

export default function ServiceArea() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="area" className="py-20 md:py-28 bg-tatami-50 relative overflow-hidden">
      <div className="absolute inset-0 seigaiha" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="SERVICE AREA"
          ja="対応エリア"
          description="鹿児島市内を中心に、県内全域の畳の張替え・表替え・新調に対応しております。"
        />

        <div ref={ref} className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: area info */}
          <div className="space-y-5">

            {/* 鹿児島市内 */}
            <motion.div
              className="bg-white rounded-2xl border border-tatami-200 overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-tatami-400 px-5 py-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5V2.05z"/>
                </svg>
                <span className="text-white text-sm font-bold">鹿児島市内</span>
                <span className="ml-auto bg-white/25 text-white text-xs px-2.5 py-0.5 rounded-full font-medium">迅速対応</span>
              </div>
              <div className="p-5">
                <p className="text-muted text-sm mb-4">拠点の東谷山を中心に、鹿児島市内全域にお伺いします。</p>
                <div className="flex flex-wrap gap-2">
                  {kagoshimaAreas.map((a, i) => (
                    <motion.span
                      key={a.name}
                      className={`rounded-full px-3.5 py-1 text-xs font-medium ${
                        a.note
                          ? 'bg-tatami-400 text-white'
                          : 'bg-tatami-50 border border-tatami-200 text-ink hover:border-tatami-400 transition-colors'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.2 + i * 0.04 }}
                    >
                      {a.name}
                      {a.note && <span className="text-white/70 text-[10px] ml-1">{a.note}</span>}
                    </motion.span>
                  ))}
                </div>
                <p className="mt-3 text-tatami-500 text-xs">※ 上記以外の市内エリアも対応可能です</p>
              </div>
            </motion.div>

            {/* 県内全域 */}
            <motion.div
              className="bg-white rounded-2xl border border-tatami-100 overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="bg-tatami-100 px-5 py-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-tatami-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-tatami-700 text-sm font-bold">鹿児島県内全域</span>
                <span className="ml-auto bg-tatami-200 text-tatami-700 text-xs px-2.5 py-0.5 rounded-full">要相談</span>
              </div>
              <div className="p-5">
                <p className="text-muted text-sm mb-4">遠方エリアも対応可能です。まずはお気軽にご相談ください。</p>
                <div className="flex flex-wrap gap-2">
                  {prefectureAreas.map(a => (
                    <span key={a} className="rounded-full px-3 py-1 text-xs bg-tatami-50 border border-tatami-100 text-muted">
                      {a}
                    </span>
                  ))}
                  <span className="rounded-full px-3 py-1 text-xs bg-tatami-50 border border-tatami-100 text-tatami-400">その他県内全域</span>
                </div>
              </div>
            </motion.div>

            {/* Available services */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p className="text-[10px] text-tatami-400 tracking-[0.25em] uppercase mb-3">Available Services</p>
              <div className="grid grid-cols-2 gap-2.5">
                {services.map(s => (
                  <div key={s.label} className="flex items-center gap-2.5 bg-white border border-tatami-100 rounded-xl px-4 py-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-tatami-400 flex-shrink-0" />
                    <div>
                      <p className="text-ink text-sm font-medium">{s.label}</p>
                      <p className="text-muted text-xs">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.a
              href="tel:0992671577"
              className="inline-flex items-center gap-2 text-tatami-600 font-medium text-sm hover:text-tatami-700 transition-colors"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              エリアについて電話で確認する
            </motion.a>
          </div>

          {/* Right: visual map */}
          <motion.div
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-tatami-100"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[4/3] relative bg-tatami-800 flex items-center justify-center p-8">
              {/* Decorative concentric circles */}
              {[96, 72, 48, 24].map((size, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-tatami-600/25"
                  style={{ width: `${size}%`, height: `${size}%` }}
                />
              ))}
              {/* Labels */}
              <div className="absolute top-[8%] left-1/2 -translate-x-1/2 text-tatami-500 text-[11px] tracking-widest whitespace-nowrap">
                鹿児島県内全域（要相談）
              </div>
              <div className="absolute top-[26%] left-1/2 -translate-x-1/2 text-tatami-400 text-[10px] whitespace-nowrap">
                鹿児島市内（迅速対応）
              </div>
              {/* Pin */}
              <div className="relative z-10 text-center">
                <div className="w-14 h-14 bg-tatami-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg ring-4 ring-tatami-300/30">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <p className="font-serif font-bold text-white text-sm">東谷山（拠点）</p>
                <p className="text-tatami-300 text-xs mt-0.5">鹿児島市東谷山2丁目</p>
              </div>
            </div>
            <div className="bg-tatami-700 px-5 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 text-tatami-200 text-xs">
                    <MapPin className="w-3 h-3 text-tatami-400 flex-shrink-0" strokeWidth={1.5} />
                    鹿児島県鹿児島市東谷山2丁目35-15
                  </div>
                  <div className="flex items-center gap-1.5 text-tatami-400 text-xs mt-0.5">
                    <Clock className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
                    8:30〜18:00（日・祝定休）
                  </div>
                </div>
                <a href="tel:0992671577" className="flex items-center gap-1.5 text-tatami-300 hover:text-white transition-colors text-xs flex-shrink-0">
                  <Phone className="w-3 h-3" strokeWidth={1.5} />
                  099-267-1577
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
