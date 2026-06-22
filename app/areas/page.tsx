import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { areasData } from '@/lib/areas-data'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '鹿児島県の対応エリア',
  description: '竹原タタミ店の対応エリア一覧。鹿児島市内は迅速対応、鹿児島県内全域に対応。',
  url: 'https://takehara-tatami.com/areas',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://takehara-tatami.com' },
      { '@type': 'ListItem', position: 2, name: '対応エリア', item: 'https://takehara-tatami.com/areas' },
    ],
  },
}

export const metadata: Metadata = {
  title: '鹿児島県の対応エリア｜(有)竹原タタミ店',
  description:
    '竹原タタミ店の対応エリア一覧。鹿児島市内は迅速対応、鹿児島県内全域に対応しています。霧島市・姶良市・鹿屋市・薩摩川内市など各エリアの畳張替え・表替え・新調に対応。',
  openGraph: {
    title: '鹿児島県の対応エリア｜(有)竹原タタミ店',
    description: '竹原タタミ店は鹿児島県内全域で畳の張替え・表替え・新調に対応しています。鹿児島市内は迅速対応。',
    locale: 'ja_JP',
    type: 'website',
  },
}

const priorityLabel: Record<string, string> = {
  primary: '拠点エリア',
  secondary: '対応エリア',
  tertiary: '要相談',
}

const priorityColor: Record<string, string> = {
  primary: 'bg-tatami-400 text-white',
  secondary: 'bg-tatami-100 text-tatami-700',
  tertiary: 'bg-tatami-50 text-tatami-500',
}

export default function AreasPage() {
  const subAreas = areasData.filter(a => a.type === 'subarea')
  const primary = areasData.filter(a => a.priority === 'primary' && a.type !== 'subarea')
  const secondary = areasData.filter(a => a.priority === 'secondary' && a.type !== 'subarea')
  const tertiary = areasData.filter(a => a.priority === 'tertiary' && a.type !== 'subarea')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <PageHero
          en="SERVICE AREA"
          ja="対応エリア"
          description="鹿児島県内全域の畳の張替え・表替え・新調に対応しています。鹿児島市内は迅速対応、遠方は要相談です。"
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            {/* Summary */}
            <div className="bg-tatami-50 border-l-4 border-tatami-400 rounded-r-xl p-5 mb-12">
              <p className="text-tatami-500 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase">対応エリアについて</p>
              <p className="text-sm text-ink leading-relaxed">
                竹原タタミ店は鹿児島市東谷山を拠点に、<strong>鹿児島県内全域</strong>の畳の張替え・表替え・新調に対応しています。
                鹿児島市内は最短当日〜翌日のご対応が可能です。遠方エリアは事前にご連絡いただき、日程を調整してお伺いします。
              </p>
            </div>

            {/* Sub-areas (Kagoshima City districts) */}
            {subAreas.length > 0 && (
              <div className="mb-12">
                <p className="text-tatami-400 text-[10px] tracking-[0.3em] uppercase mb-2">KAGOSHIMA CITY AREAS</p>
                <h2 className="font-serif font-bold text-ink text-lg mb-4">鹿児島市内の地区別対応エリア</h2>
                <p className="text-muted text-sm mb-5">当店は鹿児島市東谷山が拠点。市内各地区に最短当日〜翌日でお伺いします。</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {subAreas.map(area => (
                    <Link
                      key={area.slug}
                      href={`/areas/${area.slug}`}
                      className="flex items-start gap-3 p-4 bg-white border border-tatami-200 rounded-xl hover:border-tatami-400 hover:shadow-sm transition-all group"
                    >
                      <MapPin className="w-4 h-4 text-tatami-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif font-bold text-ink text-sm">{area.name}</p>
                        <p className="text-muted text-xs mt-0.5 leading-snug line-clamp-2">{area.responseNote}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Primary area */}
            <div className="mb-12">
              <p className="text-tatami-400 text-[10px] tracking-[0.3em] uppercase mb-4">PRIMARY AREA</p>
              {primary.map(area => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="flex items-center justify-between p-5 bg-tatami-800 text-white rounded-2xl hover:bg-tatami-700 transition-colors mb-3 group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-tatami-400 flex-shrink-0" />
                    <div>
                      <p className="font-serif font-bold text-lg">{area.name}</p>
                      <p className="text-tatami-300 text-xs mt-0.5">{area.nameEn} · {area.responseNote}</p>
                    </div>
                  </div>
                  <span className="text-tatami-300 text-xs bg-tatami-400 px-3 py-1 rounded-full">迅速対応</span>
                </Link>
              ))}
            </div>

            {/* Secondary areas */}
            <div className="mb-12">
              <p className="text-tatami-400 text-[10px] tracking-[0.3em] uppercase mb-4">SECONDARY AREAS</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {secondary.map(area => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="flex items-center gap-3 p-4 bg-white border border-tatami-200 rounded-xl hover:border-tatami-400 hover:shadow-sm transition-all group"
                  >
                    <MapPin className="w-4 h-4 text-tatami-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-ink">{area.name}</p>
                      <p className="text-muted text-xs mt-0.5">{area.responseNote}</p>
                    </div>
                    <span className="text-[10px] bg-tatami-100 text-tatami-600 px-2 py-0.5 rounded-full">対応</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tertiary areas */}
            <div className="mb-12">
              <p className="text-tatami-400 text-[10px] tracking-[0.3em] uppercase mb-4">OTHER AREAS</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {tertiary.map(area => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="flex items-center gap-2.5 p-3.5 bg-tatami-50 border border-tatami-100 rounded-xl hover:border-tatami-300 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-tatami-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-ink font-medium">{area.name}</p>
                      <p className="text-tatami-400 text-xs">要相談</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="bg-tatami-50 rounded-2xl p-6 text-center">
              <p className="text-ink font-serif font-bold mb-2">掲載エリア以外からのご相談も歓迎です</p>
              <p className="text-muted text-sm mb-5">
                上記以外のエリアからのご依頼もお気軽にご連絡ください。まずはご状況をお聞かせいただき、対応可能かご確認します。
              </p>
              <a
                href="tel:0992671577"
                className="inline-flex items-center gap-2 bg-tatami-400 text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-tatami-500 transition-colors"
              >
                電話でお問い合わせ：099-267-1577
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
