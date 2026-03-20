import { memo } from 'react'
import { Check, Zap } from 'lucide-react'

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'For solo devs getting started.',
    features: [
      'Up to 3 repos',
      'Commit heatmap',
      'Focus hours',
      '30-day history',
      'Public repos only',
    ],
    cta: 'Start for free',
    accent: 'var(--text-muted)',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    desc: 'For developers who want the full picture.',
    features: [
      'Unlimited repos',
      'Full history (all time)',
      'Repo health scores',
      'Weekly digest emails',
      'Private repos',
      'Shareable profile card',
    ],
    cta: 'Connect GitHub →',
    accent: 'var(--pulse)',
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Team',
    price: '$29',
    period: 'per team / month',
    desc: 'For engineering teams that ship together.',
    features: [
      'Everything in Pro',
      'Up to 10 members',
      'Team velocity charts',
      'Sprint comparisons',
      'Slack digest integration',
      'CSV export',
    ],
    cta: 'Start team trial',
    accent: 'var(--cyan)',
    highlight: false,
  },
]

const PlanCard = memo(({ plan }) => (
  <div
    className={`relative flex flex-col gap-6 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
      plan.highlight
        ? 'bg-[var(--surface)] border-[var(--pulse)] shadow-[0_0_40px_rgba(0,229,160,0.1)]'
        : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--muted)]'
    }`}
  >
    {plan.badge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--pulse)] font-mono text-[9px] text-[var(--void)] tracking-widest uppercase font-medium">
        {plan.badge}
      </div>
    )}

    <div>
      <span className="font-mono text-[10px] tracking-widest uppercase mb-2 block" style={{ color: plan.accent }}>
        {plan.name}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-medium text-[var(--text)]">{plan.price}</span>
        <span className="font-mono text-xs text-[var(--text-muted)]">/ {plan.period}</span>
      </div>
      <p className="font-body text-sm text-[var(--text-muted)] mt-2">{plan.desc}</p>
    </div>

    <div className="hr-pulse" />

    <ul className="flex flex-col gap-3 flex-1">
      {plan.features.map(f => (
        <li key={f} className="flex items-center gap-2.5">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${plan.accent}18` }}
          >
            <Check size={9} style={{ color: plan.accent }} />
          </div>
          <span className="font-body text-sm text-[var(--text-muted)]">{f}</span>
        </li>
      ))}
    </ul>

    <a
      href="#"
      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-body font-600 text-sm transition-all duration-200 ${
        plan.highlight
          ? 'bg-[var(--pulse)] text-[var(--void)] hover:brightness-110 animate-glow'
          : 'border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--muted)]'
      }`}
    >
      {plan.highlight && <Zap size={14} />}
      {plan.cta}
    </a>
  </div>
))

PlanCard.displayName = 'PlanCard'

const Pricing = memo(() => (
  <section id="pricing" className="py-28 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <span className="font-mono text-[10px] text-[var(--pulse)] tracking-[0.2em] uppercase block mb-3">
          ── Pricing
        </span>
        <h2 className="font-body font-800 text-4xl lg:text-5xl text-[var(--text)] leading-tight mb-4">
          Simple, honest pricing.<br />
          <span style={{ color: 'var(--pulse)' }}>No surprises.</span>
        </h2>
        <p className="font-body text-[var(--text-muted)] text-lg">
          Start free forever. Upgrade when you need more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {PLANS.map(plan => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>

      <p className="font-mono text-[10px] text-[var(--text-dim)] text-center mt-8 tracking-wider">
        All plans include 14-day free trial on paid features · No credit card required
      </p>
    </div>
  </section>
))

Pricing.displayName = 'Pricing'
export default Pricing
