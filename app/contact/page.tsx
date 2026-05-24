'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Check, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'

type Status = 'idle' | 'sending' | 'success' | 'error'
const METHODS = ['お電話', 'メール', 'どちらでも'] as const

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const inputCls =
  'w-full border border-tatami-100 bg-tatami-50/40 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-tatami-400 focus:ring-1 focus:ring-tatami-200 transition-colors placeholder:text-tatami-300 text-ink'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    method: 'お電話' as (typeof METHODS)[number],
  })

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const data = new FormData()
    data.append('お名前', form.name)
    data.append('メールアドレス', form.email)
    data.append('電話番号', form.phone)
    data.append('住所・エリア', form.address)
    data.append('ご相談内容', form.message)
    data.append('連絡方法', form.method)
    data.append('_subject', '竹原タタミ店 お問い合わせ')
    data.append('_captcha', 'false')
    data.append('_template', 'table')

    try {
      const res = await fetch('https://formsubmit.co/ajax/info@takeharatatamiten.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Header />
      <main>
        <PageHero
          en="CONTACT"
          ja="お問い合わせ"
          description="現地確認・お見積もりは無料です。まずはお気軽にご連絡ください。"
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            {status === 'success' ? (
              <motion.div
                className="max-w-md mx-auto bg-white border border-tatami-100 rounded-2xl p-12 text-center shadow-md"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-12 h-12 bg-tatami-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-serif font-bold text-ink text-xl mb-3">お問い合わせを受け付けました</h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  ありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。
                  <br />お急ぎの場合はお電話ください。
                </p>
                <a
                  href="tel:0992671577"
                  className="inline-flex items-center gap-2 text-tatami-500 font-bold text-lg hover:text-tatami-600 transition-colors"
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                  099-267-1577
                </a>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-5 gap-10">
                {/* Left info */}
                <FadeIn className="md:col-span-2 space-y-5">
                  <div>
                    <p className="text-tatami-400 text-[10px] tracking-[0.3em] font-sans mb-4">QUICK CONTACT</p>
                    <h2 className="font-serif font-bold text-ink text-xl mb-1">お電話が最速です</h2>
                    <p className="text-muted text-sm">お気軽にご連絡ください</p>
                  </div>

                  <div className="bg-tatami-50 border border-tatami-100 rounded-2xl p-6">
                    <p className="text-tatami-400 text-[10px] tracking-wider mb-2 font-sans">TEL</p>
                    <a
                      href="tel:0992671577"
                      className="text-ink font-bold text-2xl font-serif block hover:text-tatami-500 transition-colors mb-1"
                    >
                      099-267-1577
                    </a>
                    <div className="flex items-center gap-1.5 text-muted text-xs mt-2">
                      <Clock className="w-3.5 h-3.5 text-tatami-400" strokeWidth={1.5} />
                      8:30〜18:00（定休：日曜・祝日）
                    </div>
                  </div>

                  <div className="bg-tatami-50 border border-tatami-100 rounded-2xl p-6">
                    <p className="text-ink font-serif font-bold text-sm mb-4">こんなことも相談できます</p>
                    {[
                      '見積もりだけでも大丈夫',
                      '1枚からの対応',
                      '表替えと新調の違い',
                      '施工の時間の目安',
                      'どんな畳が合うか',
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 text-muted text-sm mb-2.5 last:mb-0">
                        <ChevronRight className="w-3.5 h-3.5 text-tatami-400 flex-shrink-0" strokeWidth={1.5} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="bg-tatami-50 border border-tatami-100 rounded-2xl p-5">
                    <div className="flex items-start gap-2 text-muted text-xs leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-tatami-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      鹿児島県鹿児島市東谷山2丁目35-15
                    </div>
                  </div>
                </FadeIn>

                {/* Form */}
                <FadeIn className="md:col-span-3" delay={0.15}>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-tatami-100 rounded-2xl shadow-md p-7 md:p-10 space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-ink text-sm font-medium mb-1.5">
                          お名前 <span className="text-red-400 text-xs">必須</span>
                        </label>
                        <input
                          type="text" value={form.name} onChange={set('name')} required
                          placeholder="山田 太郎"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-ink text-sm font-medium mb-1.5">
                          電話番号 <span className="text-red-400 text-xs">必須</span>
                        </label>
                        <input
                          type="tel" value={form.phone} onChange={set('phone')} required
                          placeholder="099-000-0000"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-ink text-sm font-medium mb-1.5">
                        メールアドレス <span className="text-red-400 text-xs">必須</span>
                      </label>
                      <input
                        type="email" value={form.email} onChange={set('email')} required
                        placeholder="example@email.com"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-ink text-sm font-medium mb-1.5">住所・対応エリア</label>
                      <input
                        type="text" value={form.address} onChange={set('address')}
                        placeholder="鹿児島市〇〇町"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-ink text-sm font-medium mb-1.5">
                        ご相談内容 <span className="text-red-400 text-xs">必須</span>
                      </label>
                      <textarea
                        value={form.message} onChange={set('message')} required rows={5}
                        placeholder="例：8畳和室の表替えを検討しています。料金の目安と対応可能な日程を教えてください。"
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    <div>
                      <label className="block text-ink text-sm font-medium mb-2">ご希望の連絡方法</label>
                      <div className="flex gap-5">
                        {METHODS.map(m => (
                          <label key={m} className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio" name="method" value={m} checked={form.method === m}
                              onChange={() => setForm(p => ({ ...p, method: m }))}
                              className="accent-tatami-400"
                            />
                            <span className="text-sm text-ink">{m}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
                        <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>
                          送信に失敗しました。お電話（099-267-1577）またはメール（
                          <a href="mailto:info@takeharatatamiten.com" className="underline">
                            info@takeharatatamiten.com
                          </a>
                          ）でご連絡ください。
                        </span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-shimmer w-full bg-tatami-400 hover:bg-tatami-500 disabled:bg-tatami-200 text-white py-4 rounded-xl font-medium text-sm tracking-wide transition-colors duration-200"
                    >
                      {status === 'sending' ? '送信中...' : '無料相談を申し込む'}
                    </button>

                    <p className="text-xs text-center text-muted">
                      お急ぎの場合はお電話（099-267-1577）が最速です
                    </p>
                  </form>
                </FadeIn>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
