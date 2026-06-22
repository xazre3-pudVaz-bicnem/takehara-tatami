import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SummaryBox from '@/components/ui/SummaryBox'
import RelatedLinks from '@/components/ui/RelatedLinks'
import CTABanner from '@/components/ui/CTABanner'
import { guidesData, getGuideBySlug, type GuideData } from '@/lib/guide-data'
import { getServiceBySlug } from '@/lib/services-data'
import IconByName from '@/components/ui/IconByName'

type GuideDataExt = GuideData & {
  expertTips?: string[]
  commonMistakes?: string[]
  detailedCostInfo?: string
}

export function generateStaticParams() {
  return guidesData.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: guide.seo.title,
    description: guide.seo.description,
    keywords: guide.seo.keywords,
    openGraph: { title: guide.seo.title, description: guide.seo.description },
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug) as GuideDataExt | undefined
  if (!guide) notFound()

  const relatedServiceItems = guide.relatedServices
    .map(s => getServiceBySlug(s))
    .filter(Boolean)
    .map(s => ({ href: `/services/${s!.slug}`, label: s!.title, description: s!.tagline }))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.summary,
      url: `https://www.takeharatatamiten.com/guide/${guide.slug}`,
      datePublished: '2024-01-15',
      dateModified: '2025-06-01',
      author: { '@type': 'Organization', name: '有限会社 竹原タタミ店' },
      publisher: { '@type': 'Organization', name: '有限会社 竹原タタミ店', url: 'https://www.takeharatatamiten.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.takeharatatamiten.com' },
        { '@type': 'ListItem', position: 2, name: '畳のガイド', item: 'https://www.takeharatatamiten.com/guide' },
        { '@type': 'ListItem', position: 3, name: guide.title, item: `https://www.takeharatatamiten.com/guide/${guide.slug}` },
      ],
    },
    ...(guide.faqs.length > 0 ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }] : []),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Header />
      <main>
        <PageHero
          en={guide.titleEn}
          ja={guide.title}
          description={guide.summary}
        />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
          <Breadcrumb items={[
            { label: '畳のガイド', href: '/guide' },
            { label: guide.title },
          ]} />

          {/* Summary box */}
          <SummaryBox title="このガイドのポイント">
            <p className="text-sm leading-relaxed text-ink/80">{guide.summary}</p>
          </SummaryBox>

          {/* Main sections */}
          <div className="mt-10 space-y-12">
            {guide.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-serif font-bold text-ink text-xl mb-4 border-b border-tatami-100 pb-2">
                  {section.heading}
                </h2>
                <p className="text-muted text-sm leading-relaxed">{section.content}</p>
                {section.points && section.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {section.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted">
                        <span className="text-tatami-500 mt-0.5 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Comparison table */}
          {guide.comparison && (
            <section className="mt-12">
              <h2 className="font-serif font-bold text-ink text-xl mb-5">比較表</h2>
              <div className="overflow-x-auto rounded-xl border border-tatami-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-tatami-50">
                      {guide.comparison.headers.map((h, i) => (
                        <th
                          key={i}
                          className={`px-4 py-3 text-left font-serif font-bold text-ink ${i === 0 ? 'w-32 min-w-[8rem]' : ''}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tatami-50">
                    {guide.comparison.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-tatami-50/30'}>
                        <td className="px-4 py-3 font-bold text-ink text-xs">{row.label}</td>
                        {row.values.map((v, j) => (
                          <td key={j} className="px-4 py-3 text-muted text-xs">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 職人直伝のコツ */}
          {guide.expertTips && guide.expertTips.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif font-bold text-ink text-xl mb-5">職人直伝のコツ</h2>
              <div className="rounded-2xl bg-tatami-800 text-white p-6 space-y-2.5">
                {guide.expertTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-tatami-400 flex-shrink-0 font-bold text-sm mt-0.5">{i + 1}.</span>
                    <p className="text-sm text-tatami-100 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* よくある失敗 */}
          {guide.commonMistakes && guide.commonMistakes.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">よくある失敗・勘違い</h2>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 space-y-2">
                {guide.commonMistakes.map((mistake, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold flex-shrink-0 mt-0.5">✕</span>
                    <span className="text-sm text-amber-900">{mistake}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 費用の詳細 */}
          {guide.detailedCostInfo && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">費用の詳細</h2>
              <div className="bg-tatami-50 rounded-xl p-5 border border-tatami-100">
                {guide.detailedCostInfo.split('\n\n').map((para, i) => (
                  <p key={i} className={`text-sm text-ink leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
                ))}
              </div>
            </section>
          )}

          {/* Conclusion */}
          {guide.conclusion && (
            <section className="mt-10 bg-tatami-50 rounded-xl p-5 border border-tatami-100">
              <h2 className="font-serif font-bold text-ink text-lg mb-3">まとめ</h2>
              <p className="text-muted text-sm leading-relaxed">{guide.conclusion}</p>
            </section>
          )}

          {/* FAQ */}
          {guide.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif font-bold text-ink text-xl mb-5">よくあるご質問</h2>
              <div className="space-y-3">
                {guide.faqs.map((faq, i) => (
                  <details key={i} className="group border border-tatami-100 rounded-xl overflow-hidden">
                    <summary className="flex items-center gap-3 p-4 cursor-pointer list-none hover:bg-tatami-50/50 transition-colors">
                      <span className="flex-shrink-0 w-6 h-6 bg-tatami-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center">Q</span>
                      <span className="flex-1 font-serif font-bold text-ink text-sm">{faq.q}</span>
                      <ChevronRight size={14} className="text-tatami-300 flex-shrink-0 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="flex gap-3 px-4 pb-4">
                      <span className="flex-shrink-0 w-6 h-6 bg-tatami-100 text-tatami-600 text-[10px] font-bold rounded-full flex items-center justify-center mt-0.5">A</span>
                      <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Services */}
          {relatedServiceItems.length > 0 && (
            <div className="mt-12">
              <RelatedLinks
                title="関連するサービス"
                links={relatedServiceItems}
              />
            </div>
          )}

          {/* Related Guides */}
          {guide.relatedGuides.length > 0 && (
            <div className="mt-10">
              <h3 className="font-serif font-bold text-ink text-base mb-4">関連するガイド</h3>
              <div className="flex flex-wrap gap-2">
                {guide.relatedGuides.map(slug => {
                  const related = getGuideBySlug(slug)
                  if (!related) return null
                  return (
                    <Link
                      key={slug}
                      href={`/guide/${slug}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-tatami-50 border border-tatami-100 rounded-full text-xs text-ink hover:border-tatami-400 transition-colors"
                    >
                      <IconByName name={related.icon} size={12} className="text-tatami-500" />
                      <span>{related.title}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
