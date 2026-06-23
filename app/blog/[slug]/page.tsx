import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogPostClient from './_components/BlogPostClient'

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const res = await fetch(
      `https://wp.takeharatatamiten.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=title,excerpt`,
      { next: { revalidate: 3600 } }
    )
    if (res.ok) {
      const posts = await res.json()
      if (posts[0]) {
        const title = posts[0].title?.rendered?.replace(/<[^>]+>/g, '') ?? ''
        const excerpt = posts[0].excerpt?.rendered?.replace(/<[^>]+>/g, '').slice(0, 120) ?? ''
        return {
          title: title ? `${title}｜竹原タタミ店【鹿児島】` : 'ブログ｜竹原タタミ店【鹿児島】',
          description: excerpt || '鹿児島市の畳専門店・竹原タタミ店のブログ。畳のお手入れ・選び方・施工事例など役立つ情報をお届けします。',
          openGraph: {
            title: title ? `${title}｜竹原タタミ店【鹿児島】` : 'ブログ｜竹原タタミ店【鹿児島】',
            description: excerpt || '鹿児島市の畳専門店ブログ',
            locale: 'ja_JP',
            type: 'article',
          },
        }
      }
    }
  } catch {
    // fallback to generic metadata on API error
  }

  return {
    title: 'ブログ｜竹原タタミ店【鹿児島】',
    description: '鹿児島市の畳専門店・竹原タタミ店のブログ。畳のお手入れ・選び方・施工事例など役立つ情報をお届けします。',
  }
}

const blogPostingSchema = (slug: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  publisher: {
    '@type': 'Organization',
    name: '有限会社 竹原タタミ店',
    url: 'https://www.takeharatatamiten.com',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://www.takeharatatamiten.com/blog/${slug}`,
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.takeharatatamiten.com' },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: 'https://www.takeharatatamiten.com/blog' },
    ],
  },
})

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema(slug)) }}
      />
      <Header />
      <main className="bg-white">
        <BlogPostClient slug={slug} />
      </main>
      <Footer />
    </>
  )
}
