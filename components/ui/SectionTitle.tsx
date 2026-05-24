'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  en: string
  ja: string
  description?: string
  light?: boolean
  align?: 'left' | 'center'
}

export default function SectionTitle({
  en,
  ja,
  description,
  light = false,
  align = 'center',
}: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${alignClass} mb-12 md:mb-16`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className={`text-[11px] font-sans font-medium tracking-[0.35em] mb-3 uppercase ${
          light ? 'text-tatami-200' : 'text-tatami-400'
        }`}
      >
        {en}
      </p>
      <h2
        className={`font-serif text-2xl md:text-4xl font-bold leading-snug mb-4 ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {ja}
      </h2>
      {/* Brush stroke line */}
      <div className={align === 'center' ? 'flex justify-center' : ''}>
        <svg width="160" height="14" viewBox="0 0 160 14" fill="none">
          <motion.path
            d="M 4 9 Q 80 3 156 9"
            stroke={light ? 'rgba(255,255,255,0.5)' : '#88B462'}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
          />
          <motion.path
            d="M 22 12 Q 80 7 138 12"
            stroke={light ? 'rgba(196,168,79,0.5)' : '#C4A882'}
            strokeWidth="0.7"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
          />
        </svg>
      </div>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-sm md:text-base leading-relaxed ${
            light ? 'text-tatami-100' : 'text-muted'
          } ${align === 'center' ? 'text-center' : ''}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
