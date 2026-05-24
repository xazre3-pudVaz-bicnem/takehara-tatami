'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Concept() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left: Decorative element */}
          <motion.div
            className="hidden md:block relative select-none"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative pl-14">
              {/* Vertical accent line */}
              <motion.div
                className="absolute left-6 top-0 w-px bg-tatami-200 rounded-full"
                initial={{ height: 0 }}
                animate={inView ? { height: '100%' } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              />
              {/* Large kanji decoration */}
              <p className="font-serif text-[120px] md:text-[140px] leading-none text-tatami-100 font-bold">
                畳
              </p>
              {/* Seigaiha pattern patch */}
              <div className="absolute bottom-4 right-4 w-24 h-24 seigaiha opacity-60 rounded-full" />
            </div>
          </motion.div>

          {/* Right: Text */}
          <div>
            <motion.p
              className="text-tatami-400 text-[11px] font-sans tracking-[0.4em] mb-5 uppercase"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              CONCEPT
            </motion.p>

            <motion.h2
              className="font-serif text-ink text-2xl md:text-3xl font-bold leading-snug mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              一枚の畳から、
              <br />
              暮らしが変わる。
            </motion.h2>

            {/* Accent line */}
            <motion.div
              className="h-px w-10 bg-tatami-300 mb-7"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
            />

            {[
              '畳は、日本の暮らしに寄り添ってきた大切な素材です。い草の香り、やわらかな手触り、清潔な見た目——畳があるだけで、和室の空気がやわらかく変わります。',
              '東谷山に根ざして長年、鹿児島市内の皆さまの和室をお手入れしてきました。職人の目で一枚一枚の状態を丁寧に確認し、最適な施工をご提案します。',
              '鹿児島市の畳のことなら、どんな小さなことでもお気軽にご相談ください。',
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-muted text-sm md:text-base leading-[1.9] mb-4 last:mb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
              >
                {text}
              </motion.p>
            ))}

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 mt-7 px-4 py-2 bg-tatami-50 border border-tatami-200 rounded-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.85 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tatami-400" />
              <span className="text-tatami-600 text-xs font-medium">鹿児島市全域 対応</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
