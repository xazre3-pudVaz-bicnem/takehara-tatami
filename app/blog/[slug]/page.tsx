import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogPostClient from './_components/BlogPostClient'

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export const metadata: Metadata = {
  title: 'ブログ | 竹原タタミ店',
  description: '畳のお手入れ・選び方・施工事例など役立つ情報をお届けします。',
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  return (
    <>
      <Header />
      <main className="bg-white">
        <BlogPostClient slug={slug} />
      </main>
      <Footer />
    </>
  )
}
