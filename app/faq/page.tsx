'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'

const categories = [
  { id: 'all', label: 'すべて' },
  { id: 'price', label: '料金' },
  { id: 'work', label: '施工' },
  { id: 'area', label: '対応エリア' },
  { id: 'modern', label: '縁なし・琉球畳' },
  { id: 'consult', label: 'ご相談' },
] as const

type CategoryId = (typeof categories)[number]['id']

const faqs = [
  { cat: 'price', q: '見積もりだけでもお願いできますか？', a: 'もちろん大丈夫です。現地確認・お見積もりは完全無料です。見積もりをご覧いただいてからご検討いただいて構いません。「まだ迷っている」という段階でも喜んでご対応いたします。' },
  { cat: 'price', q: '料金はどうやって決まりますか？', a: '畳のサイズ・素材・施工内容（表替え・裏返し・新調など）によって異なります。現地確認後にお見積もりをご提示します。事前に概算をお知らせすることも可能ですので、お気軽にお問い合わせください。' },
  { cat: 'price', q: '支払い方法は何がありますか？', a: '現金払いが基本ですが、詳しくはお問い合わせ時にご確認ください。' },
  { cat: 'work', q: '表替えと新調の違いは何ですか？', a: '表替えは畳の芯（畳床）はそのままに、表面のい草（畳表）と縁のみを新しくする施工です。新調は畳床・畳表・縁のすべてを新品に交換します。芯が傷んでいない場合は表替えでも十分なことが多く、費用も抑えられます。' },
  { cat: 'work', q: '何枚から対応してもらえますか？', a: '1枚からでも対応しております。「1室だけ直したい」「1枚だけ傷んでいる」という場合もお気軽にご相談ください。枚数が少なくても丁寧に対応いたします。' },
  { cat: 'work', q: '施工にはどのくらい時間がかかりますか？', a: '表替えや裏返しは通常6〜8畳で半日〜1日程度です。新調は素材の手配も含めて数日いただく場合があります。お急ぎの場合はご相談ください。' },
  { cat: 'work', q: '日曜・祝日は対応していますか？', a: '基本的に日曜・祝日は定休日とさせていただいております。ただし、事前にご相談いただければ対応できる場合もございます。詳しくはお電話にてご確認ください。' },
  { cat: 'work', q: 'ふすまや障子の張替えも対応していますか？', a: '申し訳ございませんが、当店は畳専門店のため、ふすま・障子・網戸・内装リフォームには対応しておりません。畳に関することでしたら何でもお気軽にご相談ください。' },
  { cat: 'area', q: '鹿児島市以外も対応していますか？', a: '鹿児島県内全域を対応エリアとしております。鹿児島市内は特に迅速に対応いたします。県内各地からのご依頼もお気軽にご相談ください。' },
  { cat: 'area', q: '対応エリアはどこですか？', a: '鹿児島県内全域に対応しています。鹿児島市内は迅速対応いたします。東谷山・谷山・宇宿・中山・紫原・坂之上・和田・郡元・武岡・草牟田・吉野・小松原などが主な対応エリアです。県内各地からもお気軽にご相談ください。' },
  { cat: 'modern', q: '縁なし畳はどんな部屋に向いていますか？', a: '縁なし畳はシンプルでモダンな印象が特徴で、洋室の雰囲気にも合います。フローリングと組み合わせたLDKや、スタイリッシュな寝室に人気です。正方形の畳を市松模様に配置することで独特の美しさが生まれます。' },
  { cat: 'modern', q: '琉球畳と縁なし畳の違いは何ですか？', a: '琉球畳は本来、沖縄産の七島藺（しちとうい）を使った縁なし畳を指します。現在は「琉球畳風」として、い草・和紙・樹脂などで同様のスタイルを再現できます。縁なし畳は素材を問わず縁のない畳全般を指すことが多いです。' },
  { cat: 'modern', q: 'カラー・素材は選べますか？', a: 'はい。和紙畳・樹脂畳ではグレー・ブラウン・ベージュなどのカラーをお選びいただけます。サンプルを見ながらご決定いただけます。' },
  { cat: 'consult', q: 'どのタイミングで相談すればいいですか？', a: '畳の色が変わってきた・チクチクするなど気になり始めたら、ぜひ一度ご相談ください。状態によって裏返し・表替え・新調の中から最適な施工をご提案します。早めに相談いただくほど選択肢が広がります。' },
  { cat: 'consult', q: '写真を送るだけで見積もりできますか？', a: '写真で概算をお伝えすることは可能ですが、正確な見積もりには現地確認が必要です。まずはお気軽に写真をお送りください（お問い合わせフォームまたはお電話）。' },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div
      ref={ref}
      className="border-b border-tatami-100 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 5) * 0.06 }}
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
              <p className="text-muted text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
  const [active, setActive] = useState<CategoryId>('all')
  const filtered = active === 'all' ? faqs : faqs.filter(f => f.cat === active)

  return (
    <>
      <Header />
      <main>
        <PageHero
          en="FAQ"
          ja="よくあるご質問"
          description="畳の張替え・新調・縁なし畳など、よくいただくご質問をまとめました。"
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    active === cat.id
                      ? 'bg-tatami-400 text-white'
                      : 'bg-tatami-50 border border-tatami-200 text-ink hover:border-tatami-400'
                  }`}
                >
                  {cat.label}
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
                  {filtered.map((faq, i) => (
                    <FAQItem key={`${active}-${i}`} q={faq.q} a={faq.a} index={i} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="text-center mt-14"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-muted text-sm mb-4">その他のご質問はお気軽にどうぞ</p>
              <a href="tel:0992671577" className="font-bold text-tatami-500 text-xl hover:text-tatami-600 transition-colors block mb-1">
                📞 099-267-1577
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
