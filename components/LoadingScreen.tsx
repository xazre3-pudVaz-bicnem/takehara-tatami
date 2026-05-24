'use client'

/**
 * LoadingScreen
 *
 * 和モダン・高級旅館テイストのローディング演出。
 * Next.js App Router の loading.tsx ファイルから呼び出す。
 *
 * 演出の構成:
 *   1. 背景: 生成り (#F8F5EC) + 畳格子がゆっくり対角に流れる
 *   2. 外周: 薄い同心円が静かにフェードイン
 *   3. メダリオン: 白い円に「畳」文字 — 静かに呼吸するように点滅
 *   4. ラインシマー: 細い横線の上を光が左→右に流れる
 *   5. ブランド銘: 極小文字でサイト名を控えめに表示
 */

import { motion } from 'framer-motion'

// ─── 同心円コンポーネント ─────────────────────────────────
function Ring({
  size,
  delay,
  opacity = 1,
}: {
  size: number
  delay: number
  opacity?: number
}) {
  return (
    <motion.div
      aria-hidden
      className="absolute rounded-full border border-tatami-100 pointer-events-none"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 1.6, delay, ease: 'easeOut' }}
    />
  )
}

// ─── メインコンポーネント ─────────────────────────────────
export default function LoadingScreen() {
  return (
    <div
      role="status"
      aria-label="読み込み中"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#F8F5EC' }}
    >
      {/* ── 1. 畳格子: 対角にゆっくり流れる背景 ── */}
      <div className="absolute inset-0 tatami-loading-bg" aria-hidden />

      {/* ── 2. 極薄のグラデーション放射 (中央を少し明るく) ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 100%)',
        }}
      />

      {/* ── 3. 同心円 (装飾) ── */}
      <Ring size={340} delay={0.2} opacity={0.7} />
      <Ring size={220} delay={0.5} opacity={0.85} />

      {/* ── 4. 中央コンテンツ ── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* メダリオン */}
        <motion.div
          className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid #C4D9AC',
            boxShadow: '0 2px 16px rgba(136,180,98,0.10), 0 1px 4px rgba(44,42,40,0.06)',
          }}
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 「畳」文字 — 静かに呼吸 */}
          <span
            className="font-serif text-2xl leading-none select-none medallion-pulse"
            style={{ color: '#6E9A4C' }}
          >
            畳
          </span>
        </motion.div>

        {/* ── 5. シマーライン ── */}
        <motion.div
          className="mt-8 relative overflow-hidden rounded-full"
          style={{ width: 112, height: 1, backgroundColor: 'rgba(136,180,98,0.18)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          aria-hidden
        >
          {/*
           * 幅50%のグラデーション要素が左→右に流れる。
           * overflow-hidden で見切れることで seamless に見える。
           * transparent → tatami-400 → transparent のグラデで
           * 「光が線の上を走る」演出になる。
           */}
          <div
            className="absolute top-0 left-0 h-full loading-shimmer"
            style={{
              width: '50%',
              background:
                'linear-gradient(90deg, transparent 0%, #88B462 50%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* ── 6. ブランド銘 (控えめ) ── */}
        <motion.p
          className="mt-5 font-sans text-[0.6rem] tracking-[0.35em] uppercase"
          style={{ color: '#A4C480' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.9 }}
          aria-hidden
        >
          Takehara Tatami
        </motion.p>
      </div>
    </div>
  )
}
