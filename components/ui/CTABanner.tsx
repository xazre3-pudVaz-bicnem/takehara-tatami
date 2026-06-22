import Link from 'next/link'

interface Props {
  areaName?: string
  compact?: boolean
}

export default function CTABanner({ areaName, compact = false }: Props) {
  const area = areaName ? `${areaName}の` : ''
  return (
    <section className={`bg-tatami-800 rounded-2xl text-center ${compact ? 'px-6 py-8' : 'px-6 py-10 md:p-12'}`}>
      <p className="text-tatami-300 text-[10px] tracking-[0.35em] mb-3 uppercase">Contact</p>
      <h3 className={`font-serif text-white font-bold mb-3 ${compact ? 'text-xl' : 'text-xl md:text-2xl'}`}>
        {area}畳のご相談は、お気軽にどうぞ
      </h3>
      <p className="text-tatami-200 text-sm mb-6 leading-relaxed max-w-sm mx-auto">
        現地確認・お見積もりは無料です。1枚からでも丁寧に対応いたします。
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="tel:0992671577"
          className="inline-flex items-center justify-center gap-2 bg-tatami-400 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-tatami-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          099-267-1577
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 border border-tatami-500 text-tatami-200 text-sm px-6 py-3 rounded-full hover:border-tatami-400 hover:text-white transition-colors"
        >
          メールでお問い合わせ
        </Link>
      </div>
      <p className="text-tatami-500 text-xs mt-4">8:30〜18:00（日曜・祝日定休）</p>
    </section>
  )
}
