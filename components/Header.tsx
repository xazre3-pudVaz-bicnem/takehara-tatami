'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'サービス', href: '/services' },
  { label: '畳について', href: '/tatami' },
  { label: '畳縁について', href: '/tatami-beri' },
  { label: '施工事例', href: '/works' },
  { label: 'ブログ', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: '会社情報', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.97)'])
  const shadow = useTransform(scrollY, [0, 80], ['none', '0 2px 20px rgba(0,0,0,0.06)'])

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 60))
  }, [scrollY])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: bg, boxShadow: shadow }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-tatami-400 rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold font-serif leading-none">畳</span>
              </div>
              <div>
                <div
                  className={`font-serif font-bold text-sm leading-tight transition-colors duration-300 ${
                    scrolled ? 'text-ink' : 'text-white'
                  }`}
                >
                  (有)竹原タタミ店
                </div>
                <div
                  className={`text-[10px] font-sans tracking-wider transition-colors duration-300 ${
                    scrolled ? 'text-tatami-400' : 'text-tatami-200'
                  }`}
                >
                  鹿児島市東谷山
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-tatami-400 ${
                    scrolled ? 'text-ink/70' : 'text-white/85'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right: phone icon */}
            <div className="flex items-center gap-3">
              <a
                href="tel:0992671577"
                className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-tatami-400 ${
                  scrolled ? 'text-ink/80' : 'text-white/85'
                }`}
                aria-label="電話で問い合わせる"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
                <span className="hidden xl:inline">099-267-1577</span>
              </a>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 -mr-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              >
                <div className="space-y-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className={`block w-5 h-0.5 rounded-full transition-colors ${
                        scrolled ? 'bg-ink' : 'bg-white'
                      }`}
                      animate={
                        i === 0
                          ? menuOpen
                            ? { rotate: 45, y: 8 }
                            : { rotate: 0, y: 0 }
                          : i === 1
                          ? { opacity: menuOpen ? 0 : 1 }
                          : menuOpen
                          ? { rotate: -45, y: -8 }
                          : { rotate: 0, y: 0 }
                      }
                    />
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        className="fixed inset-0 z-40 lg:hidden"
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <motion.nav
          className="absolute top-16 md:top-20 left-0 right-0 bg-white shadow-xl border-t border-tatami-100"
          initial={{ y: -16, opacity: 0 }}
          animate={menuOpen ? { y: 0, opacity: 1 } : { y: -16, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 text-ink font-medium border-b border-tatami-50 last:border-0 hover:bg-tatami-50 hover:text-tatami-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 py-4">
            <a
              href="tel:0992671577"
              className="flex items-center gap-2 text-tatami-500 font-bold text-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              099-267-1577
            </a>
          </div>
        </motion.nav>
      </motion.div>
    </>
  )
}
