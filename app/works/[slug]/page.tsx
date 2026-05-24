import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WorkDetailClient from './_components/WorkDetailClient'

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export const metadata: Metadata = {
  title: '施工事例 | 竹原タタミ店【鹿児島】',
  description: '竹原タタミ店の施工事例詳細。鹿児島市内の畳表替え・新調・縁なし畳・琉球畳風など。',
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params

  return (
    <>
      <Header />
      <WorkDetailClient slug={slug} />
      <Footer />
    </>
  )
}
