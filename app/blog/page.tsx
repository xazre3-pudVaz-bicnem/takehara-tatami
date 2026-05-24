import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { BlogListClient } from './_components/BlogListClient'

// generateMetadata は Server Component でしか機能しないため、
// データ fetch だけ Client Component (BlogListClient) に切り出して
// ここは Server Component シェルとして維持する。
export const metadata: Metadata = {
  title: 'ブログ | 竹原タタミ店',
  description:
    '畳のお手入れ・選び方・施工事例など、役立つ情報を発信しています。鹿児島の畳職人が畳の知識をわかりやすくお届けします。',
  openGraph: {
    title: 'ブログ | 竹原タタミ店',
    description: '畳のお手入れ・選び方・施工事例など、役立つ情報を発信しています。',
    type: 'website',
  },
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          en="BLOG"
          ja="ブログ"
          description="畳のお手入れ・選び方・施工事例など、役立つ情報を発信しています。"
        />

        {/* Breadcrumb */}
        <div className="bg-tatami-50/70 border-b border-tatami-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-3">
            <nav aria-label="パンくずリスト" className="flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-tatami-500 transition-colors">
                トップ
              </Link>
              <span className="text-tatami-200">/</span>
              <span className="text-ink">ブログ</span>
            </nav>
          </div>
        </div>

        {/* 記事一覧: ブラウザから直接 WordPress API を叩く Client Component */}
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <BlogListClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
