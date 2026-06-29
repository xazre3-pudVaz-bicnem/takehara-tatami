import type { Metadata } from 'next'
import ContactClient from './_components/ContactClient'

export const metadata: Metadata = {
  title: '鹿児島の畳 お問い合わせ・無料見積もり｜(有)竹原タタミ店',
  description:
    '鹿児島市東谷山の畳専門店・竹原タタミ店へのお問い合わせ。現地確認・お見積もりは無料。表替え・新調・縁なし畳など畳に関するご相談はお電話（099-267-1577）またはフォームよりどうぞ。',
  keywords: [
    '鹿児島 畳 問い合わせ',
    '竹原タタミ店 電話',
    '鹿児島 畳 見積もり',
    '鹿児島 畳 相談',
    '畳 無料見積もり 鹿児島',
  ],
  openGraph: {
    title: '鹿児島の畳 お問い合わせ・無料見積もり｜(有)竹原タタミ店',
    description:
      '現地確認・お見積もり無料。鹿児島市東谷山の畳専門店・竹原タタミ店へお気軽にご相談ください。',
    locale: 'ja_JP',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'お問い合わせ',
  url: 'https://www.takeharatatamiten.com/contact',
  description: '鹿児島市の竹原タタミ店へのお問い合わせページ。現地確認・お見積もり無料。',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.takeharatatamiten.com' },
      { '@type': 'ListItem', position: 2, name: 'お問い合わせ', item: 'https://www.takeharatatamiten.com/contact' },
    ],
  },
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactClient />
    </>
  )
}
