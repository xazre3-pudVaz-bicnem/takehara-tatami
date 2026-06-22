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
import { materialsData, getMaterialBySlug, type MaterialData } from '@/lib/materials-data'

type MaterialDataExt = MaterialData & {
  detailedDescription?: string
  proRecommendation?: string
  maintenanceGuide?: string
}

export function generateStaticParams() {
  return materialsData.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const material = getMaterialBySlug(slug)
  if (!material) return {}
  return {
    title: material.seo.title,
    description: material.seo.description,
    keywords: material.seo.keywords,
    openGraph: {
      title: material.seo.title,
      description: material.seo.description,
      locale: 'ja_JP',
      type: 'article',
    },
  }
}

const comparisonRows = [
  { label: '耐久性', values: ['◎', '○', '○', '◎', '◎'] },
  { label: '香り', values: ['◎', '○', '△', '−', '−'] },
  { label: '調湿効果', values: ['◎', '○', '○', '△', '△'] },
  { label: '耐水性', values: ['△', '△', '△', '◎', '◎'] },
  { label: 'カビにくさ', values: ['○', '○', '○', '◎', '◎'] },
  { label: 'ペット向き', values: ['△', '△', '△', '○', '◎'] },
  { label: '和の雰囲気', values: ['◎', '◎', '○', '○', '△'] },
  { label: '価格の手頃さ', values: ['△', '○', '◎', '△', '○'] },
]

const comparisonHeaders = ['国産高級い草', '国産標準い草', '中国産い草', '和紙畳', '樹脂畳']

