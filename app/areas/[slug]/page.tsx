import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SummaryBox from '@/components/ui/SummaryBox'
import CTABanner from '@/components/ui/CTABanner'
import RelatedLinks from '@/components/ui/RelatedLinks'
import FadeIn from '@/components/ui/FadeIn'
import { areasData, getAreaBySlug } from '@/lib/areas-data'

export function generateStaticParams() {
  return areasData.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) return {}
  return {
    title: area.seo.title,
    description: area.seo.description,
    keywords: area.seo.keywords,
    openGraph: {
      title: area.seo.title,
      description: area.seo.description,
      locale: 'ja_JP',
      type: 'website',
    },
  }
}

const services = [
  { slug: 'omotegae', label: '表替え', desc: '畳表・縁を新しく交換' },
  { slug: 'uragaeshi', label: '裏返し', desc: '最もリーズナブルな施工' },
  { slug: 'shincho', label: '新調', desc: '畳を全て新品に交換' },
  { slug: 'herinashi', label: '縁なし畳', desc: '和モダンスタイル' },
  { slug: 'ryukyu', label: '琉球畳風', desc: '市松模様の洗練された和室' },
]

const pricing = [
  { label: '裏返し', price: '¥4,000〜', note: '1枚・税込' },
  { label: '表替え（い草）', price: '¥3,500〜', note: '1枚・税込' },
  { label: '表替え（和紙/樹脂）', price: '¥12,000〜', note: '1枚・税込' },
  { label: '新調', price: '¥15,000〜', note: '1枚・税込' },
  { label: '縁なし（半畳）', price: '¥8,000〜', note: '1枚・税込' },
]

const flow = [
  { step: '01', title: 'お問い合わせ', desc: 'お電話またはWebフォームでご連絡ください。' },
  { step: '02', title: '現地確認・採寸', desc: '畳の状態を確認し、最適な施工をご提案します。無料です。' },
  { step: '03', title: 'お見積もり・素材選び', desc: '費用をご提示します。素材・縁もお選びいただけます。' },
  { step: '04', title: '施工', desc: '丁寧に仕上げます。表替えは当日中にお戻しするのが基本です。' },
  { step: '05', title: '仕上がり確認', desc: '設置後に仕上がりを確認していただきます。' },
]

