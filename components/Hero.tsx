'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const FloatingLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute inset-0 tatami-grain"
      animate={{ y: [0, -50] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
    />
  </div>
)

const LightSweep = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.07) 50%, transparent 80%)',
    }}
    animate={{ x: ['-120%', '220%'] }}
    transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 9, ease: 'easeInOut' }}
  />
)

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section id="top" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background: Gradient fallback + photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-tatami-100 via-cream to-tatami-50">
        {/* Ken Burns wrapper */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        >
          <Image
            src="/images/hero-tatami.jpg"
            alt="畳のある和室 — 鹿児島市東谷山の竹原タタミ店"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>
      </div>

      {/* Layered overlays — minimal at top, gradient darkens only at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Subtle warm-green tint for 和モダン mood */}
      <div className="absolute inset-0 bg-tatami-100/10" />

      {/* Animated elements */}
      <FloatingLines />
      <LightSweep />

      {/* Main content — parallax on scroll */}
      <motion.div
        className="relative z-10 w-full"
        style={{ y, opacity }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 pb-28 md:pb-36">
          <div className="max-w-xl">
            {/* Category label */}
            <motion.p
              className="text-white/90 text-[11px] font-sans tracking-[0.45em] mb-5"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              鹿児島市東谷山 ・ 畳専門店
            </motion.p>

            {/* H1 */}
            <motion.h1
              className="font-serif text-white text-3xl sm:text-4xl md:text-5xl leading-[1.3] font-bold mb-5"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              鹿児島市東谷山で、
              <br />
              畳のある暮らしを
              <br />
              心地よく。
            </motion.h1>

            {/* Accent line */}
            <motion.div
              className="h-px w-14 bg-white/70 mb-5"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.7, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Sub copy */}
            <motion.p
              className="text-white/90 text-sm md:text-base leading-loose"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              表替え・裏返し・新調・縁なし畳まで、
              <br />
              地域密着の竹原タタミ店が丁寧にご提案します。
            </motion.p>

            {/* Credentials */}
            <motion.div
              className="mt-5 flex flex-wrap gap-x-5 gap-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {['1級畳製作技能士 在籍', '鹿児島県畳工業組合加盟店'].map(cred => (
                <span
                  key={cred}
                  className="flex items-center gap-2 text-white/70 text-[11px] font-sans"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                >
                  <span className="inline-block w-3 h-px bg-tatami-300/70 flex-shrink-0" />
                  {cred}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-white/40 text-[9px] font-sans tracking-[0.4em]">SCROLL</span>
        <div className="relative w-px h-10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white/50 rounded-full"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
