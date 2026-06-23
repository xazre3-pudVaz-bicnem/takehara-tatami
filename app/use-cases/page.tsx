import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import CTABanner from '@/components/ui/CTABanner'
import IconByName from '@/components/ui/IconByName'
import { useCasesData } from '@/lib/usecases-data'

export const metadata: Metadata = {
  title: '用途・目的別の畳選び【鹿児島】ペット・赤ちゃん・高齢者・旅館など',
  description: '鹿児島の生活環境・気候に合わせた用途別の畳選びガイド。ペット家庭・赤ちゃん・高齢者・賃貸・旅館・新築・リフォームなど、それぞれの用途に最適な素材と施工を竹原タタミ店がご提案します。',
  keywords: ['鹿児島 畳 ペット', '鹿児島 畳 赤ちゃん', '鹿児島 畳 旅館', '鹿児島 畳 リフォーム', '鹿児島 畳 新築', '用途別 畳 鹿児島'],
  openGraph: {
    title: '用途・目的別の畳選び【鹿児島】ペット・赤ちゃん・高齢者・旅館など',
    description: '鹿児島の生活環境に合わせた用途別の畳選びガイド。各シーンに最適な素材を竹原タタミ店がご提案。',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '用途別の畳選び',
  description: '用途・ライフスタイル別の畳選びガイド',
  url: 'https://www.takeharatatamiten.com/use-cases',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: 'https://www.takeharatatamiten.com' },
      { '@type': 'ListItem', position: 2, name: '用途別の畳選び', item: 'https://www.takeharatatamiten.com/use-cases' },
    ],
  },
}

export default function UseCasesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <PageHero
          en="USE CASES"
          ja="用途別の畳選び"
          description="ペット・赤ちゃん・高齢者・賃貸・旅館など、ライフスタイルや用途に合わせた最適な畳をご提案します。"
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            {/* Intro */}
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="text-muted text-sm md:text-base leading-relaxed">
                畳の素材選びに正解はありません。使う方の暮らし方・ご家族の状況・お部屋の用途によって、最適な素材と施工方法は変わります。それぞれのシーンに合わせて丁寧にご提案します。
              </p>
            </div>

            {/* Use Case Grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {useCasesData.map((useCase) => (
                <Link
                  key={useCase.slug}
                  href={`/use-cases/${useCase.slug}`}
                  className="group flex gap-4 p-5 border border-tatami-100 rounded-2xl hover:border-tatami-400 hover:shadow-sm transition-all bg-white"
                >
                  <div className="w-11 h-11 rounded-xl bg-tatami-50 border border-tatami-100 flex items-center justify-center flex-shrink-0">
                    <IconByName name={useCase.icon} size={22} className="text-tatami-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-serif font-bold text-ink text-base leading-snug">{useCase.title}</h2>
                    </div>
                    <p className="text-muted text-xs leading-relaxed line-clamp-2">{useCase.summary}</p>
                    <div className="mt-3 flex items-center gap-1 text-tatami-600 text-xs font-medium">
                      <span>くわしく見る</span>
                      <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick decision guide */}
            <div className="mt-16 bg-tatami-50 rounded-2xl p-6 md:p-8 border border-tatami-100">
              <p className="text-tatami-400 text-[10px] tracking-widest mb-3 text-center uppercase">Quick Guide</p>
              <h3 className="font-serif text-ink text-xl font-bold text-center mb-6">素材選びの目安</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { situation: 'ペット・子供のいる家庭', rec: '和紙畳または樹脂畳', href: '/materials/washi' },
                  { situation: '本物の和室の香りを求める方', rec: '国産高級天然い草', href: '/materials/kumamoto-igusa' },
                  { situation: '旅館・業務用・耐久性重視', rec: '樹脂畳または和紙畳', href: '/materials/jushi' },
                  { situation: '和モダン・インテリア重視', rec: 'カラー和紙畳・縁なし畳', href: '/services/herinashi' },
                ].map((item, i) => (
                  <Link key={i} href={item.href} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-tatami-100 hover:border-tatami-400 transition-colors group">
                    <div className="flex-1">
                      <p className="text-muted text-xs">{item.situation}</p>
                      <p className="text-tatami-700 text-xs font-bold mt-0.5">→ {item.rec}</p>
                    </div>
                    <ChevronRight size={14} className="text-tatami-300 mt-0.5 flex-shrink-0 group-hover:text-tatami-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <p className="text-muted text-sm mb-4">迷ったら、まずはお気軽にご相談ください</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:0992671577"
                  className="inline-flex items-center gap-2 bg-tatami-400 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-tatami-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" /></svg>
                  099-267-1577
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-tatami-400 text-tatami-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-tatami-50 transition-colors">
                  お問い合わせフォーム
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
