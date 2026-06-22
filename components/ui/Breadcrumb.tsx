import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="パンくずリスト" className="flex items-center gap-1 text-xs text-tatami-400 mb-6 flex-wrap">
      <Link href="/" className="hover:text-tatami-600 transition-colors">ホーム</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={11} className="text-tatami-300 flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-tatami-600 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
