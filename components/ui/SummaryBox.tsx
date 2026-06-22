interface SummaryBoxProps {
  title?: string
  children: React.ReactNode
}

export default function SummaryBox({ title = 'この記事の結論', children }: SummaryBoxProps) {
  return (
    <div className="bg-tatami-50 border-l-4 border-tatami-400 rounded-r-xl p-5 mb-8">
      <p className="text-tatami-500 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase">{title}</p>
      <div className="text-sm text-ink leading-relaxed space-y-1.5">{children}</div>
    </div>
  )
}
