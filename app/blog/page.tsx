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
  title: '鹿児島の畳ブログ｜お手入れ・選び方・施工事例',
  description:
    '鹿児島の畳専門店・竹原タタミ店による畳ブログ。畳のカビ対策・お手入れ方法・素材の選び方・施工事例など、鹿児島の気候に合わせた畳の知識をお届けします。',
  keywords: ['鹿児島 畳 ブログ', '畳 お手入れ 鹿児島', '畳 カビ対策 鹿児島', '畳 素材 選び方', '竹原タタミ店 ブログ'],
  openGraph: {
    title: '鹿児島の畳ブログ｜お手入れ・選び方・施工事例｜竹原タタミ店',
    description: '鹿児島の畳職人が畳のカビ対策・お手入れ・素材選びを解説。',
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
