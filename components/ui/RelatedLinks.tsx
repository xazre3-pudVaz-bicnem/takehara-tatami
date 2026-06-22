import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface RelatedLink {
  href: string
  label: string
  description?: string
}

interface Props {
  title?: string
  links: RelatedLink[]
}

export default function RelatedLinks({ title, links }: Props) {
  if (links.length === 0) return null
  return (
    <section className="py-10 border-t border-tatami-100">
      <p className="text-tatami-400 text-[10px] tracking-[0.3em] uppercase mb-4">{title ?? 'RELATED'}</p>
      <div className="grid sm:grid-cols-2 gap-2.5">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-3 p-3.5 bg-white border border-tatami-100 rounded-xl hover:border-tatami-400 hover:shadow-sm transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tatami-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-ink text-sm font-medium group-hover:text-tatami-600 transition-colors">{link.label}</p>
              {link.description && (
                <p className="text-muted text-xs mt-0.5 truncate">{link.description}</p>
              )}
            </div>
            <ChevronRight size={14} className="text-tatami-300 flex-shrink-0 group-hover:text-tatami-500 transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  )
}
