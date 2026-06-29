import type { Metadata } from 'next'
import './globals.css'
import { NavigationProgress } from '@/components/NavigationProgress'

const SITE_NAME = '(有)竹原タタミ店'
const SITE_DESCRIPTION =
  '鹿児島市東谷山で畳の張替え・表替え・裏返し・新調なら(有)竹原タタミ店へ。鹿児島県内全域対応（鹿児島市内は迅速対応）。縁なし畳・和紙畳・樹脂畳のご相談も承ります。'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.takeharatatamiten.com'),
  title: {
    default: `鹿児島市東谷山の畳張替え・新調なら｜${SITE_NAME}`,
    template: `%s｜${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    '鹿児島 畳',
    '鹿児島市 畳',
    '東谷山 畳',
    '鹿児島 畳 張替え',
    '鹿児島市 畳 表替え',
    '鹿児島 琉球畳',
    '鹿児島 縁なし畳',
    '畳 新調 鹿児島',
    '谷山 畳',
  ],
  openGraph: {
    title: `鹿児島市東谷山の畳張替え・新調なら｜${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    locale: 'ja_JP',
    type: 'website',
    siteName: SITE_NAME,
  },
  robots: { index: true, follow: true },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.takeharatatamiten.com/#localbusiness',
    name: '有限会社 竹原タタミ店',
    alternateName: '竹原タタミ店',
    description: SITE_DESCRIPTION,
    url: 'https://www.takeharatatamiten.com',
    logo: 'https://www.takeharatatamiten.com/images/hero-tatami.jpg',
    image: 'https://www.takeharatatamiten.com/images/hero-tatami.jpg',
    telephone: '099-267-1577',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '東谷山2丁目35-15',
      addressLocality: '鹿児島市',
      addressRegion: '鹿児島県',
      postalCode: '891-0105',
      addressCountry: 'JP',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 31.5334, longitude: 130.5236 },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '18:00',
      },
    ],
    priceRange: '¥¥',
    areaServed: [
      { '@type': 'AdministrativeArea', name: '鹿児島県' },
      { '@type': 'City', name: '鹿児島市' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '畳の施工サービス',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '表替え', description: '畳の表面（い草）と縁を新しく交換します' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '裏返し', description: '畳表を裏返して使用するリーズナブルなメンテナンス' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '新調', description: '畳床・畳表・縁を全て新品に交換します' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '縁なし畳', description: '和モダンスタイルの縁なし畳' } },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.takeharatatamiten.com/#organization',
    name: '有限会社 竹原タタミ店',
    url: 'https://www.takeharatatamiten.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '099-267-1577',
      contactType: 'customer service',
      areaServed: 'JP',
      availableLanguage: 'Japanese',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '18:00',
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.takeharatatamiten.com/#website',
    url: 'https://www.takeharatatamiten.com',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'ja',
    publisher: { '@id': 'https://www.takeharatatamiten.com/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://www.takeharatatamiten.com/faq?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap"
        />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-sans antialiased text-ink bg-white">
        <NavigationProgress />
        {children}
      </body>
    </html>
  )
}
