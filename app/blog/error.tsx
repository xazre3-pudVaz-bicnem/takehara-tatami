'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[blog error]', error)
  }, [error])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6 py-24 max-w-sm mx-auto">
          <div className="w-16 h-16 bg-tatami-50 border border-tatami-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-tatami-300 text-2xl font-serif">畳</span>
          </div>
          <h2 className="font-serif font-bold text-ink text-xl mb-3">
            記事の読み込みに失敗しました
          </h2>
          <p className="text-muted text-sm mb-8 leading-relaxed">
            通信エラーが発生しました。しばらく経ってから再度お試しください。
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={reset}
              className="px-6 py-2.5 bg-tatami-400 hover:bg-tatami-500 text-white text-sm font-medium rounded-full transition-colors"
            >
              再試行する
            </button>
            <Link
              href="/"
              className="text-tatami-500 text-sm hover:text-tatami-600 transition-colors"
            >
              トップへ戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
