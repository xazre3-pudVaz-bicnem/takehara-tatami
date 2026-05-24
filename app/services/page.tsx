import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import FadeIn from '@/components/ui/FadeIn'
import { FileText, Shield, Palette, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: '畳のサービス一覧｜国産い草・和紙畳・樹脂畳 | 竹原タタミ店【鹿児島】',
  description:
    '鹿児島市の竹原タタミ店では、熊本県産の国産い草・和紙畳・樹脂畳の表替え（5,000円〜）・裏返し・新調まで対応。1枚からご相談可能。現地確認・お見積もり無料。',
  keywords: [
    '鹿児島 畳 サービス',
    '畳 表替え 鹿児島',
    '和紙畳 鹿児島',
    '畳 新調 鹿児島市',
    '鹿児島 畳張替え',
    '国産い草 鹿児島',
    '熊本県産い草',
    '鹿児島市 畳',
  ],
  openGraph: {
    title: '畳のサービス一覧｜国産い草・和紙畳・樹脂畳 | 竹原タタミ店【鹿児島】',
    description: '鹿児島市の竹原タタミ店。国産い草（熊本県産）から和紙・樹脂畳まで1枚から対応。',
    type: 'website',
  },
}

// ── 素材グレード別料金 ──────────────────────────────────────
const gradeServices = [
  {
    grade: '下級品',
    en: 'STANDARD GRADE',
    note: '手軽にリフレッシュしたい方に',
    highlight: false,
    gradientFrom: '#C4D9AC',
    gradientTo: '#A4C480',
    prices: [
      { label: '表替え', price: '5,000円〜 / 枚' },
      { label: '新調',   price: '15,000円〜 / 枚' },
    ],
  },
  {
    grade: '国産中級品',
    en: 'DOMESTIC MID-GRADE',
    note: '品質とコストのバランスを求める方に',
    highlight: false,
    gradientFrom: '#88B462',
    gradientTo: '#6E9A4C',
    prices: [
      { label: '表替え', price: '12,000円〜 / 枚' },
      { label: '裏返し', price: '4,000円〜 / 枚' },
      { label: '新調',   price: '22,000円〜 / 枚' },
    ],
  },
  {
    grade: '国産高級天然いぐさ',
    en: 'PREMIUM DOMESTIC',
    note: '熊本県産。香りと艶が際立つ高品質素材',
    highlight: true,
    gradientFrom: '#6E9A4C',
    gradientTo: '#4A7A2C',
    prices: [
      { label: '表替え', price: '25,000円〜 / 枚' },
      { label: '裏返し', price: '4,000円〜 / 枚' },
      { label: '新調',   price: '35,000円〜 / 枚' },
    ],
  },
]

// ── 素材比較表 ──────────────────────────────────────────────
const comparison = [
  {
    item: '耐久性',
    gekyuu:  '3〜5年',
    chuukyuu: '5〜10年',
    koukyuu:  '7〜15年',
    resin:    '10〜15年',
  },
  {
    item: 'い草の香り',
    gekyuu:  'あり',
    chuukyuu: 'あり',
    koukyuu:  '◎ 豊か',
    resin:    'なし',
  },
  {
    item: '色あせ',
    gekyuu:  '一般的な経年変化',
    chuukyuu: '自然な経年変化',
    koukyuu:  '艶が出る経年美化',
    resin:    '色変化が少ない',
  },
  {
    item: '価格帯',
    gekyuu:  '低',
    chuukyuu: '中',
    koukyuu:  '高',
    resin:    '中〜高',
  },
]

