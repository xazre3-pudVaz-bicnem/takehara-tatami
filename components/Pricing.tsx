'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import SectionTitle from './ui/SectionTitle'

const grades = [
  {
    id: 'rental',
    category: '賃貸・貸家用',
    en: 'RENTAL',
    price: '5,000円〜',
    level: 1,
    feature: '国産い草でコスト重視',
    desc: '賃貸物件・仮住まいに最適。安心の国産い草を使用。',
    headerBg: 'bg-tatami-100',
    headerText: 'text-tatami-700',
    priceCls: 'text-tatami-600',
    borderCls: 'border-tatami-200',
    note: '',
  },
  {
    id: 'kojin',
    category: '個人宅用',
    en: 'STANDARD',
    price: '15,000円〜',
    level: 2,
    feature: '香り・踏み心地のバランス',
    desc: '国産い草の良さを存分に楽しめる個人宅向けグレード。',
    headerBg: 'bg-tatami-500',
    headerText: 'text-white',
    priceCls: 'text-tatami-700',
    borderCls: 'border-tatami-300',
    note: '',
  },
  {
    id: 'jokyu',
    category: '上級品',
    en: 'PREMIUM',
    price: '30,000円〜',
    level: 3,
    feature: '職人の技が光る',
    desc: '厳選した国産い草。繊維・色艶・香りが際立つ上質な一枚。',
    headerBg: 'bg-tatami-700',
    headerText: 'text-white',
    priceCls: 'text-tatami-800',
    borderCls: 'border-tatami-400',
    note: '',
  },
  {
    id: 'kokyu',
    category: '高級品',
    en: 'HIGH GRADE',
    price: '45,000円〜',
    level: 4,
    feature: '特選国産い草の逸品',
    desc: '色艶・香り・肌触りすべてが格別。本格的な和室に。',
    headerBg: 'bg-tatami-800',
    headerText: 'text-white',
    priceCls: 'text-tatami-900',
    borderCls: 'border-tatami-600',
    note: '',
  },
  {
    id: 'finest',
    category: '最高級品',
    en: 'FINEST',
    price: '応相談',
    level: 5,
    feature: '八代産 本物の最高級',
    desc: '農家さんを直接訪ね、職人の目で選んだ唯一無二の畳表。',
    headerBg: 'bg-gradient-to-r from-yellow-800 to-yellow-700',
    headerText: 'text-yellow-100',
    priceCls: 'text-yellow-800',
    borderCls: 'border-yellow-600',
    note: '素材・時期により変動',
  },
]

type PriceRow = {
  label: string
  price: string
  note: string
  special?: boolean
  divider?: boolean
}

const priceRows: PriceRow[] = [
  { label: '裏返し', price: '4,000円〜', note: '1枚・税込' },
  { label: '表替え（下級品）', price: '5,000円〜', note: '国産天然い草' },
  { label: '表替え（個人宅用）', price: '15,000円〜', note: '国産天然い草' },
  { label: '表替え（上級品）', price: '30,000円〜', note: '国産い草 上級' },
  { label: '表替え（高級品）', price: '45,000円〜', note: '国産高級い草（熊本産）' },
  { label: '新調（下級品）', price: '15,000円〜', note: '国産天然い草' },
  { label: '新調（高級）', price: '35,000円〜', note: '国産高級い草（熊本産）' },
  { label: '和紙・樹脂表 表替え', price: '12,000円〜', note: '和紙表・樹脂表', divider: true },
  { label: '和紙・樹脂表 新調', price: '22,000円〜', note: '和紙表・樹脂表' },
  { label: '縁なし半畳 表替え', price: '10,000円〜', note: '全素材共通', divider: true },
  { label: '縁なし半畳 新調', price: '15,000円〜', note: '全素材共通' },
  { label: '本物の琉球畳 表替え', price: '30,000円〜', note: '天然七島藺・取り寄せ', special: true, divider: true },
  { label: '本物の琉球畳 新調', price: '35,000円〜', note: '天然七島藺・取り寄せ', special: true },
]

