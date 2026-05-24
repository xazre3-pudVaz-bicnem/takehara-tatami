'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import SectionTitle from './ui/SectionTitle'

const faqs = [
  {
    q: '表替えと新調の違いは何ですか？',
    a: '表替えは畳の芯（畳床）はそのままに、表面のい草のゴザ（畳表）と縁のみを新しくする施工です。一方、新調は畳床・畳表・縁のすべてを新品に交換します。芯が傷んでいない場合は表替えでも十分なことが多く、費用も抑えられます。現地確認でどちらが適切かご提案します。',
  },
  {
    q: '何枚から対応してもらえますか？',
    a: '1枚からでも対応しております。「1室だけ直したい」「1枚だけ傷んでいる」という場合もお気軽にご相談ください。枚数が少なくても丁寧に対応いたします。',
  },
  {
    q: '見積もりだけでもお願いできますか？',
    a: 'もちろん大丈夫です。現地確認・お見積もりは完全無料です。見積もりをご覧いただいてからご検討いただいて構いません。「まだ迷っている」という段階でも喜んでご対応いたします。',
  },
  {
    q: '日曜・祝日は対応していますか？',
    a: '基本的に日曜・祝日は定休日とさせていただいております。ただし、事前にご相談いただければ対応できる場合もございます。詳しくはお電話にてご確認ください。',
  },
  {
    q: '縁なし畳はどんな部屋に向いていますか？',
    a: '縁なし畳はシンプルでモダンな印象が特徴で、洋室の雰囲気にも合います。フローリングと組み合わせたLDKや、スタイリッシュな寝室に人気です。正方形の畳を市松模様に配置することで独特の美しさが生まれます。',
  },
  {
    q: '施工にはどのくらい時間がかかりますか？',
    a: '表替えや裏返しは通常6〜8畳で半日〜1日程度です。新調は素材の手配も含めて数日いただく場合があります。お急ぎの場合はご相談ください。できる限り対応いたします。',
  },
  {
    q: 'ふすまや障子の張替えも対応していますか？',
    a: '申し訳ございませんが、当店は畳専門店のため、ふすま・障子・網戸・内装リフォームには対応しておりません。畳に関することでしたら何でもお気軽にご相談ください。',
  },
]

function Item({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="border-b border-tatami-100 last:border-0"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 py-5 text-left hover:bg-tatami-50/50 transition-colors px-2 -mx-2 rounded-lg"
      >
        <span className="flex-shrink-0 w-7 h-7 bg-tatami-400 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
          Q
        </span>
        <span className="flex-1 font-serif font-bold text-ink text-sm md:text-base leading-snug">
          {faq.q}
        </span>
        <motion.span
          className="flex-shrink-0 text-tatami-300 mt-1"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
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
              <span className="flex-shrink-0 w-7 h-7 bg-tatami-100 text-tatami-600 text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                A
              </span>
              <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="FAQ"
          ja="よくあるご質問"
          description="畳の張替え・新調に関するよくあるご質問をまとめました。"
        />
        <div className="bg-white rounded-2xl border border-tatami-100 shadow-sm px-4 md:px-8 py-2">
          {faqs.map((f, i) => <Item key={i} faq={f} index={i} />)}
        </div>
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted text-sm mb-3">その他のご質問はお気軽にどうぞ</p>
          <a href="tel:0992671577" className="font-bold text-tatami-500 text-xl hover:text-tatami-600 transition-colors">
            📞 099-267-1577
          </a>
        </motion.div>
      </div>
    </section>
  )
}
