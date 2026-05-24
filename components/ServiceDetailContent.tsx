'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight, Phone, Banknote, Wind, Palette, Clock, Leaf, RefreshCw, Star, Shield, Layers, Home, Sparkles, type LucideIcon } from 'lucide-react'
import type { ServiceData } from '@/lib/services-data'

const ICON_MAP: Record<string, LucideIcon> = {
  Banknote, Wind, Palette, Clock, Leaf, RefreshCw, Star, Shield, Layers, Home, Sparkles,
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div
      ref={ref}
      className="border-b border-tatami-100 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 py-5 text-left hover:bg-tatami-50/40 transition-colors px-2 -mx-2 rounded-lg"
      >
        <span className="flex-shrink-0 w-6 h-6 bg-tatami-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center mt-0.5">Q</span>
        <span className="flex-1 font-serif font-bold text-ink text-sm md:text-base leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 text-tatami-300 mt-1">
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex gap-4 pb-5 px-2">
              <span className="flex-shrink-0 w-6 h-6 bg-tatami-100 text-tatami-600 text-[10px] font-bold rounded-full flex items-center justify-center mt-0.5">A</span>
              <p className="text-muted text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ServiceDetailContent({ service, related }: { service: ServiceData; related: ServiceData[] }) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${service.gradientFrom}22, ${service.gradientTo}11)` }}
        />
        <div className="absolute inset-0 tatami-grain opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tatami-300/30 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted mb-10">
            <Link href="/" className="hover:text-tatami-500 transition-colors">トップ</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-tatami-500 transition-colors">サービス一覧</Link>
            <span>/</span>
            <span className="text-ink">{service.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p
                className="text-tatami-400 text-[11px] tracking-[0.4em] font-sans mb-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {service.titleEn}
              </motion.p>
              <motion.h1
                className="font-serif font-bold text-ink text-4xl md:text-5xl leading-tight mb-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {service.title}
              </motion.h1>
              <motion.div
                className="h-px w-12 bg-tatami-300 mb-5"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3, transformOrigin: 'left' }}
                style={{ transformOrigin: 'left' }}
              />
              <motion.p
                className="text-ink/80 text-base md:text-lg leading-relaxed font-serif italic mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                {service.tagline}
              </motion.p>
              <motion.p
                className="text-muted text-sm leading-loose"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                {service.summary}
              </motion.p>
            </div>

            {/* Price card */}
            <motion.div
              className="bg-white border border-tatami-100 rounded-2xl p-8 shadow-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-tatami-400 text-[10px] tracking-widest mb-2">PRICE GUIDE</p>
              <p className="font-serif font-bold text-ink text-3xl mb-1">
                ¥{service.priceFrom}<span className="text-base font-sans font-normal text-muted">〜</span>
              </p>
              <p className="text-muted text-xs mb-6">{service.priceNote}</p>
              <div className="space-y-3 mb-6">
                {service.whenToChoose.map((w, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-tatami-400 flex-shrink-0 mt-1.5" />
                    <p className="text-ink text-sm">{w}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-tatami-100 pt-5 space-y-3">
                <a
                  href="tel:0992671577"
                  className="btn-shimmer flex items-center justify-center gap-2 bg-tatami-400 hover:bg-tatami-500 text-white text-sm font-medium py-3 rounded-xl transition-colors w-full"
                >
                  <Phone size={15} />
                  099-267-1577（無料相談）
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 border border-tatami-200 text-tatami-600 hover:bg-tatami-50 text-sm py-3 rounded-xl transition-colors w-full"
                >
                  フォームで問い合わせる
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <p className="text-muted text-xs tracking-widest mb-3">ABOUT</p>
            <h2 className="font-serif font-bold text-ink text-2xl mb-5">{service.title}とは</h2>
            <p className="text-ink/80 text-base leading-loose">{service.description}</p>
          </FadeIn>
        </div>
      </section>

      {/* Merits */}
      <section className="py-16 md:py-20 bg-tatami-50 relative overflow-hidden">
        <div className="absolute inset-0 tatami-grain opacity-40" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <p className="text-tatami-400 text-[10px] tracking-widest mb-2 text-center">MERITS</p>
            <h2 className="font-serif font-bold text-ink text-2xl mb-10 text-center">{service.title}のメリット</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {service.merits.map((m, i) => {
              const Icon = ICON_MAP[m.iconName]
              return (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white border border-tatami-100 rounded-2xl p-6 hover:border-tatami-300 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-tatami-50 border border-tatami-100 flex items-center justify-center mb-4">
                    {Icon && <Icon size={18} strokeWidth={1.4} className="text-tatami-500" />}
                  </div>
                  <h3 className="font-serif font-bold text-ink text-base mb-2">{m.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{m.description}</p>
                </div>
              </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Targets */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <p className="text-tatami-400 text-[10px] tracking-widest mb-2">FOR WHOM</p>
            <h2 className="font-serif font-bold text-ink text-2xl mb-8">こんな方におすすめ</h2>
            <div className="space-y-3">
              {service.targets.map((t, i) => (
                <div key={i} className="flex items-center gap-4 bg-tatami-50 border border-tatami-100 rounded-xl px-5 py-4">
                  <div className="w-7 h-7 rounded-full bg-tatami-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-tatami-500 text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-ink text-sm">{t}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-20 bg-tatami-900 relative overflow-hidden">
        <div className="absolute inset-0 tatami-grain opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <p className="text-tatami-400 text-[10px] tracking-widest mb-2 text-center">PROCESS</p>
            <h2 className="font-serif font-bold text-white text-2xl mb-12 text-center">施工の流れ</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {service.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6">
                  <span className="text-tatami-400/40 text-5xl font-serif font-bold absolute top-4 right-5 leading-none select-none">
                    {step.number}
                  </span>
                  <div className="mb-3">
                    <span className="text-tatami-400 text-xs tracking-wider">STEP {step.number}</span>
                  </div>
                  <h3 className="font-serif font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-tatami-200/70 text-sm leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="text-center text-tatami-300/60 text-xs mt-8">
              ※ 状態によって施工内容・日程が変わる場合があります。まずはご相談ください。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <FadeIn>
            <p className="text-tatami-400 text-[10px] tracking-widest mb-2">FAQ</p>
            <h2 className="font-serif font-bold text-ink text-2xl mb-8">{service.title}に関するよくある質問</h2>
          </FadeIn>
          <div className="bg-white border border-tatami-100 rounded-2xl shadow-sm px-4 md:px-8 py-2">
            {service.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-tatami-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-tatami-400 text-[10px] tracking-widest mb-3">CONTACT</p>
            <h2 className="font-serif font-bold text-ink text-2xl mb-3">{service.title}のご相談・お見積もり</h2>
            <p className="text-muted text-sm leading-relaxed mb-8">
              現地確認・お見積もりは完全無料です。<br />
              「まだ迷っている」という段階でもお気軽にご連絡ください。
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="tel:0992671577"
                className="btn-shimmer inline-flex items-center gap-2 bg-tatami-400 hover:bg-tatami-500 text-white font-medium px-8 py-3.5 rounded-xl transition-colors"
              >
                <Phone size={16} />
                099-267-1577
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-tatami-200 text-tatami-600 hover:bg-tatami-100 font-medium px-8 py-3.5 rounded-xl transition-colors"
              >
                フォームで問い合わせ
              </Link>
            </div>
            <p className="text-muted text-xs mt-4">8:30〜18:00（定休：日曜・祝日）</p>
          </FadeIn>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-tatami-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <FadeIn>
              <p className="text-tatami-400 text-[10px] tracking-widest mb-2">RELATED</p>
              <h2 className="font-serif font-bold text-ink text-xl mb-8">関連サービス</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((s, i) => (
                <FadeIn key={s.slug} delay={i * 0.08}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between bg-tatami-50 border border-tatami-100 rounded-xl px-5 py-4 hover:border-tatami-300 hover:bg-white hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      <p className="text-tatami-400 text-[10px] tracking-wider">{s.titleEn}</p>
                      <p className="font-serif font-bold text-ink text-base group-hover:text-tatami-600 transition-colors">{s.title}</p>
                    </div>
                    <ArrowRight size={16} className="text-tatami-300 group-hover:text-tatami-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
