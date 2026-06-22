import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, AlertTriangle, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SummaryBox from '@/components/ui/SummaryBox'
import RelatedLinks from '@/components/ui/RelatedLinks'
import CTABanner from '@/components/ui/CTABanner'
import { useCasesData, getUseCaseBySlug, type UseCaseData } from '@/lib/usecases-data'
import { getServiceBySlug } from '@/lib/services-data'
import IconByName from '@/components/ui/IconByName'

type UseCaseDataExt = UseCaseData & {
  realLifeScenario?: string
  maintenanceTips?: string[]
  proTips?: string[]
  costConsiderations?: string
}

export function generateStaticParams() {
  return useCasesData.map((u) => ({ slug: u.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const useCase = getUseCaseBySlug(slug)
  if (!useCase) return {}
  return {
    title: useCase.seo.title,
    description: useCase.seo.description,
    keywords: useCase.seo.keywords,
    openGraph: { title: useCase.seo.title, description: useCase.seo.description },
  }
}

export default async function UseCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const useCase = getUseCaseBySlug(slug) as UseCaseDataExt | undefined
  if (!useCase) notFound()

  const relatedServiceItems = useCase.relatedServices
    .map(s => getServiceBySlug(s))
    .filter(Boolean)
    .map(s => ({ href: `/services/${s!.slug}`, label: s!.title, description: s!.tagline }))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: useCase.title,
      description: useCase.summary,
      url: `https://www.takeharatatamiten.com/use-cases/${useCase.slug}`,
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
        { '@type': 'ListItem', position: 2, name: '用途別の畳選び', item: 'https://www.takeharatatamiten.com/use-cases' },
        { '@type': 'ListItem', position: 3, name: useCase.title, item: `https://www.takeharatatamiten.com/use-cases/${useCase.slug}` },
      ],
    },
    ...(useCase.faqs.length > 0 ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: useCase.faqs.map(f => ({
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
          en={useCase.titleEn}
          ja={useCase.title}
          description={useCase.summary}
        />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
          <Breadcrumb items={[
            { label: '用途別の畳選び', href: '/use-cases' },
            { label: useCase.titleShort },
          ]} />

          {/* Summary box */}
          <SummaryBox title={`${useCase.titleShort}の畳選びポイント`}>
            <p className="text-sm leading-relaxed text-ink/80">{useCase.description}</p>
          </SummaryBox>

          {/* Challenges */}
          {useCase.challenges.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">このシーンの課題・注意点</h2>
              <ul className="space-y-2">
                {useCase.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted">
                    <AlertTriangle size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Recommended Materials */}
          {useCase.recommendedMaterials.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">おすすめ素材</h2>
              <div className="space-y-3">
                {useCase.recommendedMaterials.map((m, i) => (
                  <Link
                    key={i}
                    href={`/materials/${m.slug}`}
                    className="flex items-start gap-3 p-4 border border-tatami-100 rounded-xl hover:border-tatami-400 transition-colors group bg-tatami-50/30"
                  >
                    <div className="flex-1">
                      <div className="font-serif font-bold text-ink text-sm mb-1 flex items-center gap-1.5">
                        {i === 0 && <span className="text-[10px] bg-tatami-400 text-white px-2 py-0.5 rounded-full">おすすめ</span>}
                        {m.label}
                      </div>
                      <p className="text-muted text-xs leading-relaxed">{m.reason}</p>
                    </div>
                    <ChevronRight size={16} className="text-tatami-300 mt-1 flex-shrink-0 group-hover:text-tatami-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Benefits */}
          {useCase.benefits.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">このシーンでの畳のメリット</h2>
              <ul className="space-y-2">
                {useCase.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={15} className="text-tatami-500 mt-0.5 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Caution Points */}
          {useCase.cautionPoints.length > 0 && (
            <section className="mt-10 bg-red-50 rounded-xl p-5 border border-red-100">
              <h2 className="font-serif font-bold text-red-800 text-lg mb-3">注意すべきポイント</h2>
              <ul className="space-y-1.5">
                {useCase.cautionPoints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <span className="mt-0.5 flex-shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* こんな相談がありました（実例） */}
          {useCase.realLifeScenario && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">こんなご相談がありました</h2>
              <div className="bg-tatami-50 rounded-xl p-5 border border-tatami-100">
                {useCase.realLifeScenario.split('\n\n').map((para, i) => (
                  <p key={i} className={`text-sm text-ink leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
                ))}
              </div>
            </section>
          )}

          {/* 日常のお手入れ */}
          {useCase.maintenanceTips && useCase.maintenanceTips.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">日常のお手入れ</h2>
              <div className="space-y-2">
                {useCase.maintenanceTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 bg-green-50 border border-green-100 rounded-xl">
                    <span className="text-green-600 font-bold text-sm flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-green-900">{tip}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 職人からのアドバイス */}
          {useCase.proTips && useCase.proTips.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">職人からのアドバイス</h2>
              <div className="rounded-2xl bg-tatami-800 text-white p-6 space-y-2.5">
                {useCase.proTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-tatami-400 flex-shrink-0 mt-0.5">•</span>
                    <p className="text-sm text-tatami-100 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 費用の目安 */}
          {useCase.costConsiderations && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">費用の目安</h2>
              <div className="bg-tatami-50 rounded-xl p-5 border border-tatami-100">
                {useCase.costConsiderations.split('\n\n').map((para, i) => (
                  <p key={i} className={`text-sm text-ink leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>{para}</p>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {useCase.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif font-bold text-ink text-xl mb-5">よくあるご質問</h2>
              <div className="space-y-3">
                {useCase.faqs.map((faq, i) => (
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

          {/* Related Materials */}
          <div className="mt-6">
            <RelatedLinks
              title="素材について詳しく"
              links={useCase.relatedMaterials.map(m => ({ href: `/materials/${m}`, label: m.replace(/-/g, ' ') }))}
            />
          </div>

          {/* Other use cases */}
          <div className="mt-10">
            <h3 className="font-serif font-bold text-ink text-base mb-4">その他の用途別ガイド</h3>
            <div className="flex flex-wrap gap-2">
              {useCasesData
                .filter(u => u.slug !== useCase.slug)
                .slice(0, 6)
                .map(u => (
                  <Link
                    key={u.slug}
                    href={`/use-cases/${u.slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-tatami-50 border border-tatami-100 rounded-full text-xs text-ink hover:border-tatami-400 transition-colors"
                  >
                    <IconByName name={u.icon} size={12} className="text-tatami-500" />
                    <span>{u.titleShort}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
