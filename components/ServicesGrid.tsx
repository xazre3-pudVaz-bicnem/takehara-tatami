'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ServiceData } from '@/lib/services-data'

const serviceOrder = ['omotegae', 'uragaeshi', 'shincho', 'herinashi', 'ryukyu']

const guidePrices: Record<string, string> = {
  omotegae: '¥3,500〜 / 枚',
  uragaeshi: '¥2,000〜 / 枚',
  shincho: '¥15,000〜 / 枚',
  herinashi: '¥8,000〜 / 枚',
  ryukyu: '¥10,000〜 / 枚',
}

export default function ServicesGrid({ services }: { services: ServiceData[] }) {
  const sorted = serviceOrder.map(slug => services.find(s => s.slug === slug)).filter(Boolean) as ServiceData[]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Guide note */}
        <p className="text-center text-muted text-sm mb-12">
          現地確認・お見積もりは無料です。まずはお気軽にご相談ください。
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block bg-white border border-tatami-100 rounded-2xl overflow-hidden hover:border-tatami-300 hover:shadow-xl hover:shadow-tatami-100/50 transition-all duration-400"
              >
                {/* Color band with gradient */}
                <div
                  className="h-2"
                  style={{ background: `linear-gradient(to right, ${service.gradientFrom}, ${service.gradientTo})` }}
                />

                <div className="p-7">
                  {/* EN label */}
                  <p className="text-tatami-300 text-[10px] tracking-[0.3em] font-sans mb-2">{service.titleEn}</p>

                  {/* Title */}
                  <h2 className="font-serif font-bold text-ink text-2xl mb-3 group-hover:text-tatami-600 transition-colors">
                    {service.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-3">
                    {service.summary}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-tatami-50 mb-4" />

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tatami-400 text-xs tracking-wide mb-0.5">目安料金</p>
                      <p className="text-ink font-bold text-sm">{guidePrices[service.slug]}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-tatami-50 border border-tatami-200 flex items-center justify-center group-hover:bg-tatami-400 group-hover:border-tatami-400 transition-colors duration-300">
                      <ArrowRight size={14} className="text-tatami-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Consultation CTA */}
        <motion.div
          className="mt-16 text-center bg-tatami-50 border border-tatami-100 rounded-2xl p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-tatami-400 text-xs tracking-widest mb-2">FREE CONSULTATION</p>
          <h3 className="font-serif font-bold text-ink text-xl mb-3">どのサービスか迷ったら</h3>
          <p className="text-muted text-sm leading-relaxed mb-6 max-w-md mx-auto">
            現地で畳の状態を確認した上で、最適なサービスをご提案します。<br />
            見積もりだけでも大丈夫です。
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="tel:0992671577"
              className="inline-flex items-center gap-2 bg-tatami-400 hover:bg-tatami-500 text-white text-sm font-medium px-7 py-3 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              099-267-1577
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-tatami-200 text-tatami-600 hover:bg-tatami-50 text-sm font-medium px-7 py-3 rounded-xl transition-colors"
            >
              お問い合わせフォーム
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
