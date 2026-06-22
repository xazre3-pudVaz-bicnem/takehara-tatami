import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { materialsData } from '@/lib/materials-data'

export const metadata: Metadata = {
  title: '畳の素材について｜国産い草・和紙・樹脂の比較 | (有)竹原タタミ店【鹿児島】',
  description:
    '畳の素材（国産い草・中国産い草・和紙畳・樹脂畳）の特徴・違い・選び方を詳しく解説。鹿児島市の竹原タタミ店が職人目線でご説明します。現地でサンプルをご確認いただけます。',
  openGraph: {
    title: '畳の素材について｜国産い草・和紙・樹脂 | 竹原タタミ店【鹿児島】',
    description: '畳素材の特徴・比較・選び方を詳しく解説。鹿児島市の竹原タタミ店。',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function MaterialsPage() {
  const featured = materialsData.find(m => m.isFeatured)
  const others = materialsData.filter(m => !m.isFeatured && m.slug !== 'comparison')
  const comparison = materialsData.find(m => m.slug === 'comparison')

  return (
    <>
      <Header />
      <main>
        <PageHero
          en="MATERIALS"
          ja="畳の素材"
          description="素材によって耐久性・香り・価格・メンテナンスが大きく変わります。ライフスタイルに合わせた素材選びのご参考に。"
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">

            {/* AIO Summary */}
            <div className="bg-tatami-50 border-l-4 border-tatami-400 rounded-r-xl p-5 mb-12">
              <p className="text-tatami-500 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase">素材選びの基本</p>
              <p className="text-sm text-ink leading-relaxed">
                畳の素材は大きく「天然い草」「和紙」「樹脂」の3種類に分かれます。
                「どれが一番いいか」ではなく「自分の環境に何が合っているか」で選ぶことが大切です。
                現地確認の際にサンプルを持参しますので、手で触れて確かめていただけます。
              </p>
            </div>

            {/* Featured: 国産い草 */}
            {featured && (
              <div className="mb-10">
                <p className="text-tatami-400 text-[10px] tracking-[0.3em] uppercase mb-4">FEATURED</p>
                <Link
                  href={`/materials/${featured.slug}`}
                  className="group block p-6 md:p-8 bg-tatami-800 rounded-2xl hover:bg-tatami-700 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{featured.icon}</span>
                    <div>
                      <p className="text-tatami-300 text-xs tracking-wider mb-1">RECOMMENDED</p>
                      <h2 className="font-serif text-white text-xl md:text-2xl font-bold mb-2">{featured.name}</h2>
                      <p className="text-tatami-200 text-sm leading-relaxed">{featured.tagline}</p>
                      <p className="text-tatami-200 text-sm mt-2">{featured.summary}</p>
                      <p className="text-tatami-400 text-xs mt-4 group-hover:text-tatami-300 transition-colors">詳しく読む →</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Other materials */}
            <div className="mb-10">
              <p className="text-tatami-400 text-[10px] tracking-[0.3em] uppercase mb-4">MATERIALS</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {others.map(material => (
                  <Link
                    key={material.slug}
                    href={`/materials/${material.slug}`}
                    className="group p-5 bg-white border border-tatami-100 rounded-2xl hover:border-tatami-400 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{material.icon}</span>
                      <div>
                        <p className="font-serif font-bold text-ink text-base group-hover:text-tatami-600 transition-colors">{material.name}</p>
                        <p className="text-muted text-xs mt-1 leading-relaxed">{material.tagline}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {material.strengths.slice(0, 2).map((s, i) => (
                            <span key={i} className="text-[10px] bg-tatami-50 border border-tatami-200 text-tatami-600 px-2 py-0.5 rounded-full">{s.slice(0, 15)}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Comparison */}
            {comparison && (
              <div className="mb-14">
                <Link
                  href={`/materials/${comparison.slug}`}
                  className="group flex items-center justify-between p-5 bg-tatami-50 border border-tatami-200 rounded-2xl hover:border-tatami-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{comparison.icon}</span>
                    <div>
                      <p className="font-serif font-bold text-ink">{comparison.name}</p>
                      <p className="text-muted text-sm mt-0.5">{comparison.tagline}</p>
                    </div>
                  </div>
                  <span className="text-tatami-500 text-sm group-hover:text-tatami-700 transition-colors">→ 比較表を見る</span>
                </Link>
              </div>
            )}

            {/* Quick comparison table */}
            <div className="mb-12">
              <h2 className="font-serif text-xl font-bold text-ink mb-6">素材早見表</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-tatami-700 text-white">
                      <th className="text-left p-3 font-medium">素材</th>
                      <th className="p-3 font-medium text-center">香り</th>
                      <th className="p-3 font-medium text-center">耐久性</th>
                      <th className="p-3 font-medium text-center">耐水性</th>
                      <th className="p-3 font-medium text-center">価格</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: '国産高級い草', ko: '◎', taikyu: '◎', taisui: '△', price: '高め' },
                      { name: '国産い草（標準）', ko: '○', taikyu: '○', taisui: '△', price: '標準' },
                      { name: '中国産い草', ko: '△', taikyu: '○', taisui: '△', price: '手頃' },
                      { name: '和紙畳', ko: '−', taikyu: '◎', taisui: '◎', price: '高め' },
                      { name: '樹脂畳', ko: '−', taikyu: '◎', taisui: '◎', price: '幅広' },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-tatami-100 ${i % 2 === 0 ? 'bg-white' : 'bg-tatami-50'}`}>
                        <td className="p-3 font-medium text-ink">{row.name}</td>
                        <td className="p-3 text-center text-tatami-700">{row.ko}</td>
                        <td className="p-3 text-center text-tatami-700">{row.taikyu}</td>
                        <td className="p-3 text-center text-tatami-700">{row.taisui}</td>
                        <td className="p-3 text-center text-tatami-500 text-xs">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-muted text-xs mt-2">◎：優れている　○：良好　△：注意が必要　−：該当なし</p>
            </div>

            <div className="text-center">
              <p className="text-muted text-sm mb-4">
                どの素材が向いているかは、住まいの環境や使い方によって異なります。<br />
                現地確認の際にサンプルを持参し、一緒に考えます。
              </p>
              <a
                href="tel:0992671577"
                className="inline-flex items-center gap-2 bg-tatami-400 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-tatami-500 transition-colors"
              >
                素材の相談をする：099-267-1577
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
