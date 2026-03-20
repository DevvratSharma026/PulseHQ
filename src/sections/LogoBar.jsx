import { memo } from 'react'

const LOGOS = [
  'Vercel', 'Linear', 'Supabase', 'Railway', 'Planetscale',
  'Fly.io', 'Turso', 'Resend', 'Neon', 'Trigger.dev',
]

const STATS = [
  { value: '14,000+', label: 'developers', color: 'var(--pulse)' },
  { value: '2.4M', label: 'commits analyzed', color: 'var(--cyan)' },
  { value: '99.9%', label: 'uptime', color: 'var(--amber)' },
]

const LogoBar = memo(() => (
  <section className="py-10 px-6 border-y border-[var(--border)] bg-[var(--deep)] overflow-hidden">
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {STATS.map(s => (
          <div key={s.label} className="flex items-baseline gap-2">
            <span className="font-mono font-medium text-2xl" style={{ color: s.color }}>{s.value}</span>
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="hr-pulse" />

      <p className="font-mono text-[10px] text-[var(--text-dim)] text-center tracking-[0.2em] uppercase mt-4 mb-3">
        Used by engineers at
      </p>

      {/* Scrolling logo row */}
      <div className="relative overflow-hidden">
        <div className="flex gap-10 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <span
              key={i}
              className="font-mono text-xs text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors cursor-default shrink-0 tracking-widest uppercase"
            >
              {name}
            </span>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--deep)] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--deep)] to-transparent pointer-events-none" />
      </div>
    </div>

    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </section>
))

LogoBar.displayName = 'LogoBar'
export default LogoBar
