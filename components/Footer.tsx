import Link from 'next/link'
import { MapPin } from 'lucide-react'

const NAV = [
  { label: 'サービス', href: '/services' },
  { label: '畳について', href: '/tatami' },
  { label: '畳縁について', href: '/tatami-beri' },
  { label: '施工事例', href: '/works' },
  { label: 'ブログ', href: '/blog' },
  { label: 'よくある質問', href: '/faq' },
  { label: '会社情報', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#1A2E15] text-tatami-200">
      <div className="h-px bg-gradient-to-r from-transparent via-tatami-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-tatami-400 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold font-serif">畳</span>
              </div>
              <div>
                <div className="font-serif font-bold text-white text-sm">(有)竹原タタミ店</div>
                <div className="text-tatami-400 text-[10px] tracking-wider">鹿児島市東谷山 ・ 畳専門店</div>
              </div>
            </div>
            <p className="text-tatami-300 text-sm leading-relaxed">
              鹿児島市東谷山で畳の張替え・表替え・裏返し・新調なら(有)竹原タタミ店へ。
              地域密着の畳店として、和室を快適で美しく整えるご提案をいたします。
            </p>
            {/* SEO keywords (hidden visually but indexable) */}
            <p className="text-tatami-700 text-[10px] mt-4 leading-relaxed">
              鹿児島 畳 / 鹿児島市 畳 / 東谷山 畳 / 鹿児島 畳 張替え / 鹿児島市 畳 表替え / 鹿児島 琉球畳 / 縁なし畳 鹿児島 / 畳 新調 鹿児島
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-[0.25em] mb-4 uppercase">Contact</h4>
            <a href="tel:0992671577" className="text-white text-2xl font-bold block mb-1 hover:text-tatami-300 transition-colors">
              099-267-1577
            </a>
            <p className="text-tatami-400 text-xs mb-4">8:30〜18:00（定休：日曜・祝日）</p>
            <div className="flex items-start gap-1.5 text-tatami-300 text-xs leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-tatami-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              鹿児島県鹿児島市東谷山2丁目35-15
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-[0.25em] mb-4 uppercase">Menu</h4>
            <ul className="space-y-2">
              {NAV.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-tatami-300 text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-tatami-700/40 text-center">
          <p className="text-tatami-600/80 text-xs">
            © {year} (有)竹原タタミ店 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
