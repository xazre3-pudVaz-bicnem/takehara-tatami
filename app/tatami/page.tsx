import type { Metadata } from 'next'
import Link from 'next/link'
import { Droplets, Thermometer, Leaf, Building2, Snowflake, Shield, VolumeX, Users } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import SectionTitle from '@/components/ui/SectionTitle'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: '畳について｜種類・メリット・交換目安 | 竹原タタミ店【鹿児島】',
  description:
    '畳の基礎知識を分かりやすく解説。天然いぐさ・和紙畳・樹脂畳の違い、表替え・裏返し・新調の交換目安など。鹿児島市の畳専門店・竹原タタミ店が丁寧にご説明します。',
  keywords: [
    '鹿児島 畳',
    '畳とは',
    '畳の種類',
    '畳 張替え 鹿児島',
    '和紙畳 鹿児島',
    '畳表替え 鹿児島',
    '鹿児島市 畳',
  ],
  openGraph: {
    title: '畳について｜種類・メリット・交換目安 | 竹原タタミ店【鹿児島】',
    description: '畳の基礎知識を分かりやすく解説。鹿児島市の畳専門店・竹原タタミ店。',
    type: 'website',
  },
}

const overview = [
  { Icon: Droplets,    title: '調湿性',     desc: 'い草が湿気を吸収・放出することで、室内の湿度を自然に調整します。梅雨の時期も室内を快適に保ちます。' },
  { Icon: Thermometer, title: '断熱性',     desc: '畳床には多くの空気層が含まれ、夏は涼しく冬は暖かい環境を保ちます。床暖房との相性も良好です。' },
  { Icon: Leaf,        title: '香りの効果', desc: '天然い草の香りにはリラックス効果があるとされています。新しい畳の部屋に入った瞬間の香りは格別です。' },
  { Icon: Building2,   title: '和室との相性', desc: '日本建築と調和する自然素材。障子・ふすまとの組み合わせで、本物の和の空間が生まれます。' },
]

const merits = [
  { Icon: Snowflake, title: '夏は涼しく、冬は暖かい',  body: 'い草の繊維構造が空気を含み、優れた断熱効果を発揮。冬はフローリングのような冷たさがなく、夏は蓄熱しにくい特性があります。' },
  { Icon: Shield,    title: 'クッション性で衝撃を吸収', body: '畳の弾力性が転倒時のケガを防ぎます。小さなお子様の遊び場や、高齢者の転倒対策にも安心の床材です。' },
  { Icon: VolumeX,   title: '防音・吸音効果',          body: '畳の厚みが歩行音・衝撃音を吸収します。マンションでの階下への配慮にも。和室があるだけで生活音が静かになります。' },
  { Icon: Users,     title: '家族みんなに優しい',       body: '素足で歩いても痛くなく、そのまま横になれる自然な感触。赤ちゃんのハイハイから高齢者の生活まで、すべての世代に対応します。' },
]

const types = [
  {
    name: '天然い草表',
    en: 'Natural Igusa',
    color: '#88B462',
    bg: '#F2F7EE',
    tags: ['香り◎', '調湿効果', '伝統素材'],
    features: [
      '独特のさわやかな香り',
      '調湿・断熱効果が高い',
      '踏み心地が最も自然',
      '国産・中国産など産地が選べる',
    ],
    note: 'お手入れ：乾拭き・掃除機',
  },
  {
    name: '和紙表',
    en: 'Washi',
    color: '#C4A882',
    bg: '#FAF7F3',
    tags: ['色あせしにくい', '水拭き可', '耐久性◎'],
    features: [
      '撥水性があり水拭き可能',
      '変色しにくく長持ち',
      'カラーバリエーション豊富',
      'ペット・子どものいる家庭に最適',
    ],
    note: 'お手入れ：水拭き可',
  },
  {
    name: '樹脂表',
    en: 'Resin',
    color: '#7A8DA0',
    bg: '#F2F5F8',
    tags: ['最高耐久性', 'ペット対応', '水洗い可'],
    features: [
      '最も耐久性が高い',
      '水洗いにも対応',
      '屋外・高湿度環境にも対応',
      '管理が簡単で長期使用可能',
    ],
    note: 'お手入れ：水洗い可',
  },
  {
    name: 'カラー畳',
    en: 'Color Tatami',
    color: '#8B6BA0',
    bg: '#F7F3FB',
    tags: ['カラー豊富', 'モダン和室', 'おしゃれ'],
    features: [
      'グレー・ブラウン・ブルーなど',
      '和モダン・北欧スタイルに合う',
      '市松模様が映えるデザイン',
      'インテリアに合わせてコーディネート',
    ],
    note: '和紙・樹脂素材で提供',
  },
]

