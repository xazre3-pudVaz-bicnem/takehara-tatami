'use client'

import { motion } from 'framer-motion'

interface PageHeroProps {
  en: string
  ja: string
  description?: string
  light?: boolean
}

export default function PageHero({ en, ja, description, light = false }: PageHeroProps) {
  return (
    <section className="relative pt-28 md:pt-36 pb-14 md:pb-20 bg-tatami-900 overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 tatami-grain opacity-50" />
      {/* Decorative */}
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-tatami-700/40" />
      <div className="absolute -left-12 bottom-0 w-48 h-48 rounded-full bg-tatami-800/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-tatami-900/60" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <motion.p
          className="text-tatami-400 text-[11px] tracking-[0.4em] font-sans mb-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {en}
        </motion.p>
        <motion.h1
          className="font-serif font-bold text-white text-3xl md:text-4xl leading-tight mb-4"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {ja}
        </motion.h1>
        <motion.div
          className="mx-auto w-10 h-px bg-tatami-400/70 mb-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        {description && (
          <motion.p
            className="text-tatami-200/80 text-sm md:text-base leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
