import type { Metadata } from 'next'
import Link from 'next/link'
import { Landmark, Minus, Sparkles, Crown, Palette, Home, Star, Target, Package, Scissors } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import SectionTitle from '@/components/ui/SectionTitle'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: '畳縁（たたみべり）について | 竹原タタミ店【鹿児島】',
  description:
    '畳縁の種類・デザイン・選び方を詳しくご説明。伝統柄から和モダンまで豊富なバリエーション。鹿児島市の畳専門店・竹原タタミ店では実物サンプルをお持ちしてご提案します。',
  keywords: [
    '畳縁',
    'たたみべり',
    '畳縁 種類',
    '畳縁 デザイン',
    '鹿児島 畳縁',
    '畳 縁 交換',
    '鹿児島 畳',
  ],
  openGraph: {
    title: '畳縁（たたみべり）について | 竹原タタミ店【鹿児島】',
    description: '畳縁の種類・デザイン・選び方を詳しくご説明。鹿児島市の畳専門店。',
    type: 'website',
  },
}

const beriTypes = [
  {
    name: '伝統柄',
    en: 'Traditional Pattern',
    Icon: Landmark,
    desc: '桐竹鳳凰・亀甲文様など日本の伝統紋様を使った縁。格式のある和室・客間・仏間に最適です。',
    tags: ['格式高い', '伝統的', '客間向き'],
    color: '#88B462',
    bg: '#F2F7EE',
    room: '和室・客間・仏間',
  },
  {
    name: '無地',
    en: 'Plain',
    Icon: Minus,
    desc: 'シンプルな無地の縁はどんな和室にも合わせやすく、モダンな空間にも自然に馴染みます。',
    tags: ['シンプル', '万能', '和モダン'],
    color: '#C4A882',
    bg: '#FAF7F3',
    room: 'どんな和室にも',
  },
  {
    name: 'モダン柄',
    en: 'Modern Pattern',
    Icon: Sparkles,
    desc: '幾何学模様・アート調のパターンなど現代的なデザイン。和洋折衷のインテリアに個性を添えます。',
    tags: ['現代的', 'おしゃれ', '個性的'],
    color: '#7A8DA0',
    bg: '#F2F5F8',
    room: '洋風スペースにも',
  },
  {
    name: '高級縁',
    en: 'Premium',
    Icon: Crown,
    desc: '絹や金糸を使った高品質な素材の縁。座敷・茶室など特別な空間にふさわしい格調を演出します。',
    tags: ['高品質', '茶室向き', 'プレミアム'],
    color: '#B47C3C',
    bg: '#FAF5EE',
    room: '座敷・茶室',
  },
]

const merits = [
  {
    title: '部屋の印象が大きく変わる',
    desc: '畳縁は部屋全体の印象に思いのほか大きな影響を与えます。濃い色の縁は引き締まった印象に、淡い色の縁は広がりのある印象になります。表替えのタイミングに縁も変えることで、部屋がガラリと変わります。',
    Icon: Palette,
  },
  {
    title: '和モダンスタイルにも対応',
    desc: '縁の種類を変えるだけで、伝統的な和室から現代的な和モダンスタイルへと部屋のイメージが一新。大規模なリフォームなしで空間の雰囲気を変えられます。',
    Icon: Home,
  },
  {
    title: 'オリジナル感が演出できる',
    desc: '豊富なデザインサンプルの中から、部屋の雰囲気・家具・照明に合わせた縁をセレクト。世界に一つだけの和室を作ることができます。',
    Icon: Star,
  },
]

const colorSamples = [
  { name: '深緑', hex: '#2D5016', label: '伝統・格式' },
  { name: '金茶', hex: '#C4883C', label: '高級感' },
  { name: '朱赤', hex: '#C44B2A', label: '華やか' },
  { name: '藍色', hex: '#1E3A5F', label: '品格' },
  { name: '紫', hex: '#6B3E8E', label: '和モダン' },
  { name: '黒', hex: '#1C1A18', label: 'シック' },
  { name: 'ベージュ', hex: '#D4C4A8', label: '柔らか' },
  { name: 'グレー', hex: '#7A7A7A', label: 'モダン' },
]