const cycle = [
  {
    year: '3〜5年',
    title: '裏返し',
    titleEn: 'FLIPPING',
    price: '¥2,000〜 / 枚',
    desc: '畳表を裏側に返す、最もコストを抑えたメンテナンス。まだきれいな裏面を活かします。',
    color: '#A4C480',
    check: '色あせ・チクチク感が出始めたら',
  },
  {
    year: '5〜10年',
    title: '表替え',
    titleEn: 'SURFACE REPLACEMENT',
    price: '¥3,500〜 / 枚',
    desc: '畳床はそのままに、表面のい草（畳表）と縁を新しく交換します。最も一般的なリフレッシュ方法。',
    color: '#88B462',
    check: '裏返しから数年が経過したら',
  },
  {
    year: '15年以上',
    title: '新調',
    titleEn: 'FULL REPLACEMENT',
    price: '¥15,000〜 / 枚',
    desc: '畳床・畳表・縁のすべてを新品に交換。踏み心地が完全に蘇ります。新築・リフォームにも。',
    color: '#6E9A4C',
    check: '踏んだときの沈み・へたり感',
  },
]

export default function TatamiPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          en="ABOUT TATAMI"
          ja="畳について"
          description="日本の暮らしに息づく伝統素材、畳。その魅力・種類・お手入れの目安をわかりやすくご説明します。"
        />

        {/* Breadcrumb */}
        <div className="bg-tatami-50/70 border-b border-tatami-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-3">
            <nav aria-label="パンくずリスト" className="flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-tatami-500 transition-colors">トップ</Link>
              <span className="text-tatami-200">/</span>
              <span className="text-ink">畳について</span>
            </nav>
          </div>
        </div>

        {/* ─── 畳とは？ ─── */}
        <section id="what-is" className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <SectionTitle
              en="WHAT IS TATAMI"
              ja="畳とは？"
              description="日本独自の床材として、1,300年以上の歴史を持つ畳。自然素材ならではの心地よさが現代の暮らしにも息づいています。"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {overview.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.08}>
                  <div className="bg-tatami-50 border border-tatami-100 rounded-2xl p-6 h-full hover:shadow-md hover:shadow-tatami-100/60 transition-all duration-300">
                    <div className="w-9 h-9 bg-white border border-tatami-100 rounded-lg flex items-center justify-center mb-4">
                      <f.Icon className="w-4 h-4 text-tatami-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif font-bold text-ink text-base mb-2">{f.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.35}>
              <div className="p-7 bg-tatami-900 rounded-2xl">
                <p className="text-tatami-100 text-sm md:text-base leading-loose text-center">
                  畳は「<strong className="text-tatami-300">畳表（い草）</strong>」「<strong className="text-tatami-300">畳床（芯材）</strong>」「<strong className="text-tatami-300">畳縁（布の縁取り）</strong>」の3つで構成されています。<br className="hidden md:block" />
                  自然素材ならではの調湿・断熱・防音性能を持ち、現代の暮らしにも多くの価値をもたらします。
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── 畳のメリット ─── */}
        <section id="merits" className="py-16 md:py-24 bg-tatami-50/60 relative overflow-hidden">
          <div className="absolute inset-0 seigaiha opacity-25" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
            <SectionTitle
              en="MERITS"
              ja="畳のメリット"
              description="現代の暮らしにこそ必要な、畳が持つ4つの優れた特性。"
            />
            <div className="grid sm:grid-cols-2 gap-6">
              {merits.map((m, i) => (
                <FadeIn key={m.title} delay={i * 0.1}>
                  <div className="bg-white border border-tatami-100 rounded-2xl p-7 flex gap-5 h-full hover:shadow-lg hover:shadow-tatami-100/50 transition-all duration-300">
                    <div className="w-10 h-10 bg-tatami-50 border border-tatami-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <m.Icon className="w-5 h-5 text-tatami-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-ink text-lg mb-2">{m.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{m.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 畳の種類 ─── */}
        <section id="types" className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <SectionTitle
              en="TYPES"
              ja="畳の種類"
              description="素材によって風合い・耐久性・価格が異なります。ライフスタイルに合わせてお選びください。"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {types.map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.1}>
                  <div
                    className="rounded-2xl overflow-hidden border border-tatami-100 h-full hover:shadow-xl hover:shadow-tatami-100/40 transition-all duration-300"
                    style={{ borderTopColor: t.color, borderTopWidth: '3px' }}
                  >
                    <div className="p-6" style={{ backgroundColor: t.bg }}>
                      <p className="text-[10px] tracking-[0.3em] font-sans mb-1 font-medium" style={{ color: t.color }}>
                        {t.en}
                      </p>
                      <h3 className="font-serif font-bold text-ink text-lg mb-3">{t.name}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {t.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-block text-[11px] px-2.5 py-0.5 rounded-full text-white font-medium"
                            style={{ backgroundColor: t.color }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <ul className="space-y-2">
                        {t.features.map(feat => (
                          <li key={feat} className="flex items-start gap-2 text-sm text-muted">
                            <span className="flex-shrink-0 mt-0.5 text-tatami-400">✓</span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 pt-3 border-t border-tatami-50 text-xs text-tatami-400">{t.note}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4}>
              <div className="mt-10 p-6 bg-tatami-50 border border-tatami-100 rounded-2xl">
                <p className="text-center text-sm text-muted">
                  素材の選択は畳の仕上がり・耐久性・価格に大きく影響します。
                  迷ったときは現地でサンプルをご覧いただきながら一緒に決められます。
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── 交換サイクル ─── */}
        <section id="cycle" className="py-16 md:py-24 bg-tatami-900 relative overflow-hidden">
          <div className="absolute inset-0 tatami-grain opacity-40" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
            <SectionTitle
              en="REPLACEMENT CYCLE"
              ja="畳の交換目安"
              description="適切なタイミングでメンテナンスを行うことで、畳は長く美しく保てます。"
              light
            />

            <div className="grid md:grid-cols-3 gap-6">
              {cycle.map((c, i) => (
                <FadeIn key={c.title} delay={i * 0.15}>
                  <div className="bg-tatami-800/60 border border-tatami-700 rounded-2xl p-7 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                        style={{ backgroundColor: c.color }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-tatami-400 text-sm font-mono">{c.year}</span>
                    </div>
                    <p className="text-tatami-400 text-[10px] tracking-[0.3em] mb-1">{c.titleEn}</p>
                    <h3 className="font-serif font-bold text-white text-xl mb-3">{c.title}</h3>
                    <p className="text-tatami-200 text-sm leading-relaxed mb-4">{c.desc}</p>
                    <div className="bg-tatami-700/50 rounded-lg px-3 py-2 mb-3">
                      <p className="text-tatami-400 text-xs">目安料金</p>
                      <p className="text-white text-sm font-bold">{c.price}</p>
                    </div>
                    <p className="pt-3 border-t border-tatami-700 text-tatami-400 text-xs">
                      目安のサイン：{c.check}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5}>
              <p className="mt-8 text-tatami-500 text-xs text-center">
                ※ 使用状況・素材によって交換目安は異なります。迷ったらまず現地確認をご依頼ください（無料）。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
            <FadeIn>
              <p className="text-tatami-400 text-xs tracking-widest mb-2">CONSULTATION FREE</p>
              <h2 className="font-serif font-bold text-ink text-2xl md:text-3xl mb-4">
                鹿児島の畳のことなら<br className="sm:hidden" />お気軽にご相談ください
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-8 max-w-md mx-auto">
                鹿児島市内をはじめ、県内全域に対応。1枚からでも承ります。<br />
                現地確認・お見積もりは無料です。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="tel:0992671577"
                  className="inline-flex items-center justify-center gap-2 bg-tatami-400 hover:bg-tatami-500 text-white text-sm font-bold px-8 py-4 rounded-xl transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                  099-267-1577
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-tatami-200 text-tatami-600 hover:bg-tatami-50 text-sm font-medium px-8 py-4 rounded-xl transition-colors"
                >
                  お問い合わせフォーム →
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 justify-center text-xs text-muted">
                <Link href="/services" className="hover:text-tatami-500 transition-colors">サービス一覧</Link>
                <span>•</span>
                <Link href="/tatami-beri" className="hover:text-tatami-500 transition-colors">畳縁について</Link>
                <span>•</span>
                <Link href="/works" className="hover:text-tatami-500 transition-colors">施工事例</Link>
                <span>•</span>
                <Link href="/faq" className="hover:text-tatami-500 transition-colors">よくある質問</Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
