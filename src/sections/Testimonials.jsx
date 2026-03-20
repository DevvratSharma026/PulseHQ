import { memo } from 'react'

const TESTIMONIALS = [
  {
    quote: "I had no idea I was most productive between 9 and 11pm until PulseHQ showed me. Changed how I plan my entire day.",
    name: 'Aria Chen',
    role: 'Senior Engineer, Vercel',
    accent: 'var(--pulse)',
  },
  {
    quote: "The repo health score caught a neglected service before it became a production incident. Worth the subscription alone.",
    name: 'Marcus Webb',
    role: 'Engineering Manager, Linear',
    accent: 'var(--cyan)',
  },
  {
    quote: "I embed my PulseHQ profile card on every client proposal. It's the cleanest proof-of-work I've ever had as a freelancer.",
    name: 'Fatima Al-Rashid',
    role: 'Freelance Fullstack Dev',
    accent: 'var(--amber)',
  },
]

const TestimonialCard = memo(({ quote, name, role, accent }) => (
  <div className="flex flex-col gap-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--muted)] transition-all duration-300">
    {/* Quote mark */}
    <span className="font-display text-4xl leading-none" style={{ color: accent, opacity: 0.5 }}>"</span>
    <p className="font-body text-[var(--text)] text-sm leading-relaxed flex-1">"{quote}"</p>
    <div className="flex items-center gap-3 mt-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-medium"
        style={{ background: `${accent}15`, color: accent }}
      >
        {name[0]}
      </div>
      <div>
        <div className="font-body font-600 text-[var(--text)] text-sm">{name}</div>
        <div className="font-mono text-[10px] text-[var(--text-muted)]">{role}</div>
      </div>
    </div>
  </div>
))

TestimonialCard.displayName = 'TestimonialCard'

const Testimonials = memo(() => (
  <section className="py-28 px-6 bg-[var(--deep)] border-y border-[var(--border)]">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <span className="font-mono text-[10px] text-[var(--pulse)] tracking-[0.2em] uppercase block mb-3">
          ── What devs say
        </span>
        <h2 className="font-body font-800 text-4xl lg:text-5xl text-[var(--text)] leading-tight">
          Builders who actually<br />
          <span style={{ color: 'var(--pulse)' }}>use it every week.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map(t => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </div>
    </div>
  </section>
))

Testimonials.displayName = 'Testimonials'
export default Testimonials
