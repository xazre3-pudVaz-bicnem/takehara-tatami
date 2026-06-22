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
import { useCasesData, getUseCaseBySlug } from '@/lib/usecases-data'
import { getServiceBySlug } from '@/lib/services-data'

export function generateStaticParams() {
  return useCasesData.map((u) => ({ slug: u.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const useCase = getUseCaseBySlug(params.slug)
  if (!useCase) return {}
  return {
    title: useCase.seo.title,
    description: useCase.seo.description,
    keywords: useCase.seo.keywords,
    openGraph: { title: useCase.seo.title, description: useCase.seo.description },
  }
}

export default function UseCaseDetailPage({ params }: { params: { slug: string } }) {
  const useCase = getUseCaseBySlug(params.slug)
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
      url: `https://takehara-tatami.com/use-cases/${useCase.slug}`,
      author: { '@type': 'Organization', name: '有限会社 竹原タタミ店' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://takehara-tatami.com' },
        { '@type': 'ListItem', position: 2, name: '用途別の畳選び', item: 'https://takehara-tatami.com/use-cases' },
        { '@type': 'ListItem', position: 3, name: useCase.title, item: `https://takehara-tatami.com/use-cases/${useCase.slug}` },
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
          <SummaryBox title={`${useCase.icon} ${useCase.titleShort}の畳選びポイント`}>
            <p className="text-sm leading-relaxed text-ink/80">{useCase.description}</p>
          </SummaryBox>

          {/* Challenges */}
          {useCase.challenges.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif font-bold text-ink text-xl mb-4">このシーンの課題・注意点</h2>
              <ul className="space-y-2">
                {useCase.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-amber-500 mt-0.5">⚠</span>
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
                    <span className="text-tatami-500 mt-0.5">✓</span>
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
                    className="flex items-center gap-1 px-3 py-1.5 bg-tatami-50 border border-tatami-100 rounded-full text-xs text-ink hover:border-tatami-400 transition-colors"
                  >
                    <span>{u.icon}</span>
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
