import { memo } from 'react'
import { Activity, Github, ArrowRight, Twitter } from 'lucide-react'

const Footer = memo(() => (
  <footer>
    {/* CTA band */}
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,229,160,0.03)] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[var(--pulse)] rounded-full opacity-[0.06] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-2xl bg-[var(--pulse)] flex items-center justify-center animate-glow">
          <Activity size={22} className="text-[var(--void)]" />
        </div>

        <h2 className="font-body font-800 text-4xl lg:text-6xl text-[var(--text)] leading-[1.05]">
          Connect your GitHub.<br />
          <span className="glow-text" style={{ color: 'var(--pulse)' }}>See your pulse.</span>
        </h2>

        <p className="font-body text-[var(--text-muted)] text-lg max-w-md">
          Free to start. No credit card required. Your first repo live in under 30 seconds.
        </p>

        <a
          href="#"
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--pulse)] text-[var(--void)] font-body font-700 text-base hover:brightness-110 transition-all duration-200 animate-glow mt-2"
        >
          <Github size={18} />
          Get started free
          <ArrowRight size={16} />
        </a>

        <p className="font-mono text-[10px] text-[var(--text-dim)] tracking-wider">
          14,000+ developers · Read-only access · Cancel anytime
        </p>
      </div>
    </section>

    {/* Footer bar */}
    <div className="border-t border-[var(--border)] bg-[var(--deep)] px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[var(--pulse)] flex items-center justify-center">
            <Activity size={12} className="text-[var(--void)]" />
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
            PULSE<span className="text-[var(--pulse)]">HQ</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Status', 'Docs', 'Blog'].map(l => (
            <a key={l} href="#" className="font-mono text-[10px] text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors tracking-widest uppercase">
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#" aria-label="Twitter" className="text-[var(--text-dim)] hover:text-[var(--pulse)] transition-colors">
            <Twitter size={14} />
          </a>
          <a href="#" aria-label="GitHub" className="text-[var(--text-dim)] hover:text-[var(--pulse)] transition-colors">
            <Github size={14} />
          </a>
          <span className="font-mono text-[9px] text-[var(--text-dim)] ml-2">
            © 2025 PulseHQ
          </span>
        </div>
      </div>
    </div>
  </footer>
))

Footer.displayName = 'Footer'
export default Footer
