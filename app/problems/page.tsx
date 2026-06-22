import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { problemsData } from '@/lib/problems-data'

export const metadata: Metadata = {
  title: '畳のお悩み別ガイド｜症状・原因・対処法 | (有)竹原タタミ店【鹿児島】',
  description:
    '畳のカビ・ダニ・ささくれ・変色・へこみ・沈みなど、症状別に原因と対処法を詳しく解説。自分でできる応急処置から、プロに相談すべきタイミングまで。鹿児島市の竹原タタミ店。',
  openGraph: {
    title: '畳のお悩み別ガイド｜竹原タタミ店【鹿児島】',
    description: '畳のカビ・ダニ・ささくれ・変色・へこみなど症状別に解説。鹿児島市の竹原タタミ店。',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function ProblemsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          en="PROBLEMS GUIDE"
          ja="畳のお悩み別ガイド"
          description="症状から原因・対処法を探せます。「うちの畳はどうすれば？」という疑問にお答えします。"
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            {/* AIO Summary */}
            <div className="bg-tatami-50 border-l-4 border-tatami-400 rounded-r-xl p-5 mb-12">
              <p className="text-tatami-500 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase">よくある畳のお悩み</p>
              <p className="text-sm text-ink leading-relaxed">
                畳のカビ・ダニ・ささくれ・変色・へこみ・臭いなど、多くのご家庭で見られる症状について詳しく解説しています。
                症状を選んで、原因・自分でできる対処・プロに相談すべきタイミングを確認してください。
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-14">
              {problemsData.map(problem => (
                <Link
                  key={problem.slug}
                  href={`/problems/${problem.slug}`}
                  className="group p-5 bg-white border border-tatami-100 rounded-2xl hover:border-tatami-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{problem.icon}</span>
                    <div>
                      <p className="font-serif font-bold text-ink text-base group-hover:text-tatami-600 transition-colors">
                        {problem.title}
                      </p>
                      <p className="text-muted text-xs mt-1 leading-relaxed">
                        {problem.conclusion.slice(0, 60)}…
                      </p>
                      <div className="mt-2.5 flex items-center gap-1.5">
                        <span className="text-tatami-400 text-xs bg-tatami-50 border border-tatami-200 px-2 py-0.5 rounded-full">
                          → {problem.recommendedService.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick advice */}
            <div className="bg-tatami-800 rounded-2xl p-6 md:p-8 text-center mb-12">
              <p className="text-tatami-300 text-xs tracking-widest mb-2">QUICK GUIDE</p>
              <h2 className="font-serif text-white text-xl font-bold mb-4">どれを選べばいいか分からない場合は？</h2>
              <div className="grid sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto">
                {[
                  { cond: '使用3〜5年・表面の色褪せ', rec: '→ 裏返しがおすすめ' },
                  { cond: '使用5〜10年・チクチク・変色', rec: '→ 表替えがおすすめ' },
                  { cond: '踏むと沈む・15年以上', rec: '→ 新調がおすすめ' },
                ].map((item, i) => (
                  <div key={i} className="bg-tatami-700/50 rounded-xl p-3">
                    <p className="text-tatami-200 text-xs mb-1.5">{item.cond}</p>
                    <p className="text-white text-sm font-bold">{item.rec}</p>
                  </div>
                ))}
              </div>
              <p className="text-tatami-400 text-xs mt-4">迷ったら現地確認で判断します。無料でお伺いします。</p>
            </div>

            <div className="text-center">
              <a
                href="tel:0992671577"
                className="inline-flex items-center gap-2 bg-tatami-400 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-tatami-500 transition-colors"
              >
                お電話でご相談：099-267-1577
              </a>
              <p className="text-muted text-xs mt-2">8:30〜18:00（日曜・祝日定休）</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
