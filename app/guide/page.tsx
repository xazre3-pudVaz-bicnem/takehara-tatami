import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import CTABanner from '@/components/ui/CTABanner'
import { guidesData } from '@/lib/guide-data'

export const metadata: Metadata = {
  title: '畳のガイド・コラム｜お手入れ・料金・交換時期・素材選びまで',
  description: '畳の表替えと新調の違い・裏返し・料金の目安・お手入れ方法・寿命・引越し時の対応など、畳に関するよくある疑問を詳しく解説します。',
  openGraph: {
    title: '畳のガイド・コラム｜(有)竹原タタミ店',
    description: '畳の疑問をやさしく解説。料金・お手入れ・交換時期・素材選びまで。',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '畳のガイド・コラム',
  description: '畳に関する疑問・情報を詳しく解説するガイドページ',
  url: 'https://takehara-tatami.com/guide',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://takehara-tatami.com' },
      { '@type': 'ListItem', position: 2, name: '畳のガイド', item: 'https://takehara-tatami.com/guide' },
    ],
  },
}

export default function GuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <PageHero
          en="GUIDE"
          ja="畳のガイド・コラム"
          description="表替えと新調の違い、料金の目安、お手入れ方法など、畳に関する疑問をやさしく解説します。"
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            {/* Intro */}
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="text-muted text-sm md:text-base leading-relaxed">
                「表替えと新調、どちらがいいの？」「何年で替えればいいの？」「梅雨時のカビが心配…」など、畳に関するよくある疑問を、職人目線でわかりやすく解説します。
              </p>
            </div>

            {/* Guide Grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {guidesData.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guide/${guide.slug}`}
                  className="group flex gap-4 p-5 border border-tatami-100 rounded-2xl hover:border-tatami-400 hover:shadow-sm transition-all bg-white"
                >
                  <div className="text-3xl flex-shrink-0 mt-0.5">{guide.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif font-bold text-ink text-sm leading-snug mb-2">{guide.title}</h2>
                    <p className="text-muted text-xs leading-relaxed line-clamp-2">{guide.summary}</p>
                    <div className="mt-3 flex items-center gap-1 text-tatami-600 text-xs font-medium">
                      <span>読む</span>
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 text-center">
              <p className="text-muted text-sm mb-4">ガイドを読んでもまだ迷ったら、お気軽にご相談ください</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:0992671577"
                  className="inline-flex items-center gap-2 bg-tatami-400 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-tatami-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" /></svg>
                  099-267-1577
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-tatami-400 text-tatami-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-tatami-50 transition-colors">
                  お問い合わせフォーム
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