const commitments = [
  {
    title: '部屋に合わせた提案',
    body: '和室の雰囲気・家具・照明・ふすまの色合いを見た上で、最も映えるデザインをご提案します。「どれにすればいいかわからない」という方もお任せください。',
    Icon: Target,
  },
  {
    title: '豊富なサンプル持参',
    body: '実物のサンプルを現地にお持ちします。実際の和室に当てながらお選びいただけるので、イメージと違うということがありません。',
    Icon: Package,
  },
  {
    title: '和室にも洋風空間にも',
    body: '純和風の座敷から、フローリングにマットとして置く洋風空間まで。どんなインテリアにも合う縁をご提案する経験があります。',
    Icon: Home,
  },
  {
    title: '縁だけの交換も相談可能',
    body: '「畳表はまだきれいだが縁だけ傷んでいる」「雰囲気を変えたい」という場合も、状況に応じてご対応します。まずはお気軽にご相談ください。',
    Icon: Scissors,
  },
]

export default function TatamiBeriPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          en="TATAMI BERI"
          ja="畳縁（たたみべり）について"
          description="畳の印象を決める縁のデザイン。種類・選び方・交換のメリットをわかりやすくご説明します。"
        />

        {/* Breadcrumb */}
        <div className="bg-tatami-50/70 border-b border-tatami-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-3">
            <nav aria-label="パンくずリスト" className="flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-tatami-500 transition-colors">トップ</Link>
              <span className="text-tatami-200">/</span>
              <span className="text-ink">畳縁について</span>
            </nav>
          </div>
        </div>

        {/* ─── 畳縁とは？ ─── */}
        <section id="what-is" className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <SectionTitle en="WHAT IS TATAMI BERI" ja="畳縁とは？" />

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <FadeIn>
                <div>
                  <p className="text-ink text-base leading-loose mb-5">
                    <strong className="font-serif text-tatami-600">畳縁（たたみべり）</strong>とは、
                    畳の長辺（両端）に縫い付けられた帯状の布のことです。
                  </p>
                  <p className="text-muted text-sm leading-loose mb-5">
                    単に端を保護するためだけでなく、その柄や色が和室全体の雰囲気を大きく左右します。
                    昔は身分や格式を表す意味合いもあり、現代でも部屋の「顔」となる重要な要素です。
                  </p>
                  <p className="text-muted text-sm leading-loose">
                    表替えや裏返しのタイミングで縁も同時に新しくするのが一般的ですが、
                    縁のデザインを意識して選ぶことで、和室の雰囲気をがらりと変えることができます。
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="bg-tatami-50 rounded-2xl p-8 border border-tatami-100">
                  <h3 className="font-serif font-bold text-ink text-base mb-5">畳縁の2つの役割</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-tatami-400 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">1</div>
                      <div>
                        <p className="font-medium text-ink text-sm mb-1">耐久性・保護</p>
                        <p className="text-muted text-sm leading-relaxed">畳の角・端を保護し、傷みを防ぎます。縁があることで畳の寿命が延びます。</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-tatami-400 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">2</div>
                      <div>
                        <p className="font-medium text-ink text-sm mb-1">デザイン性</p>
                        <p className="text-muted text-sm leading-relaxed">部屋全体の印象を決める大切な要素。柄・色の選択で和室の格が変わります。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── 畳縁の種類 ─── */}
        <section id="types" className="py-16 md:py-24 bg-tatami-50/60 relative overflow-hidden">
          <div className="absolute inset-0 seigaiha opacity-20" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
            <SectionTitle
              en="TYPES"
              ja="畳縁の種類"
              description="大きく4つのカテゴリがあります。部屋の用途と雰囲気に合わせてお選びください。"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {beriTypes.map((bt, i) => (
                <FadeIn key={bt.name} delay={i * 0.1}>
                  <div
                    className="bg-white border border-tatami-100 rounded-2xl overflow-hidden h-full hover:shadow-xl hover:shadow-tatami-100/50 transition-all duration-300"
                    style={{ borderTopColor: bt.color, borderTopWidth: '3px' }}
                  >
                    <div className="p-6" style={{ backgroundColor: bt.bg }}>
                      <div className="w-9 h-9 bg-white/70 rounded-lg flex items-center justify-center mb-3">
                        <bt.Icon className="w-4 h-4" style={{ color: bt.color }} strokeWidth={1.5} />
                      </div>
                      <p className="text-[10px] tracking-[0.3em] font-sans mb-1 font-medium" style={{ color: bt.color }}>
                        {bt.en}
                      </p>
                      <h3 className="font-serif font-bold text-ink text-lg mb-3">{bt.name}</h3>
                      <p className="text-muted text-sm leading-relaxed mb-4">{bt.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {bt.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-block text-[11px] px-2.5 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: bt.color }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 py-3 bg-white border-t border-tatami-50">
                      <p className="text-xs text-tatami-400">おすすめ：{bt.room}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── カラーサンプル ─── */}
        <section id="colors" className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <SectionTitle
              en="DESIGN SAMPLES"
              ja="人気のカラーサンプル"
              description="豊富なカラーバリエーションから、お部屋の雰囲気に合わせてお選びいただけます。"
            />

            <FadeIn>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 mb-8">
                {colorSamples.map(cs => (
                  <div key={cs.name} className="text-center">
                    <div
                      className="w-full aspect-square rounded-xl mb-2 shadow-sm ring-1 ring-black/5"
                      style={{ backgroundColor: cs.hex }}
                    />
                    <p className="text-xs font-medium text-ink">{cs.name}</p>
                    <p className="text-[10px] text-muted">{cs.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-6 bg-tatami-50 border border-tatami-100 rounded-2xl text-center">
                <p className="text-muted text-sm leading-relaxed">
                  上記はほんの一部です。実際にはさらに多くのデザイン・カラーからお選びいただけます。<br />
                  実物サンプルを現地にお持ちしますので、和室の雰囲気に当てながら一緒にお選びいただけます。
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── 畳縁を変えるメリット ─── */}
        <section id="merits" className="py-16 md:py-24 bg-tatami-50/60">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <SectionTitle
              en="MERITS"
              ja="畳縁を変えるメリット"
            />

            <div className="grid md:grid-cols-3 gap-6">
              {merits.map((m, i) => (
                <FadeIn key={m.title} delay={i * 0.1}>
                  <div className="bg-white border border-tatami-100 rounded-2xl p-7 h-full hover:shadow-lg hover:shadow-tatami-100/50 transition-all duration-300">
                    <div className="w-9 h-9 bg-tatami-50 border border-tatami-100 rounded-lg flex items-center justify-center mb-4">
                      <m.Icon className="w-4 h-4 text-tatami-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif font-bold text-ink text-base mb-3">{m.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 竹原タタミ店のこだわり ─── */}
        <section id="commitment" className="py-16 md:py-24 bg-tatami-900 relative overflow-hidden">
          <div className="absolute inset-0 tatami-grain opacity-40" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
            <SectionTitle en="OUR COMMITMENT" ja="竹原タタミ店のこだわり" light />

            <div className="grid sm:grid-cols-2 gap-6">
              {commitments.map((c, i) => (
                <FadeIn key={c.title} delay={i * 0.1}>
                  <div className="bg-tatami-800/60 border border-tatami-700 rounded-2xl p-7 h-full">
                    <div className="w-9 h-9 bg-tatami-700/50 border border-tatami-600 rounded-lg flex items-center justify-center mb-3">
                      <c.Icon className="w-4 h-4 text-tatami-300" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif font-bold text-white text-base mb-3">{c.title}</h3>
                    <p className="text-tatami-200 text-sm leading-relaxed">{c.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
            <FadeIn>
              <p className="text-tatami-400 text-xs tracking-widest mb-2">CONSULTATION FREE</p>
              <h2 className="font-serif font-bold text-ink text-2xl md:text-3xl mb-4">
                畳縁のご相談も<br className="sm:hidden" />お気軽にどうぞ
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-8 max-w-md mx-auto">
                表替え・裏返しのタイミングで縁のデザインを変えてみませんか？<br />
                実物サンプルをお持ちして、一緒にお選びします。
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
                <Link href="/tatami" className="hover:text-tatami-500 transition-colors">畳について</Link>
                <span>•</span>
                <Link href="/works" className="hover:text-tatami-500 transition-colors">施工事例</Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
