import type { Metadata } from 'next'
import AboutClient from './_components/AboutClient'

export const metadata: Metadata = {
  title: '竹原タタミ店について｜鹿児島市東谷山の畳専門店',
  description:
    '鹿児島市東谷山の(有)竹原タタミ店は、地域密着の畳専門店です。表替え・裏返し・新調・縁なし畳・琉球畳風まで対応。鹿児島県内全域で現地確認無料、1枚から丁寧に対応します。',
  keywords: [
    '竹原タタミ店',
    '鹿児島 畳屋',
    '鹿児島市 畳専門店',
    '東谷山 畳',
    '鹿児島 畳 会社',
    '鹿児島 畳 老舗',
    '畳職人 鹿児島',
  ],
  openGraph: {
    title: '竹原タタミ店について｜鹿児島市東谷山の畳専門店',
    description:
      '鹿児島市東谷山の地域密着の畳専門店。表替え・新調・縁なし畳まで対応。鹿児島県内全域・現地確認無料。',
    locale: 'ja_JP',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: '竹原タタミ店について',
  url: 'https://www.takeharatatamiten.com/about',
  description: '鹿児島市東谷山の畳専門店・有限会社竹原タタミ店の会社概要ページです。',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.takeharatatamiten.com' },
      { '@type': 'ListItem', position: 2, name: '竹原タタミ店について', item: 'https://www.takeharatatamiten.com/about' },
    ],
  },
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutClient />
    </>
  )
}
