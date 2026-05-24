'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Leaf, CalendarDays, Layers, Sparkles } from 'lucide-react'
import SectionTitle from './ui/SectionTitle'

const signs = [
  {
    no: '01',
    symptom: '表面のキズ・ささくれが気になる',
    detail: '歩くとチクチクする、色が変わってきた、い草の香りが薄れてきた場合。',
    solution: '表替え',
    solutionNote: '芯はそのままに表面だけ新しく',
    Icon: Leaf,
  },
  {
    no: '02',
    symptom: '使い始めて3〜5年が経った',
    detail: '見た目はそれほど悪くないが、以前より使用感が出てきた場合。',
    solution: '裏返し',
    solutionNote: 'まだ使える面を活かして経済的に',
    Icon: CalendarDays,
  },
  {
    no: '03',
    symptom: '床が沈む・へたりを感じる',
    detail: '踏んだときにスポンジのように沈む、畳が波打つ、角が傷んでいる場合。',
    solution: '新調',
    solutionNote: '畳床から全て新品に交換',
    Icon: Layers,
  },
  {
    no: '04',
    symptom: '和室の雰囲気を変えたい',
    detail: '縁なし畳・琉球畳にしたい、洋室っぽい雰囲気にしたい、色を変えたい場合。',
    solution: '縁なし・琉球畳',
    solutionNote: '和モダンな新しいスタイルへ',
    Icon: Sparkles,
  },
]

export default function Timing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="timing" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 tatami-grain opacity-30" />
      <div className="absolute right-0 top-0 w-96 h-96 bg-tatami-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="TIMING"
          ja="畳替えのタイミング"
          description="こんなサインが出たら、畳替えを検討する時期かもしれません。"
        />

        <div ref={ref} className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {signs.map((s, i) => (
            <motion.div
              key={s.no}
              className="group relative bg-white border border-tatami-100 rounded-2xl p-7 hover:border-tatami-300 hover:shadow-lg hover:shadow-tatami-100/60 transition-all duration-400"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Number — top right, very subtle */}
              <span className="absolute top-6 right-6 text-tatami-100 text-3xl font-serif font-bold leading-none select-none">
                {s.no}
              </span>

              {/* Icon */}
              <div className="mb-5 w-10 h-10 flex items-center justify-center rounded-xl bg-tatami-50 border border-tatami-100 group-hover:bg-tatami-100 transition-colors duration-300">
                <s.Icon
                  size={18}
                  strokeWidth={1.4}
                  className="text-tatami-500"
                />
              </div>

              {/* Symptom */}
              <h3 className="font-serif font-bold text-ink text-base leading-snug mb-3">
                {s.symptom}
              </h3>

              {/* Detail */}
              <p className="text-muted text-sm leading-relaxed mb-5">{s.detail}</p>

              {/* Divider */}
              <div className="h-px bg-tatami-100 mb-4" />

              {/* Solution badge */}
              <div className="flex items-center gap-2.5">
                <span className="text-tatami-400 text-[10px] tracking-widest font-sans">推奨</span>
                <span className="bg-tatami-50 border border-tatami-200 text-tatami-600 text-xs font-bold px-3 py-1 rounded-full">
                  {s.solution}
                </span>
                <span className="text-muted text-xs">{s.solutionNote}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted text-sm mt-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          どのタイミングか迷ったら、まず現地確認（無料）をご利用ください。
          <br />
          職人が畳の状態を確認し、最適な施工をご提案します。
        </motion.p>
      </div>
    </section>
  )
}
