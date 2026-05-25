'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Clock, Scissors, Heart, Users } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const values = [
  {
    Icon: Scissors,
    title: '畳だけに、真剣に',
    description: 'ふすまや障子、内装リフォームには手を出しません。畳だけに集中することで、素材・技術・対応のすべてを高いレベルに保てると考えています。',
  },
  {
    Icon: Heart,
    title: '1枚から、丁寧に',
    description: '「1枚だけ直したい」というご相談も大歓迎です。枚数の多少に関わらず、すべての畳に同じ姿勢で向き合います。',
  },
  {
    Icon: Users,
    title: '地域に、長く寄り添う',
    description: '鹿児島市東谷山を拠点に、地域の皆さまの暮らしに長く寄り添ってきました。「困ったらまず竹原さんに」と思っていただける存在でありたいと思っています。',
  },
]

const companyRows = [
  { label: '会社名', value: '(有)竹原タタミ店' },
  { label: '所在地', value: '鹿児島県鹿児島市東谷山2丁目35-15' },
  { label: '電話番号', value: '099-267-1577', phone: true },
  { label: '営業時間', value: '8:30〜18:00' },
  { label: '定休日', value: '基本日曜・祝日' },
  { label: '対応エリア', value: '鹿児島県内全域（鹿児島市内は迅速対応）' },
  { label: '主な業務', value: '畳の表替え・裏返し・新調・縁なし畳・琉球畳風' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          en="ABOUT"
          ja="竹原タタミ店について"
          description="鹿児島市東谷山で、畳ひとすじに向き合ってきました。"
        />

        {/* Philosophy */}
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-72 bg-tatami-50 rounded-full -translate-y-1/3 translate-x-1/3 opacity-60" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <FadeIn>
                <p className="text-tatami-400 text-[10px] tracking-widest mb-4">OUR STORY</p>
                <h2 className="font-serif font-bold text-ink text-2xl md:text-3xl leading-snug mb-6">
                  畳のある暮らしを、<br />
                  もっと身近に。
                </h2>
                <div className="space-y-4 text-muted text-sm leading-loose">
                  <p>
                    鹿児島市東谷山で、竹原タタミ店は地域の畳専門店として歩んできました。
                    和室のある家が少なくなった今でも、畳の心地よさを求める方は絶えません。
                  </p>
                  <p>
                    「畳を替えたら、家が変わった」という言葉を、施工後にお客様からいただくたびに、
                    この仕事の意味を実感します。新しい畳の香りと踏み心地は、空間だけでなく
                    暮らしそのものを豊かにすると信じています。
                  </p>
                  <p>
                    表替え・新調だけでなく、縁なし畳や琉球畳風など、現代の暮らしに合わせた
                    和モダンなご提案も承っています。まずはお気軽にご相談ください。
                  </p>
                </div>
              </FadeIn>

              {/* Decorative */}
              <FadeIn delay={0.2}>
                <div className="relative">
                  <div className="bg-tatami-50 border border-tatami-100 rounded-2xl p-10 text-center">
                    <div className="w-20 h-20 bg-tatami-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-tatami-400/20">
                      <span className="text-white text-4xl font-serif font-bold leading-none">畳</span>
                    </div>
                    <p className="font-serif font-bold text-ink text-lg mb-1">(有)竹原タタミ店</p>
                    <p className="text-tatami-500 text-sm">鹿児島市東谷山 ・ 畳専門店</p>
                    <div className="mt-6 pt-6 border-t border-tatami-100 text-left space-y-2.5">
                      <div className="flex items-center gap-2.5 text-sm text-muted">
                        <MapPin size={14} className="text-tatami-400 flex-shrink-0" />
                        <span>東谷山2丁目35-15</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-muted">
                        <Phone size={14} className="text-tatami-400 flex-shrink-0" />
                        <a href="tel:0992671577" className="hover:text-tatami-500 transition-colors">099-267-1577</a>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-muted">
                        <Clock size={14} className="text-tatami-400 flex-shrink-0" />
                        <span>8:30〜18:00（定休：日・祝）</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-tatami-50 relative overflow-hidden">
          <div className="absolute inset-0 tatami-grain opacity-40" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
            <FadeIn className="text-center mb-12">
              <p className="text-tatami-400 text-[10px] tracking-widest mb-2">VALUES</p>
              <h2 className="font-serif font-bold text-ink text-2xl">仕事へのこだわり</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white border border-tatami-100 rounded-2xl p-7 h-full hover:border-tatami-300 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-tatami-50 border border-tatami-100 flex items-center justify-center mb-5">
                      <v.Icon size={18} strokeWidth={1.4} className="text-tatami-500" />
                    </div>
                    <h3 className="font-serif font-bold text-ink text-base mb-3">{v.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{v.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Company info + Map */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <FadeIn className="mb-10">
              <p className="text-tatami-400 text-[10px] tracking-widest mb-2">COMPANY</p>
              <h2 className="font-serif font-bold text-ink text-2xl">会社情報</h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-8">
              <FadeIn>
                <div className="rounded-2xl border border-tatami-100 overflow-hidden shadow-sm">
                  {companyRows.map((r, i) => (
                    <div key={r.label} className={`flex border-b border-tatami-50 last:border-0 ${i % 2 ? 'bg-tatami-50/30' : 'bg-white'}`}>
                      <div className="w-28 md:w-32 flex-shrink-0 px-4 py-4 bg-tatami-50 border-r border-tatami-100">
                        <span className="text-tatami-600 text-xs font-bold">{r.label}</span>
                      </div>
                      <div className="flex-1 px-4 py-4">
                        {r.phone ? (
                          <a href="tel:0992671577" className="text-tatami-500 font-bold text-base hover:underline">{r.value}</a>
                        ) : (
                          <span className="text-ink text-sm">{r.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="rounded-2xl overflow-hidden shadow-sm border border-tatami-100" style={{ height: '320px' }}>
                  <iframe
                    src="https://maps.google.com/maps?q=%E9%B9%BF%E5%85%90%E5%B3%B6%E7%9C%8C%E9%B9%BF%E5%85%90%E5%B3%B6%E5%B8%82%E6%9D%B1%E8%B0%B7%E5%B1%B12%E4%B8%81%E7%9B%AE35-15&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%" height="100%" style={{ border: 0 }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="(有)竹原タタミ店の地図"
                  />
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    href="https://maps.google.com/?q=鹿児島県鹿児島市東谷山2丁目35-15"
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center text-sm border border-tatami-200 text-tatami-600 hover:bg-tatami-50 py-2.5 rounded-xl transition-colors"
                  >
                    Googleマップで見る
                  </a>
                  <a
                    href="tel:0992671577"
                    className="flex-1 text-center text-sm bg-tatami-400 hover:bg-tatami-500 text-white font-medium py-2.5 rounded-xl transition-colors"
                  >
                    電話で問い合わせる
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-tatami-900 relative overflow-hidden">
          <div className="absolute inset-0 tatami-grain opacity-40" />
          <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
            <FadeIn>
              <p className="text-tatami-400 text-[10px] tracking-widest mb-3">CONTACT</p>
              <h2 className="font-serif font-bold text-white text-2xl mb-4">まずはお気軽にご相談ください</h2>
              <p className="text-tatami-200/70 text-sm leading-relaxed mb-8">
                現地確認・お見積もりは完全無料です。<br />
                見積もりだけでも大丈夫です。
              </p>
              <a href="tel:0992671577" className="inline-flex items-center gap-2 bg-tatami-400 hover:bg-tatami-500 text-white font-bold text-xl px-10 py-4 rounded-2xl transition-colors shadow-lg shadow-tatami-400/30">
                📞 099-267-1577
              </a>
              <p className="text-tatami-400/60 text-xs mt-4">8:30〜18:00（定休：日曜・祝日）</p>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