function StarLevel({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5 mb-2.5" aria-label={`グレード${level}段階`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < level ? 'text-yellow-400' : 'text-tatami-100'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Pricing() {
  const sectionRef = useRef(null)
  const tableRef = useRef(null)
  const philosophyRef = useRef(null)

  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' })
  const philosophyInView = useInView(philosophyRef, { once: true, margin: '-60px' })

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <SectionTitle
          en="PRICING"
          ja="料金表"
          description="すべて国産い草を使用。貸家用から最高級品まで幅広くご対応します。"
        />

        {/* ── グレード別カード ── */}
        <div ref={sectionRef} className="mb-14">
          <div className="mb-5">
            <p className="text-[10px] text-tatami-400 tracking-[0.3em] font-medium uppercase mb-1">
              GRADE · 天然い草 表替え
            </p>
            <h3 className="font-serif text-base md:text-lg font-bold text-ink">
              グレード別 参考価格（表替え・1枚・税込）
            </h3>
          </div>

          {/* scroll container */}
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory -mx-1 px-1">
            {grades.map((g, i) => (
              <motion.div
                key={g.id}
                className={`flex-shrink-0 w-44 sm:w-auto sm:flex-1 snap-start rounded-2xl border-2 ${g.borderCls} overflow-hidden bg-white`}
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.55 }}
              >
                {/* card header */}
                <div className={`px-3.5 py-2.5 ${g.headerBg}`}>
                  <p className={`text-[9px] tracking-[0.25em] font-medium opacity-75 ${g.headerText}`}>
                    {g.en}
                  </p>
                  <p className={`font-serif font-bold text-sm leading-tight ${g.headerText}`}>
                    {g.category}
                  </p>
                </div>

                {/* card body */}
                <div className="px-3.5 py-4">
                  <StarLevel level={g.level} />
                  <div className="mb-3">
                    <span className={`text-xl font-bold font-serif ${g.priceCls}`}>
                      {g.price}
                    </span>
                    {g.price !== '応相談' && (
                      <span className="text-[10px] text-muted ml-1">/ 枚</span>
                    )}
                  </div>
                  <p className="text-tatami-500 text-[10px] font-bold tracking-wider mb-2 uppercase">
                    {g.feature}
                  </p>
                  <p className="text-muted text-xs leading-relaxed">{g.desc}</p>
                  {g.note && (
                    <p className="mt-2 text-[9px] text-yellow-700 bg-yellow-50 rounded-lg px-2 py-1 leading-relaxed">
                      ※ {g.note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-muted text-xs mt-2 leading-relaxed">
            ※ 参考価格は税込・表替え1枚あたりの目安です。新調・裏返しは下記料金表をご参照ください。
          </p>
        </div>

        {/* ── 施工種別 料金表 ── */}
        <div ref={tableRef} className="mb-12">
          <div className="mb-5">
            <p className="text-[10px] text-tatami-400 tracking-[0.3em] font-medium uppercase mb-1">
              PRICE TABLE
            </p>
            <h3 className="font-serif text-base md:text-lg font-bold text-ink">
              施工種別 料金一覧（税込・1枚あたり）
            </h3>
          </div>

          <motion.div
            className="rounded-2xl border border-tatami-100 overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {/* table header */}
            <div className="grid grid-cols-[1fr_auto_auto] bg-tatami-600 text-white text-xs">
              <div className="px-4 py-2.5 font-medium">施工内容</div>
              <div className="px-4 py-2.5 font-medium text-right whitespace-nowrap">料金（税込）</div>
              <div className="px-4 py-2.5 font-medium text-muted/80 hidden sm:block">素材・備考</div>
            </div>

            {priceRows.map((row, i) => (
              <div
                key={i}
                className={[
                  'grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto]',
                  'border-b border-tatami-50 last:border-0',
                  row.divider ? 'border-t-2 border-t-tatami-100' : '',
                  row.special
                    ? 'bg-amber-50/60'
                    : i % 2 === 0
                    ? 'bg-white'
                    : 'bg-tatami-50/40',
                ].join(' ')}
              >
                <div
                  className={`px-4 py-3 font-serif font-bold text-sm ${
                    row.special ? 'text-yellow-800' : 'text-ink'
                  }`}
                >
                  {row.label}
                  {/* show note below label on mobile */}
                  <span className="block sm:hidden text-[10px] font-normal text-muted mt-0.5">
                    {row.note}
                  </span>
                </div>
                <div className="px-4 py-3 text-right flex items-center justify-end">
                  <span
                    className={`font-bold text-base whitespace-nowrap tabular-nums ${
                      row.special ? 'text-yellow-700' : 'text-tatami-600'
                    }`}
                  >
                    {row.price}
                  </span>
                </div>
                {/* note column – desktop only */}
                <div className="hidden sm:flex px-4 py-3 text-muted text-xs items-center">
                  {row.note}
                </div>
              </div>
            ))}
          </motion.div>

          <p className="text-muted text-xs mt-2 leading-relaxed">
            ※ 表示価格はすべて税込・1枚あたりの目安です。枚数・サイズ・畳床の種類により変わります。<br className="sm:hidden" />
            本物の琉球畳（天然七島藺）は取り寄せ・事前相談が必要です。
          </p>
        </div>

        {/* ── こだわり説明 ── */}
        <motion.div
          ref={philosophyRef}
          className="rounded-2xl overflow-hidden border border-tatami-100 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55 }}
        >
          <div className="bg-tatami-700 px-6 py-4">
            <p className="text-tatami-300 text-[10px] tracking-[0.3em] font-medium mb-0.5">COMMITMENT</p>
            <h3 className="font-serif font-bold text-white text-base md:text-lg">
              竹原タタミ店のこだわり
            </h3>
            <p className="text-tatami-300 text-xs mt-0.5">本物の国産い草と職人の技</p>
          </div>

          <div className="bg-tatami-50 px-6 py-6 space-y-4">
            {[
              {
                icon: (
                  <svg className="w-4 h-4 text-tatami-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ),
                text: '一般的な表替えから、国産い草・熊本県八代産の高級畳表まで幅広く対応しています。',
              },
              {
                icon: (
                  <svg className="w-4 h-4 text-tatami-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ),
                text: '安さだけでなく、香り・肌触り・耐久性・見た目の美しさを大切にした素材をご提案します。',
              },
              {
                icon: (
                  <svg className="w-4 h-4 text-tatami-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ),
                text: '高級品については、実際に産地（熊本県八代市）まで足を運び、職人の目で確認した畳表を仕入れています。',
              },
              {
                icon: (
                  <svg className="w-4 h-4 text-tatami-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ),
                text: '一般的な畳屋では扱いにくい最高級クラスまでご相談いただけます。素材・在庫状況により取り寄せ・事前相談が必要な場合があります。',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                {item.icon}
                <p className="text-sm text-ink leading-relaxed">{item.text}</p>
              </div>
            ))}

            {/* 八代産 callout */}
            <div className="mt-2 bg-white rounded-xl border border-tatami-200 px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-tatami-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-serif font-bold text-ink text-sm mb-1">八代産い草 産地直結</p>
                  <p className="text-muted text-xs leading-relaxed">
                    熊本県八代市のい草農家さんを訪ね、い草の栽培・製織の現場を体験見学しました。
                    本物の最高級を肌で感じ、その感動をそのままお届けしています。
                    一般的な畳屋の最高級クラス（2〜3万円程度）を超えた、本物の最高級品もご相談ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 無料見積もりCTA ── */}
        <motion.div
          className="bg-tatami-50 rounded-2xl p-6 md:p-8 border border-tatami-100 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-tatami-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif font-bold text-ink mb-1.5">現地確認・お見積もりは完全無料</h3>
              <p className="text-muted text-sm leading-relaxed">
                畳の状態・枚数・素材によって最適なご提案が変わります。
                サンプルをお持ちして、実際に手で触れながらお選びいただけます。
                見積もりだけでもお気軽にご連絡ください。
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={philosophyInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
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
