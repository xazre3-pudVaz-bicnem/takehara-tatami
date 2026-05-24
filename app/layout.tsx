import type { Metadata } from 'next'
import './globals.css'
import { NavigationProgress } from '@/components/NavigationProgress'

const SITE_NAME = '(有)竹原タタミ店'
const SITE_DESCRIPTION =
  '鹿児島市東谷山で畳の張替え・表替え・裏返し・新調なら(有)竹原タタミ店へ。鹿児島市全域対応。縁なし畳・琉球畳風のご相談も承ります。'

export const metadata: Metadata = {
  metadataBase: new URL('https://takehara-tatami.com'),
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '東谷山2丁目35-15',
    addressLocality: '鹿児島市',
    addressRegion: '鹿児島県',
    postalCode: '891-0105',
    addressCountry: 'JP',
  },
  telephone: '099-267-1577',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:30',
      closes: '18:00',
    },
  ],
  geo: { '@type': 'GeoCoordinates', latitude: 31.5334, longitude: 130.5236 },
  priceRange: '¥¥',
  areaServed: { '@type': 'City', name: '鹿児島市' },
}

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-ink bg-white">
        <NavigationProgress />
        {children}
      </body>
    </html>
  )
}
