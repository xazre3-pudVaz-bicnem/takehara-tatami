import type { Metadata } from 'next'
import FAQClient from './_components/FAQClient'
import { extendedFaqs } from '@/lib/faq-data'

export const metadata: Metadata = {
  title: `鹿児島の畳よくある質問 ${extendedFaqs.length}問｜料金・カビ・素材・対応エリア`,
  description:
    '鹿児島市の竹原タタミ店によるよくあるご質問集。畳の表替え・新調・裏返しの料金、カビ・ダニの対処法、和紙畳・樹脂畳の選び方、対応エリアなど95問以上を掲載しています。',
  keywords: [
    '鹿児島 畳 FAQ',
    '畳 よくある質問 鹿児島',
    '畳 表替え 料金 鹿児島',
    '畳 カビ 質問',
    '畳 素材 選び方',
    '鹿児島 畳 対応エリア',
    '竹原タタミ店 FAQ',
  ],
  openGraph: {
    title: `鹿児島の畳よくある質問 ${extendedFaqs.length}問｜竹原タタミ店`,
    description:
      '畳の料金・カビ・ダニ・素材・エリアなど95問以上を掲載。鹿児島市の畳専門店・竹原タタミ店。',
    locale: 'ja_JP',
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: extendedFaqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FAQClient />
    </>
  )
}
