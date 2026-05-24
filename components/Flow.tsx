'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from './ui/SectionTitle'

const steps = [
  {
    no: '01',
    title: 'お問い合わせ',
    desc: 'お電話またはフォームでご連絡ください。ご希望の日程やお悩みをヒアリングします。',
    note: '無料・お気軽に',
    color: 'bg-tatami-400',
  },
  {
    no: '02',
    title: '現地確認',
    desc: '職人が直接お伺いし、畳の状態・枚数・お部屋の状況を確認。約15〜30分です。',
    note: '出張無料',
    color: 'bg-tatami-500',
  },
  {
    no: '03',
    title: 'お見積もり',
    desc: '確認結果をもとに、わかりやすくお見積もりをご案内。ご納得いただけるまで丁寧に説明します。',
    note: '明朗会計',
    color: 'bg-wood',
  },
  {
    no: '04',
    title: '施工',
    desc: 'ご了承後、施工日を決定します。職人が丁寧かつ迅速に畳の張替え・新調を行います。',
    note: '職人が直接施工',
    color: 'bg-tatami-600',
  },
  {
    no: '05',
    title: 'お引き渡し',
    desc: '施工完了後、仕上がりをご確認いただきます。い草の香り漂う、美しい和室をお楽しみください。',
    note: '完成・ご確認',
    color: 'bg-wood-dark',
  },
]

export default function Flow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="flow" className="py-20 md:py-28 bg-cream seigaiha">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="HOW IT WORKS"
          ja="ご依頼の流れ"
          description="お問い合わせから施工完了まで、5ステップでわかりやすくご案内します。"
        />

        <div ref={ref} className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-tatami-200 via-tatami-400 to-wood-dark mx-auto" style={{ maxWidth: '80%', left: '10%' }} />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.no}
                className="flex flex-col items-center text-center relative"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 w-px h-5 bg-tatami-200" />
                )}

                {/* Circle */}
                <div
                  className={`relative z-10 w-24 h-24 ${s.color} rounded-full flex flex-col items-center justify-center text-white mb-4 shadow-md`}
                >
                  <span className="text-white/70 text-[10px] font-mono font-bold">STEP</span>
                  <span className="text-2xl font-bold font-serif leading-none">{s.no}</span>
                </div>

                <h3 className="font-serif font-bold text-ink text-sm mb-1.5">{s.title}</h3>
                <p className="text-muted text-xs leading-relaxed mb-2">{s.desc}</p>
                <span className="text-tatami-600 text-xs font-medium bg-white border border-tatami-200 px-3 py-0.5 rounded-full">
                  {s.note}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}
        >
          <a
            href="tel:0992671577"
            className="btn-shimmer inline-flex items-center gap-2 bg-tatami-400 hover:bg-tatami-500 text-white px-8 py-4 rounded-full font-medium transition-colors duration-200"
          >
            STEP 1：お電話でご相談ください
          </a>
        </motion.div>
      </div>
    </section>
  )
}