export default async function MaterialDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const material = getMaterialBySlug(slug) as MaterialDataExt | undefined
  if (!material) notFound()

  const relatedMaterials = materialsData.filter(m => material.relatedMaterials.includes(m.slug) && m.slug !== material.slug)

  const faqJsonLd = material.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: material.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  } : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.takeharatatamiten.com' },
      { '@type': 'ListItem', position: 2, name: '畳の素材', item: 'https://www.takeharatatamiten.com/materials' },
      { '@type': 'ListItem', position: 3, name: material.name, item: `https://www.takeharatatamiten.com/materials/${material.slug}` },
    ],
  }

  const isComparison = material.slug === 'comparison'

  return (
    <>
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        <PageHero
          en={`MATERIAL · ${material.nameEn.toUpperCase()}`}
          ja={material.name}
          description={material.tagline}
        />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 md:py-16">
          <Breadcrumb items={[
            { label: '畳の素材', href: '/materials' },
            { label: material.name },
          ]} />

          {/* Summary */}
          <SummaryBox title="この素材について">
            <p>{material.summary}</p>
          </SummaryBox>

          {/* Description */}
          <FadeIn>
            <div className="mb-10">
              <div className="prose prose-sm max-w-none text-muted leading-relaxed">
                {material.description.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* 詳細説明 */}
          {material.detailedDescription && (
            <FadeIn delay={0.05}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">詳しい素材解説</h2>
                <div className="bg-tatami-50 rounded-xl p-5 border border-tatami-100">
                  {material.detailedDescription.split('\n\n').map((para, i) => (
                    <p key={i} className={`text-sm text-ink leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
                  ))}
                </div>
              </section>
            </FadeIn>
          )}

          {/* Specs */}
          {material.specs.length > 0 && (
            <FadeIn delay={0.1}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">主な特徴・スペック</h2>
                <div className="bg-tatami-50 rounded-2xl border border-tatami-100 overflow-hidden">
                  {material.specs.map((spec, i) => (
                    <div key={i} className={`flex items-center gap-4 px-5 py-3 ${i < material.specs.length - 1 ? 'border-b border-tatami-100' : ''}`}>
                      <span className="text-tatami-500 text-xs font-medium w-24 flex-shrink-0">{spec.label}</span>
                      <span className="text-ink text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          )}

          {/* 比較表（comparisonページのみ） */}
          {isComparison && (
            <FadeIn delay={0.15}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">素材比較表</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-tatami-700 text-white">
                        <th className="text-left p-3 font-medium">比較項目</th>
                        {comparisonHeaders.map(h => (
                          <th key={h} className="p-2 font-medium text-center whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, i) => (
                        <tr key={i} className={`border-b border-tatami-100 ${i % 2 === 0 ? 'bg-white' : 'bg-tatami-50'}`}>
                          <td className="p-3 font-medium text-ink">{row.label}</td>
                          {row.values.map((v, j) => (
                            <td key={j} className="p-2 text-center text-tatami-700">{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-muted text-xs mt-2">◎優れている ○良好 △注意が必要 −該当なし</p>
              </section>
            </FadeIn>
          )}

          {/* Strengths */}
          {material.strengths.length > 0 && (
            <FadeIn delay={0.15}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">この素材のメリット</h2>
                <ul className="space-y-2">
                  {material.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3.5 bg-green-50 border border-green-100 rounded-xl">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span className="text-sm text-green-900">{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          )}

          {/* Weaknesses */}
          {material.weaknesses.length > 0 && (
            <FadeIn delay={0.2}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">この素材の注意点</h2>
                <ul className="space-y-2">
                  {material.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3.5 bg-tatami-50 border border-tatami-100 rounded-xl">
                      <span className="text-tatami-400 flex-shrink-0">△</span>
                      <span className="text-sm text-ink">{w}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          )}

          {/* Best for / Not for */}
          {material.bestFor.length > 0 && (
            <FadeIn delay={0.25}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">向いている用途・ご家庭</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-green-600 text-xs font-bold tracking-wider mb-2">おすすめの方</p>
                    <ul className="space-y-1.5">
                      {material.bestFor.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-ink">
                          <span className="text-green-500 flex-shrink-0">◎</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {material.notFor.length > 0 && (
                    <div>
                      <p className="text-tatami-400 text-xs font-bold tracking-wider mb-2">向いていない方</p>
                      <ul className="space-y-1.5">
                        {material.notFor.map((n, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted">
                            <span className="text-tatami-300 flex-shrink-0">△</span>
                            {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            </FadeIn>
          )}

          {/* 職人のおすすめポイント */}
          {material.proRecommendation && (
            <FadeIn delay={0.28}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">職人からのおすすめポイント</h2>
                <div className="rounded-2xl bg-tatami-800 text-white p-6">
                  {material.proRecommendation.split('\n\n').map((para, i) => (
                    <p key={i} className={`text-sm text-tatami-100 leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
                  ))}
                </div>
              </section>
            </FadeIn>
          )}

          {/* Maintenance tips */}
          {material.maintenanceTips.length > 0 && (
            <FadeIn delay={0.3}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">お手入れのポイント</h2>
                <ul className="space-y-2">
                  {material.maintenanceTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3 bg-tatami-50 rounded-xl">
                      <span className="text-tatami-400 text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-sm text-ink">{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          )}

          {/* 詳しいお手入れ方法 */}
          {material.maintenanceGuide && (
            <FadeIn delay={0.33}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">詳しいお手入れ方法</h2>
                <div className="bg-white rounded-xl p-5 border border-tatami-100">
                  {material.maintenanceGuide.split('\n\n').map((para, i) => (
                    <p key={i} className={`text-sm text-ink leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
                  ))}
                </div>
              </section>
            </FadeIn>
          )}

          {/* FAQ */}
          {material.faqs.length > 0 && (
            <FadeIn delay={0.35}>
              <section className="mb-12">
                <h2 className="font-serif text-xl font-bold text-ink mb-6">よくあるご質問</h2>
                <div className="space-y-3">
                  {material.faqs.map((faq, i) => (
                    <details key={i} className="bg-white border border-tatami-100 rounded-xl overflow-hidden">
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
              </section>
            </FadeIn>
          )}

          {/* Related materials */}
          {relatedMaterials.length > 0 && (
            <RelatedLinks
              title="関連素材"
              links={relatedMaterials.map(m => ({
                href: `/materials/${m.slug}`,
                label: m.name,
                description: m.tagline,
              }))}
            />
          )}

          {/* Related services */}
          <RelatedLinks
            title="関連サービス"
            links={[
              { href: '/services/omotegae', label: '表替え', description: 'お好みの素材に張替え' },
              { href: '/services/shincho', label: '新調', description: '畳床から全て新しく' },
              { href: '/materials/comparison', label: '素材比較表', description: '全素材を一覧で比較' },
              { href: '/contact', label: 'サンプルを見たい', description: '現地でサンプルをご確認' },
            ]}
          />

          {/* CTA */}
          <div className="mt-12">
            <CTABanner />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
