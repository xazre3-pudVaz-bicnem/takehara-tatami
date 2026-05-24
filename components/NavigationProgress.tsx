'use client'

/**
 * NavigationProgress
 *
 * 全ページ遷移に反応する2pxの tatami グリーンバー。
 * loading.tsx (非同期ページのみ) とは独立して動作するため、
 * 速いページ遷移でも必ずアニメーションが見える。
 *
 * 動作:
 *   1. 内部リンクがクリックされる → バーが 0% → 82% にゆっくり伸びる
 *   2. 新しいパスに切り替わる → 瞬時に 100% まで延びてフェードアウト
 */

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'idle' | 'running' | 'done'

export function NavigationProgress() {
  const pathname = usePathname()
  const prevPathRef = useRef(pathname)
  const [phase, setPhase] = useState<Phase>('idle')
  const doneTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // 内部リンクのクリックを検知してバーを開始
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!a?.href || a.target) return
      try {
        const url = new URL(a.href, location.href)
        if (
          url.origin === location.origin &&
          url.pathname !== location.pathname
        ) {
          setPhase('running')
        }
      } catch {
        // 無効な URL は無視
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // パス変更を検知してバーを完了させる
  useEffect(() => {
    if (phase === 'running' && pathname !== prevPathRef.current) {
      prevPathRef.current = pathname
      setPhase('done')
      doneTimer.current = setTimeout(() => setPhase('idle'), 500)
    } else if (phase === 'idle') {
      prevPathRef.current = pathname
    }
    return () => {
      if (doneTimer.current) clearTimeout(doneTimer.current)
    }
  }, [pathname, phase])

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          key="nav-progress-bar"
          className="fixed top-0 inset-x-0 z-[9999] pointer-events-none"
          style={{ height: 2 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
          aria-hidden
        >
          <motion.div
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, #88B462 0%, #6E9A4C 60%, #A4C480 100%)',
              boxShadow: '0 0 6px rgba(136, 180, 98, 0.5)',
            }}
            initial={{ width: '0%' }}
            animate={{
              width: phase === 'done' ? '100%' : '82%',
            }}
            transition={
              phase === 'done'
                ? { duration: 0.25, ease: 'easeOut' }
                : { duration: 2.8, ease: [0.08, 0.4, 0.3, 0.95] }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
