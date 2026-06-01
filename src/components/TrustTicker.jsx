const ITEMS = [
  '10K+ CALLS AUDITED DAILY',
  '98% AUDIT ACCURACY',
  '4+ INDUSTRIES SERVED',
  'AI THAT LEARNS',
  'ENTERPRISE-READY',
  'REAL-TIME RESULTS',
]

export default function TrustTicker() {
  const row = ITEMS.map((item) => (
    <span key={item} className="ticker-item mx-8 flex shrink-0 items-center gap-8 whitespace-nowrap">
      <span className="text-[var(--accent)]">●</span>
      {item}
    </span>
  ))

  return (
    <div className="overflow-hidden border-y border-[var(--border2)] py-4">
      <div className="ticker-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  )
}
