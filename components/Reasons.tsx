'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from './ui/SectionTitle'

const reasons = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '東谷山に根ざした地域密着店',
    body: '鹿児島市東谷山を拠点に、長年にわたり地域の皆さまの畳をお手入れしてきた信頼の畳専門店です。',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '状態を診て最適な施工を提案',
    body: '表替えで十分か、裏返しが適切か、新調が必要か。畳の状態を正確に診断し、コスパの高い方法をご提案します。',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h7" />
      </svg>
    ),
    title: '表替え〜縁なし畳まで幅広く対応',
    body: '表替え・裏返し・新調・縁なし畳・琉球畳風まで。鹿児島市内のあらゆる畳のご要望にお応えします。',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: '和モダン空間にも対応',
    body: '縁なし畳・琉球畳風・カラー畳など、現代的なインテリアに合うおしゃれな畳選びもご相談ください。',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: '職人が直接、丁寧に施工',
    body: '熟練の職人が現地を確認し、丁寧に採寸・施工。機械的な量産品とは異なる、手仕事の精度をお届けします。',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: '施工実績200枚以上で安心',
    body: '豊富な施工写真でビフォーアフターをご確認いただけます。仕上がりのイメージが明確になり、安心してご依頼いただけます。',
  },
]

function Card({ reason, index }: { reason: (typeof reasons)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl p-6 border border-tatami-100 hover:border-tatami-300 hover:shadow-md transition-all duration-300 group"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="w-12 h-12 bg-tatami-50 rounded-lg flex items-center justify-center text-tatami-400 mb-4 group-hover:bg-tatami-400 group-hover:text-white transition-colors duration-300">
        {reason.icon}
      </div>
      <h3 className="font-serif font-bold text-ink text-sm md:text-base mb-2">{reason.title}</h3>
      <p className="text-muted text-sm leading-relaxed">{reason.body}</p>
    </motion.div>
  )
}

export default function Reasons() {
  return (
    <section id="reasons" className="py-20 md:py-28 bg-cream seigaiha">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="WHY CHOOSE US"
          ja="選ばれる理由"
          description="地域密着の竹原タタミ店が、長年お客様に選ばれ続ける6つの理由です。"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((r, i) => (
            <Card key={i} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