// ── グレードカード ───────────────────────────────────────────
function GradeCard({ g }: { g: typeof gradeServices[number] }) {
  if (g.highlight) {
    return (
      <div className="relative bg-tatami-900 rounded-2xl overflow-hidden border-2 border-tatami-500/40">
        <div className="h-1" style={{ background: `linear-gradient(to right, ${g.gradientFrom}, ${g.gradientTo})` }} />
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 bg-tatami-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            <Star size={9} strokeWidth={2} />
            当店おすすめ
          </span>
        </div>
        <div className="p-6 pt-5">
          <p className="text-tatami-400 text-[10px] tracking-[0.3em] mb-1">{g.en}</p>
          <h3 className="font-serif font-bold text-white text-lg mb-1 leading-snug">{g.grade}</h3>
          <p className="text-tatami-400 text-xs mb-5 leading-relaxed">{g.note}</p>
          <div className="space-y-2">
            {g.prices.map(p => (
              <div key={p.label} className="flex items-center justify-between bg-tatami-800/70 border border-tatami-700 rounded-xl px-4 py-2.5">
                <span className="text-tatami-200 text-xs font-medium">{p.label}</span>
                <span className="text-tatami-300 font-bold text-sm">{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-tatami-100">
      <div className="h-1" style={{ background: `linear-gradient(to right, ${g.gradientFrom}, ${g.gradientTo})` }} />
      <div className="p-6 pt-5">
        <p className="text-tatami-300 text-[10px] tracking-[0.3em] mb-1">{g.en}</p>
        <h3 className="font-serif font-bold text-ink text-lg mb-1 leading-snug">{g.grade}</h3>
        <p className="text-muted text-xs mb-5 leading-relaxed">{g.note}</p>
        <div className="space-y-2">
          {g.prices.map(p => (
            <div key={p.label} className="flex items-center justify-between bg-tatami-50 border border-tatami-100 rounded-xl px-4 py-2.5">
              <span className="text-ink text-xs font-medium">{p.label}</span>
              <span className="text-tatami-600 font-bold text-sm">{p.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          en="SERVICES"
          ja="サービス一覧"
          description="畳に関するご相談は、すべて竹原タタミ店にお任せください。国産い草から和紙・樹脂畳まで、1枚から対応いたします。"
        />

        {/* Breadcrumb */}
        <div className="bg-tatami-50/70 border-b border-tatami-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between">
            <nav aria-label="パンくずリスト" className="flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-tatami-500 transition-colors">トップ</Link>
              <span className="text-tatami-200">/</span>
              <span className="text-ink">サービス一覧</span>
            </nav>
            <p className="text-xs text-muted hidden sm:block">現地確認・お見積もり無料</p>
          </div>
        </div>

        {/* ─── ① 天然い草表 ─── */}
        <section id="natural-igusa" className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">

            <FadeIn>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-tatami-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-bold font-serif">①</span>
                </div>
                <div>
                  <p className="text-tatami-400 text-xs tracking-widest font-sans mb-0.5">NATURAL IGUSA</p>
                  <h2 className="font-serif font-bold text-ink text-2xl">天然い草表</h2>
                </div>
              </div>
            </FadeIn>

            {/* 国産い草 story block */}
            <FadeIn>
              <div className="relative bg-tatami-900 rounded-2xl p-8 mb-10 overflow-hidden">
                <div
                  className="absolute top-0 right-0 text-tatami-700/50 font-serif leading-none select-none translate-x-2 -translate-y-2"
                  style={{ fontSize: '140px' }}
                  aria-hidden="true"
                >
                  藺
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={12} className="text-tatami-400" strokeWidth={1.5} />
                    <p className="text-tatami-400 text-[10px] tracking-[0.35em]">職人のこだわり · 国産高級い草</p>
                  </div>
                  <h3 className="font-serif font-bold text-white text-xl md:text-2xl mb-5 leading-snug">
                    国産高級い草を、大切に選んでいます。
                  </h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    <p className="text-tatami-200 text-sm leading-loose">
                      国産い草の約9割は熊本県で生産されています。
                      かつて全国各地で栽培されていたい草も、農家の高齢化と
                      後継者不足によって生産量は年々減少し、
                      良質な国産い草は今やとても貴重な存在になりつつあります。
                      農家さんが丁寧に育て、手間をかけて仕上げた高級い草は、
                      その数も限られた、本当に希少な素材です。
                    </p>
                    <p className="text-tatami-200 text-sm leading-loose">
                      天然い草の香りは、化学素材では再現できない本物です。
                      踏んだときの自然な弾力、使い込むほどに深まる艶、
                      そして部屋に広がる清々しい空気感。高級い草は経年とともに
                      変色するのではなく、美しく育っていきます。竹原タタミ店では、
                      この豊かさを次の世代にも残したいという想いから、
                      国産高級い草を積極的にご提案しています。
                    </p>
                  </div>
                  <div className="mt-5 pt-5 border-t border-tatami-700/60">
                    <p className="text-tatami-400 text-xs leading-relaxed font-serif italic">
                      「安さだけでなく、本当に良いものを長く使ってほしい。それが、地域の畳職人としての願いです。」
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 魅力 / こんな方に */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <FadeIn>
                <div className="bg-tatami-50 rounded-2xl p-7 border border-tatami-100 h-full">
                  <h3 className="font-serif font-bold text-ink text-base mb-4">国産高級い草の魅力</h3>
                  <ul className="space-y-3">
                    {[
                      'さわやかな香りでα波が増加し、心が落ち着く',
                      '使い込むほどに深まる艶と経年美化',
                      '踏み心地が自然で足に優しい',
                      '調湿・断熱・防音に優れた本物の自然素材',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <span className="text-tatami-400 mt-0.5 flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="bg-tatami-900 rounded-2xl p-7 h-full">
                  <h3 className="font-serif font-bold text-tatami-100 text-base mb-4">こんな方におすすめ</h3>
                  <ul className="space-y-3">
                    {[
                      '本物志向で、い草の香りを大切にしたい',
                      '昔ながらの和室の雰囲気を守りたい方',
                      '子どもに自然素材の感触を体験させたい',
                      '熊本県産の国産い草にこだわりたい方',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-tatami-300">
                        <span className="text-tatami-400 mt-0.5 flex-shrink-0">▷</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* グレード別料金カード */}
            <FadeIn>
              <p className="text-tatami-400 text-[10px] tracking-[0.3em] mb-5 text-center">PRICE BY GRADE · 素材グレード別料金</p>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-5 mb-8">
              {gradeServices.map((g, i) => (
                <FadeIn key={g.grade} delay={i * 0.1}>
                  <GradeCard g={g} />
                </FadeIn>
              ))}
            </div>

            {/* 目積ヘリ無し半畳 */}
            <FadeIn>
              <div className="bg-tatami-50 rounded-2xl border border-tatami-100 p-6">
                <p className="text-tatami-500 text-xs font-bold tracking-wider mb-4">目積ヘリ無し半畳（天然い草）</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: '表替え', price: '10,000円〜' },
                    { label: '新調',   price: '15,000円〜' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between bg-white border border-tatami-100 rounded-xl px-5 py-3">
                      <span className="text-ink text-sm font-medium">{item.label}</span>
                      <span className="text-tatami-600 font-bold text-sm">{item.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted text-xs mt-3">※ 縁なし・半畳タイプ。市松模様の和モダン施工に対応。</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-tatami-200 to-transparent mx-8" />

        {/* ─── ② いぐさ以外の表 ─── */}
        <section id="modern-tatami" className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">

            <FadeIn>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-tatami-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-bold font-serif">②</span>
                </div>
                <div>
                  <p className="text-tatami-400 text-xs tracking-widest font-sans mb-0.5">WASHI · RESIN · COLOR</p>
                  <h2 className="font-serif font-bold text-ink text-2xl">いぐさ以外の表</h2>
                </div>
              </div>
            </FadeIn>

            {/* 素材カード */}
            <div className="grid sm:grid-cols-3 gap-5 mb-10">
              {[
                {
                  name: '和紙表',
                  Icon: FileText,
                  features: ['撥水性があり水拭き可', '変色しにくく長持ち（10〜15年）', 'カラーバリエーション豊富'],
                },
                {
                  name: '樹脂表',
                  Icon: Shield,
                  features: ['最高クラスの耐久性（15年以上）', '水洗いにも対応', 'ペット・子供のいるご家庭に最適'],
                },
                {
                  name: 'カラー畳',
                  Icon: Palette,
                  features: ['豊富な色合い', 'モダン和室・北欧スタイルに', '市松模様が特に映える'],
                },
              ].map((type, i) => (
                <FadeIn key={type.name} delay={i * 0.1}>
                  <div className="bg-tatami-50 rounded-2xl p-6 border border-tatami-100 h-full">
                    <div className="w-9 h-9 bg-white border border-tatami-200 rounded-lg flex items-center justify-center mb-3">
                      <type.Icon className="w-4 h-4 text-tatami-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif font-bold text-ink text-base mb-3">{type.name}</h3>
                    <ul className="space-y-2">
                      {type.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted">
                          <span className="text-tatami-400 flex-shrink-0">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* いぐさ以外の表 料金 */}
            <FadeIn>
              <p className="text-tatami-400 text-[10px] tracking-[0.3em] mb-5 text-center">PRICE · 料金</p>
            </FadeIn>
            <FadeIn>
              <div className="bg-tatami-50 rounded-2xl border border-tatami-100 p-6 mb-14">
                <p className="text-tatami-500 text-xs font-bold tracking-wider mb-4">いぐさ以外の表</p>
                <div className="grid sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { label: '表替え', price: '12,000円〜' },
                    { label: '裏返し', price: '4,000円〜' },
                    { label: '新調',   price: '22,000円〜' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between bg-white border border-tatami-100 rounded-xl px-5 py-3">
                      <span className="text-ink text-sm font-medium">{item.label}</span>
                      <span className="text-tatami-600 font-bold text-sm">{item.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-tatami-500 text-xs font-bold tracking-wider mb-3">目積ヘリ無し半畳</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: '表替え', price: '10,000円〜' },
                    { label: '新調',   price: '15,000円〜' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between bg-white border border-tatami-100 rounded-xl px-5 py-3">
                      <span className="text-ink text-sm font-medium">{item.label}</span>
                      <span className="text-tatami-600 font-bold text-sm">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* 素材比較表 */}
            <FadeIn>
              <div className="bg-tatami-50 rounded-2xl border border-tatami-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-tatami-100 flex items-center gap-3">
                  <div className="h-4 w-0.5 bg-tatami-400 rounded-full" />
                  <h3 className="font-serif font-bold text-ink text-base">素材比較表</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[620px]">
                    <thead>
                      <tr className="bg-tatami-100/60">
                        <th className="text-left px-4 py-3.5 text-xs font-bold text-ink/60 w-28">比較項目</th>
                        <th className="text-center px-3 py-3.5 text-xs font-bold text-tatami-400">
                          下級品
                        </th>
                        <th className="text-center px-3 py-3.5 text-xs font-bold text-tatami-600">
                          国産中級品
                        </th>
                        <th className="text-center px-3 py-3.5 text-xs font-bold text-tatami-700 bg-tatami-200/40">
                          <span className="inline-flex items-center gap-1 justify-center">
                            <Star size={10} className="text-tatami-500" strokeWidth={2} />
                            国産高級天然いぐさ
                          </span>
                        </th>
                        <th className="text-center px-3 py-3.5 text-xs font-bold text-[#5A7080]">いぐさ以外の表</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tatami-100">
                      {comparison.map((row, i) => (
                        <tr key={row.item} className={i % 2 === 0 ? 'bg-white' : 'bg-tatami-50/30'}>
                          <td className="px-4 py-3.5 font-medium text-ink text-xs">{row.item}</td>
                          <td className="px-3 py-3.5 text-center text-tatami-400 text-xs">{row.gekyuu}</td>
                          <td className="px-3 py-3.5 text-center text-tatami-600 text-xs">{row.chuukyuu}</td>
                          <td className="px-3 py-3.5 text-center text-tatami-700 bg-tatami-50/40 font-medium text-xs">{row.koukyuu}</td>
                          <td className="px-3 py-3.5 text-center text-muted text-xs">{row.resin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-3 border-t border-tatami-100 bg-tatami-50/60">
                  <p className="text-muted text-xs">
                    ★ 当店では国産高級い草（熊本県産）を特におすすめしています。
                    用途やご予算に合わせて最適な素材をご提案しますので、お気軽にご相談ください。
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-14 md:py-20 bg-tatami-50">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
            <FadeIn>
              <p className="text-tatami-400 text-xs tracking-widest mb-2">FREE CONSULTATION</p>
              <h3 className="font-serif font-bold text-ink text-xl md:text-2xl mb-3">どのサービスか迷ったら</h3>
              <p className="text-muted text-sm leading-relaxed mb-6 max-w-md mx-auto">
                現地で畳の状態を確認した上で、最適なサービスをご提案します。<br />
                お見積もりだけでも大丈夫です。
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="tel:0992671577"
                  className="inline-flex items-center gap-2 bg-tatami-400 hover:bg-tatami-500 text-white text-sm font-medium px-7 py-3 rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                  099-267-1577
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-tatami-200 text-tatami-600 hover:bg-white text-sm font-medium px-7 py-3 rounded-xl transition-colors"
                >
                  お問い合わせフォーム
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
