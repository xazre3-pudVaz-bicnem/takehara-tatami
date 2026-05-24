'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionTitle from './ui/SectionTitle'

const services = [
  {
    id: 'omotegae',
    name: '畳の表替え',
    tag: '人気',
    color: 'bg-tatami-50 border-tatami-200',
    accent: 'text-tatami-500',
    badge: 'bg-tatami-100 text-tatami-600',
    target: '色あせ・ささくれが気になる方',
    desc: '畳床（芯）はそのままに、表面のい草のゴザ（畳表）と縁を新しく交換します。費用を抑えながら、香りも見た目も新品同様に蘇ります。鹿児島市での畳の表替えは竹原タタミ店へ。',
    recommend: '表面の劣化が気になる / い草の香りが薄れてきた',
  },
  {
    id: 'uragaeshi',
    name: '畳の裏返し',
    tag: '経済的',
    color: 'bg-ecru border-parchment',
    accent: 'text-wood-dark',
    badge: 'bg-parchment text-wood-dark',
    target: '比較的新しい畳をお持ちの方',
    desc: '畳表を裏返して使用する経済的な施工方法。表替えの前段階として、まだ状態が良い畳に適しています。コストを抑えて畳を長持ちさせたい方に最適です。',
    recommend: '交換から3〜5年程度 / まだきれいな面がある',
  },
  {
    id: 'shinchou',
    name: '畳の新調',
    tag: '新築にも',
    color: 'bg-tatami-50 border-tatami-200',
    accent: 'text-tatami-600',
    badge: 'bg-tatami-100 text-tatami-700',
    target: '古い畳を丸ごと交換したい方',
    desc: '畳床から畳表まですべて新品に交換。新築住宅やリフォームに最適です。現地で丁寧に採寸し、お部屋にぴったり合った畳を一から仕立てます。',
    recommend: '新築住宅 / 床がへたってきた / 全面リフォーム',
  },
  {
    id: 'fuchinas',
    name: '縁なし畳',
    tag: 'モダン',
    color: 'bg-stone-50 border-stone-200',
    accent: 'text-stone-600',
    badge: 'bg-stone-100 text-stone-700',
    target: 'スタイリッシュな和室にしたい方',
    desc: '縁（へり）のないシンプルでモダンな畳。正方形の畳を市松模様に配置することで、現代的でおしゃれな和空間を演出します。鹿児島市での縁なし畳は当店へ。',
    recommend: 'インテリアにこだわりたい / 洋室に合わせたい',
  },
  {
    id: 'ryukyu',
    name: '琉球畳風',
    tag: '上質',
    color: 'bg-amber-50 border-amber-200',
    accent: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
    target: '高級感のある和室を作りたい方',
    desc: 'い草のシンプルな織り目が特徴の琉球畳風。市松模様の配置が独特の美しさを生み出します。高級旅館風・ホテル風の和室を鹿児島市でもご提案できます。',
    recommend: '高級感のある和室 / 旅館・ホテル風に',
  },
  {
    id: 'wamodan',
    name: '和モダン相談',
    tag: '要相談',
    color: 'bg-slate-50 border-slate-200',
    accent: 'text-slate-600',
    badge: 'bg-slate-100 text-slate-700',
    target: 'おしゃれな和室を作りたい方',
    desc: '素材・色・縁のデザインを組み合わせ、お客様だけの和モダン空間をご提案します。フローリングとの組み合わせや、LDKへの畳導入なども対応可能です。',
    recommend: 'LDKに畳コーナーを作りたい / 和モダンリノベーション',
  },
]

function ServiceCard({ s, index }: { s: (typeof services)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className={`rounded-xl border p-6 ${s.color} hover:shadow-lg transition-all duration-300 flex flex-col`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`font-serif font-bold text-lg ${s.accent}`}>{s.name}</h3>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.badge}`}>{s.tag}</span>
      </div>

      <p className={`text-xs font-medium mb-3 ${s.accent} flex items-center gap-1`}>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
        {s.target}
      </p>

      <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>

      <div className="text-xs text-muted bg-white/70 rounded-lg px-3 py-2">
        <span className="font-medium text-ink">こんな方に：</span> {s.recommend}
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="SERVICES"
          ja="サービス紹介"
          description="畳の表替え・裏返し・新調から縁なし畳・琉球畳まで。鹿児島市のあらゆる畳のお悩みに対応します。"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
