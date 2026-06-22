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
import { problemsData, getProblemBySlug } from '@/lib/problems-data'

export function generateStaticParams() {
  return problemsData.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const problem = getProblemBySlug(params.slug)
  if (!problem) return {}
  return {
    title: problem.seo.title,
    description: problem.seo.description,
    keywords: problem.seo.keywords,
    openGraph: {
      title: problem.seo.title,
      description: problem.seo.description,
      locale: 'ja_JP',
      type: 'article',
    },
  }
}

export default function ProblemDetailPage({ params }: { params: { slug: string } }) {
  const problem = getProblemBySlug(params.slug)
  if (!problem) notFound()

  const relatedProblems = problemsData.filter(p => problem.relatedProblems.includes(p.slug))

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: problem.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: problem.title,
    description: problem.seo.description,
    author: {
      '@type': 'Organization',
      name: '(有)竹原タタミ店',
    },
    publisher: {
      '@type': 'Organization',
      name: '(有)竹原タタミ店',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://takehara-tatami.com' },
      { '@type': 'ListItem', position: 2, name: 'お悩み別ガイド', item: 'https://takehara-tatami.com/problems' },
      { '@type': 'ListItem', position: 3, name: problem.title, item: `https://takehara-tatami.com/problems/${problem.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        <PageHero
          en={`PROBLEMS · ${problem.titleEn}`}
          ja={problem.title}
        />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 md:py-16">
          <Breadcrumb items={[
            { label: 'お悩み別ガイド', href: '/problems' },
            { label: problem.titleShort },
          ]} />

          {/* 結論ボックス（AIO対策） */}
          <SummaryBox title="この記事の結論">
            <p>{problem.conclusion}</p>
          </SummaryBox>

          {/* 症状の説明 */}
          <FadeIn>
            <section className="mb-10">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">症状について</h2>
              <p className="text-muted text-sm md:text-base leading-relaxed">{problem.symptomDescription}</p>
            </section>
          </FadeIn>

          {/* 原因 */}
          {problem.causes.length > 0 && (
            <FadeIn delay={0.1}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">主な原因</h2>
                <ul className="space-y-2">
                  {problem.causes.map((cause, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3.5 bg-tatami-50 border border-tatami-100 rounded-xl">
                      <span className="w-1.5 h-1.5 rounded-full bg-tatami-400 flex-shrink-0 mt-1.5" />
                      <span className="text-sm text-ink">{cause}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          )}

          {/* 放置リスク */}
          {problem.risks.length > 0 && (
            <FadeIn delay={0.15}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">放置するとどうなるか</h2>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 space-y-2">
                  {problem.risks.map((risk, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-red-400 flex-shrink-0">⚠</span>
                      <span className="text-sm text-red-800">{risk}</span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          )}

          {/* 自分でできる対処 */}
          {problem.selfCare.length > 0 && (
            <FadeIn delay={0.2}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">自分でできる対処法</h2>
                <div className="space-y-2.5">
                  {problem.selfCare.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 bg-green-50 border border-green-100 rounded-xl">
                      <span className="text-green-500 font-bold text-sm flex-shrink-0">{i + 1}</span>
                      <span className="text-sm text-green-900">{tip}</span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          )}

          {/* 業者に相談すべきタイミング */}
          {problem.whenToCall.length > 0 && (
            <FadeIn delay={0.25}>
              <section className="mb-10">
                <h2 className="font-serif text-xl font-bold text-ink mb-4">プロに相談すべきタイミング</h2>
                <div className="bg-tatami-50 rounded-2xl border border-tatami-200 p-5">
                  <p className="text-tatami-500 text-xs mb-3">以下に当てはまる場合はお早めにご相談ください：</p>
                  <ul className="space-y-2">
                    {problem.whenToCall.map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-tatami-400 flex-shrink-0">✓</span>
                        <span className="text-sm text-ink">{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </FadeIn>
          )}

          {/* おすすめ施工 */}
          <FadeIn delay={0.3}>
            <section className="mb-10">
              <h2 className="font-serif text-xl font-bold text-ink mb-4">おすすめの施工</h2>
              <Link
                href={`/services/${problem.recommendedService.slug}`}
                className="flex items-center justify-between p-5 bg-tatami-800 text-white rounded-2xl hover:bg-tatami-700 transition-colors group"
              >
                <div>
                  <p className="font-serif font-bold text-lg">{problem.recommendedService.label}</p>
                  <p className="text-tatami-300 text-sm mt-0.5">詳しくはこちら →</p>
                </div>
                <span className="text-tatami-300 text-sm">詳細</span>
              </Link>
            </section>
          </FadeIn>

          {/* FAQ */}
          {problem.faqs.length > 0 && (
            <FadeIn delay={0.35}>
              <section className="mb-12">
                <h2 className="font-serif text-xl font-bold text-ink mb-6">よくあるご質問</h2>
                <div className="space-y-3">
                  {problem.faqs.map((faq, i) => (
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

          {/* Related problems */}
          {relatedProblems.length > 0 && (
            <RelatedLinks
              title="関連するお悩み"
              links={relatedProblems.map(p => ({
                href: `/problems/${p.slug}`,
                label: p.title,
                description: p.conclusion.slice(0, 50) + '…',
              }))}
            />
          )}

          {/* Related pages */}
          <RelatedLinks
            title="関連ページ"
            links={[
              { href: `/services/${problem.recommendedService.slug}`, label: `${problem.recommendedService.label}について` },
              { href: '/areas/kagoshima-city', label: '鹿児島市の畳張替え' },
              { href: '/faq', label: 'よくある質問' },
              { href: '/contact', label: 'お問い合わせ（無料）' },
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
