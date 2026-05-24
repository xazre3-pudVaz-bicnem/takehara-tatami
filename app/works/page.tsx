import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { WorksListClient } from './_components/WorksListClient'

export const metadata: Metadata = {
  title: '施工事例 | 竹原タタミ店【鹿児島】',
  description:
    '鹿児島市内での実際の畳施工事例をご紹介します。表替え・新調・縁なし畳・琉球畳風など、写真と施工内容を掲載しています。',
  openGraph: {
    title: '施工事例 | 竹原タタミ店【鹿児島】',
    description: '鹿児島市内の畳施工事例。表替え・新調・縁なし畳・琉球畳風など多数掲載。',
    type: 'website',
  },
}

export default function WorksPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          en="WORKS"
          ja="施工事例"
          description="鹿児島市内での実際の施工事例をご紹介します。写真・施工内容・職人コメントを掲載しています。"
        />

        {/* Breadcrumb */}
        <div className="bg-tatami-50/70 border-b border-tatami-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-3">
            <nav aria-label="パンくずリスト" className="flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-tatami-500 transition-colors">トップ</Link>
              <span className="text-tatami-200">/</span>
              <span className="text-ink">施工事例</span>
            </nav>
          </div>
        </div>

        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <WorksListClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