export default async function AreaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${area.name}の畳張替え・表替えサービス`,
    provider: {
      '@type': 'LocalBusiness',
      name: '(有)竹原タタミ店',
      telephone: '099-267-1577',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '東谷山2丁目35-15',
        addressLocality: '鹿児島市',
        addressRegion: '鹿児島県',
        postalCode: '891-0105',
        addressCountry: 'JP',
      },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '18:00',
      }],
    },
    areaServed: { '@type': 'City', name: area.name },
    description: area.seo.description,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: area.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://takehara-tatami.com' },
      { '@type': 'ListItem', position: 2, name: '対応エリア', item: 'https://takehara-tatami.com/areas' },
      { '@type': 'ListItem', position: 3, name: area.name, item: `https://takehara-tatami.com/areas/${area.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        <PageHero
          en={`SERVICE AREA · ${area.nameEn.toUpperCase()}`}
          ja={area.h1}
          description={`${area.name}の畳の張替え・表替え・新調に対応しています。`}
        />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 md:py-16">
          <Breadcrumb items={[
            { label: '対応エリア', href: '/areas' },
            { label: area.name },
          ]} />

          {/* Summary */}
          <SummaryBox title={`${area.name}での畳張替えについて`}>
            <p>{area.summary}</p>
            <p className="mt-1.5 text-tatami-600 font-medium">対応スピード：{area.responseNote}</p>
          </SummaryBox>

          {/* 地域の特徴 */}
          <FadeIn>
            <section className="mb-12">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink mb-4">
                {area.name}の住宅事情と畳のお悩み
              </h2>
              <p className="text-muted text-sm md:text-base leading-relaxed mb-5">{area.localContext}</p>

              <div className="grid sm:grid-cols-2 gap-3">
                {area.characteristics.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3.5 bg-tatami-50 rounded-xl border border-tatami-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-tatami-400 flex-shrink-0 mt-1.5" />
                    <span className="text-sm text-ink">{c}</span>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* よくある相談 */}
          {area.commonProblems.length > 0 && (
            <FadeIn delay={0.1}>
              <section className="mb-12">
                <h2 className="font-serif text-xl md:text-2xl font-bold text-ink mb-4">
                  {area.name}でよくあるご相談
                </h2>
                <ul className="space-y-2">
                  {area.commonProblems.map((p, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-white border border-tatami-100 rounded-lg">
                      <span className="w-5 h-5 rounded-full bg-tatami-400 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-ink">{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-muted text-xs">
                  → <Link href="/problems" className="text-tatami-600 hover:underline">畳のお悩み別ページ一覧</Link>もご参照ください。
                </p>
              </section>
            </FadeIn>
          )}

          {/* 対応サービス */}
          <FadeIn delay={0.15}>
            <section className="mb-12">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink mb-4">
                {area.name}での対応サービス
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {services.map(s => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="flex items-start gap-2.5 p-4 bg-white border border-tatami-100 rounded-xl hover:border-tatami-400 hover:shadow-sm transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-tatami-400 flex-shrink-0 mt-1.5" />
                    <div>
                      <p className="font-medium text-ink text-sm group-hover:text-tatami-600 transition-colors">{s.label}</p>
                      <p className="text-muted text-xs mt-0.5">{s.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* 料金目安 */}
          <FadeIn delay={0.2}>
            <section className="mb-12">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink mb-4">
                料金目安（1枚あたり）
              </h2>
              <div className="bg-tatami-50 rounded-2xl border border-tatami-100 overflow-hidden">
                {pricing.map((p, i) => (
                  <div key={i} className={`flex items-center justify-between px-5 py-3.5 ${i < pricing.length - 1 ? 'border-b border-tatami-100' : ''}`}>
                    <span className="text-sm text-ink">{p.label}</span>
                    <div className="text-right">
                      <span className="font-bold text-tatami-700">{p.price}</span>
                      <span className="text-tatami-400 text-xs ml-1.5">{p.note}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted text-xs mt-3">※ 畳のサイズ・素材・枚数により変わります。詳しくは現地確認の上でご提示します。</p>
            </section>
          </FadeIn>

          {/* 施工の流れ */}
          <FadeIn delay={0.25}>
            <section className="mb-12">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink mb-4">施工の流れ</h2>
              <div className="space-y-3">
                {flow.map((f, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-tatami-400 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {f.step}
                    </span>
                    <div className="flex-1 pt-0.5">
                      <p className="font-medium text-ink text-sm">{f.title}</p>
                      <p className="text-muted text-xs mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* FAQ */}
          <FadeIn delay={0.3}>
            <section className="mb-12">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink mb-6">
                よくあるご質問（{area.name}）
              </h2>
              <div className="space-y-3">
                {area.faqs.map((faq, i) => (
                  <details key={i} className="bg-white border border-tatami-100 rounded-xl overflow-hidden group">
                    <summary className="flex items-start gap-3 p-4 cursor-pointer list-none hover:bg-tatami-50 transition-colors">
                      <span className="w-5 h-5 rounded-full bg-tatami-400 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">Q</span>
                      <span className="font-medium text-ink text-sm flex-1">{faq.q}</span>
                    </summary>
                    <div className="px-4 pb-4 pt-1 flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-tatami-100 text-tatami-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">A</span>
                      <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
              <p className="mt-4 text-center">
                <Link href="/faq" className="text-tatami-600 text-sm hover:underline">→ よくある質問をもっと見る</Link>
              </p>
            </section>
          </FadeIn>

          {/* Related links */}
          <RelatedLinks
            title="関連ページ"
            links={[
              { href: '/services/omotegae', label: '表替えについて', description: '最も一般的なメンテナンス方法' },
              { href: '/services/shincho', label: '新調について', description: '畳床から全て新品に交換' },
              { href: '/materials/kumamoto-igusa', label: '国産高級い草について', description: '職人が推奨する本物の素材' },
              { href: '/problems/kabi', label: '畳のカビ対策', description: '鹿児島の梅雨時期に注意' },
              { href: '/faq', label: 'よくある質問', description: 'お客様から多いご質問' },
              { href: '/contact', label: 'お問い合わせ', description: '現地確認・お見積もり無料' },
            ]}
          />

          {/* CTA */}
          <div className="mt-12">
            <CTABanner areaName={area.name} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
